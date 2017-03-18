// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, PlatformRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<yaga-map [lat]="48.5768558" [lng]="13.268283" [zoom]="11">
  <yaga-tile-layer [url]="'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'" [attribution]="'© OpenStreetMap-Mitwirkende'"></yaga-tile-layer>
</yaga-map>
`;
/* tslint:enable */

@Component({
    selector: 'app',
    template
})
export class AppComponent {}

@NgModule({
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent ],
    imports:      [ BrowserModule, FormsModule, YagaModule ]
})
export class AppModule { }

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});
