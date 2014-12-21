es6-npm-boilerplate
===

Boilerplate for authoring in ES6 and publishing in ES5. Includes unit tests with [Jest](http://facebook.github.io/jest/) which are themselves authored in ES6.


## Why Publish in ES5?

The benefits of authoring in ES6 are self-evident. But as explained by [Brian LeRoux](https://twitter.com/brianleroux) in [ES6 Modules: The End of Civilization As We Know It?](https://medium.com/@brianleroux/es6-modules-amd-and-commonjs-c1acefbe6fc0), when publishing JavaScript code, there's no guarantee that your consumer will be using an ES6-supported environment. If you don't publish ES5 source, then, you're putting the onus on them to run your build step--and odds are, they won't be up for it.

To quote Brian:

> The only realistic assumption is the target runtime will be ES5 compatible.

## Functionality

Transpilation is handled by the [6to5](https://6to5.org) module. Specifically, the entire `src` directory is compiled into the `dist` directory, as outlined in the package.json's `prepublish` script:

```
6to5 --modules common src --out-dir dist"
```

As the `prepublish` script is run by default whenever you publish to npm, you (as the author) never have to worry about transpiling.

In addition, we point the package.json to `dist/index.js` (to make sure that `require('es6-npm-boilerplate')` loads the ES5 source) with this line:

```
{
  ...
  "main": "dist/index.js",
  ...
}
```

### Unit Tests

Unit tests are configured to pass all source through `__tests__/jest.conf.js`, which again runs [6to5](https://6to5.org). The configuration file is kept in the `__tests__` directory to reduce clutter. This preprocessing step is handled with this portion of the package.json:

```
{
  ...
  "jest": {
    "scriptPreprocessor": "__tests__/jest.conf.js",
    "testPathIgnorePatterns": [
      "/node_modules/",
      "./__tests__/jest.conf.js"
    ]
  },
  ...
}
```

The ability to author your tests in ES6 and run them without an additional build step makes for a pretty remarkable experience.

### What Gets Published?

Only the `dist` directory, package.json, and README are published to npm, as these are the only relevant parts of the codebase in the eyes of a consumer. This behavior is enforced by the `.npmignore` file, which reads as follows:

```
__tests__
src
```

**Even if you choose to include these directories, you should _still_ add an empty `.npmignore` to your repository**. Otherwise, npm will default to a `.npmignore` that includes `dist` and thus the compiled ES5 code won't be published.

## License

MIT.
