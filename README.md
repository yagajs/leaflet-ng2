# YAGA - leaflet-ng2

[![Build Status](https://travis-ci.org/yagajs/leaflet-ng2.svg?branch=develop)](https://travis-ci.org/yagajs/leaflet-ng2)
[![Coverage Status](https://coveralls.io/repos/github/yagajs/leaflet-ng2/badge.svg?branch=develop)](https://coveralls.io/github/yagajs/leaflet-ng2?branch=develop)


![](https://angular.io/resources/images/logos/angular2/angular.png)
![](https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Leaflet_logo.svg/640px-Leaflet_logo.svg.png)

Angular 2 module for Leaflet. This module serves components and
directives for [Leaflet](http://leafletjs.com/) in [Angular2](https://angular.io/).

*Note: This is just a release candidate! Some TypeScript tyings are self written
and have to be merged to DefinitlyTyped.*

## Content

- [How to use]()
- [1 Installing]()
- [2 Prepairing]()
- [2.1 Prepair the app.module.ts]()
- [2.2 Prepair the app.component.html]()
- [List of YAGA leaflet-ng2 components and directives]()
- [NPM script tasks]()
- [Links]()
- [License]()


##  How to use

### 1 Installing

1.1 Installing Angular-CLI

```bash
npm install -g angular-cli
```

1.2 Generating a YAGA leaflet-ng2 app project

```bash
ng new my-yaga-app
```

1.3 Go into your project folder

```bash
cd my-yaga-project
```

1.4 Installing YAGA leaflet-ng2
```bash
npm install --save @yaga/leaflet-ng2
```

### 2 Prepairing

#### 2.1 Prepair the app.module.ts

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
```

2.) Add the following line here: 

>```typescript
>import { YagaModule } from '@yaga/leaflet-ng2';**
>```


```typescript
import { YagaModule } from '@yaga/leaflet-ng2';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
```
3.) Add the following line here:

>```typescript
>YagaModule
>```

```typescript
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 2.2 Prepair the app.component.html

2.1 Set a title

```html
<h1>
  {{title}}
</h1>
```
2.2 Add the YAGA map (The YAGA map must be the root component!)
```html
<h1>
  {{title}}
</h1>

<yaga-map>
</yaga-map>
```

2.3 Add some YAGA components or directives you want to use (e.g. a tile layer)
```html
<yaga-map>
  <yaga-tile-layer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></yaga-tile-layer>
</yaga-map>
```

#### 2.4 Define a map height
```css
yaga-map {
  min-height: 300px;
}
```
#### 2.5 Don't forget to get the original leaflet.css stylesheet, if you want to use the original stylesheet!

The leaflet.css you can find on the [leaflet-webpage](http://leafletjs.com/).

## List of YAGA leaflet-ng2 components and directives

* `yaga-map` *(This must be the root component!)*
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

For further information look at the [examples](https://leaflet-ng2.yagajs.org/latest/examples/)


## NPM script tasks

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

## Links

* [YAGA-Website](https://yagajs.org)
* [Project-Website](https://leaflet-ng2.yagajs.org)
* [Unit-Tests](https://leaflet-ng2.yagajs.org/1.0.0-rc2/browser-test/)
* [Test-Coverage](https://leaflet-ng2.yagajs.org/1.0.0-rc2/coverage/)
* [API-Documentation](https://leaflet-ng2.yagajs.org/1.0.0-rc2/typedoc/)
* [GitHub](https://github.com/yagajs/leaflet-ng2)
* [NPM](https://www.npmjs.com/package/@yaga/leaflet-ng2)


## License

YAGA leaflet-ng2 ISC [license]](https://github.com/yagajs/leaflet-ng2/blob/develop/LICENSE).
