let {exec} = require('child_process');

function read(file) {
  return new Promise((resolve, reject) => {
    exec(
      `set -o allexport; source ${file}; node -e "console.log(JSON.stringify(process.env))"`, 
      {shell: '/bin/bash'},
      (error, stdout, stderr) => {
        if( error ) reject(error);
        else resolve(JSON.parse(stdout));
      }
    )
  });
}

module.exports = read;