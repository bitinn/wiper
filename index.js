#!/usr/bin/env node

/**
 * index.js
 *
 * A command line tool that gaze at your file changes and do a tiny-lr when needed
 */

var opts = require('minimist')(process.argv.slice(2));
var Wiper = require('./lib/wiper');

// command line mode
if (!module.parent) {
	factory(opts);
}

function factory(opts) {
	var w = new Wiper(opts);
	w.run();
};
