// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, PlatformRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Point, LatLng } from 'leaflet';

import { ExampleAppComponentBlueprint, IExampleProperties } from '../app-component-blueprint';
import { ExamplePropertiesModule, PROPERTIES_WRAPPER } from '../property.component';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<example-header [title]="'Tooltip-Directive'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map>
      <yaga-marker [lat]="0" [lng]="0">
        <yaga-tooltip
          [(opened)]="getDuplexPropertyByName('opened').value"
          [(opacity)]="getDuplexPropertyByName('opacity').value"

          (open)="handleEvent('open', $event)"
          (close)="handleEvent('close', $event)"

          [className]="getInputPropertyByName('className').value"
          [interactive]="getInputPropertyByName('interactive').value"
          [sticky]="getInputPropertyByName('sticky').value"
          [direction]="getInputPropertyByName('direction').value"
          [permanent]="getInputPropertyByName('permanent').value"
          [offset]="getInputPropertyByName('offset').value"
        >
          {{ getDuplexPropertyByName('content').value }}
        <!-- 
          It would also be possible to pass the content with:
          [(content)]="getDuplexPropertyByName('content').value"
          -->
        </yaga-tooltip>
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
            {name: 'content', value: 'Some example content...', type: 'text' },
            {name: 'opened', value: false, type: 'checkbox' },
            // {name: 'lat', value: 51, type: 'number' },
            // {name: 'lng', value: 7, type: 'number' },
            // {name: 'position', value: new LatLng(51, 7), type: 'latlng' },
            {name: 'opacity', value: 0.75, type: 'relative' },
        ],
        input: [
            {name: 'className', value: 'example-css-class', type: 'text' },
            {name: 'pane', value: 'tooltip', type: 'text' },
            {name: 'interactive', value: true, type: 'checkbox' },
            {name: 'sticky', value: true, type: 'checkbox' },
            {
                additional: { states: ['right', 'left', 'top', 'bottom', 'center', 'auto']},
                name: 'direction',
                type: 'select',
                value: 'auto',
            },
            {name: 'permanent', value: true, type: 'checkbox' },
            {name: 'offset', value: new Point(0, 0), type: 'point' },
        ],
        output: [
            {name: 'open', value: '', type: 'event' },
            {name: 'close', value: '', type: 'event' },
        ],
    };
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
