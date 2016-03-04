# Getting Started

Welcome to OhCrash API documentation! This is a guide for you to set up OhCrash for your application.
There's also an [Advanced Zone](#advanced-zone) for developers, who'd like to customize OhCrash client's behavior and
also send custom errors.

<img src="/images/ohcrash-lego.png" class="w400 mt6 mb6 block mx-auto" />

## Installation

OhCrash client is a universal module, the same code works in Node.js and browsers.
Use npm to install it:

```
$ npm install ohcrash --save
```


## Usage

Log in to [OhCrash](https://ohcrash.com) and [create a new project](https://ohcrash.com/projects/new).
Copy your API key and use it to initialize an OhCrash client:

```js
require('ohcrash')('your api key');
```

By default, OhCrash handles:

- [uncaught exceptions](#uncaught-exceptions) (Node.js only)
- [unhandled rejections](#unhandled-rejections) (Node.js only)
- [global errors handled via `window.onerror`](#errors-in-browsers) (Browsers only)

You can customize this behavior via [API](#advanced-zone).


# Advanced Zone

## Configuration

OhCrash requires API key to be present, when you initialize it:

```js
require('ohcrash')('api key');
```

It also accepts `options` object as a second argument, which can customize OhCrash's behavior.
Here's the overview of all available options with their default values:

```js
require('ohcrash')('api key', {
	// automatically catch uncaught exceptions (Node.js only)
	uncaughtExceptions: true,

	// exit after uncaught exception is reported
	exit: true,

	// automatically catch unhandled rejections (Node.js only)
	unhandledRejections: true,

	// handle window.onerror (Browsers only)
	windowOnError: true,

	// set a different server endpoint for sending errors
	endpoint: 'https://api.ohcrash.com/v1'
});
```


## Uncaught exceptions

OhCrash automatically catches [uncaught exceptions](https://nodejs.org/dist/latest-v5.x/docs/api/process.html#process_event_uncaughtexception).
To turn off handling of uncaught exceptions:

```js
require('ohcrash')('api key', {
	uncaughtExceptions: false
});
```

By default, process will exit with `1` exit code after uncaught exception is reported to ohcrash.
Exit can be prevented by setting `exit` option to `false`:

```js
require('ohcrash')('api key', {
	exit: false
});
```

If there are other listeners for `uncaughtException` event, `process.exit()` will not be called, even if `exit` is set to `true`.
In that case, OhCrash assumes other listeners will handle the exit.


## Unhandled rejections

OhCrash also catches [unhandled rejections](https://nodejs.org/dist/latest-v5.x/docs/api/process.html#process_event_unhandledrejection) by default. To turn it off:

```js
require('ohcrash')('api key', {
	unhandledRejections: false
});
```

Unlike with uncaught exceptions, process **will not** exit after unhandled rejection.


## Errors in browsers

In browsers, OhCrash sets `window.onerror` function to receive global errors.
To turn it off:

```js
require('ohcrash')('api key', {
	windowOnError: false
});
```

If `window.onerror` already contained a function before OhCrash initialized,
OhCrash will call it manually to allow multiple listeners.


## Reporting errors

It is also possible to report errors manually to OhCrash using `report(err)` function:

```js
var OhCrash = require('ohcrash')('api key');

var err = new Error('I know this error');
OhCrash.report(err).then(function () {
	// error reported
});
```

Errors can also have GitHub issue labels assigned to them:

```js
OhCrash.report(err, ['priority', 'bug', 'help wanted']);
```

Or you can assign whatever properties you want.
For example, you may assign a user's email, who got affected by this error:

```js
OhCrash.report(err, {
	user: 'john@doe.com'
});
```

If you want both labels and custom data:

```js
OhCrash.report(err, {
	labels: ['priority', 'bug', 'help wanted'],
	user: 'john@doe.com'
});
```

### Have more questions?

Ask the creator of OhCrash any question by [opening a new issue](https://github.com/vdemedes/ohcrash-app/issues/new) on GitHub.
