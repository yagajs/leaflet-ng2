// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule } from '../../lib/index'; // @yaga/leflet-ng2
import { ExampleAppComponentBlueprint } from '../app-component-blueprint';

import { Component, PlatformRef } from '@angular/core';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<div class="container">
  <div class="map">
    <yaga-map
      [(zoom)]="zoom"
      [(lat)]="lat"
      [(lng)]="lng"
      [(minZoom)]="minZoom"
      [(maxZoom)]="maxZoom"
      
      (baselayerchange)="handleEvent('baselayerchange');"
      (move)="handleEvent('move');"
      
      (click)="handleEvent('click');"
      (dblclick)="handleEvent('bblclick');"
      (mousedown)="handleEvent('mousedown');"
      (mouseup)="handleEvent('mouseup');"
      (mouseover)="handleEvent('mouseover');"
      (mouseout)="handleEvent('mouseout');"
      (mousemove)="handleEvent('mousemove');"
      (contextmenu)="handleEvent('contextmenu');"
      (keypress)="handleEvent('keypress');"
      (preclick)="handleEvent('preclick');"
      
      [scrollWheelZoomEnabled]="scrollWheelZoom"
      [touchZoomEnabled]="touchZoom"
      [tapEnabled]="tap"
      
      [closePopupOnClick]="closePopupOnClick"
    >
      <yaga-tile-layer [url]="'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'"></yaga-tile-layer>
      <yaga-marker [lat]="51" [lng]="7">
        <yaga-popup>This is the popup content...</yaga-popup>
      </yaga-marker>
    </yaga-map>
  </div>
  
  <div>
    <h3>Two-Way bound properties</h3>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Zoom</span>
      <input type="number" class="form-control" id="basic-url" [(ngModel)]="zoom">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Latitude</span>
      <input type="number" class="form-control" id="basic-url" [(ngModel)]="lat">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Longitude</span>
      <input type="number" class="form-control" id="basic-url" [(ngModel)]="lng">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Minimal zoom</span>
      <input type="number" class="form-control" id="basic-url" [(ngModel)]="minZoom">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Maximal zoom</span>
      <input type="number" class="form-control" id="basic-url" [(ngModel)]="maxZoom">
    </div>
    <h3>Listener properties</h3>
    <h4>Layer events</h4>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event baselayerchange</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="baselayerchangeEventValue">
    </div>
    
    <h4>Map state change events</h4>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event move</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="moveEventValue">
    </div>
    
    <h4>Interaction events</h4>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event click</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="clickEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event dblclick</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="dblclickEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event mousedown</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="mousedownEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event mouseup</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="mouseupEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event mouseover</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="mouseoverEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event mouseout</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="mouseoutEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event mousemove</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="mousemoveEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event contextmenu</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="contextmenuEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event keypress</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="keypressEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event preclick</span>
      <input type="text" class="form-control" id="basic-url" [ngModel]="preclickEventValue">
    </div>
    
    <h3>Options</h3>
    <h4>Mouse and Touch</h4>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Scroll Wheel Zoom</span>
      <input type="checkbox" class="form-control" [(ngModel)]="scrollWheelZoom">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Touch Zoom</span>
      <input type="checkbox" class="form-control" [(ngModel)]="touchZoom">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Tap Zoom</span>
      <input type="checkbox" class="form-control" [(ngModel)]="tap">
    </div>
    
    <h4>Popup and Tooltip</h4>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Close Popup on click</span>
      <input type="checkbox" class="form-control" [(ngModel)]="closePopupOnClick">
    </div>
</div><!-- /.container -->

`;
/* tslint:enable */

@Component({
    selector: 'app',
    template
})
export class AppComponent extends ExampleAppComponentBlueprint {
    // 2-way
    public zoom: number = 10;
    public lat: number = 51;
    public lng: number = 7;
    public minZoom: number = 1;
    public maxZoom: number = 15;
    public baselayerchangeEventValue: string;
    public moveEventValue: string;

    // Events
    public clickEventValue: string;
    public dblclickEventValue: string;
    public mousedownEventValue: string;
    public mouseupEventValue: string;
    public mouseoverEventValue: string;
    public mouseoutEventValue: string;
    public mousemoveEventValue: string;
    public contextmenuEventValue: string;
    public keypressEventValue: string;
    public preclickEventValue: string;

    public scrollWheelZoom: boolean = true;
    public touchZoom: boolean = true;
    public tap: boolean = true;

    public closePopupOnClick: boolean = true;
}

/*
 Two-Way

 [(maxBounds)]: Bounds
 Options

 Interaction Options

 [closePopupOnClick]: boolean
 [zoomSnap]: number
 [zoomDelta]: number
 [trackResize]: boolean
 [boxZoom]: boolean
 [doubleClickZoom]: boolean
 [dragging]: boolean
 Map State Options

 [maxBounds]: LatLngBounds
 [renderer]: Renderer
 Animation Options

 [fadeAnimation]: boolean
 [markerZoomAnimation]: boolean
 [transform3DLimit]: number
 [zoomAnimation]: boolean
 [zoomAnimationThreshold]: number
 Panning Inertia Options

 [inertia]: boolean
 [inertiaDeceleration]: number
 [inertiaMaxSpeed]: number
 [easeLinearity]: number
 [worldCopyJump]: boolean
 [maxBoundsViscosity]: number
 Keyboard Navigation Options

 [keyboard]: boolean
 [keyboardPanDelta]: number
 Mousewheel options

 [scrollWheelZoom]: boolean //leaflet also supports string with the value center
 [wheelDebounceTime]: number
 [wheelPxPerZoomLevel]: number
 Touch interaction options

 [tap]: boolean
 [tapTolerance]: number
 [touchZoom]: boolean
 [bounceAtZoomLimits]: boolean
 Events

 Layer events

 (baselayerchange): LayersControlEvent
 (overlayadd): LayersControlEvent
 (overlayremove): LayersControlEvent
 (layeradd): LayerEvent
 (layerremove): LayerEvent
 Map state change events

 (zoomlevelschange): Event
 (resize): ResizeEvent
 (unload): Event
 (viewreset): Event
 (load): Event
 (zoomstart): Event
 (movestart): Event
 (zoom): Event
 (move): Event
 (zoomend): Event
 (moveend): Event
 Popup events

 (popupopen): PopupEvent
 (popupclose): PopupEvent
 (autopanstart): Event
 Tooltip events

 (tooltipopen): TooltipEvent
 (tooltipclose): TooltipEvent

 Animation Options

 (zoomanim): ZoomAnimEvent
 */

@NgModule({
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent ],
    imports:      [ BrowserModule, FormsModule, YagaModule ]
})
export class AppModule { }

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});