// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, PlatformRef } from '@angular/core';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Point } from 'leaflet';

import { ExampleAppComponentBlueprint, IExampleProperties } from '../app-component-blueprint';
import { ExamplePropertiesModule, PROPERTIES_WRAPPER } from '../property.component';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<example-header [title]="'Icon-Directive'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map>
      <yaga-marker [draggable]="true" [lat]="0" [lng]="0">
        <yaga-icon
          (update)="handleEvent('update', $event)"
          
          [iconUrl]="getInputPropertyByName('iconUrl').value"
          [iconSize]="getInputPropertyByName('iconSize').value"
          [iconAnchor]="getInputPropertyByName('iconAnchor').value"
          [popupAnchor]="getInputPropertyByName('popupAnchor').value"
          [shadowUrl]="getInputPropertyByName('shadowUrl').value"
          [shadowSize]="getInputPropertyByName('shadowSize').value"
          [shadowAnchor]="getInputPropertyByName('shadowAnchor').value"
        
        ></yaga-icon>
      </yaga-marker>
      <yaga-tile-layer [url]="'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'"></yaga-tile-layer>
    </yaga-map>
  </div>
  ${ PROPERTIES_WRAPPER }
</div><!-- /.container -->
<example-footer></example-footer>

`;
/* tslint:enable */

/* tslint:disable:max-classes-per-file */
@Component({
    selector: 'app',
    template,
})
export class AppComponent extends ExampleAppComponentBlueprint {
    public properties: IExampleProperties = {
        duplex: [],
        input: [
            {name: 'iconUrl', value: 'http://leafletjs.com/examples/custom-icons/leaf-green.png', type: 'text' },
            {name: 'iconSize', value: new Point(38, 95), type: 'point' },
            {name: 'iconAnchor', value: new Point(22, 94), type: 'point' },
            {name: 'popupAnchor', value: new Point(-3, -76), type: 'point' },
            {name: 'shadowUrl', value: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png', type: 'text' },
            {name: 'shadowSize', value: new Point(50, 64), type: 'point' },
            {name: 'shadowAnchor', value: new Point(4, 62), type: 'point' },
        ],
        output: [
            {name: 'update', value: '', type: 'event' },
        ],
    };
}

@NgModule({
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent ],
    imports:      [ BrowserModule, FormsModule, YagaModule, ExamplePropertiesModule ],
})
export class AppModule { }

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});
