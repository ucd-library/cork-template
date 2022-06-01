const render = require('../render');

async function read(file, data) {
  file = render(file, data);
  return eval(file)(data);
}
module.exports = read;