const emoji = require('node-emoji');
const chalk = require('chalk');
const fs = require('fs-extra');
const packageJsonHelper = require('../../utils/packageJsonHelper');
const spawn = require('../../utils/spawnHelper');

const { loadPackageJsonFromPath, savePackageJsonIn } = packageJsonHelper;

const question = {
  name: 'redux',
  type: 'confirm',
  message: 'Would you like to include redux?',
};

const installPackagesSuccess = (cwd, folderName) =>
  loadPackageJsonFromPath(`${cwd}/${folderName}/package.json`)
    .then(data =>
      savePackageJsonIn(`${cwd}/${folderName}/package.json`, data));

const addRedux = (cwd, folderName) => {
  const reduxDependencies = [
    'redux',
    'react-redux',
  ];

  const command = `npm i ${reduxDependencies.join(' ')} --save-dev`;

  const terminalOpts = {
    cwd: `${cwd}/${folderName}`,
    shell: true,
    stdio: 'inherit',
  };

  return spawn(command, [], terminalOpts)
    .then(() => installPackagesSuccess(cwd, folderName));
};

const func = (cwd, folderName) => {
  console.log('\n\n');
  console.log(`${emoji.get('fire')}  ${chalk.cyan('Installing redux')} ${emoji.get('fire')}`);
  console.log('\n\n');

  return addRedux(cwd, folderName)
    .then(() => fs.copy(`${__dirname}/reducer.js`, `${cwd}/${folderName}/src/reducer.js`))
    .then(() => fs.copy(`${__dirname}/store.js`, `${cwd}/${folderName}/src/store.js`));
};

const action = {
  type: 'redux',
  func,
};

module.exports = {
  action,
  question,
};
