/// <reference path="../typings/index.d.ts" />

import { Component,
    AfterViewInit,
    ElementRef,
    Inject,
    Input,
    Output,
    EventEmitter,
    // ContentChildren,
    // QueryList
} from '@angular/core';
import {
    Map,
    LatLng,
    LatLngBoundsExpression,
    LatLngBounds,
    LatLngBoundsLiteral
} from 'leaflet';

// import { TileLayerDirective } from './tile-layer.directive';

const ANIMATION_DELAY: number = 300; // delay to wait for UI Changes...

@Component({
    selector: 'yaga-map',
    template: `<span style="display: none"><ng-content></ng-content></span>`
})
export class MapComponent extends Map implements AfterViewInit {

    // zoom: number;

    protected domRoot: HTMLElement;
    protected mapDomRoot: HTMLElement;

    // @ContentChildren(TileLayerDirective) public tileLayerDirectives: QueryList<TileLayerDirective>;

    @Output() public zoomChange: EventEmitter<number> = new EventEmitter();
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    @Output() public minZoomChange: EventEmitter<number> = new EventEmitter();
    @Output() public maxZoomChange: EventEmitter<number> = new EventEmitter();
    @Output() public maxBoundsChange: EventEmitter<LatLngBounds> = new EventEmitter();

    private moveendTimeout: number;

    constructor(
        @Inject(ElementRef) elementRef: ElementRef,
    ) {
        super(document.createElement('div'), { attributionControl: false, zoomControl: false});

        this.setView([0, 0], 0);

        this.domRoot = elementRef.nativeElement;
        this.mapDomRoot = (<any>this)._container;
        this.mapDomRoot.setAttribute('class', this.mapDomRoot.getAttribute('class') + ' yaga-map');

        this.on('moveend', () => {
            if (this.moveendTimeout) {
                clearTimeout(this.moveendTimeout);
            }
            this.moveendTimeout = setTimeout(() => {
                this.latChange.emit(this.lat);
                this.lngChange.emit(this.lng);
                this.zoomChange.emit(this.zoom);
            }, ANIMATION_DELAY);
        });

    }
    ngAfterViewInit(): void {
        this.domRoot.appendChild(this.mapDomRoot);

        this.invalidateSize(false);

        // this.tileLayerDirectives.forEach((tileLayerDirective: TileLayerDirective) => {
        //     this.addLayer(tileLayerDirective);
        // });
        // this.tileLayerDirectives.changes.subscribe((...args) => {console.log('tile layer change', args);});
    }

    /*setZoom(zoom: number, options?: ZoomPanOptions): this {
     if (this.zoom === zoom) {
     return;
     }
     this.zoomChange.emit(zoom);
     return super.setZoom(zoom, options)
     }*/

    // already handled with moveend
    // setView(center: LatLngExpression, zoom: number, options?: ZoomPanOptions): this {

    @Input() set zoom(val: number) {
        this.setZoom(val);
    }
    get zoom(): number {
        return this.getZoom();
    }

    @Input() set lat(val: number) {
        const coords: LatLng = new LatLng(val, this.getCenter().lng);
        this.setView(coords, this.zoom);
    }
    get lat(): number {
        return this.getCenter().lat;
    }

    @Input() set lng(val: number) {
        const coords: LatLng =  new LatLng(this.getCenter().lat, val);
        this.setView(coords, this.zoom);
    }
    get lng(): number {
        return this.getCenter().lng;
    }

    setMinZoom(val: number): this {
        this.minZoomChange.emit(val);
        return super.setMinZoom(val);
    }

    @Input() set minZoom(val: number) {
        this.setMinZoom(val);
    }
    get minZoom(): number {
        return this.getMinZoom();
    }

    setMaxZoom(val: number): this {
        this.maxZoomChange.emit(val);
        return super.setMaxZoom(val);
    }

    @Input() set maxZoom(val: number) {
        this.setMaxZoom(val);
    }
    get maxZoom(): number {
        return this.getMaxZoom();
    }

    setMaxBounds(bounds: LatLngBoundsExpression): this {
        super.setMaxBounds((<LatLngBoundsLiteral>bounds));
        this.maxBoundsChange.emit(this.maxBounds);
        return this;
    }

    @Input() set maxBounds(val: LatLngBounds) {
        this.setMaxBounds(val);
    }
    get maxBounds(): LatLngBounds {
        return (<any>this).options.maxBounds;
    }
}
