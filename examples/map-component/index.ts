// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule, MapComponent, Event } from '../../lib/index'; // @yaga/leflet-ng2

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
    <yaga-map
      [(zoom)]="zoom"
      [(lat)]="lat"
      [(lng)]="lng"
      [(minZoom)]="minZoom"
      [(maxZoom)]="maxZoom"
      (baselayerchange)="baselayerchangeEventValue = 'baselayer change'"
      (move)="handleMoveEvent($event);"
    >
      <yaga-tile-layer [url]="'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'"></yaga-tile-layer>
    </yaga-map>
  </div>
  
  <div>
    <h3>Two-Way binded properties</h3>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Zoom</span>
      <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3" [(ngModel)]="zoom">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Latitude</span>
      <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3" [(ngModel)]="lat">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Longitude</span>
      <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3" [(ngModel)]="lng">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Minimal zoom</span>
      <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3" [(ngModel)]="minZoom">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Maximal zoom</span>
      <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3" [(ngModel)]="maxZoom">
    </div>
    <h3>Listener properties</h3>
    <h4>Layer events</h4>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event baselayerchange</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="baselayerchangeEventValue">
    </div>
    
    
    
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event move</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="moveEventValue">
    </div>
</div><!-- /.container -->

`;
/* tslint:enable */

interface ITileLayerOptions {
    url: string;
    opacity?: number;
}

const HIDE_DELAY: number = 500;

@Component({
    selector: 'app',
    template
})
export class AppComponent implements AfterViewInit {
    // 2-way
    public zoom: number = 10;
    public lat: number = 51;
    public lng: number = 7;
    public minZoom: number = 1;
    public maxZoom: number = 15;
    public baselayerchangeEventValue: string = '';
    public moveEventValue: string = '';

    public tileLayers: ITileLayerOptions[] = [{url: 'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png', opacity: 1}];

    @ViewChild(MapComponent) private mapComponent: MapComponent;

    constructor() {
        (<any>window).app = this;
    }
    public handleMoveEvent(event: Event): void {
        this.moveEventValue = 'Event fired now...';
        setTimeout(() => {
            this.moveEventValue = '';
        }, HIDE_DELAY);
    };

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

/*
 Two-Way

 [(lat)]: number
 [(lng)]: number
 [(zoom)]: number
 [(minZoom)]: number
 [(maxZoom)]: number
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

 [crs]: CRS
 [center]: LatLng
 [zoom]: number
 [minZoom]: number
 [maxZoom]: number
 [layers]: Layer[]
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
 Interaction events

 (click): MouseEvent
 (dblclick): MouseEvent
 (mousedown): MouseEvent
 (mouseup): MouseEvent
 (mouseover): MouseEvent
 (mouseout): MouseEvent
 (mousemove): MouseEvent
 (contextmenu): MouseEvent
 (keypress): KeyboardEvent
 (preclick): MouseEvent
 Animation Options

 (zoomanim): ZoomAnimEvent
 */

@NgModule({
    imports:      [ BrowserModule, FormsModule, YagaModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});