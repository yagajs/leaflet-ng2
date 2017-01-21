// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule, MapComponent } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, AfterViewInit, ViewChild, PlatformRef } from '@angular/core';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<div class="container">
  <div class="map">
    <yaga-map [(zoom)]="zoom" [(lat)]="lat" [(lng)]="lng">
      <yaga-tile-layer *ngFor="let layer of tileLayers" [(url)]="layer.url" [(opacity)]="layer.opacity"></yaga-tile-layer>
    </yaga-map>
    <div class="map-status">
      <div class="input-group">
        <div class="input-group-btn">
          <!-- Button and dropdown menu -->
          <input type="text" class="form-control" [ngModel]="zoom">
          <input type="text" class="form-control" [ngModel]="lat">
          <input type="text" class="form-control" [ngModel]="lng">
        </div>
        <input type="text" class="form-control">
      </div>
    
    </div>
  </div>
  
  <div class="starter-template">
    <h1>Layertree</h1>
    <ol>
  <li *ngFor="let layer of tileLayers">
    <input class="form-control" type="text" [(ngModel)]="layer.url">
    <input class="form-control" type="range" max="1" min="0" step="0.05" [(ngModel)]="layer.opacity">
    <button class="btn btn-danger" (click)="removeLayer(layer)">Remove</button>
  </li>
  <li>
    <input type="text" [(ngModel)]="newLayerUrl">
    <input type="range" max="1" min="0" step="0.05" [(ngModel)]="newLayerOpacity">
    <button (click)="addLayer()">Add</button>
  </li>
</ol>
    </div>
  
</div><!-- /.container -->

`;
/* tslint:enable */

export interface ITileLayerOptions {
    url: string;
    opacity?: number;
}

@Component({
    selector: 'app',
    template
})
export class AppComponent implements AfterViewInit {
    public zoom: number = 10;
    public lat: number = 51;
    public lng: number = 7;
    public newLayerUrl: string = 'http://b.tile.opentopomap.org/{z}/{x}/{y}.png';
    public newLayerOpacity: number = 1;

    public tileLayers: ITileLayerOptions[] = [{url: 'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png', opacity: 1}];

    @ViewChild(MapComponent) private mapComponent: MapComponent;

    constructor() {
        (<any>window).app = this;
    }
    public removeLayer(layer: ITileLayerOptions): void {
        this.tileLayers.splice(this.tileLayers.indexOf(layer), 1);
    }
    public addLayer(): void {
        this.tileLayers.push({url: this.newLayerUrl, opacity: this.newLayerOpacity});
    }

    public ngAfterViewInit(): void {
        (<any>window).map = this.mapComponent;
    }
}

@NgModule({
    imports:      [ BrowserModule, FormsModule, YagaModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});