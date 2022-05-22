const handlebars = require('handlebars');
const fs = require('fs');

function render(templateFile, data) {
  let template = handlebars.compile(
    fs.readFileSync(templateFile, 'utf-8')
  );

  return template(data);
}

module.exports = render;