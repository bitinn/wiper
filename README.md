
wiper
=====

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

A command line tool that [watch](https://github.com/paulmillr/chokidar) file changes and do a [livereload](https://github.com/mklabs/tiny-lr) when needed (compatible with both node.js and io.js), and works over https.


# Motivation

This allows us to use `npm` as our build tool instead of `grunt` or `gulp`.


# Install

`npm install wiper --save-dev` or `npm install -g wiper`


# Usage

In your `package.json`, add these lines.

```json
{
	"scripts": {
		"watch": "DEBUG=wiper wiper -p 1234 -t 2000 -w \\*\\*/\\*.js,\\*\\*/\\*.css"
	}
}
```

Now try `npm run watch`, a livereload server will be running at `localhost:1234` and watching updates to javascript/css files.


## Options

- `-p` port to listen on, default to 35729.
- `-t` debounce timeout, default to 5000ms.
- `-w` files to watch; note that you should use `\*` to prevent bash from expanding globs, as we want wiper to expand it instead, also see that we double escape `\\*` in package.json due to additional string escapes.
- `--cert=ssl.crt` and `--key=ssl.key` to start livereload server on https, generate your self-signed certificate and import them into your CA trust store for this to work.


## Integration

To integrate with your koa/express server, use modules like [koa-livereload](https://github.com/yosuke-furukawa/koa-livereload) or [connect-livereload](https://github.com/intesso/connect-livereload).

```javascript
// for http
app.use(livereload({
	port: 1234
}));

// for https
app.use(livereload({
	src: 'https://example.com:1234/livereload.js?snipver=1'
}));
```

Or manually insert this line onto your template.

```html
<script src="http://localhost:1234/livereload.js?snipver=1"></script>
```

Now your browsers will be refreshed automatically when file change occurs. And see, no `grunt` or `gulp` needed, just good-old `npm`.


# License

MIT

[npm-image]: https://img.shields.io/npm/v/wiper.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/wiper
[travis-image]: https://img.shields.io/travis/bitinn/wiper.svg?style=flat-square
[travis-url]: https://travis-ci.org/bitinn/wiper
