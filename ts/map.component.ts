import { Component,
    AfterViewInit,
    ElementRef,
    Inject,
    Input,
    Output,
    EventEmitter
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
    ZoomAnimEvent } from 'leaflet';
import { ANIMATION_DELAY } from './consts';

/**
 * Root component for the map
 * @link http://leafletjs.com/reference-1.0.2.html#tilelayer Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Tile-Layer%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/tile-layer.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/tilelayerdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/tile-layer-directive
 */
@Component({
    selector: 'yaga-map',
    template: `<span style="display: none"><ng-content></ng-content></span>`
})
export class MapComponent extends Map implements AfterViewInit {
    /**
     * Two-Way bound property for the zoom.
     * Use it with `<yaga-map [(zoom)]="someValue">` or `<yaga-map (zoomChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-setzoom Original Leaflet documentation
     */
    @Output() public zoomChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the center latitude.
     * Use it with `<yaga-map [(lat)]="someValue">` or `<yaga-map (latChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-setview Original Leaflet documentation
     */
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the center longitude.
     * Use it with `<yaga-map [(lng)]="someValue">` or `<yaga-map (lngChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-setview Original Leaflet documentation
     */
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the minimal available zoom.
     * Use it with `<yaga-map [(minZoom)]="someValue">` or `<yaga-map (minZoomChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-setminzoom Original Leaflet documentation
     */
    @Output() public minZoomChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the maximal available zoom.
     * Use it with `<yaga-map [(maxZoom)]="someValue">` or `<yaga-map (maxZoomChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-setmaxzoom Original Leaflet documentation
     */
    @Output() public maxZoomChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the bounds on the map.
     * Use it with `<yaga-map [(maxBoundsZoom)]="someValue">` or `<yaga-map (maxBoundsZoomChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-setmaxbounds Original Leaflet documentation
     */
    @Output() public maxBoundsChange: EventEmitter<LatLngBounds> = new EventEmitter();

    /**
     * From leaflet fired baselayerchange event.
     * Use it with `<yaga-tile-layer (baselayerchange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-baselayerchange Original Leaflet documentation
     */
    @Output('baselayerchange') public baselayerchangeEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    /**
     * From leaflet fired overlayadd event.
     * Use it with `<yaga-tile-layer (overlayadd)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-overlayadd Original Leaflet documentation
     */
    @Output('overlayadd') public overlayaddEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    /**
     * From leaflet fired overlayremove event.
     * Use it with `<yaga-tile-layer (overlayremove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-overlayremove Original Leaflet documentation
     */
    @Output('overlayremove') public overlayremoveEvent: EventEmitter<LayersControlEvent> = new EventEmitter();
    /**
     * From leaflet fired layeradd event.
     * Use it with `<yaga-tile-layer (layeradd)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-layeradd Original Leaflet documentation
     */
    @Output('layeradd') public layeraddEvent: EventEmitter<LayerEvent> = new EventEmitter();
    /**
     * From leaflet fired layerremove event.
     * Use it with `<yaga-tile-layer (layerremove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-layerremove Original Leaflet documentation
     */
    @Output('layerremove') public layerremoveEvent: EventEmitter<LayerEvent> = new EventEmitter();
    /**
     * From leaflet fired zoomlevelschan event.
     * Use it with `<yaga-tile-layer (zoomlevelschan)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-zoomlevelschan Original Leaflet documentation
     */
    @Output('zoomlevelschange') public zoomlevelschangeEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired resize event.
     * Use it with `<yaga-tile-layer (resize)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-resize Original Leaflet documentation
     */
    @Output('resize') public resizeEvent: EventEmitter<ResizeEvent> = new EventEmitter();
    /**
     * From leaflet fired unload event.
     * Use it with `<yaga-tile-layer (unload)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-unload Original Leaflet documentation
     */
    @Output('unload') public unloadEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired viewreset event.
     * Use it with `<yaga-tile-layer (viewreset)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-viewreset Original Leaflet documentation
     */
    @Output('viewreset') public viewresetEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired load event.
     * Use it with `<yaga-tile-layer (load)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-load Original Leaflet documentation
     */
    @Output('load') public loadEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired zoomstart event.
     * Use it with `<yaga-tile-layer (zoomstart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-zoomstart Original Leaflet documentation
     */
    @Output('zoomstart') public zoomstartEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired movestart event.
     * Use it with `<yaga-tile-layer (movestart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-movestart Original Leaflet documentation
     */
    @Output('movestart') public movestartEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired zoom event.
     * Use it with `<yaga-tile-layer (zoom)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-zoom Original Leaflet documentation
     */
    @Output('zoom') public zoomEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired move event.
     * Use it with `<yaga-tile-layer (move)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-move Original Leaflet documentation
     */
    @Output('move') public moveEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired zoomend event.
     * Use it with `<yaga-tile-layer (zoomend)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-zoomend Original Leaflet documentation
     */
    @Output('zoomend') public zoomendEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired moveend event.
     * Use it with `<yaga-tile-layer (moveend)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-moveend Original Leaflet documentation
     */
    @Output('moveend') public moveendEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-tile-layer (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-popupopen Original Leaflet documentation
     */
    @Output('popupopen') public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-tile-layer (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-popupclose Original Leaflet documentation
     */
    @Output('popupclose') public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired autopanstart event.
     * Use it with `<yaga-tile-layer (autopanstart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-autopanstart Original Leaflet documentation
     */
    @Output('autopanstart') public autopanstartEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-tile-layer (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-tooltipopen Original Leaflet documentation
     */
    @Output('tooltipopen') public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-tile-layer (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-tooltipclose Original Leaflet documentation
     */
    @Output('tooltipclose') public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-tile-layer (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-click Original Leaflet documentation
     */
    @Output('click') public clickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired dblclick event.
     * Use it with `<yaga-tile-layer (dblclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-dblclick Original Leaflet documentation
     */
    @Output('dblclick') public dblclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-tile-layer (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-mousedown Original Leaflet documentation
     */
    @Output('mousedown') public mousedownEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseup event.
     * Use it with `<yaga-tile-layer (mouseup)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-mouseup Original Leaflet documentation
     */
    @Output('mouseup') public mouseupEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-tile-layer (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-mouseover Original Leaflet documentation
     */
    @Output('mouseover') public mouseoverEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-tile-layer (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-mouseout Original Leaflet documentation
     */
    @Output('mouseout') public mouseoutEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousemove event.
     * Use it with `<yaga-tile-layer (mousemove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-mousemove Original Leaflet documentation
     */
    @Output('mousemove') public mousemoveEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-tile-layer (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-contextmenu Original Leaflet documentation
     */
    @Output('contextmenu') public contextmenuEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired keypress event.
     * Use it with `<yaga-tile-layer (keypress)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-keypress Original Leaflet documentation
     */
    @Output('keypress') public keypressEvent: EventEmitter<KeyboardEvent> = new EventEmitter();
    /**
     * From leaflet fired preclick event.
     * Use it with `<yaga-tile-layer (preclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-preclick Original Leaflet documentation
     */
    @Output('preclick') public preclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired zoomanim event.
     * Use it with `<yaga-tile-layer (zoomanim)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-zoomanim Original Leaflet documentation
     */
    @Output('zoomanim') public zoomanimEvent: EventEmitter<ZoomAnimEvent> = new EventEmitter();

    protected domRoot: HTMLElement;
    protected mapDomRoot: HTMLElement;

    private moveTimeout: number;
    private isZooming: boolean = false;

    constructor(
        @Inject(ElementRef) elementRef: ElementRef,
    ) {
        super(document.createElement('div'), { attributionControl: false, zoomControl: false});

        const moveFn: Function = () => {
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

        this.domRoot = elementRef.nativeElement;
        this.mapDomRoot = (<any>this)._container;
        this.mapDomRoot.setAttribute('class', this.mapDomRoot.getAttribute('class') + ' yaga-map');

        this.on('move', () => {
            if (this.moveTimeout) {
                clearTimeout(this.moveTimeout);
            }
            this.moveTimeout = setTimeout(moveFn, ANIMATION_DELAY);
        });
        this.on('zoomstart', () => {
            this.isZooming = true;
        });
        this.on('zoomend', () => {
            this.isZooming = false;
            if (this.moveTimeout) {
                clearTimeout(this.moveTimeout);
            }
            this.moveTimeout = setTimeout(moveFn, ANIMATION_DELAY);
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

    /**
     * This function gets called from Angular after initializing the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/AfterViewInit-class.html
     */
    ngAfterViewInit(): void {
        this.domRoot.appendChild(this.mapDomRoot);

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
     * @link http://leafletjs.com/reference-1.0.2.html#map-setzoom Original Leaflet documentation
     */
    @Input() set zoom(val: number) {
        this.setZoom(val);
    }
    get zoom(): number {
        return this.getZoom();
    }

    /**
     * Two-Way bound property for the latitude.
     * Use it with `<yaga-map [(lat)]="someValue">` or `<yaga-map [lat]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-setview Original Leaflet documentation
     */
    @Input() set lat(val: number) {
        const coords: LatLng = new LatLng(val, this.getCenter().lng);
        this.setView(coords, this.zoom);
    }
    get lat(): number {
        return this.getCenter().lat;
    }

    /**
     * Two-Way bound property for the longitude.
     * Use it with `<yaga-map [(lng)]="someValue">` or `<yaga-map [lng]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-setview Original Leaflet documentation
     */
    @Input() set lng(val: number) {
        const coords: LatLng =  new LatLng(this.getCenter().lat, val);
        this.setView(coords, this.zoom);
    }
    get lng(): number {
        return this.getCenter().lng;
    }

    /**
     * Derived method of the original setMinZoom method.
     * @link http://leafletjs.com/reference-1.0.2.html#map-setminzoom Original Leaflet documentation
     */
    setMinZoom(val: number): this {
        this.minZoomChange.emit(val);
        return super.setMinZoom(val);
    }

    /**
     * Two-Way bound property for the minimal availabe zoom.
     * Use it with `<yaga-map [(minZoom)]="someValue">` or `<yaga-map [minZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-setminzoom Original Leaflet documentation
     */
    @Input() set minZoom(val: number) {
        this.setMinZoom(val);
    }
    get minZoom(): number {
        return this.getMinZoom();
    }

    /**
     * Derived method of the original setMaxZoom method.
     * @link http://leafletjs.com/reference-1.0.2.html#map-setmaxzoom Original Leaflet documentation
     */
    setMaxZoom(val: number): this {
        this.maxZoomChange.emit(val);
        return super.setMaxZoom(val);
    }

    /**
     * Two-Way bound property for the maximal availabe zoom.
     * Use it with `<yaga-map [(maxZoom)]="someValue">` or `<yaga-map [maxZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#map-setmaxzoom Original Leaflet documentation
     */
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
        return (<LatLngBounds>this.options.maxBounds);
    }

    // One-way Input
    @Input() set closePopupOnClick(val: boolean) {
        this.options.closePopupOnClick = val;
    }
    get closePopupOnClick(): boolean {
        return this.options.closePopupOnClick;
    }

    @Input() set zoomSnap(val: number) {
        this.options.zoomSnap = val;
    }
    get zoomSnap(): number {
        return this.options.zoomSnap;
    }
    @Input() set zoomDelta(val: number) {
        this.options.zoomDelta = val;
    }
    get zoomDelta(): number {
        return this.options.zoomDelta;
    }

    @Input() set trackResize(val: boolean) {
        this.options.trackResize = val;
    }
    get trackResize(): boolean {
        return this.options.trackResize;
    }

    // maybe 2way!?!
    @Input() set boxZoomEnabled(val: boolean) {
        if (val) {
            this.boxZoom.enable();
            return;
        }
        this.boxZoom.disable();
    }
    get boxZoomEnabled(): boolean {
        return this.boxZoom.enabled();
    }

    // maybe 2way!?!
    @Input() set doubleClickZoomEnabled(val: boolean) {
        if (val) {
            this.doubleClickZoom.enable();
            return;
        }
        this.doubleClickZoom.disable();
    }
    get doubleClickZoomEnabled(): boolean {
        return this.doubleClickZoom.enabled();
    }

    // maybe 2way!?!
    @Input() set draggingEnabled(val: boolean) {
        if (val) {
            this.dragging.enable();
            return;
        }
        this.dragging.disable();
    }
    get draggingEnabled(): boolean {
        return this.dragging.enabled();
    }

    @Input() set fadeAnimation(val: boolean) {
        this.options.fadeAnimation = val;
    }
    get fadeAnimation(): boolean {
        return this.options.fadeAnimation;
    }

    @Input() set markerZoomAnimation(val: boolean) {
        this.options.markerZoomAnimation = val;
    }
    get markerZoomAnimation(): boolean {
        return this.options.markerZoomAnimation;
    }

    @Input() set transform3DLimit(val: number) {
        this.options.transform3DLimit = val;
    }
    get transform3DLimit(): number {
        return this.options.transform3DLimit;
    }

    @Input() set zoomAnimation(val: boolean) {
        this.options.zoomAnimation = val;
    }
    get zoomAnimation(): boolean {
        return this.options.zoomAnimation;
    }

    @Input() set zoomAnimationThreshold(val: number) {
        this.options.zoomAnimationThreshold = val;
    }
    get zoomAnimationThreshold(): number {
        return this.options.zoomAnimationThreshold;
    }

    @Input() set inertia(val: boolean) {
        this.options.inertia = val;
    }
    get inertia(): boolean {
        return this.options.inertia;
    }

    @Input() set inertiaDeceleration(val: number) {
        this.options.inertiaDeceleration = val;
    }
    get inertiaDeceleration(): number {
        return this.options.inertiaDeceleration;
    }

    @Input() set inertiaMaxSpeed(val: number) {
        this.options.inertiaMaxSpeed = val;
    }
    get inertiaMaxSpeed(): number {
        return this.options.inertiaMaxSpeed;
    }

    @Input() set easeLinearity(val: number) {
        this.options.easeLinearity = val;
    }
    get easeLinearity(): number {
        return this.options.easeLinearity;
    }

    @Input() set worldCopyJump(val: boolean) {
        this.options.worldCopyJump = val;
    }
    get worldCopyJump(): boolean {
        return this.options.worldCopyJump;
    }

    @Input() set maxBoundsViscosity(val: number) {
        this.options.maxBoundsViscosity = val;
    }
    get maxBoundsViscosity(): number {
        return this.options.maxBoundsViscosity;
    }

    // maybe 2way!?!
    @Input() set keyboardEnabled(val: boolean) {
        if (val) {
            this.keyboard.enable();
            return;
        }
        this.keyboard.disable();
    }
    get keyboardEnabled(): boolean {
        return this.keyboard.enabled();
    }

    @Input() set keyboardPanDelta(val: number) {
        this.options.keyboardPanDelta = val;
    }
    get keyboardPanDelta(): number {
        return this.options.keyboardPanDelta;
    }

    // maybe 2way!?!
    @Input() set scrollWheelZoomEnabled(val: boolean) {
        if (val) {
            this.scrollWheelZoom.enable();
            return;
        }
        this.scrollWheelZoom.disable();
    }
    get scrollWheelZoomEnabled(): boolean {
        return this.scrollWheelZoom.enabled();
    }

    @Input() set wheelDebounceTime(val: number) {
        this.options.wheelDebounceTime = val;
    }
    get wheelDebounceTime(): number {
        return this.options.wheelDebounceTime;
    }

    @Input() set wheelPxPerZoomLevel(val: number) {
        this.options.wheelPxPerZoomLevel = val;
    }
    get wheelPxPerZoomLevel(): number {
        return this.options.wheelPxPerZoomLevel;
    }


    @Input() set tapEnabled(val: boolean) {
        this.options.tap = val;
    }
    get tapEnabled(): boolean {
        return this.options.tap;
    }

    @Input() set tapTolerance(val: number) {
        this.options.tapTolerance = val;
    }
    get tapTolerance(): number {
        return this.options.tapTolerance;
    }

    @Input() set bounceAtZoomLimits(val: boolean) {
        this.options.bounceAtZoomLimits = val;
    }
    get bounceAtZoomLimits(): boolean {
        return this.options.bounceAtZoomLimits;
    }
    // maybe 2way!?!
    @Input() set touchZoomEnabled(val: boolean) {
        if (val) {
            this.touchZoom.enable();
            return;
        }
        this.touchZoom.disable();
    }
    get touchZoomEnabled(): boolean {
        return this.touchZoom.enabled();
    }
}
