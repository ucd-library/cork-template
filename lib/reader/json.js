const fs = require('fs');

function read(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}
module.exports = read;