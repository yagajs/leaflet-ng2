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
<example-header [title]="'Div-Icon-Directive'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map>
      <yaga-marker [draggable]="true" [lat]="0" [lng]="0">
        <yaga-div-icon
          (update)="handleEvent('update', $event)"
        
          [iconSize]="getInputPropertyByName('iconSize').value"
          [iconAnchor]="getInputPropertyByName('iconAnchor').value"
          [popupAnchor]="getInputPropertyByName('popupAnchor').value"
        >
          <p>{{ getInputPropertyByName('content').value }}</p>
        </yaga-div-icon>
        <yaga-popup>
          Any popup content
        </yaga-popup>
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
            {name: 'content', value: 'Some content...', type: 'text' },
            {name: 'iconSize', value: new Point(90, 20), type: 'point' },
            {name: 'iconAnchor', value: new Point(0, 0), type: 'point' },
            {name: 'popupAnchor', value: new Point(0, 0), type: 'point' },
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
