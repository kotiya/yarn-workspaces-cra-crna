import findRoot from 'find-root';
import fs from 'fs-extra';
import path from 'path';

const link = (name: string, fromBase: string, toBase: string): void => {
  const from: string = path.join(fromBase, 'node_modules', name);
  const to: string = path.join(toBase, 'node_modules', name);

  if (fs.existsSync(to)) {
    fs.removeSync(to);
  }

  fs.symlinkSync(from, to, 'dir');
};

export default function makeSymlinks(from: string): void {
  const root: string = findRoot(from, (dir: string) => {
    const pkg: string = path.join(dir, 'package.json');
    return fs.existsSync(pkg) && 'workspaces' in require(pkg);
  });

  link('expo', root, from);
  link('react-native', root, from);
};