// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, PlatformRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { marker } from 'leaflet';

import { ExampleAppComponentBlueprint, IExampleProperties } from '../app-component-blueprint';
import { ExamplePropertiesModule, PROPERTIES_WRAPPER } from '../property.component';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<example-header [title]="'GeoJSON-Directive'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map>
      <yaga-geojson
        [(data)]="getDuplexPropertyByName('data').value"
      
        (add)="handleEvent('add', $event);"
        (remove)="handleEvent('remove', $event);"
        (popupopen)="handleEvent('popupopen', $event);"
        (popupclose)="handleEvent('popupclose', $event);"
        (tooltipopen)="handleEvent('tooltipopen', $event);"
        (tooltipclose)="handleEvent('tooltipclose', $event);"
        (click)="handleEvent('click', $event);"
        (dblclick)="handleEvent('dblclick', $event);"
        (mousedown)="handleEvent('mousedown', $event);"
        (mouseover)="handleEvent('mouseover', $event);"
        (mouseout)="handleEvent('mouseout', $event);"
        (contextmenu)="handleEvent('contextmenu', $event);"
        
        (onEachFeature)="handleEvent('onEachFeature', $event);"
        
        [defaultStyle]="getInputPropertyByName('defaultStyle').value"
        [filter]="getInputPropertyByName('filter').value"
        [pointToLayer]="getInputPropertyByName('pointToLayer').value"
        [styler]="getInputPropertyByName('styler').value"
        >
        <yaga-tooltip>{{ getInputPropertyByName('tooltip directive').value }}</yaga-tooltip>
        <yaga-popup>{{ getInputPropertyByName('popup directive').value }}</yaga-popup>
      </yaga-geojson>
      <yaga-tile-layer [url]="'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'"></yaga-tile-layer>
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
            {
                name: 'data',
                type: 'geojson',
                value: {
                    features: [
                        {
                            geometry: {
                                coordinates: [7, 51],
                                type: 'Point',
                            },
                            type: 'Feature',
                        },

                        {
                            geometry: {
                                coordinates: [[30, 10], [10, 30], [40, 40]],
                                type: 'LineString',
                            },
                            type: 'Feature',
                        },

                        {
                            geometry: {
                                coordinates: [[[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]],
                                type: 'Polygon',
                            },
                            type: 'Feature',
                        },
                    ],
                    type: 'FeatureCollection',
                },
            },
        ],
        input: [
            {name: 'filter', value: () => true, type: 'function' },
            {name: 'pointToLayer', value: (geojson, latlng) => marker(latlng), type: 'function' },
            {name: 'styler', value: (geojson, defaultStyle) => defaultStyle, type: 'function' },
            {name: 'defaultStyle', value: { color: 'red' }, type: 'style' },

            {name: 'tooltip directive', value: 'This is the tooltip content', type: 'text' },
            {name: 'popup directive', value: 'This is the popup content', type: 'text' },
        ],
        output: [
            {name: 'add', value: '', type: 'event' },
            {name: 'remove', value: '', type: 'event' },
            {name: 'popupopen', value: '', type: 'event' },
            {name: 'popupclose', value: '', type: 'event' },
            {name: 'tooltipopen', value: '', type: 'event' },
            {name: 'tooltipclose', value: '', type: 'event' },
            {name: 'click', value: '', type: 'event' },
            {name: 'dblclick', value: '', type: 'event' },
            {name: 'mousedown', value: '', type: 'event' },
            {name: 'mouseover', value: '', type: 'event' },
            {name: 'mouseout', value: '', type: 'event' },
            {name: 'contextmenu', value: '', type: 'event' },
            {name: 'onEachFeature', value: '', type: 'event' },
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
