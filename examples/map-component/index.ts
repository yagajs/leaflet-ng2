// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, PlatformRef } from '@angular/core';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ExampleAppComponentBlueprint, IExampleProperties } from '../app-component-blueprint';
import { ExamplePropertiesModule, PROPERTIES_WRAPPER } from '../property.component';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<example-header [title]="'Map-Component'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map
      [(zoom)]="getDuplexPropertyByName('zoom').value"
      [(lat)]="getDuplexPropertyByName('lat').value"
      [(lng)]="getDuplexPropertyByName('lng').value"
      [(minZoom)]="getDuplexPropertyByName('minZoom').value"
      [(maxZoom)]="getDuplexPropertyByName('maxZoom').value"

      (baselayerchange)="handleEvent('baselayerchange', $event);"
      (move)="handleEvent('move', $event);"

      (click)="handleEvent('click', $event);"
      (dblclick)="handleEvent('dblclick', $event);"
      (mousedown)="handleEvent('mousedown', $event);"
      (mouseup)="handleEvent('mouseup', $event);"
      (mouseover)="handleEvent('mouseover', $event);"
      (mouseout)="handleEvent('mouseout', $event);"
      (mousemove)="handleEvent('mousemove', $event);"
      (contextmenu)="handleEvent('contextmenu', $event);"
      (keypress)="handleEvent('keypress', $event);"
      (preclick)="handleEvent('preclick', $event);"

      [scrollWheelZoomEnabled]="getInputPropertyByName('scrollWheelZoomEnabled').value"
      [touchZoomEnabled]="getInputPropertyByName('touchZoomEnabled').value"
      [tapEnabled]="getInputPropertyByName('tapEnabled').value">
      <yaga-tile-layer [url]="'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'"></yaga-tile-layer>
    </yaga-map>
  </div>
  ${ PROPERTIES_WRAPPER }
  <div>
  </div>
</div><!-- /.container -->
<example-footer></example-footer>

`;
/* tslint:enable */

@Component({
    selector: 'app',
    template,
})
export class AppComponent extends ExampleAppComponentBlueprint {
    public properties: IExampleProperties = {
        duplex: [
            {name: 'zoom', value: 10, type: 'number' },
            {name: 'lat', value: 51, type: 'number' },
            {name: 'lng', value: 7, type: 'number' },
            {name: 'minZoom', value: 5, type: 'number' },
            {name: 'maxZoom', value: 15, type: 'number'},
        ],
        input: [
            {name: 'scrollWheelZoomEnabled', value: true, type: 'checkbox' },
            {name: 'touchZoomEnabled', value: true, type: 'checkbox' },
            {name: 'tapEnabled', value: true, type: 'checkbox' },
            ],
        output: [
            {name: 'baselayerchange', value: '', type: 'event' },
            {name: 'move', value: '', type: 'event' },
            {name: 'click', value: '', type: 'event' },
            {name: 'dblclick', value: '', type: 'event' },
            {name: 'mousedown', value: '', type: 'event' },
            {name: 'mouseup', value: '', type: 'event' },
            {name: 'mouseover', value: '', type: 'event' },
            {name: 'mouseout', value: '', type: 'event' },
            {name: 'mousemove', value: '', type: 'event' },
            {name: 'contextmenu', value: '', type: 'event' },
            {name: 'keypress', value: '', type: 'event' },
            {name: 'preclick', value: '', type: 'event' },
            ],
    };
}

/* tslint:disable:max-classes-per-file */
@NgModule({
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent ],
    imports:      [ BrowserModule, FormsModule, YagaModule, ExamplePropertiesModule ],
})
export class AppModule { }

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});
