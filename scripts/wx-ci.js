/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */
const ci = require('miniprogram-ci');
const fs = require('fs');

const { version } = require('../package.json');
const config = require('../project.config.json');

const { appid } = config;
const [action = 'preview', env = 'SIT'] = process.argv.splice(2);

if (!fs.existsSync('./wx-ci-private.key')) {
  console.log(
    'private.key not found, please visit https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html for more information'
  );
  return false;
}

if (!appid) {
  console.log('missing value in project.config.json: appid');
  return false;
}

const project = new ci.Project({
  appid,
  type: 'miniProgram',
  projectPath: './',
  privateKeyPath: './wx-ci-private.key',
  ignores: ['node_modules/**/*'],
});

const defaultConfig = {
  project,
  desc: `[${env}] CI MP Deploy ${action}`,
  setting: {
    es6: true,
    minify: true,
  },
  onProgressUpdate: console.log,
};

const uploadRobot = {
  SIT: 1,
  UAT: 2,
  HOTFIX: 3,
  PROD: 4,
};

const previewConfig = {
  ...defaultConfig,
  qrcodeFormat: 'terminal',
  qrcodeOutputDest: '',
  pagePath: 'pages/tabs/home',
  searchQuery: '',
  robot: uploadRobot[env],
};

const uploadConfig = {
  ...defaultConfig,
  version,
  robot: uploadRobot[env],
};

(async () => {
  if (action === 'upload') {
    await ci.upload(uploadConfig);
    console.log('Experience version deployed');
  } else {
    await ci.preview(previewConfig);
    console.log('Development version deployed');
  }
})();
