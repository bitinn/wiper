
/**
 * wiper.js
 */

var chokidar = require('chokidar');
var livereload = require('tiny-lr');
var fs = require('fs');
var debug = require('debug')('wiper');
var log = debug;

module.exports = Wiper;

/**
 * Watch for file changes and refresh your browser tabs
 *
 * @param   Object  opts  Options
 * @return  Void
 */
function Wiper(opts) {

	opts = opts || {};

	if (opts.w) {
		opts.w = opts.w.split(',');
	} else {
		opts.w = ['**/*.js', '**/*.css'];
	}

	if (!opts.p) {
		opts.p = 35729;
	}

	if (opts.q) {
		log = function() {};
	}

	this.opts = opts;

};

/**
 * Start the livereload server and watch files
 *
 * @param   Function  cb  Callback
 * @return  Void
 */
Wiper.prototype.run = function(cb) {

	var self = this;
	var opts = this.opts;

	if (opts.cert && opts.key) {
		this.server = livereload({
			key: fs.readFileSync(opts.key)
			, cert: fs.readFileSync(opts.cert)
		});
		log('livereload on https');
	} else {
		this.server = livereload();
		log('livereload on http');
	}

	this.server.listen(opts.p, function() {
		log('livereload server started on port: ' + opts.p);

		var list = opts.w;
		list.push('!node_modules/**');

		self.watcher = chokidar.watch(list);
		log('started watching files: ' + opts.w.join(', '));

		self.watcher.on('all', function(event, file) {
			log(file + ' was ' + event);
			
			self.server.changed({
				body: {
					files: file
				}
			});
		});

		if (cb) {
			cb();
		}
	});

	this.server.server.removeAllListeners('error');
	this.server.server.on('error', function(err) {
		if (err.code === 'EADDRINUSE') {
			console.error('port: ' + opts.p + ' is not available');
			self.server.close();

			if (self.watcher) {
				self.watcher.close();
			}
			process.exit(1);
		} else {
			console.error(err);
		}
	});
};
