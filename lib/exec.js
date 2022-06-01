const fs = require('fs-extra');
const path = require('path');
const reader = require('./reader');
const render = require('./render');

async function exec(configFiles, templateFile, outputFile) {
  let data = {};
  for( let i = 0; i < configFiles.length; i++ ) {
    data = Object.assign(data, await reader(configFiles[i], data));
  }

  await fs.mkdirp(path.parse(outputFile).dir);

  fs.writeFileSync(outputFile, render(templateFile, data));
}

module.exports = exec;