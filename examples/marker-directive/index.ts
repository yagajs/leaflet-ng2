// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, PlatformRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { LatLng, Point } from 'leaflet';

import { ExampleAppComponentBlueprint, IExampleProperties } from '../app-component-blueprint';
import { ExamplePropertiesModule, PROPERTIES_WRAPPER } from '../property.component';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<example-header [title]="'Marker-Directive'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map>
      <yaga-marker 
        [(draggable)]="getDuplexPropertyByName('draggable').value"
        [(display)]="getDuplexPropertyByName('display').value"
        [(opacity)]="getDuplexPropertyByName('opacity').value"
        [(lat)]="getDuplexPropertyByName('lat').value"
        [(lng)]="getDuplexPropertyByName('lng').value"
        [(position)]="getDuplexPropertyByName('position').value"
        [(popupOpened)]="getDuplexPropertyByName('popupOpened').value"
        [(tooltipOpened)]="getDuplexPropertyByName('tooltipOpened').value"
        [(zIndexOffset)]="getDuplexPropertyByName('zIndexOffset').value"
        (dragend)="handleEvent('dragend', $event);"
        (dragstart)="handleEvent('dragstart', $event);"
        (movestart)="handleEvent('movestart', $event);"
        (drag)="handleEvent('drag', $event);"
        (moveend)="handleEvent('moveend', $event);"
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
        [alt]="getInputPropertyByName('title').value"
        [title]="getInputPropertyByName('alt').value"
        >
        <yaga-icon
          [iconUrl]="iconUrl"
          [iconSize]="iconSize"
          [iconAnchor]="iconAnchor"
          [popupAnchor]="popupAnchor"
          [shadowUrl]="shadowUrl"
          [shadowSize]="shadowSize"
          [shadowAnchor]="shadowAnchor"
        ></yaga-icon> <!-- [(zIndex)]="getDuplexPropertyByName('zIndex').value" -->
        <yaga-tooltip>This is the content of the tooltip</yaga-tooltip>
        <yaga-popup>This is the content of the popup</yaga-popup>
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
        duplex: [
            {name: 'lat', value: 51, type: 'number'},
            {name: 'lng', value: 7, type: 'number'},
            {name: 'opacity', value: 0.5, type: 'relative'},
            {name: 'draggable', value: true, type: 'checkbox'},
            {name: 'display', value: true, type: 'checkbox'},
            {name: 'zIndexOffset', value: 255, type: 'number'},
            // {name: 'icon', value:, type: ''},
            {name: 'tooltipOpened', value: false, type: 'checkbox'},
            {name: 'popupOpened', value: false, type: 'checkbox'},
            {name: 'position', value: new LatLng(51, 7), type: 'latlng'},
        ],
        input: [
            {name: 'title', value: 'Title', type: 'text' },
            {name: 'alt', value: 'alternative text', type: 'text' },
        ],
        output: [
            {name: 'dragend', value: '', type: 'event' },
            {name: 'dragstart', value: '', type: 'event' },
            {name: 'movestart', value: '', type: 'event' },
            {name: 'drag', value: '', type: 'event' },
            {name: 'moveend', value: '', type: 'event' },
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
        ],
    };

    public iconUrl: string = 'http://leafletjs.com/examples/custom-icons/leaf-green.png';
    public iconSize: Point = new Point(38, 95);
    public iconAnchor: Point = new Point(22, 94);
    public popupAnchor: Point = new Point(-3, -76);
    public shadowUrl: string = 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png';
    public shadowSize: Point = new Point(50, 64);
    public shadowAnchor: Point = new Point(4, 62);
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
