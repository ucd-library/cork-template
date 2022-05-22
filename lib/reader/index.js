const path = require('path');

const TYPES = {
  'js' : require('./js'),
  'sh' : require('./sh'),
  'json' : require('./json'),
  'yaml' : require('./yaml')
}

function read(file, opts={}) {
  let type = opts.extOverride || (path.parse(file).ext).replace(/^\./, '');

  if( !TYPES[type] ) throw new Error('Unable to load config file with extension: '+type);
  return TYPES[type](file);
}

module.exports = read;