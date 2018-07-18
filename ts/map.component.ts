import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    Inject,
    Input,
    Output,
} from "@angular/core";
import {
    CRS,
    LatLng,
    LatLngBounds,
    LatLngBoundsExpression,
    LatLngBoundsLiteral,
    LayerEvent,
    LayersControlEvent,
    LeafletEvent,
    LeafletKeyboardEvent,
    LeafletMouseEvent,
    Map,
    PopupEvent,
    ResizeEvent,
    TooltipEvent,
    ZoomAnimEvent,
} from "leaflet";
import { ANIMATION_DELAY } from "./consts";
import { LayerGroupProvider } from "./layer-group.provider";
import { MapProvider } from "./map.provider";

/**
 * Angular2 root component for a Leaflet map
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map
 *     [(zoom)]="..."
 *     [(lat)]="..."
 *     [(lng)]="..."
 *     [(minZoom)]="..."
 *     [(maxZoom)]="..."
 *     [(maxBounds)]="..."
 *
 *     (baselayerchange)="..."
 *     (overlayadd)="..."
 *     (overlayremove)="..."
 *     (layeradd)="..."
 *     (layerremove)="..."
 *     (zoomlevelschan)="..."
 *     (resize)="..."
 *     (unload)="..."
 *     (viewreset)="..."
 *     (load)="..."
 *     (zoomstart)="..."
 *     (movestart)="..."
 *     (zoom)="..."
 *     (move)="..."
 *     (zoomend)="..."
 *     (moveend)="..."
 *     (popupopen)="..."
 *     (popupclose)="..."
 *     (autopanstart)="..."
 *     (tooltipopen)="..."
 *     (tooltipclose)="..."
 *     (click)="..."
 *     (dblclick)="..."
 *     (mousedown)="..."
 *     (mouseup)="..."
 *     (mouseover)="..."
 *     (mouseout)="..."
 *     (mousemove)="..."
 *     (contextmenu)="..."
 *     (keypress)="..."
 *     (preclick)="..."
 *     (zoomanim)="..."
 *
 *     [crs]="..."
 *     [closePopupOnClick]="..."
 *     [zoomSnap]="..."
 *     [zoomDelta]="..."
 *     [trackResize]="..."
 *     [boxZoomEnabled]="..."
 *     [doubleClickZoomEnabled]="..."
 *     [draggingEnabled]="..."
 *     [fadeAnimation]="..."
 *     [markerZoomAnimation]="..."
 *     [transform3DLimit]="..."
 *     [zoomAnimation]="..."
 *     [zoomAnimationThreshold]="..."
 *     [inertia]="..."
 *     [inertiaDeceleration]="..."
 *     [inertiaMaxSpeed]="..."
 *     [easeLinearity]="..."
 *     [worldCopyJump]="..."
 *     [maxBoundsViscosity]="..."
 *     [keyboardEnabled]="..."
 *     [keyboardPanDelta]="..."
 *     [scrollWheelZoomEnabled]="..."
 *     [wheelDebounceTime]="..."
 *     [wheelPxPerZoomLevel]="..."
 *     [tapEnabled]="..."
 *     [tapTolerance]="..."
 *     [bounceAtZoomLimits]="..."
 *     [touchZoomEnabled]="...">
 *     <!-- other yaga directives -->
 * </yaga-map>
 * ```
 *
 * You can use the following directives as child of this one:
 *
 * * yaga-attribution-control
 * * yaga-circle
 * * yaga-circle-marker
 * * yaga-geojson
 * * yaga-image-overlay
 * * yaga-marker
 * * yaga-polygon
 * * yaga-polyline
 * * yaga-rectangle
 * * yaga-scale-control
 * * yaga-tile-layer
 * * yaga-wms-layer
 * * yaga-zoom-control
 *
 * @link http://leafletjs.com/reference-1.2.0.html#tilelayer Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Tile-Layer%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/tile-layer.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/tilelayerdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/tile-layer-directive
 */
