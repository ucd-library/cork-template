async function read(file) {
  return import(file);
}
module.exports = read;