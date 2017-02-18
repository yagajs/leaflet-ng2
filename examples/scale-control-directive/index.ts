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
    <h3>Scale-Control Example</h3>
</div>
<div class="container">
  <div class="map">
    <yaga-map>
      <yaga-tile-layer url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"></yaga-tile-layer>
      
      <yaga-scale-control
         [metric]="metric"
         [imperial]="imperial"
         [maxWidth]="maxWidth"
         [position]="position"
       >
      </yaga-scale-control>
    
    </yaga-map>
  </div>
      
</div><!-- /.container -->

<div class="container">
   
    
    <h4>Scale Control Options</h4>  
    
    <div class="input-group">
        <span class="input-group-addon fixed-space">Metric</span>
        <input type="checkbox" class="form-control"  [(ngModel)]="metric">
    </div><!-- /input-group -->

    <div class="input-group">
    <span class="input-group-addon fixed-space">Imperial</span>
      <input type="checkbox" class="form-control"  [(ngModel)]="imperial">
    </div><!-- /input-group -->
    
    <div class="input-group">
    <span class="input-group-addon fixed-space">maxWidth</span>
      <input type="number" class="form-control"  [(ngModel)]="maxWidth">
    </div><!-- /input-group -->
    
    <h4>Control Options</h4> 
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

@Component({
    selector: 'app',
    template
})
export class AppComponent implements AfterViewInit {
    public metric: boolean = true;
    public imperial: boolean = true;
    // todo: public updateWhenIdle: boolean = true;
    public maxWidth: number = 150;
    public positionStates: ControlPosition[]= [
        'bottomleft' , 'bottomright', 'topleft' , 'topright'
    ];
    public position: ControlPosition;


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
