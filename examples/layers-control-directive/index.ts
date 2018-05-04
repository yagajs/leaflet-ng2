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
<example-header [title]="'Layers-Control-Directive'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map [zoom]="3">
      <yaga-layers-control

        (click)="handleEvent('click', $event);"
        (dblclick)="handleEvent('dblclick', $event);"
        (mousedown)="handleEvent('mousedown', $event);"
        (mouseup)="handleEvent('mouseup', $event);"
        (mouseover)="handleEvent('mouseover', $event);"
        (mouseout)="handleEvent('mouseout', $event);"
        (mousemove)="handleEvent('mousemove', $event);"
        (positionChange)="handleEvent('positionChange', $event);"
        (displayChange)="handleEvent('displayChange', $event);"

        [(display)]="getDuplexPropertyByName('display').value"

        [position]="getInputPropertyByName('position').value"
        [opacity]="getInputPropertyByName('opacity').value"

        >
        <yaga-tile-layer yaga-base-layer [caption]="getInputPropertyByName('caption of osm-layer').value" [url]="'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'"></yaga-tile-layer>
        <yaga-tile-layer yaga-base-layer [caption]="getInputPropertyByName('caption of otm-layer').value" [url]="'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'"></yaga-tile-layer>
        <yaga-circle-marker yaga-overlay-layer [caption]="getInputPropertyByName('caption of marker-layer').value" [lat]="51" [lng]="7"></yaga-circle-marker>
      </yaga-layers-control>
    </yaga-map>
  </div>
  ${ PROPERTIES_WRAPPER }
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
            {name: 'display', value: true, type: 'checkbox' },
        ],
        input: [
            { name: 'opacity', value: 0.8, type: 'relative' },
            {
                additional: { states: ['topleft', 'topright', 'bottomleft', 'bottomright']},
                name: 'position',
                type: 'select',
                value: 'topright',
            },
            { name: 'caption of osm-layer', value: 'OSM', type: 'text'},
            { name: 'caption of otm-layer', value: 'OTM', type: 'text'},
            { name: 'caption of marker-layer', value: 'Marker', type: 'text'},
        ],
        output: [
            {name: 'click', value: '', type: 'event' },
            {name: 'dblclick', value: '', type: 'event' },
            {name: 'mousedown', value: '', type: 'event' },
            {name: 'mouseup', value: '', type: 'event' },
            {name: 'mouseover', value: '', type: 'event' },
            {name: 'mouseout', value: '', type: 'event' },
            {name: 'mousemove', value: '', type: 'event' },
            {name: 'positionChange', value: '', type: 'event' },
            {name: 'displayChange', value: '', type: 'event' },
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
