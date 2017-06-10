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
<example-header [title]="'Scale-Control-Directive'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map [zoom]="3">
      <yaga-scale-control
      
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
        
        [metric]="getInputPropertyByName('metric').value"
        [imperial]="getInputPropertyByName('imperial').value"
        [maxWidth]="getInputPropertyByName('maxWidth').value"
        [position]="getInputPropertyByName('position').value"
        [opacity]="getInputPropertyByName('opacity').value"
        >
      </yaga-scale-control>
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
        ],
        input: [
            {name: 'metric', value: true, type: 'checkbox' },
            {name: 'imperial', value: true, type: 'checkbox' },
            {name: 'maxWidth', value: 150, type: 'number' },
            {
                additional: { states: ['topleft', 'topright', 'bottomleft', 'bottomright']},
                name: 'position',
                type: 'select',
                value: 'bottomleft',
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
