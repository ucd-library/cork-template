const yaml = require('js-yaml');
const fs = require('fs');

function read(file) {
  return yaml.load(fs.readFileSync(file, 'utf8'));
}

module.exports = read;