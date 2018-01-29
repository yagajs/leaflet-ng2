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
        (dbclick)="handleEvent('dbclick', $event);"
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
            // {name: 'display', value: true, type: 'checkbox' },
            // {name: 'stroke', value: true, type: 'checkbox' },
            // {name: 'color', value: '#3cf', type: 'text' },
            // {name: 'weight', value: 5, type: 'number' },
            // {name: 'opacity', value: 0.8, type: 'relative'},
            // {
            //     additional: { states: ['butt', 'round', 'square', 'inherit']},
            //     name: 'lineCap',
            //     type: 'select',
            //     value: 'inherit',
            // },
            // {
            //     additional: { states: ['miter', 'round', 'bevel', 'inherit']},
            //     name: 'lineJoin',
            //     type: 'select',
            //     value: 'inherit',
            // },
            // {name: 'dashArray', value: '1, 2', type: 'text' },
            // {name: 'dashOffset', value: '12px', type: 'text' },
            // {name: 'fill', value: true, type: 'checkbox'},
            // {name: 'fillColor', value: '#9ff', type: 'text' },
            // {name: 'fillOpacity', value: 0.3, type: 'relative' },
            // {
            //     additional: { states: ['nonzero', 'evenodd', 'inherit']},
            //     name: 'fillRule',
            //     type: 'select',
            //     value: 'inherit',
            // },
            // {name: 'className', value: '', type: 'text' },
            // {name: 'lat', value: 51, type: 'number'},
            // {name: 'lng', value: 7, type: 'number' },
            // {name: 'radius', value: 30, type: 'number' },
            // {name: 'tooltipOpened', value: true, type: 'checkbox' },
            // {name: 'popupOpened', value: false, type: 'checkbox' }
        ],
        input: [
            // {name: 'interactive', value: true, type: 'checkbox' },

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
            {name: 'dbclick', value: '', type: 'event' },
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
