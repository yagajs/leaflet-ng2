// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, PlatformRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ExampleAppComponentBlueprint, IExampleProperties } from '../app-component-blueprint';
import { ExamplePropertiesModule, PROPERTIES_WRAPPER } from '../property.component';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<example-header [title]="'Circle-Directive'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map>
      <yaga-circle
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

        [(display)]="getDuplexPropertyByName('display').value"
        [(stroke)]="getDuplexPropertyByName('stroke').value"
        [(color)]="getDuplexPropertyByName('color').value"
        [(weight)]="getDuplexPropertyByName('weight').value"
        [(opacity)]="getDuplexPropertyByName('opacity').value"
        [(lineCap)]="getDuplexPropertyByName('lineCap').value"
        [(lineJoin)]="getDuplexPropertyByName('lineJoin').value"
        [(dashArray)]="getDuplexPropertyByName('dashArray').value"
        [(dashOffset)]="getDuplexPropertyByName('dashOffset').value"
        [(fill)]="getDuplexPropertyByName('fill').value"
        [(fillColor)]="getDuplexPropertyByName('fillColor').value"
        [(fillOpacity)]="getDuplexPropertyByName('fillOpacity').value"
        [(fillRule)]="getDuplexPropertyByName('fillRule').value"
        [(className)]="getDuplexPropertyByName('className').value"

        [(lat)]="getDuplexPropertyByName('lat').value"
        [(lng)]="getDuplexPropertyByName('lng').value"
        [(radius)]="getDuplexPropertyByName('radius').value"><!-- 

        [interactive]="getInputPropertyByName('interactive').value" -->
        <yaga-tooltip>{{ getInputPropertyByName('tooltip directive').value }}</yaga-tooltip>
        <yaga-popup>{{ getInputPropertyByName('popup directive').value }}</yaga-popup>
      </yaga-circle>
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
            {name: 'stroke', value: true, type: 'checkbox' },
            {name: 'color', value: '#3cf', type: 'text' },
            {name: 'weight', value: 5, type: 'number' },
            {name: 'opacity', value: 0.8, type: 'relative'},
            {
                additional: { states: ['butt', 'round', 'square', 'inherit']},
                name: 'lineCap',
                type: 'select',
                value: 'inherit',
            },
            {
                additional: { states: ['miter', 'round', 'bevel', 'inherit']},
                name: 'lineJoin',
                type: 'select',
                value: 'inherit',
            },
            {name: 'dashArray', value: '1, 2', type: 'text' },
            {name: 'dashOffset', value: '12px', type: 'text' },
            {name: 'fill', value: true, type: 'checkbox'},
            {name: 'fillColor', value: '#9ff', type: 'text' },
            {name: 'fillOpacity', value: 0.3, type: 'relative' },
            {
                additional: { states: ['nonzero', 'evenodd', 'inherit']},
                name: 'fillRule',
                type: 'select',
                value: 'inherit',
            },
            {name: 'className', value: '', type: 'text' },
            {name: 'lat', value: 51, type: 'number'},
            {name: 'lng', value: 7, type: 'number' },
            {name: 'radius', value: 30, type: 'number' },
            // {name: 'tooltipOpened', value: true, type: 'checkbox' },
            // {name: 'popupOpened', value: false, type: 'checkbox' }
        ],
        input: [
            {name: 'interactive', value: true, type: 'checkbox' },
            {name: 'tooltip directive', value: 'This is the tooltip content', type: 'text' },
            {name: 'popup directive', value: 'This is the popup content', type: 'text' },
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
            {name: 'keypress', value: '', type: 'event' },
            {name: 'preclick', value: '', type: 'event' },
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
