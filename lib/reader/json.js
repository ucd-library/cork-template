const render = require('../render');

function read(file, data) {
  return JSON.parse(render(file, data));
}
module.exports = read;