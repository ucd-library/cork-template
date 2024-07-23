#!/usr/bin/env node

const { program } = require('commander');
const version = require('../package.json').version;
const path = require('path');
const fs = require('fs');
const exec = require('../lib/exec');

function resolve(file) {
  if( !path.isAbsolute(file) ) {
    return path.resolve(process.cwd(), file);
  }
  return file;
}

program
  .name('cork-template')
  .version(version)
  .requiredOption('-t, --template-file <template-file>', 'Handlebars template to render')
  .option('-o, --output-file <output-file>', 'output file, defaults to current directory')
  .option('-d, --output-directory <output-directory>', 'output directory, use template filename')
  .requiredOption('-c, --config-files <config-files...>', 'input config files to render.  can be .sh, .yaml, .json or .js')
  .action((opts, cmd) => {
    opts.templateFile = resolve(opts.templateFile);
    opts.configFiles = opts.configFiles.map(file => resolve(file));
    if( opts.outputFile ) resolve(opts.outputFile);
    else if( opts.outputDirectory ) opts.outputFile = path.resolve(resolve(opts.outputDirectory), path.parse(opts.templateFile).base);
    else opts.outputFile = path.resolve(process.cwd(), path.parse(opts.templateFile).base);

    if( fs.statSync(opts.templateFile).isDirectory() ) {

      if( !fs.existsSync(opts.outputFile) ) {
        fs.mkdirSync(opts.outputFile, { recursive: true });
      } else if( !fs.statSync(opts.outputFile).isDirectory() ) {
        throw new Error('Output file must be a directory if template file is a directory');
      }

      console.log('Template file is a directory, rendering all files in directory')
      
      let files = fs.readdirSync(opts.templateFile);
      let dir = opts.templateFile;
      let outputDir = opts.outputFile;

      for( let file of files ) {
        if( fs.statSync(path.resolve(dir, file)).isDirectory() ) {
          continue;
        }
        console.log(' - Rendering', file);
        opts.templateFile = path.resolve(dir, file);
        opts.outputFile = path.resolve(outputDir, file);
        exec(opts.configFiles, opts.templateFile, opts.outputFile);
      }
      return;
    }
    
    exec(opts.configFiles, opts.templateFile, opts.outputFile);
  })


program.parse(process.argv);