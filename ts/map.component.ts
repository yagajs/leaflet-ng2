/// <reference path="../typings/index.d.ts" />

import { Component, AfterViewInit, ElementRef, Inject, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { Map, ZoomPanOptions, LatLng, LatLngExpression, LatLngLiteral } from 'leaflet';

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

    @Output() protected zoomChange: EventEmitter<number> = new EventEmitter();
    @Output() protected latChange: EventEmitter<number> = new EventEmitter();
    @Output() protected lngChange: EventEmitter<number> = new EventEmitter();

    private setViewTimeout: number;
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
        console.log('after view init is called', (<any>window).g = this);
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

    setView(center: LatLngExpression, zoom: number, options?: ZoomPanOptions): this {
        var gotAChange: boolean = false,
            zoomChange: boolean = false,
            latChange: boolean = false,
            lngChange: boolean = false;
        if (!LatLng.prototype.isPrototypeOf(center)) {
            if (Array.prototype.isPrototypeOf(center)) {
                center = new LatLng((<any>center)[0], (<any>center)[1]);
            } else if ((<LatLngLiteral>center).lat && (<LatLngLiteral>center).lng) {
                center = new LatLng((<LatLngLiteral>center).lat, (<LatLngLiteral>center).lng);
            }
        }

        if ((<any>this)._loaded) {
            if (this.zoom !== zoom) {
                zoomChange = true;
                gotAChange = true;
            }
            if (this.lat !== (<LatLngLiteral>center).lat) {
                latChange = true;
                gotAChange = true;
            }
            if (this.lng !== (<LatLngLiteral>center).lng) {
                lngChange = true;
                gotAChange = true;
            }
        } else {
            gotAChange = true;
        }

        // Workaround against shagging zoom and map pan

        if (this.setViewTimeout) {
            clearTimeout(this.setViewTimeout);
        }
        this.setViewTimeout = setTimeout(() => {
            this.setViewTimeout = undefined;
            if (zoomChange) {
                this.zoomChange.emit(zoom);
            }
            if (latChange) {
                this.latChange.emit((<LatLngLiteral>center).lat);
            }
            if (lngChange) {
                this.lngChange.emit((<LatLngLiteral>center).lng);
            }
        }, ANIMATION_DELAY);



        if (!gotAChange) {
            return;
        }
        return super.setView((<LatLngExpression>center), zoom, options);
    }

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
}
