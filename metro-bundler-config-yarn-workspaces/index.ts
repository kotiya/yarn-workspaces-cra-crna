const blacklist = require('metro/src/blacklist');
const getWorkspaces = require('get-yarn-workspaces');
const path = require('path');

module.exports = function getConfig(from: string, options: any = {}) {
  const workspaces = getWorkspaces(from);

  const config = {
    extraNodeModules: {
      'react-native': path.resolve(from, 'node_modules/react-native'),
    },
    getBlacklistRE(): RegExp {
      return blacklist(
        workspaces.map(
          (workspacePath: string): string =>
            `/${workspacePath.replace(
              /\//g,
              '[/\\\\]'
            )}[/\\\\]node_modules[/\\\\]react-native[/\\\\].*/`
        )
      );
    },
    getProjectRoots(): string[] {
      return [
        // Keep your project directory.
        path.resolve(from),

        // Include your forked package as a new root.
        options.nodeModules || path.resolve(from, '..', 'node_modules'),
      ].concat(workspaces);
    },
  };
  return config;
};