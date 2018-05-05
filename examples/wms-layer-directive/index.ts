// Shims
import 'reflect-metadata';
import 'zone.js';

import { EXAMPLE_WMS_LAYER_NAMES, EXAMPLE_WMS_LAYER_URL, YagaModule } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, PlatformRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bounds, point } from 'leaflet';

import { ExampleAppComponentBlueprint, IExampleProperties } from '../app-component-blueprint';
import { ExamplePropertiesModule, PROPERTIES_WRAPPER } from '../property.component';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<example-header [title]="'WMS-Layer-Directive'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map [lat]="51" [lng]="7" [zoom]="7">
      <yaga-wms-layer        
        [(url)]="getDuplexPropertyByName('url').value"
        [(display)]="getDuplexPropertyByName('display').value"
        [(opacity)]="getDuplexPropertyByName('opacity').value"
        [(zIndex)]="getDuplexPropertyByName('zIndex').value"
        [(layers)]="getDuplexPropertyByName('layers').value"
        [(styles)]="getDuplexPropertyByName('styles').value"
        [(format)]="getDuplexPropertyByName('format').value"
        [(version)]="getDuplexPropertyByName('version').value"
        [(transparent)]="getDuplexPropertyByName('transparent').value"

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
        (loading)="handleEvent('loading', $event);"
        (tileunload)="handleEvent('tileunload', $event);"
        (tileloadstart)="handleEvent('tileloadstart', $event);"
        (tileerror)="handleEvent('tileerror', $event);"
        (tileload)="handleEvent('tileload', $event);"
        (load)="handleEvent('load', $event);"

        [attribution]="getInputPropertyByName('attribution').value"
        [updateWhenIdle]="getInputPropertyByName('updateWhenIdle').value"
        [updateWhenZooming]="getInputPropertyByName('updateWhenZooming').value"
        [updateInterval]="getInputPropertyByName('updateInterval').value"
        [noWrap]="getInputPropertyByName('noWrap').value"
        [className]="getInputPropertyByName('className').value"
        [keepBuffer]="getInputPropertyByName('keepBuffer').value"
        [maxZoom]="getInputPropertyByName('maxZoom').value"
        [minZoom]="getInputPropertyByName('minZoom').value"
        [maxNativeZoom]="getInputPropertyByName('maxNativeZoom').value"
        [minNativeZoom]="getInputPropertyByName('minNativeZoom').value"
        [subdomains]="getInputPropertyByName('subdomains').value"
        [errorTileUrl]="getInputPropertyByName('errorTileUrl').value"
        [zoomOffset]="getInputPropertyByName('zoomOffset').value"
        [tms]="getInputPropertyByName('tms').value"
        [tileSize]="getInputPropertyByName('tileSize').value"
        [zoomReverse]="getInputPropertyByName('zoomReverse').value"
        [detectRetina]="getInputPropertyByName('detectRetina').value"
        [crossOrigin]="getInputPropertyByName('crossOrigin').value">
      </yaga-wms-layer>
      <yaga-attribution-control></yaga-attribution-control>
      <yaga-circle-marker [lat]="51" [lng]="7"></yaga-circle-marker>
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
            {name: 'url', value: EXAMPLE_WMS_LAYER_URL, type: 'text' },
            {name: 'display', value: true, type: 'checkbox' },
            {name: 'opacity', value: 7, type: 'relative' },
            {name: 'zIndex', value: 5, type: 'number' },
            {name: 'layers', value: EXAMPLE_WMS_LAYER_NAMES, type: 'text[]' },
            {name: 'styles', value: [], type: 'text[]' },
            {name: 'format', value: 'image/png', type: 'text' },
            {name: 'version', value: '1.1.1', type: 'text' },
            {name: 'transparent', value: false, type: 'checkbox' },
        ],
        input: [
            {name: 'attribution', value: 'OpenStreetMap', type: 'text' },
            {name: 'tileSize', value: point([256, 256]), type: 'point' },
            {name: 'updateWhenIdle', value: true, type: 'checkbox' },
            {name: 'updateWhenZooming', value: true, type: 'checkbox' },
            {name: 'updateInterval', value: 200, type: 'number' },
            {name: 'bounds', value: bounds([9.53154, 50.1506], [5.72499, 52.602]), type: 'bounds' },
            {name: 'noWrap', value: false, type: 'checkbox' },
            {name: 'className', value: '', type: 'text' },
            {name: 'keepBuffer', value: true, type: 'checkbox' },
            {name: 'maxZoom', value: 24, type: 'number' },
            {name: 'minZoom', value: 0, type: 'number' },
            {name: 'maxNativeZoom', value: 19, type: 'number' },
            {name: 'minNativeZoom', value: 3, type: 'number' },
            {name: 'subdomains', value: [], type: 'text[]' },
            {name: 'errorTileUrl', value: '', type: 'url' },
            {name: 'zoomOffset', value: 0, type: 'number' },
            {name: 'tms', value: false, type: 'checkbox' },
            {name: 'zoomReverse', value: false, type: 'checkbox' },
            {name: 'detectRetina', value: false, type: 'checkbox' },
            {name: 'crossOrigin', value: false, type: 'checkbox' },
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
            {name: 'loading', value: '', type: 'event' },
            {name: 'tileunload', value: '', type: 'event' },
            {name: 'tileloadstart', value: '', type: 'event' },
            {name: 'tileerror', value: '', type: 'event' },
            {name: 'tileload', value: '', type: 'event' },
            {name: 'load', value: '', type: 'event' },
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
