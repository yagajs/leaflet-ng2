// Shims
import 'reflect-metadata';
import 'zone.js';

import {YagaModule, MapComponent, ControlPosition} from '../../lib/index'; // @yaga/leflet-ng2

import {Component, AfterViewInit, ViewChild, PlatformRef} from '@angular/core';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<div class="container">
  <div class="map">
    <yaga-map>
      
      <yaga-tile-layer [url]="'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'">
      </yaga-tile-layer>
      
      <yaga-zoom-control 
         [(position)]="position"
         [(display)]="display"
         [zIndex]="zIndex">
      </yaga-zoom-control>
    
    </yaga-map>
  </div>
      
</div><!-- /.container -->

<div class="container">
   
    <h3>Two-Way bound properties</h3>   
    <div class="input-group">
    <span class="input-group-addon fixed-space">Position</span>
    
    <select  class="form-control" name="state" [(ngModel)]="position">
        <option value="" disabled>Choose a state</option>
        <option *ngFor="let state of states" [ngValue]="state">
        {{ state }}
        </option>
    </select>
    </div><!-- /input-group -->
    
    
    <h3>Listener properties</h3>   
    <h4>Map state changed events</h4>   
    <div class="input-group">
        <span class="input-group-addon fixed-space">Display</span>
        <input type="checkbox" class="form-control"  [(ngModel)]="display">
    </div><!-- /input-group -->
        
    
    <div class="input-group">
    <span class="input-group-addon fixed-space">Z-Index</span>
      <input type="number" class="form-control"  [(ngModel)]="zIndex">
    </div><!-- /input-group -->
    

    
</div>

`;
/* tslint:enable */

interface ITileLayerOptions {
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
    public states: ControlPosition[]= [
        'topleft' , 'topright' , 'bottomleft' , 'bottomright'
    ];
    public position: ControlPosition;
    public zIndex: number = 1;
    public display: boolean = true;



    @ViewChild(MapComponent) private mapComponent: MapComponent;

    constructor() {
        (<any>window).app = this;
        this.position = this.states[0];
    }

    public handlePositionEvent(event: Event): void {
        console.log(event);
    }

    public ngAfterViewInit(): void {
        (<any>window).map = this.mapComponent;
    }
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, YagaModule]
})
export class AppModule {
}

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});
