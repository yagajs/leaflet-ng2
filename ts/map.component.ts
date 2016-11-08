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
    LatLngBoundsLiteral,
    LayersControlEvent,
    LayerEvent,
    Event,
    ResizeEvent,
    PopupEvent,
    TooltipEvent,
    MouseEvent,
    KeyboardEvent,
    ZoomAnimEvent
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

    @Output('baselayerchange') public baselayerchangeEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    @Output('overlayadd') public overlayaddEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    @Output('overlayremove') public overlayremoveEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    @Output('layeradd') public layeraddEvent: EventEmitter<LayerEvent> = new EventEmitter();
    @Output('layerremove') public layerremoveEvent: EventEmitter<LayerEvent> = new EventEmitter();
    @Output('zoomlevelschange') public zoomlevelschangeEvent: EventEmitter<Event> = new EventEmitter();
    @Output('resize') public resizeEvent: EventEmitter<ResizeEvent> = new EventEmitter();
    @Output('unload') public unloadEvent: EventEmitter<Event> = new EventEmitter();
    @Output('viewreset') public viewresetEvent: EventEmitter<Event> = new EventEmitter();
    @Output('load') public loadEvent: EventEmitter<Event> = new EventEmitter();
    @Output('zoomstart') public zoomstartEvent: EventEmitter<Event> = new EventEmitter();
    @Output('movestart') public movestartEvent: EventEmitter<Event> = new EventEmitter();
    @Output('zoom') public zoomEvent: EventEmitter<Event> = new EventEmitter();
    @Output('move') public moveEvent: EventEmitter<Event> = new EventEmitter();
    @Output('zoomend') public zoomendEvent: EventEmitter<Event> = new EventEmitter();
    @Output('moveend') public moveendEvent: EventEmitter<Event> = new EventEmitter();
    @Output('popupopen') public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    @Output('popupclose') public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    @Output('autopanstart') public autopanstartEvent: EventEmitter<Event> = new EventEmitter();
    @Output('tooltipopen') public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    @Output('tooltipclose') public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    @Output('click') public clickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('dblclick') public dblclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mousedown') public mousedownEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mouseup') public mouseupEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mouseover') public mouseoverEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mouseout') public mouseoutEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mousemove') public mousemoveEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('contextmenu') public contextmenuEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('keypress') public keypressEvent: EventEmitter<KeyboardEvent> = new EventEmitter();
    @Output('preclick') public preclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('zoomanim') public zoomanimEvent: EventEmitter<ZoomAnimEvent> = new EventEmitter();

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

        this.on('baselayerchange', (event: LayersControlEvent) => {
            this.baselayerchangeEvent.emit(event);
        });
        this.on('overlayadd', (event: LayersControlEvent) => {
            this.overlayaddEvent.emit(event);
        });
        this.on('overlayremove', (event: LayersControlEvent) => {
            this.overlayremoveEvent.emit(event);
        });
        this.on('layeradd', (event: LayerEvent) => {
            this.layeraddEvent.emit(event);
        });
        this.on('layerremove', (event: LayerEvent) => {
            this.layerremoveEvent.emit(event);
        });
        this.on('zoomlevelschange', (event: Event) => {
            this.zoomlevelschangeEvent.emit(event);
        });
        this.on('resize', (event: ResizeEvent) => {
            this.resizeEvent.emit(event);
        });
        this.on('unload', (event: Event) => {
            this.unloadEvent.emit(event);
        });
        this.on('viewreset', (event: Event) => {
            this.viewresetEvent.emit(event);
        });
        this.on('load', (event: Event) => {
            this.loadEvent.emit(event);
        });
        this.on('zoomstart', (event: Event) => {
            this.zoomstartEvent.emit(event);
        });
        this.on('movestart', (event: Event) => {
            this.movestartEvent.emit(event);
        });
        this.on('zoom', (event: Event) => {
            this.zoomEvent.emit(event);
        });
        this.on('move', (event: Event) => {
            this.moveEvent.emit(event);
        });
        this.on('zoomend', (event: Event) => {
            this.zoomendEvent.emit(event);
        });
        this.on('moveend', (event: Event) => {
            this.moveendEvent.emit(event);
        });
        this.on('popupopen', (event: PopupEvent) => {
            this.popupopenEvent.emit(event);
        });
        this.on('popupclose', (event: PopupEvent) => {
            this.popupcloseEvent.emit(event);
        });
        this.on('autopanstart', (event: Event) => {
            this.autopanstartEvent.emit(event);
        });
        this.on('tooltipopen', (event: TooltipEvent) => {
            this.tooltipopenEvent.emit(event);
        });
        this.on('tooltipclose', (event: TooltipEvent) => {
            this.tooltipcloseEvent.emit(event);
        });
        this.on('click', (event: MouseEvent) => {
            this.clickEvent.emit(event);
        });
        this.on('dblclick', (event: MouseEvent) => {
            this.dblclickEvent.emit(event);
        });
        this.on('mousedown', (event: MouseEvent) => {
            this.mousedownEvent.emit(event);
        });
        this.on('mouseup', (event: MouseEvent) => {
            this.mouseupEvent.emit(event);
        });
        this.on('mouseover', (event: MouseEvent) => {
            this.mouseoverEvent.emit(event);
        });
        this.on('mouseout', (event: MouseEvent) => {
            this.mouseoutEvent.emit(event);
        });
        this.on('mousemove', (event: MouseEvent) => {
            this.mousemoveEvent.emit(event);
        });
        this.on('contextmenu', (event: MouseEvent) => {
            this.contextmenuEvent.emit(event);
        });
        this.on('keypress', (event: KeyboardEvent) => {
            this.keypressEvent.emit(event);
        });
        this.on('preclick', (event: MouseEvent) => {
            this.preclickEvent.emit(event);
        });
        this.on('zoomanim', (event: ZoomAnimEvent) => {
            this.zoomanimEvent.emit(event);
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
