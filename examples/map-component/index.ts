// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, PlatformRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CRS, latLng, LatLngBounds } from 'leaflet';

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
      [(maxBounds)]="getDuplexPropertyByName('maxBounds').value"

      (baselayerchange)="handleEvent('baselayerchange', $event);"
      (overlayadd)="handleEvent('overlayadd', $event);"
      (overlayremove)="handleEvent('overlayremove', $event);"
      (layeradd)="handleEvent('layeradd', $event);"
      (layerremove)="handleEvent('layerremove', $event);"
      (zoomlevelschan)="handleEvent('zoomlevelschan', $event);"
      (resize)="handleEvent('resize', $event);"
      (unload)="handleEvent('unload', $event);"
      (viewreset)="handleEvent('viewreset', $event);"
      (load)="handleEvent('load', $event);"
      (zoomstart)="handleEvent('zoomstart', $event);"
      (movestart)="handleEvent('movestart', $event);"
      (zoom)="handleEvent('zoom', $event);"
      (move)="handleEvent('move', $event);"
      (zoomend)="handleEvent('zoomend', $event);"
      (boxzoomstart)="handleEvent('boxzoomstart', $event);"
      (boxzoomend)="handleEvent('boxzoomend', $event);"
      (moveend)="handleEvent('moveend', $event);"
      (popupopen)="handleEvent('popupopen', $event);"
      (popupclose)="handleEvent('popupclose', $event);"
      (autopanstart)="handleEvent('autopanstart', $event);"
      (tooltipopen)="handleEvent('tooltipopen', $event);"
      (tooltipclose)="handleEvent('tooltipclose', $event);"
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
      (zoomanim)="handleEvent('zoomanim', $event);"

      [closePopupOnClick]="getInputPropertyByName('closePopupOnClick').value"
      [zoomSnap]="getInputPropertyByName('zoomSnap').value"
      [zoomDelta]="getInputPropertyByName('zoomDelta').value"
      [trackResize]="getInputPropertyByName('trackResize').value"
      [boxZoomEnabled]="getInputPropertyByName('boxZoomEnabled').value"
      [doubleClickZoomEnabled]="getInputPropertyByName('doubleClickZoomEnabled').value"
      [draggingEnabled]="getInputPropertyByName('draggingEnabled').value"
      [fadeAnimation]="getInputPropertyByName('fadeAnimation').value"
      [markerZoomAnimation]="getInputPropertyByName('markerZoomAnimation').value"
      [transform3DLimit]="getInputPropertyByName('transform3DLimit').value"
      [zoomAnimation]="getInputPropertyByName('zoomAnimation').value"
      [zoomAnimationThreshold]="getInputPropertyByName('zoomAnimationThreshold').value"
      [inertia]="getInputPropertyByName('inertia').value"
      [inertiaDeceleration]="getInputPropertyByName('inertiaDeceleration').value"
      [inertiaMaxSpeed]="getInputPropertyByName('inertiaMaxSpeed').value"
      [easeLinearity]="getInputPropertyByName('easeLinearity').value"
      [worldCopyJump]="getInputPropertyByName('worldCopyJump').value"
      [maxBoundsViscosity]="getInputPropertyByName('maxBoundsViscosity').value"
      [keyboardEnabled]="getInputPropertyByName('keyboardEnabled').value"
      [keyboardPanDelta]="getInputPropertyByName('keyboardPanDelta').value"
      [scrollWheelZoomEnabled]="getInputPropertyByName('scrollWheelZoomEnabled').value"
      [wheelDebounceTime]="getInputPropertyByName('wheelDebounceTime').value"
      [wheelPxPerZoomLevel]="getInputPropertyByName('wheelPxPerZoomLevel').value"
      [tapEnabled]="getInputPropertyByName('tapEnabled').value"
      [touchZoomEnabled]="getInputPropertyByName('touchZoomEnabled').value"
      [tapTolerance]="getInputPropertyByName('tapTolerance').value"
      [bounceAtZoomLimits]="getInputPropertyByName('bounceAtZoomLimits').value"
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
            {
                name: 'maxBounds',
                type: 'latlngBounds',
                value: new LatLngBounds(latLng(-90, -180), latLng(90, 180)),
            },
        ],
        input: [
            {name: 'closePopupOnClick', value: true, type: 'checkbox' },
            {name: 'zoomSnap', value: 1, type: 'number' },
            {name: 'zoomDelta', value: 1, type: 'number' },
            {name: 'trackResize', value: true, type: 'checkbox' },
            {name: 'boxZoomEnabled', value: true, type: 'checkbox' },
            {name: 'doubleClickZoomEnabled', value: true, type: 'checkbox' },
            {name: 'draggingEnabled', value: true, type: 'checkbox' },
            {name: 'fadeAnimation', value: true, type: 'checkbox' },
            {name: 'markerZoomAnimation', value: true, type: 'checkbox' },
            {name: 'transform3DLimit', value: Math.pow(2, 23), type: 'number' },
            {name: 'zoomAnimation', value: true, type: 'checkbox' },
            {name: 'zoomAnimationThreshold', value: 4, type: 'number' },
            {name: 'inertia', value: true, type: 'checkbox' },
            {name: 'inertiaDeceleration', value: 3000, type: 'number' },
            {name: 'inertiaMaxSpeed', value: Infinity, type: 'number' },
            {name: 'easeLinearity', value: 0.2, type: 'number' },
            {name: 'worldCopyJump', value: true, type: 'checkbox' },
            {name: 'maxBoundsViscosity', value: true, type: 'checkbox' },
            {name: 'keyboardEnabled', value: true, type: 'checkbox' },
            {name: 'keyboardPanDelta', value: 80, type: 'number' },
            {name: 'scrollWheelZoomEnabled', value: true, type: 'checkbox' },
            {name: 'wheelDebounceTime', value: 40, type: 'number' },
            {name: 'wheelPxPerZoomLevel', value: 60, type: 'number' },
            {name: 'tapEnabled', value: true, type: 'checkbox' },
            {name: 'touchZoomEnabled', value: true, type: 'checkbox' },
            {name: 'tapTolerance', value: 15, type: 'number' },
            {name: 'bounceAtZoomLimits', value: true, type: 'checkbox' },
            {name: 'crs', value: CRS.EPSG3857, type: 'crs' },
            ],
        output: [
            {name: 'baselayerchange', value: '', type: 'event' },
            {name: 'overlayadd', value: '', type: 'event' },
            {name: 'overlayremove', value: '', type: 'event' },
            {name: 'layeradd', value: '', type: 'event' },
            {name: 'layerremove', value: '', type: 'event' },
            {name: 'zoomlevelschan', value: '', type: 'event' },
            {name: 'resize', value: '', type: 'event' },
            {name: 'unload', value: '', type: 'event' },
            {name: 'viewreset', value: '', type: 'event' },
            {name: 'load', value: '', type: 'event' },
            {name: 'zoomstart', value: '', type: 'event' },
            {name: 'movestart', value: '', type: 'event' },
            {name: 'zoom', value: '', type: 'event' },
            {name: 'move', value: '', type: 'event' },
            {name: 'zoomend', value: '', type: 'event' },
            {name: 'moveend', value: '', type: 'event' },
            {name: 'popupopen', value: '', type: 'event' },
            {name: 'popupclose', value: '', type: 'event' },
            {name: 'autopanstart', value: '', type: 'event' },
            {name: 'tooltipopen', value: '', type: 'event' },
            {name: 'tooltipclose', value: '', type: 'event' },
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
            {name: 'zoomanim', value: '', type: 'event' },
            {name: 'boxzoomstart', value: '', type: 'event' },
            {name: 'boxzoomend', value: '', type: 'event' },
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
