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
<example-header [title]="'Popup-Directive'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map>
      <yaga-marker [lat]="0" [lng]="0">
        <yaga-popup
          [(opened)]="getDuplexPropertyByName('opened').value"

          (open)="handleEvent('open', $event)"
          (close)="handleEvent('close', $event)"

          [maxWidth]="getInputPropertyByName('maxWidth').value"
          [minWidth]="getInputPropertyByName('minWidth').value"
          [maxHeight]="getInputPropertyByName('maxHeight').value"
          [autoPan]="getInputPropertyByName('autoPan').value"
          [autoPanPaddingTopLeft]="getInputPropertyByName('autoPanPaddingTopLeft').value"
          [autoPanPaddingBottomRight]="getInputPropertyByName('autoPanPaddingBottomRight').value"
          [autoPanPadding]="getInputPropertyByName('autoPanPadding').value"
          [keepInView]="getInputPropertyByName('keepInView').value"
          [closeButton]="getInputPropertyByName('closeButton').value"
          [autoClose]="getInputPropertyByName('autoClose').value"
          [className]="getInputPropertyByName('className').value"

        >
          {{ getDuplexPropertyByName('content').value }}
        <!-- 
          It would also be possible to pass the content with:
          [(content)]="getDuplexPropertyByName('content').value"
          -->
        </yaga-popup>
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
        ],
        input: [
            {name: 'maxWidth', value: 300, type: 'number' },
            {name: 'minWidth', value: 100, type: 'number' },
            {name: 'maxHeight', value: 300, type: 'number' },
            {name: 'autoPan', value: true, type: 'checkbox' },
            {name: 'autoPanPaddingTopLeft', value: new Point(20, 20), type: 'point' },
            {name: 'autoPanPaddingBottomRight', value: new Point(20, 20), type: 'point' },
            {name: 'autoPanPadding', value: new Point(20, 20), type: 'point' },
            {name: 'keepInView', value: true, type: 'checkbox' },
            {name: 'closeButton', value: true, type: 'checkbox' },
            {name: 'autoClose', value: true, type: 'checkbox' },
            {name: 'className', value: 'example-css-class', type: 'text' },
            {name: 'pane', value: 'popup', type: 'text' },
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
