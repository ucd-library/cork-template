let {exec} = require('child_process');
const render = require('../render');

function read(file, data) {
  file = render(file, data);
  return new Promise((resolve, reject) => {
    exec(
      `set -o allexport; source<<<EOF ${file}\nEOF; node -e "console.log(JSON.stringify(process.env))"`, 
      {shell: '/bin/bash'},
      (error, stdout, stderr) => {
        if( error ) reject(error);
        else resolve(JSON.parse(stdout));
      }
    )
  });
}

module.exports = read;