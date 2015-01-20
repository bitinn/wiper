#!/usr/bin/env node

/**
 * index.js
 *
 * A command line tool that gaze at your file changes and do a tiny-lr when needed
 */

var watch = require('gaze');
var livereload = require('tiny-lr');

// command line mode
if (!module.parent) {
	wiper();
}

/**
 * Watch for file changes and refresh your browser tabs
 *
 * @return  Void
 */
function wiper() {



};
