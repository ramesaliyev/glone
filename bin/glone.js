#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const cwd = process.cwd();
const argv = process.argv.slice(2);

const log = console.log.bind(null, '\x1b[32m%s\x1b[0m', '[glone]');
const run = com => execSync(com, {cwd, stdio: [0, 1, 2]});

const [args, cloneArgs = ''] = argv.join(' ').split('--');
const [repo, dir = ''] = args.split(' ');

log('Cloning repository...');

run(`git clone ${repo} ${dir} ${cloneArgs}`);

const repoPath = path.resolve(cwd, dir ? dir : repo.match(/.+\/(.+?)\/?\.git/)[1]);
const configPath = path.resolve(repoPath, '.glone');

if (fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath));

  if (config.install) {
    const installFile = path.resolve(repoPath, config.install);
    log('Install file found, running...');

    run(`chmod +x ${installFile}`);
    run(`${installFile}`);
    run(`chmod -x ${installFile}`);

    log('Install completed.')
  }

  if (config.hooks) {
    log('Hooks configurations found, running...');

    const hookNames = Object.keys(config.hooks);
    hookNames.forEach((name, index) => {
      log(`${index+1}/${hookNames.length} Installing "${name}" hook...`);

      const source = path.resolve(repoPath, config.hooks[name]);
      const target = path.resolve(repoPath, '.git/hooks', name);

      fs.copyFileSync(source, target);
      run(`chmod +x ${target}`);
    });

    log('Hooks configurations completed.')
  }
}