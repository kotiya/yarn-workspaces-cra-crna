import getWorkspaces from 'get-yarn-workspaces';
import path from 'path';
import { Configuration } from 'webpack';

export default function rewireYarnWorkspaces(config: Configuration, env: string, from: string): Configuration {
  const babel = config.module.rules
    .find((rule) => 'oneOf' in rule)
    .oneOf.find((rule) => /babel-loader/.test(rule.loader));

  if (!Array.isArray(babel.include)) {
    babel.include = [babel.include];
  }

  babel.include = babel.include.concat(getWorkspaces(from).map((directory: string) => path.resolve(directory)));

  return config;
}