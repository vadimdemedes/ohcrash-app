'use strict';

/**
 * Dependencies
 */

const rework = require('rework');
const myth = require('myth');
const npm = require('rework-npm');
const fs = require('fs');


/**
 * Build stylesheets
 */

let source = fs.readFileSync(process.argv.pop(), 'utf8');

process.chdir(__dirname + '/styles');

let output = rework(source, { source: 'app.css' })
	.use(npm())
	.use(myth())
	.toString();

console.log(output);
