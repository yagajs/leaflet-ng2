// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule, MapComponent } from '../../lib/index';

import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const platform = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<div class="container">
  <div class="map">
    <yaga-map [zoom]="10" [lat]="51" [lng]="7">
      <yaga-tile-layer [url]="'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png'"></yaga-tile-layer>
      <yaga-marker [(lat)]="lat" [(lng)]="lng" [(draggable)]="draggable"> <!-- [(popupOpened)]="popupOpened" [(tooltipOpened)]="tooltipOpened" -->
        <yaga-popup>{{ popupContent }}</yaga-popup>
        <yaga-tooltip>{{ tooltipContent }}</yaga-tooltip>
        <yaga-icon [iconUrl]="iconUrl" [shadowUrl]="shadowUrl" [iconSize]="[iconWidth, iconHeight]" [shadowSize]="[50, 64]" [iconAnchor]="[22, 94]" [shadowAnchor]="[4, 62]" [popupAnchor]="[-3, -76]"></yaga-icon>
      </yaga-marker>
      <yaga-polyline [latLngs]="polyline" [(color)]="pathColor">
        <yaga-popup>{{ popupContent }}</yaga-popup>
        <yaga-tooltip>{{ tooltipContent }}</yaga-tooltip>
      </yaga-polyline>
    </yaga-map>
  </div>
  
  <div class="starter-template">
    <h2>Marker</h2>
    Draggable: <input type="checkbox" [(ngModel)]="draggable" />
    Show Popup: <input type="checkbox" [(ngModel)]="popupOpened" />
    Show Tooltip: <input type="checkbox" [(ngModel)]="tooltipOpened" />
     <div class="input-group">
          <input type="number" class="form-control" [(ngModel)]="lat">
          <input type="number" class="form-control" [(ngModel)]="lng">
      </div>
    <h2>Popup</h2>
    <input type="text" class="form-control" [(ngModel)]="popupContent" />
    <h2>Tooltip</h2>
    <input type="text" class="form-control" [(ngModel)]="tooltipContent" />
    <h2>Icon</h2>
    <h6>URL</h6>
    <div>Try also red and orange</div>
    <input type="text" class="form-control" [(ngModel)]="iconUrl" />
    <h6>Shadow-URL</h6>
    <input type="text" class="form-control" [(ngModel)]="shadowUrl" />
    
    <h6>Width and Height</h6>
     <div class="input-group">
          <input type="number" class="form-control" [(ngModel)]="iconWidth">
          <input type="number" class="form-control" [(ngModel)]="iconHeight">
      </div>
    <h2>Polyline</h2>
    <h6>Color</h6>
    <input type="text" class="form-control" [(ngModel)]="pathColor" />
    
  </div>
  
</div><!-- /.container -->

`;
/* tslint:enable */

@Component({
    selector: 'app',
    template
})
export class AppComponent implements AfterViewInit {
    public lat: number = 51;
    public lng: number = 7;
    public iconWidth: number = 38;
    public iconHeight: number = 95;
    public popupContent: string = 'This is the content of the popup';
    public tooltipContent: string = 'This is the content of the tooltip';
    public draggable: boolean = true;
    public popupOpened: boolean = false;
    public tooltipOpened: boolean = false;
    public iconUrl: string = 'http://leafletjs.com/examples/custom-icons/leaf-green.png';
    public shadowUrl: string = 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png';
    public polyline: [number, number][] = [[51 , 7], [51.1 , 7.1], [51.2 , 7]];
    public pathColor: string = 'red';

    @ViewChild(MapComponent) private mapComponent: MapComponent;

    constructor() {
        (<any>window).app = this;
    }
    /*
    public removeLayer(layer: ITileLayerOptions): void {
        this.tileLayers.splice(this.tileLayers.indexOf(layer), 1);
    }
    public addLayer(): void {
        this.tileLayers.push({url: this.newLayerUrl, opacity: this.newLayerOpacity});
    }
    */

    public ngAfterViewInit(): void {
        (<any>window).map = this.mapComponent;
    }
}

@NgModule({
    declarations: [ AppComponent ],
    imports:      [ BrowserModule, FormsModule, YagaModule ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});
