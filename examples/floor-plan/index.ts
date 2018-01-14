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
<example-header [title]="'Floor Plan'"></example-header>
<div class="container">
  <div class="map">
    <yaga-map
          [(zoom)]="getDuplexPropertyByName('zoom').value"
          [(lat)]="getDuplexPropertyByName('lat').value"
          [(lng)]="getDuplexPropertyByName('lng').value"
          [(minZoom)]="getDuplexPropertyByName('minZoom').value"
          [(maxZoom)]="getDuplexPropertyByName('maxZoom').value"
          [(maxBounds)]="getDuplexPropertyByName('maxBounds').value"
          [crs]="crs">
      <yaga-image-overlay
        [url]="'https://dl.dropbox.com/s/yhrpnftsuis15z6/Topkapi_Palace_plan.svg'"
        [bounds]="getDuplexPropertyByName('maxBounds').value">
      </yaga-image-overlay>
    </yaga-map>
  </div>
  <p>
    Inspiration and the floor map taken from here: <a href="https://codepen.io/zachdunn/pen/VvRXdP" target="_blank">
    https://codepen.io/zachdunn/pen/VvRXdP</a>
  </p>
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
    public crs = CRS.Simple;
    public properties: IExampleProperties = {
        duplex: [
            {name: 'zoom', value: 1, type: 'number' },
            {name: 'lat', value: -90, type: 'number' },
            {name: 'lng', value: 160, type: 'number' },
            {name: 'minZoom', value: 1, type: 'number' },
            {name: 'maxZoom', value: 4, type: 'number'},
            {
                name: 'maxBounds',
                type: 'latlngBounds',
                value: new LatLngBounds(latLng(-201.5, 0), latLng(0, 320)),
            },
        ],
        input: [],
        output: [],
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
