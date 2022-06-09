const handlebars = require('handlebars');
const fs = require('fs');

handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

function render(templateFile, data) {
  let template = handlebars.compile(
    fs.readFileSync(templateFile, 'utf-8')
  );

  return template(data);
}

module.exports = render;