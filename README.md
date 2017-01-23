# Yaga - leaflet-ng2

[![Build Status](https://travis-ci.org/yagajs/leaflet-ng2.svg?branch=develop)](https://travis-ci.org/yagajs/leaflet-ng2)
[![Coverage Status](https://coveralls.io/repos/github/yagajs/leaflet-ng2/badge.svg?branch=develop)](https://coveralls.io/github/yagajs/leaflet-ng2?branch=develop)

Angular 2 module for Leaflet. This module serves components and
directives for [Leaflet](http://leafletjs.com/) in
[Angular2](https://angular.io/).

## Scripts Tasks

Scripts registered in package.json:

* `init`: Install all stuff needed for development (Typings, libs etc.)
* `clean`: Remove the stuff from init-task
* `reinit`: Call clean and init
* `transpile`: Transpile TypeScript Code to JavaScript
* `lint`: Use the linter for TypeScript Code
* `npm-lint`: Lint the npm-package
* `test`: Run software- and coverage-tests in node.
* `dist`: Make this module ready for publishing
* `browser-test`: Build the tests for the browser
