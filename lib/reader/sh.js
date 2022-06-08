let {exec} = require('child_process');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const render = require('../render');

function read(file, data) {
  let contents = render(file, data);
  // create temp file in same folder, creates best compatibility
  let tmpFile = path.resolve(path.parse(file).dir, uuid.v4());
  fs.writeFileSync(tmpFile, contents);

  return new Promise((resolve, reject) => {
    exec(
      `set -o allexport; source ${tmpFile} > /dev/null 2>&1 ; node -e "console.log(JSON.stringify(process.env))"`, 
      // `set -o allexport; source <<<EOF ${file}\nEOF ; node -e "console.log(JSON.stringify(process.env))"`, 
      {shell: '/bin/bash'},
      (error, stdout, stderr) => {
        fs.unlinkSync(tmpFile);

        if( error ) reject(error);
        else resolve(JSON.parse(stdout));
      }
    )
  });
}

module.exports = read;