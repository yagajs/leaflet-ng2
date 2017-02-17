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
    <h3>Zoom-Control Example</h3>
</div>

<div class="container">
  <div class="map">
    <yaga-map>
      
      <yaga-tile-layer [url]="'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'">
      </yaga-tile-layer>
      
      <yaga-zoom-control 
         [(position)]="position"
         [zoomInText]="zoomInText"
         [zoomInTitle]="zoomInTitle"
         [zoomOutText]="zoomOutText"
         [zoomOutTitle]="zoomOutTitle"
      >
      </yaga-zoom-control>
    
    </yaga-map>
  </div>
      
</div><!-- /.container -->

<div class="container">

    <h3>Zoom-Control options</h3>
      
    <div class="input-group">
    <span class="input-group-addon fixed-space">zoomInText</span>
      <input type="text" class="form-control"  [(ngModel)]="zoomInText">
    </div><!-- /input-group -->
       
    <div class="input-group">
    <span class="input-group-addon fixed-space">zoomInTitle</span>
      <input type="text" class="form-control"  [(ngModel)]="zoomInTitle">
    </div><!-- /input-group -->
        
    <div class="input-group">
    <span class="input-group-addon fixed-space">zoomOutText</span>
      <input type="text" class="form-control"  [(ngModel)]="zoomOutText">
    </div><!-- /input-group -->
       
    <div class="input-group">
    <span class="input-group-addon fixed-space">zoomOutTitle</span>
      <input type="text" class="form-control"  [(ngModel)]="zoomOutTitle">
    </div><!-- /input-group -->
    
   
    <h3>Control options</h3>   
    <div class="input-group">
    <span class="input-group-addon fixed-space">Position</span>
    <select  class="form-control" name="state" [(ngModel)]="position">
        <option *ngFor="let state of positionStates" [ngValue]="state">
        {{ state }}
        </option>
    </select>
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
    public positionStates: ControlPosition[]= [
        'topleft' , 'topright' , 'bottomleft' , 'bottomright'
    ];
    public position: ControlPosition;

    public zoomInText: string = '+';
    public zoomInTitle: string = 'Zoom in';
    public zoomOutText: string = '-';
    public zoomOutTitle: string ='Zoom out';



    @ViewChild(MapComponent) private mapComponent: MapComponent;

    constructor() {
        (<any>window).app = this;
        this.position = this.positionStates[0];
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