@Component({
    providers: [ LayerGroupProvider, MapProvider ],
    selector: "yaga-map",
    styles: [`:host { display: block; }`],
    template: `<span style="display: none"><ng-content></ng-content></span>`,
})
export class MapComponent extends Map implements AfterViewInit {
    /**
     * Two-Way bound property for the zoom.
     * Use it with `<yaga-map [(zoom)]="someValue">` or `<yaga-map (zoomChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setzoom Original Leaflet documentation
     */
    @Output() public zoomChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the center latitude.
     * Use it with `<yaga-map [(lat)]="someValue">` or `<yaga-map (latChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
     */
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the center longitude.
     * Use it with `<yaga-map [(lng)]="someValue">` or `<yaga-map (lngChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
     */
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the minimal available zoom.
     * Use it with `<yaga-map [(minZoom)]="someValue">` or `<yaga-map (minZoomChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setminzoom Original Leaflet documentation
     */
    @Output() public minZoomChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the maximal available zoom.
     * Use it with `<yaga-map [(maxZoom)]="someValue">` or `<yaga-map (maxZoomChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxzoom Original Leaflet documentation
     */
    @Output() public maxZoomChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the bounds on the map.
     * Use it with `<yaga-map [(maxBounds)]="someValue">`
     * or `<yaga-map (maxBoundsChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxbounds Original Leaflet documentation
     */
    @Output() public maxBoundsChange: EventEmitter<LatLngBounds> = new EventEmitter();

    /**
     * From leaflet fired baselayerchange event.
     * Use it with `<yaga-tile-layer (baselayerchange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-baselayerchange Original Leaflet documentation
     */
    @Output("baselayerchange") public baselayerchangeEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    /**
     * From leaflet fired overlayadd event.
     * Use it with `<yaga-tile-layer (overlayadd)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-overlayadd Original Leaflet documentation
     */
    @Output("overlayadd") public overlayaddEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    /**
     * From leaflet fired overlayremove event.
     * Use it with `<yaga-tile-layer (overlayremove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-overlayremove Original Leaflet documentation
     */
    @Output("overlayremove") public overlayremoveEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    /**
     * From leaflet fired layeradd event.
     * Use it with `<yaga-tile-layer (layeradd)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-layeradd Original Leaflet documentation
     */
    @Output("layeradd") public layeraddEvent: EventEmitter<LayerEvent> = new EventEmitter();
    /**
     * From leaflet fired layerremove event.
     * Use it with `<yaga-tile-layer (layerremove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-layerremove Original Leaflet documentation
     */
    @Output("layerremove") public layerremoveEvent: EventEmitter<LayerEvent> = new EventEmitter();
    /**
     * From leaflet fired zoomlevelschan event.
     * Use it with `<yaga-tile-layer (zoomlevelschan)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomlevelschan Original Leaflet documentation
     */
    @Output("zoomlevelschange") public zoomlevelschangeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired resize event.
     * Use it with `<yaga-tile-layer (resize)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-resize Original Leaflet documentation
     */
    @Output("resize") public resizeEvent: EventEmitter<ResizeEvent> = new EventEmitter();
    /**
     * From leaflet fired unload event.
     * Use it with `<yaga-tile-layer (unload)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-unload Original Leaflet documentation
     */
    @Output("unload") public unloadEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired viewreset event.
     * Use it with `<yaga-tile-layer (viewreset)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-viewreset Original Leaflet documentation
     */
    @Output("viewreset") public viewresetEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired load event.
     * Use it with `<yaga-tile-layer (load)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-load Original Leaflet documentation
     */
    @Output("load") public loadEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired zoomstart event.
     * Use it with `<yaga-tile-layer (zoomstart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomstart Original Leaflet documentation
     */
    @Output("zoomstart") public zoomstartEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired movestart event.
     * Use it with `<yaga-tile-layer (movestart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-movestart Original Leaflet documentation
     */
    @Output("movestart") public movestartEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired zoom event.
     * Use it with `<yaga-tile-layer (zoom)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoom Original Leaflet documentation
     */
    @Output("zoom") public zoomEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired move event.
     * Use it with `<yaga-tile-layer (move)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-move Original Leaflet documentation
     */
    @Output("move") public moveEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired zoomend event.
     * Use it with `<yaga-tile-layer (zoomend)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomend Original Leaflet documentation
     */
    @Output("zoomend") public zoomendEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired moveend event.
     * Use it with `<yaga-tile-layer (moveend)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-moveend Original Leaflet documentation
     */
    @Output("moveend") public moveendEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired (undocumented) boxzoomstart event.
     * Use it with `<yaga-tile-layer (boxzoomstart)="processEvent($event)">`
     * @link https://github.com/Leaflet/Leaflet/blob/master/src/map/handler/Map.BoxZoom.js SourceCode
     */
    @Output("boxzoomstart") public boxzoomstartEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired (undocumented) boxzoomend event.
     * Use it with `<yaga-tile-layer (boxzoomend)="processEvent($event)">`
     * @link https://github.com/Leaflet/Leaflet/blob/master/src/map/handler/Map.BoxZoom.js SourceCode
     */
    @Output("boxzoomend") public boxzoomendEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-tile-layer (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-popupopen Original Leaflet documentation
     */
    @Output("popupopen") public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-tile-layer (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-popupclose Original Leaflet documentation
     */
    @Output("popupclose") public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired autopanstart event.
     * Use it with `<yaga-tile-layer (autopanstart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-autopanstart Original Leaflet documentation
     */
    @Output("autopanstart") public autopanstartEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-tile-layer (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-tooltipopen Original Leaflet documentation
     */
    @Output("tooltipopen") public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-tile-layer (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-tooltipclose Original Leaflet documentation
     */
    @Output("tooltipclose") public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-tile-layer (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-click Original Leaflet documentation
     */
    @Output("click") public clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired dblclick event.
     * Use it with `<yaga-tile-layer (dblclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-dblclick Original Leaflet documentation
     */
    @Output("dblclick") public dblclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-tile-layer (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-mousedown Original Leaflet documentation
     */
    @Output("mousedown") public mousedownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseup event.
     * Use it with `<yaga-tile-layer (mouseup)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-mouseup Original Leaflet documentation
     */
    @Output("mouseup") public mouseupEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-tile-layer (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-mouseover Original Leaflet documentation
     */
    @Output("mouseover") public mouseoverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-tile-layer (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-mouseout Original Leaflet documentation
     */
    @Output("mouseout") public mouseoutEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousemove event.
     * Use it with `<yaga-tile-layer (mousemove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-mousemove Original Leaflet documentation
     */
    @Output("mousemove") public mousemoveEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-tile-layer (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-contextmenu Original Leaflet documentation
     */
    @Output("contextmenu") public contextmenuEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired keypress event.
     * Use it with `<yaga-tile-layer (keypress)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-keypress Original Leaflet documentation
     */
    @Output("keypress") public keypressEvent: EventEmitter<LeafletKeyboardEvent> = new EventEmitter();
    /**
     * From leaflet fired preclick event.
     * Use it with `<yaga-tile-layer (preclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-preclick Original Leaflet documentation
     */
    @Output("preclick") public preclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired zoomanim event.
     * Use it with `<yaga-tile-layer (zoomanim)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomanim Original Leaflet documentation
     */
    @Output("zoomanim") public zoomanimEvent: EventEmitter<ZoomAnimEvent> = new EventEmitter();

    private moveTimeout: any;
    private isZooming: boolean = false;

    constructor(
        @Inject(ElementRef) elementRef: ElementRef,
        @Host() layerProvider: LayerGroupProvider,
        mapProvider: MapProvider,
    ) {
        super(elementRef.nativeElement, { attributionControl: false, zoomControl: false});

        mapProvider.ref = this;
        layerProvider.ref = this;

        const moveFn: () => any = () => {
            if (this.isZooming) {
                this.moveTimeout = setTimeout(moveFn, ANIMATION_DELAY);
                return;
            }
            this.latChange.emit(this.lat);
            this.lngChange.emit(this.lng);
            this.zoomChange.emit(this.zoom);
            this.moveTimeout = undefined;
        };

        this.setView([0, 0], 0);

        elementRef.nativeElement.setAttribute("class", elementRef.nativeElement.getAttribute("class") + " yaga-map");

        this.on("move", () => {
            if (this.moveTimeout) {
                clearTimeout(this.moveTimeout);
            }
            this.moveTimeout = setTimeout(moveFn, ANIMATION_DELAY);
        });
        this.on("zoomstart", () => {
            this.isZooming = true;
        });
        this.on("zoomend", () => {
            this.isZooming = false;
            if (this.moveTimeout) {
                clearTimeout(this.moveTimeout);
            }
            this.moveTimeout = setTimeout(moveFn, ANIMATION_DELAY);
        });

        this.on("baselayerchange", (event: LeafletEvent) => {
            this.baselayerchangeEvent.emit(event as LayersControlEvent);
        });
        this.on("overlayadd", (event: LeafletEvent) => {
            this.overlayaddEvent.emit(event as LayersControlEvent);
        });
        this.on("overlayremove", (event: LeafletEvent) => {
            this.overlayremoveEvent.emit(event as LayersControlEvent);
        });
        this.on("layeradd", (event: LeafletEvent) => {
            this.layeraddEvent.emit(event as LayerEvent);
        });
        this.on("layerremove", (event: LeafletEvent) => {
            this.layerremoveEvent.emit(event as LayerEvent);
        });
        this.on("zoomlevelschange", (event: LeafletEvent) => {
            this.zoomlevelschangeEvent.emit(event);
        });
        this.on("resize", (event: LeafletEvent) => {
            this.resizeEvent.emit(event as ResizeEvent);
        });
        this.on("unload", (event: LeafletEvent) => {
            this.unloadEvent.emit(event);
        });
        this.on("viewreset", (event: LeafletEvent) => {
            this.viewresetEvent.emit(event);
        });
        this.on("load", (event: LeafletEvent) => {
            this.loadEvent.emit(event);
        });
        this.on("zoomstart", (event: LeafletEvent) => {
            this.zoomstartEvent.emit(event);
        });
        this.on("movestart", (event: LeafletEvent) => {
            this.movestartEvent.emit(event);
        });
        this.on("zoom", (event: LeafletEvent) => {
            this.zoomEvent.emit(event);
        });
        this.on("move", (event: LeafletEvent) => {
            this.moveEvent.emit(event);
        });
        this.on("zoomend", (event: LeafletEvent) => {
            this.zoomendEvent.emit(event);
        });
        this.on("moveend", (event: LeafletEvent) => {
            this.moveendEvent.emit(event);
        });
        this.on("boxzoomstart", (event: LeafletEvent) => {
            this.boxzoomstartEvent.emit(event);
        });
        this.on("boxzoomend", (event: LeafletEvent) => {
            this.boxzoomendEvent.emit(event);
        });
        this.on("popupopen", (event: LeafletEvent) => {
            this.popupopenEvent.emit(event as PopupEvent);
        });
        this.on("popupclose", (event: LeafletEvent) => {
            this.popupcloseEvent.emit(event as PopupEvent);
        });
        this.on("autopanstart", (event: LeafletEvent) => {
            this.autopanstartEvent.emit(event);
        });
        this.on("tooltipopen", (event: LeafletEvent) => {
            this.tooltipopenEvent.emit(event as TooltipEvent);
        });
        this.on("tooltipclose", (event: LeafletEvent) => {
            this.tooltipcloseEvent.emit(event as TooltipEvent);
        });
        this.on("click", (event: LeafletEvent) => {
            this.clickEvent.emit(event as LeafletMouseEvent);
        });
        this.on("dblclick", (event: LeafletEvent) => {
            this.dblclickEvent.emit(event as LeafletMouseEvent);
        });
        this.on("mousedown", (event: LeafletEvent) => {
            this.mousedownEvent.emit(event as LeafletMouseEvent);
        });
        this.on("mouseup", (event: LeafletEvent) => {
            this.mouseupEvent.emit(event as LeafletMouseEvent);
        });
        this.on("mouseover", (event: LeafletEvent) => {
            this.mouseoverEvent.emit(event as LeafletMouseEvent);
        });
        this.on("mouseout", (event: LeafletEvent) => {
            this.mouseoutEvent.emit(event as LeafletMouseEvent);
        });
        this.on("mousemove", (event: LeafletEvent) => {
            this.mousemoveEvent.emit(event as LeafletMouseEvent);
        });
        this.on("contextmenu", (event: LeafletEvent) => {
            this.contextmenuEvent.emit(event as LeafletMouseEvent);
        });
        this.on("keypress", (event: LeafletEvent) => {
            this.keypressEvent.emit(event as LeafletKeyboardEvent);
        });
        this.on("preclick", (event: LeafletEvent) => {
            this.preclickEvent.emit(event as LeafletMouseEvent);
        });
        this.on("zoomanim", (event: LeafletEvent) => {
            this.zoomanimEvent.emit(event as ZoomAnimEvent);
        });
    }

    /**
     * This function gets called from Angular after initializing the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/AfterViewInit-class.html
     */
    public ngAfterViewInit(): void {
        this.invalidateSize(false);
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
    /**
     * Two-Way bound property for the zoom.
     * Use it with `<yaga-map [(zoom)]="someValue">` or `<yaga-map [zoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setzoom Original Leaflet documentation
     */
    @Input() public set zoom(val: number) {
        this.setZoom(val);
    }
    public get zoom(): number {
        return this.getZoom();
    }

    /**
     * Two-Way bound property for the latitude.
     * Use it with `<yaga-map [(lat)]="someValue">` or `<yaga-map [lat]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
     */
    @Input() public set lat(val: number) {
        const coords: LatLng = new LatLng(val, this.getCenter().lng);
        this.setView(coords, this.zoom);
    }
    public get lat(): number {
        return this.getCenter().lat;
    }

    /**
     * Two-Way bound property for the longitude.
     * Use it with `<yaga-map [(lng)]="someValue">` or `<yaga-map [lng]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
     */
    @Input() public set lng(val: number) {
        const coords: LatLng =  new LatLng(this.getCenter().lat, val);
        this.setView(coords, this.zoom);
    }
    public get lng(): number {
        return this.getCenter().lng;
    }

    /**
     * Derived method of the original setMinZoom method.
     * @link http://leafletjs.com/reference-1.2.0.html#map-setminzoom Original Leaflet documentation
     */
    public setMinZoom(val: number): this {
        this.minZoomChange.emit(val);
        return super.setMinZoom(val);
    }

    /**
     * Two-Way bound property for the minimal availabe zoom.
     * Use it with `<yaga-map [(minZoom)]="someValue">` or `<yaga-map [minZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setminzoom Original Leaflet documentation
     */
    @Input() public set minZoom(val: number) {
        this.setMinZoom(val);
    }
    public get minZoom(): number {
        return this.getMinZoom();
    }

    /**
     * Derived method of the original setMaxZoom method.
     * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxzoom Original Leaflet documentation
     */
    public setMaxZoom(val: number): this {
        this.maxZoomChange.emit(val);
        return super.setMaxZoom(val);
    }

    /**
     * Two-Way bound property for the maximal availabe zoom.
     * Use it with `<yaga-map [(maxZoom)]="someValue">` or `<yaga-map [maxZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxzoom Original Leaflet documentation
     */
    @Input() public set maxZoom(val: number) {
        this.setMaxZoom(val);
    }
    public get maxZoom(): number {
        return this.getMaxZoom();
    }

    /**
     * Inherited function to provide event emitting.
     */
    public setMaxBounds(bounds: LatLngBoundsExpression): this {
        super.setMaxBounds((bounds as LatLngBoundsLiteral));
        this.maxBoundsChange.emit(this.maxBounds);
        return this;
    }

    /**
     * One-Way property for the Coordinate Reference System.
     * Use it with `<yaga-map [crs]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-crs Original Leaflet documentation
     */
    @Input() public set crs(val: CRS) {
        this.options.crs = val;
        const keys: any[] = Object.keys((this as any)._layers);
        for (const key of keys) {
            if (typeof (this as any)._layers[key].redraw === "function") {
                (this as any)._layers[key].redraw();
            }
        }
    }
    public get crs(): CRS {
        return (this.options.crs as CRS);
    }

    /**
     * Two-Way bound property for the maximal bounds.
     * Use it with `<yaga-map [(maxBounds)]="someValue">` or `<yaga-map [maxBounds]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-maxbounds Original Leaflet documentation
     */
    @Input() public set maxBounds(val: LatLngBounds) {
        this.setMaxBounds(val);
    }
    public get maxBounds(): LatLngBounds {
        return (this.options.maxBounds as LatLngBounds);
    }

    // One-way Input
    /**
     * Input for the closePopupOnClick.
     * Use it with `<yaga-map [closePopupOnClick]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-closepopuponclick Original Leaflet documentation
     */
    @Input() public set closePopupOnClick(val: boolean | undefined) {
        this.options.closePopupOnClick = val;
    }
    public get closePopupOnClick(): boolean | undefined {
        return this.options.closePopupOnClick;
    }

    /**
     * Input for the zoomSnap.
     * Use it with `<yaga-map [zoomSnap]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomsnap Original Leaflet documentation
     */
    @Input() public set zoomSnap(val: number | undefined) {
        this.options.zoomSnap = val;
    }
    public get zoomSnap(): number | undefined {
        return this.options.zoomSnap;
    }

    /**
     * Input for the zoomDelta.
     * Use it with `<yaga-map [zoomDelta]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomdelta Original Leaflet documentation
     */
    @Input() public set zoomDelta(val: number | undefined) {
        this.options.zoomDelta = val;
    }
    public get zoomDelta(): number | undefined {
        return this.options.zoomDelta;
    }

    /**
     * Input for the trackResize.
     * Use it with `<yaga-map [trackResize]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-trackresize Original Leaflet documentation
     */
    @Input() public set trackResize(val: boolean | undefined) {
        this.options.trackResize = val;
    }
    public get trackResize(): boolean | undefined {
        return this.options.trackResize;
    }
    // maybe 2way!?!
    /**
     * Input for the boxZoomEnabled.
     * Use it with `<yaga-map [boxZoomEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-boxzoom Original Leaflet documentation
     */
    @Input() public set boxZoomEnabled(val: boolean) {
        if (val) {
            this.boxZoom.enable();
            return;
        }
        this.boxZoom.disable();
    }
    public get boxZoomEnabled(): boolean {
        return this.boxZoom.enabled();
    }
    // maybe 2way!?!
    /**
     * Input for the doubleClickZoomEnabled.
     * Use it with `<yaga-map [doubleClickZoomEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-doubleclickzoom Original Leaflet documentation
     */
    @Input() public set doubleClickZoomEnabled(val: boolean) {
        if (val) {
            this.doubleClickZoom.enable();
            return;
        }
        this.doubleClickZoom.disable();
    }
    public get doubleClickZoomEnabled(): boolean {
        return this.doubleClickZoom.enabled();
    }
    // maybe 2way!?!
    /**
     * Input for the draggingEnabled.
     * Use it with `<yaga-map [draggingEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-dragging Original Leaflet documentation
     */
    @Input() public set draggingEnabled(val: boolean) {
        if (val) {
            this.dragging.enable();
            return;
        }
        this.dragging.disable();
    }
    public get draggingEnabled(): boolean {
        return this.dragging.enabled();
    }

    /**
     * Input for the fadeAnimation.
     * Use it with `<yaga-map [fadeAnimation]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-fadeanimation Original Leaflet documentation
     */
    @Input() public set fadeAnimation(val: boolean) {
        this.options.fadeAnimation = val;
    }
    public get fadeAnimation(): boolean {
        return !!this.options.fadeAnimation;
    }

    /**
     * Input for the markerZoomAnimation.
     * Use it with `<yaga-map [markerZoomAnimation]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-markerzoomanimation Original Leaflet documentation
     */
    @Input() public set markerZoomAnimation(val: boolean) {
        this.options.markerZoomAnimation = val;
    }
    public get markerZoomAnimation(): boolean {
        return !!this.options.markerZoomAnimation;
    }

    /**
     * Input for the transform3DLimit.
     * Use it with `<yaga-map [transform3DLimit]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-transform3dlimit Original Leaflet documentation
     */
    @Input() public set transform3DLimit(val: number | undefined) {
        this.options.transform3DLimit = val;
    }
    public get transform3DLimit(): number | undefined {
        return this.options.transform3DLimit;
    }

    /**
     * Input for the zoomAnimation.
     * Use it with `<yaga-map [zoomAnimation]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomanimation Original Leaflet documentation
     */
    @Input() public set zoomAnimation(val: boolean) {
        this.options.zoomAnimation = val;
    }
    public get zoomAnimation(): boolean {
        return !!this.options.zoomAnimation;
    }

    /**
     * Input for the zoomAnimationThreshold.
     * Use it with `<yaga-map [zoomAnimationThreshold]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomanimationthreshold Original Leaflet documentation
     */
    @Input() public set zoomAnimationThreshold(val: number | undefined) {
        this.options.zoomAnimationThreshold = val;
    }
    public get zoomAnimationThreshold(): number | undefined {
        return this.options.zoomAnimationThreshold;
    }

    /**
     * Input for the inertia.
     * Use it with `<yaga-map [inertia]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-inertia Original Leaflet documentation
     */
    @Input() public set inertia(val: boolean) {
        this.options.inertia = val;
    }
    public get inertia(): boolean {
        return !!this.options.inertia;
    }

    /**
     * Input for the inertiaDeceleration.
     * Use it with `<yaga-map [inertiaDeceleration]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-inertiadeceleration Original Leaflet documentation
     */
    @Input() public set inertiaDeceleration(val: number | undefined) {
        this.options.inertiaDeceleration = val;
    }
    public get inertiaDeceleration(): number | undefined {
        return this.options.inertiaDeceleration;
    }

    /**
     * Input for the inertiaMaxSpeed.
     * Use it with `<yaga-map [inertiaMaxSpeed]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-inertiamaxspeed Original Leaflet documentation
     */
    @Input() public set inertiaMaxSpeed(val: number | undefined) {
        this.options.inertiaMaxSpeed = val;
    }
    public get inertiaMaxSpeed(): number | undefined {
        return this.options.inertiaMaxSpeed;
    }

    /**
     * Input for the easeLinearity.
     * Use it with `<yaga-map [easeLinearity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-easelinearity Original Leaflet documentation
     */
    @Input() public set easeLinearity(val: number | undefined) {
        this.options.easeLinearity = val;
    }
    public get easeLinearity(): number | undefined {
        return this.options.easeLinearity;
    }

    /**
     * Input for the worldCopyJump.
     * Use it with `<yaga-map [worldCopyJump]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-worldcopyjump Original Leaflet documentation
     */
    @Input() public set worldCopyJump(val: boolean) {
        this.options.worldCopyJump = val;
    }
    public get worldCopyJump(): boolean {
        return !!this.options.worldCopyJump;
    }

    /**
     * Input for the maxBoundsViscosity.
     * Use it with `<yaga-map [maxBoundsViscosity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-maxboundsviscosity Original Leaflet documentation
     */
    @Input() public set maxBoundsViscosity(val: number | undefined) {
        this.options.maxBoundsViscosity = val;
    }
    public get maxBoundsViscosity(): number | undefined {
        return this.options.maxBoundsViscosity;
    }
    // maybe 2way!?!
    /**
     * Input for the keyboardEnabled.
     * Use it with `<yaga-map [keyboardEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-keyboard Original Leaflet documentation
     */
    @Input() public set keyboardEnabled(val: boolean) {
        if (val) {
            this.keyboard.enable();
            return;
        }
        this.keyboard.disable();
    }
    public get keyboardEnabled(): boolean {
        return this.keyboard.enabled();
    }

    /**
     * Input for the keyboardPanDelta.
     * Use it with `<yaga-map [keyboardPanDelta]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-keyboardpandelta Original Leaflet documentation
     */
    @Input() public set keyboardPanDelta(val: number | undefined) {
        this.options.keyboardPanDelta = val;
    }
    public get keyboardPanDelta(): number | undefined {
        return this.options.keyboardPanDelta;
    }
    // maybe 2way!?!
    /**
     * Input for the scrollWheelZoomEnabled.
     * Use it with `<yaga-map [scrollWheelZoomEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-scrollwheelzoom Original Leaflet documentation
     */
    @Input() public set scrollWheelZoomEnabled(val: boolean) {
        if (val) {
            this.scrollWheelZoom.enable();
            return;
        }
        this.scrollWheelZoom.disable();
    }
    public get scrollWheelZoomEnabled(): boolean {
        return this.scrollWheelZoom.enabled();
    }

    /**
     * Input for the wheelDebounceTime.
     * Use it with `<yaga-map [wheelDebounceTime]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-wheeldebouncetime Original Leaflet documentation
     */
    @Input() public set wheelDebounceTime(val: number | undefined) {
        this.options.wheelDebounceTime = val;
    }
    public get wheelDebounceTime(): number | undefined {
        return this.options.wheelDebounceTime;
    }

    /**
     * Input for the wheelPxPerZoomLevel.
     * Use it with `<yaga-map [wheelPxPerZoomLevel]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-wheelpxperzoomlevel Original Leaflet documentation
     */
    @Input() public set wheelPxPerZoomLevel(val: number | undefined) {
        this.options.wheelPxPerZoomLevel = val;
    }
    public get wheelPxPerZoomLevel(): number | undefined {
        return this.options.wheelPxPerZoomLevel;
    }

    /**
     * Input for the tapEnabled.
     * Use it with `<yaga-map [tapEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-tap Original Leaflet documentation
     */
    @Input() public set tapEnabled(val: boolean) {
        this.options.tap = val;
    }
    public get tapEnabled(): boolean {
        return !!this.options.tap;
    }

    /**
     * Input for the tapTolerance.
     * Use it with `<yaga-map [tapTolerance]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-taptolerance Original Leaflet documentation
     */
    @Input() public set tapTolerance(val: number | undefined) {
        this.options.tapTolerance = val;
    }
    public get tapTolerance(): number | undefined {
        return this.options.tapTolerance;
    }

    /**
     * Input for the bounceAtZoomLimits.
     * Use it with `<yaga-map [bounceAtZoomLimits]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-bounceatzoomlimits Original Leaflet documentation
     */
    @Input() public set bounceAtZoomLimits(val: boolean) {
        this.options.bounceAtZoomLimits = val;
    }
    public get bounceAtZoomLimits(): boolean {
        return !!this.options.bounceAtZoomLimits;
    }
    // maybe 2way!?!
    /**
     * Input for the touchZoomEnabled.
     * Use it with `<yaga-map [touchZoomEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-touchzoom Original Leaflet documentation
     */
    @Input() public set touchZoomEnabled(val: boolean) {
        if (val) {
            this.touchZoom.enable();
            return;
        }
        this.touchZoom.disable();
    }
    public get touchZoomEnabled(): boolean {
        return this.touchZoom.enabled();
    }
}
