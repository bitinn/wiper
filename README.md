
wiper
=====

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

A command line tool that `gaze` at your file changes and do a `tiny-lr` when needed.


# Motivation

Demonstrate just how easy it is to extend a livereload server with file watcher capability.


# Install

`npm install wiper --save-dev`


# Usage

In your `package.json`, add this script

```
"scripts": {
	"watch": "wiper -p 1234 -w **/*.js"
}
```

Now try `npm run watch`, a livereload server will be running at `localhost:1234` and watching your updates to javascript files.

To integrate with your koa/express server, use modules like `koa-livereload` or `connect-livereload`;

```
app.use(livereload({
	port : 1234
}));
```

or manually insert this into your template.

```
<script src="//localhost:1234/livereload.js"></script>
```

Now your browsers will be refreshed automatically. And see, no `grunt` or `gulp` needed.


# License

MIT

[npm-image]: https://img.shields.io/npm/v/wiper.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/wiper
[travis-image]: https://img.shields.io/travis/bitinn/wiper.svg?style=flat-square
[travis-url]: https://travis-ci.org/bitinn/wiper
