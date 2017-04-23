# Yaga - leaflet-ng2

[![Build Status](https://travis-ci.org/yagajs/leaflet-ng2.svg?branch=develop)](https://travis-ci.org/yagajs/leaflet-ng2)
[![Coverage Status](https://coveralls.io/repos/github/yagajs/leaflet-ng2/badge.svg?branch=develop)](https://coveralls.io/github/yagajs/leaflet-ng2?branch=develop)

Angular 2 module for Leaflet. This module serves components and
directives for [Leaflet](http://leafletjs.com/) in
[Angular2](https://angular.io/).

*Note: This is just a release candidate!*

## Links

* [YAGA-Website](https://yagajs.org)
* [Project-Website](https://leaflet-ng2.yagajs.org)
* [Unit-Tests](https://leaflet-ng2.yagajs.org/1.0.0-rc2/browser-test/)
* [Test-Coverage](https://leaflet-ng2.yagajs.org/1.0.0-rc2/coverage/)
* [API-Documentation](https://leaflet-ng2.yagajs.org/1.0.0-rc2/typedoc/)
* [GitHub](https://github.com/yagajs/leaflet-ng2)
* [NPM](https://www.npmjs.com/package/@yaga/leaflet-ng2)


## How to use

First you have to install this library from npm:

```bash
npm install --save @yaga/leaflet-ng2
```

This module works like a normal angular 2 module. You should do something like that:

```typescript
import { YagaModule, OSM_TILE_LAYER_URL }   from '@yaga/leaflet-ng2';
import { Component, NgModule, PlatformRef } from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { platformBrowserDynamic }           from '@angular/platform-browser-dynamic';

const platform: PlatformRef = platformBrowserDynamic();

@Component({
    selector: 'app',
    template: `<yaga-map><yaga-tile-layer [(url)]="tileLayerUrl"></yaga-tile-layer></yaga-map>`
})
export class AppComponent {
    // Your logic here, like:
    public tileLayerUrl: string = OSM_TILE_LAYER_URL;
}

@NgModule({
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent ],
    imports:      [ BrowserModule, YagaModule ]
})
export class AppModule { }

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});
```

*Do not forget to import the leaflet css!*

After that you should be able to use the following directives or components:

* `yaga-map` *This must be the root component!*
* `yaga-attribution-control`
* `yaga-circle`
* `yaga-circle-marker`
* `yaga-div-icon`
* `yaga-geojson`
* `yaga-icon`
* `yaga-image-overlay`
* `yaga-marker`
* `yaga-polygon`
* `yaga-polyline`
* `yaga-popup`
* `yaga-rectangle`
* `yaga-scale-control`
* `yaga-tile-layer`
* `yaga-tooltip`
* `yaga-zoom-control`

For further information look at the [examples](https://leaflet-ng2.yagajs.org/1.0.0-rc2/examples/)


## Scripts Tasks

Scripts registered in package.json:

* `init`: Install all stuff needed for development (Typings, libs etc.)
* `clean`: Remove the stuff from init-task
* `reinit`: Call clean and init
* `transpile`: Transpile TypeScript Code to JavaScript
* `lint`: Use the linter for TypeScript Code
* `npm-lint`: Lint the npm-package
* `test`: Run software- and coverage-tests in node.
* `browser-test`: Build the tests for the browser.
* `build-examples`: Build the examples.
* `doc`: Build the API documentation.
* `dependency-check`: Check for outdated dependencies.
