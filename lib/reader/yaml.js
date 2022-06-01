const yaml = require('js-yaml');
const render = require('../render');

function read(file, data) {
  return yaml.load(render(file, data));
}

module.exports = read;