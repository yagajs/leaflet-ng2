// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, PlatformRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<yaga-map [lat]="48.5768558" [lng]="13.268283" [zoom]="11">

  <yaga-zoom-control></yaga-zoom-control>
  <yaga-scale-control [metric]="true" [imperial]="false"></yaga-scale-control>
  <yaga-attribution-control></yaga-attribution-control>

  <yaga-tile-layer [url]="'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'" [attribution]="'© OpenStreetMap-Mitwirkende'"></yaga-tile-layer>
  <yaga-marker [lat]="48.5768558" [lng]="13.268283" [(draggable)]="editable">
    <yaga-popup>
      <h3>Hello World</h3>
      <p>
        This is <strong>{{ name }}</strong><br/><br/>
        <em>Do you wan't to edit me?: <input type="checkbox" [(ngModel)]="editable"/></em><br/>
        <span *ngIf="editable">
          Latitude: <input type="number" [(ngModel)]="lat" step="0.001" width="80"/><br/>
          Longitude: <input type="number" [(ngModel)]="lng" step="0.001" width="80"/><br/>
          This is: <input type="text" [(ngModel)]="name" width="80"/>
        </span>
      </p>
    </yaga-popup>
  </yaga-marker>
</yaga-map>
`;
/* tslint:enable */

@Component({
    selector: 'app',
    template
})
export class AppComponent {
    editable: boolean = false;
    name: string = 'Passau';
    lat: number = 48.5768558;
    lng: number = 13.268283;
}

@NgModule({
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent ],
    imports:      [ BrowserModule, FormsModule, YagaModule ]
})
export class AppModule { }

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});
