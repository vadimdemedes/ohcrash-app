Follow these steps to configure your JavaScript application to use OhCrash:

### 1. Install OhCrash client

[OhCrash client](https://github.com/vdemedes/ohcrash) works in both Node.js and browser environments.

It is open-source and available on <a href="https://github.com/vdemedes/ohcrash">GitHub</a>.
You can also check out [documentation](/docs) to read more about additional features,
like manual error reporting and GitHub labels for opened issues.

```
$ npm install ohcrash --save
```

### 2. Initialize client with your API key

Use the following code to initialize OhCrash client (API key for this project is already filled in):

```
require('ohcrash')('your api key');
```

### 3. Watch your repository for new issues

As soon as new errors are reported from your application, OhCrash opens new issue for each unique error.
Happy bug-fixing!
