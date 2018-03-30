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
<example-header [title]="'Image-Overlay'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map>
      <yaga-image-overlay
        [(north)]="getDuplexPropertyByName('north').value"
        [(south)]="getDuplexPropertyByName('south').value"
        [(east)]="getDuplexPropertyByName('east').value"
        [(west)]="getDuplexPropertyByName('west').value"
        [(display)]="getDuplexPropertyByName('display').value"
        [(opacity)]="getDuplexPropertyByName('opacity').value"
  
        (click)="handleEvent('click', $event);"
        (dblclick)="handleEvent('dblclick', $event);"
        (mousedown)="handleEvent('mousedown', $event);"
        (mouseup)="handleEvent('mouseup', $event);"
        (mouseover)="handleEvent('mouseover', $event);"
        (mouseout)="handleEvent('mouseout', $event);"
        (mousemove)="handleEvent('mousemove', $event);"
        (contextmenu)="handleEvent('contextmenu', $event);"
        (add)="handleEvent('add', $event);"
        (remove)="handleEvent('remove', $event);"
        (load)="handleEvent('load', $event);"
        (error)="handleEvent('error', $event);"
  
        [attribution]="getInputPropertyByName('attribution').value"
        [alt]="getInputPropertyByName('alt').value"
        [crossOrigin]="getInputPropertyByName('crossOrigin').value"
        [interactive]="getInputPropertyByName('interactive').value"
        [url]="getInputPropertyByName('url').value">  
      </yaga-image-overlay>
      <yaga-tile-layer [url]="'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'"></yaga-tile-layer>
      <yaga-attribution-control></yaga-attribution-control>
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

            {name: 'north', value: 45, type: 'number' },
            {name: 'south', value: 1, type: 'number' },
            {name: 'east', value: 180, type: 'number' },
            {name: 'west', value: 1, type: 'number'},
            {name: 'display', value: true, type: 'checkbox'},
            {name: 'opacity', value: 0.8, type: 'relative'},
        ],
        input: [
            {name: 'attribution', value: 'Leaflet-Logo', type: 'text' },
            {name: 'interactive', value: true, type: 'checkbox' },
            {name: 'url', value: 'http://leafletjs.com/docs/images/logo.png', type: 'text' },
            {name: 'crossOrigin', value: false, type: 'checkbox' },
            {name: 'alt', value: 'Leaflet-Logo', type: 'text' },
            ],
        output: [
            {name: 'click', value: '', type: 'event' },
            {name: 'dblclick', value: '', type: 'event' },
            {name: 'mousedown', value: '', type: 'event' },
            {name: 'mouseup', value: '', type: 'event' },
            {name: 'mouseover', value: '', type: 'event' },
            {name: 'mouseout', value: '', type: 'event' },
            {name: 'mousemove', value: '', type: 'event' },
            {name: 'contextmenu', value: '', type: 'event' },
            {name: 'add', value: '', type: 'event' },
            {name: 'remove', value: '', type: 'event' },
            {name: 'load', value: '', type: 'event' },
            {name: 'error', value: '', type: 'event' },
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
