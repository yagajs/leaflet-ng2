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
<example-header [title]="'Zoom-Control-Directive'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map>
      <yaga-zoom-control
      
        (click)="handleEvent('click', $event);"
        (dblclick)="handleEvent('dblclick', $event);"
        (mousedown)="handleEvent('mousedown', $event);"
        (mouseup)="handleEvent('mouseup', $event);"
        (mouseover)="handleEvent('mouseover', $event);"
        (mouseout)="handleEvent('mouseout', $event);"
        (mousemove)="handleEvent('mousemove', $event);"
        (positionChange)="handleEvent('positionChange', $event);"
        (displayChange)="handleEvent('displayChange', $event);"

        [zoomInText]="getInputPropertyByName('zoomInText').value"
        [zoomInTitle]="getInputPropertyByName('zoomInTitle').value"
        [zoomOutText]="getInputPropertyByName('zoomOutText').value"
        [zoomOutTitle]="getInputPropertyByName('zoomOutTitle').value"
        
        [position]="getInputPropertyByName('position').value"
        [(zIndex)]="getDuplexPropertyByName('zIndex').value"
        [(display)]="getDuplexPropertyByName('display').value"
        [opacity]="getInputPropertyByName('opacity').value"
        >

      </yaga-zoom-control>
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
            {name: 'display', value: true, type: 'checkbox' },
            {name: 'zIndex', value: 1, type: 'number'},

        ],
        input: [
            {name: 'zoomInText', value: '+', type: 'text'},
            {name: 'zoomInTitle', value: 'Zoom in', type: 'text'},
            {name: 'zoomOutText', value: '-', type: 'text'},
            {name: 'zoomOutTitle', value: 'Zoom out', type: 'text'},
            {
                additional: { states: ['topleft', 'topright', 'bottomleft', 'bottomright']},
                name: 'position',
                type: 'select',
                value: 'topleft',
                },
            {name: 'opacity', value: 0.8, type: 'relative'},
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
            {name: 'addEvent', value: '', type: 'event' },
            {name: 'removeEvent', value: '', type: 'event' },
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
