
/**
 * wiper.js
 */

var watch = require('gaze');
var livereload = require('tiny-lr');
var log = console.log;

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

	this.server = livereload();
	this.server.listen(opts.p, function() {
		log('livereload server started on port: ' + opts.p);

		var list = opts.w;
		list.push('!node_modules/**');

		self.watcher = watch(list, function(err, watcher) {
			log('started watching files: ' + opts.w.join(', '));

			this.on('all', function(event, file) {
				var file = file.replace(process.cwd(), '');
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
	});

	this.server.server.removeAllListeners('error');
	this.server.server.on('error', function(err) {
		if (err.code === 'EADDRINUSE') {
			log('port: ' + opts.p + ' is not available');
			self.server.close();

			if (self.watcher) {
				self.watcher.close();
			}
		}
	});
};
