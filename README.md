
wiper
=====

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

A command line tool that [gaze](https://github.com/shama/gaze) at your file changes and do a [tiny-lr](https://github.com/mklabs/tiny-lr) when needed (compatible with both node.js and io.js).


# Motivation

Demonstrate just how easy it is to extend a livereload server with file watcher capability.


# Install

`npm install wiper --save-dev` or `npm install -g wiper`


# Usage

In your `package.json`, add this script

```json
{
	"scripts": {
		"watch": "DEBUG=wiper wiper -p 1234 -w **/*.js,**/*.css"
	}
}
```

Now try `npm run watch`, a livereload server will be running at `localhost:1234` and watching your updates to javascript/css files.

To integrate with your koa/express server, use modules like [koa-livereload](https://github.com/yosuke-furukawa/koa-livereload) or [connect-livereload](https://github.com/intesso/connect-livereload).

```javascript
app.use(livereload({
	port : 1234
}));
```

Or manually insert this line onto your template.

```html
<script src="//localhost:1234/livereload.js?snipver=1"></script>
```

Now your browsers will be refreshed automatically when file change occurs. And see, no `grunt` or `gulp` needed, just good-old `npm`.


# License

MIT

[npm-image]: https://img.shields.io/npm/v/wiper.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/wiper
[travis-image]: https://img.shields.io/travis/bitinn/wiper.svg?style=flat-square
[travis-url]: https://travis-ci.org/bitinn/wiper
