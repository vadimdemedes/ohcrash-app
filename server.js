'use strict';

/**
 * Dependencies
 */

const serve = require('koa-static');
const join = require('path').join;
const koa = require('koa');


/**
 * Server
 */

const app = koa();
const path = process.argv[2];

app.use(function * () {
	if (/\.[a-z]{2,4}$/.test(this.url)) {
		yield serve(join(__dirname, path));
		return;
	}

	this.url = '/';
	yield serve(join(__dirname, path));
});

app.listen(process.env.PORT || 3000);
