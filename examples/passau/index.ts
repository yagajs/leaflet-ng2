// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, NgModule, PlatformRef } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ExamplePropertiesModule } from '../property.component'; // this is just for the header

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<example-header [title]="'FOSSGIS 2017 Example'"></example-header>
<div class="container">
  <div class="map">
    <!-- Template-Example from presentation starts here -->
    <yaga-map [lat]="48.5768558" [lng]="13.268283" [zoom]="11">
      <yaga-zoom-control></yaga-zoom-control>
      <yaga-scale-control [metric]="true" [imperial]="false"></yaga-scale-control>
      <yaga-attribution-control></yaga-attribution-control>
      
      <yaga-tile-layer [url]="'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'" [attribution]="'© OpenStreetMap-Mitwirkende'"></yaga-tile-layer>
      <yaga-marker [(lat)]="lat" [(lng)]="lng" [(draggable)]="editable">
        <yaga-popup>
          <h3>Hello World</h3>
          <p>
            This is <strong>{{ name }}</strong><br/><br/>
            <em>Do you wan't to edit me?: <input type="checkbox" [(ngModel)]="editable"/></em> <br/>
            <span *ngIf="editable">
              Latitude: <input type="number" [(ngModel)]="lat" step="0.001" width="80"/><br/>
              Longitude: <input type="number" [(ngModel)]="lng" step="0.001" width="80"/><br/>
              This is: <input type="text" [(ngModel)]="name" width="80"/>
            </span>
          </p>
        </yaga-popup>
      </yaga-marker>
    </yaga-map>
    <!-- Example-Example from presentation ends here -->
  </div>
</div><!-- /.container -->
<example-footer></example-footer>

`;
/* tslint:enable */

@Component({
    selector: 'app',
    template,
})
export class AppComponent {
    public editable: boolean = false;
    public name: string = 'Passau';
    public lat: number = 48.5768558;
    public lng: number = 13.268283;
}

/* tslint:disable:max-classes-per-file */
@NgModule({
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent ],
    imports:      [ BrowserModule, FormsModule, YagaModule, /* just for the website -> */ ExamplePropertiesModule ],
})
export class AppModule { }

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});
