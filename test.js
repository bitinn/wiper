
// test tools
var chai = require('chai');
var expect = chai.expect;

var Chokidar = require('chokidar').FSWatcher;
var TinyLR = require('tiny-lr').Server;

// test subject
var Wiper = require('./lib/wiper');

describe('wiper', function() {

	it('should setup default options', function() {
		var w = new Wiper();
		expect(w.opts.w).to.deep.equal(['**/*.js', '**/*.css']);
		expect(w.opts.p).to.equal(35729);
		expect(w.opts.q).to.be.undefined;
	});

	it('should setup custom options', function() {
		var w = new Wiper({ w: 'a,b', p: 1234, q: true, cert: 'ssl.crt', key: 'ssl.key' });
		expect(w.opts.w).to.deep.equal(['a', 'b']);
		expect(w.opts.p).to.equal(1234);
		expect(w.opts.q).to.be.true;
		expect(w.opts.cert).to.equal('ssl.crt');
		expect(w.opts.key).to.equal('ssl.key');
	});

	it('should setup livereload server and watch files', function(done) {
		var w = new Wiper({ p: 1234, w: 'a' });
		w.run(function() {
			expect(w.server.port).to.equal(1234);
			expect(w.server).to.be.instanceof(TinyLR);
			expect(w.watcher).to.be.instanceof(Chokidar);
			done();
		});
	});

});
