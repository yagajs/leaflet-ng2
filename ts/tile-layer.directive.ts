import {
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from "@angular/core";
import {
    Control,
    LatLngBoundsExpression,
    LeafletEvent,
    LeafletMouseEvent,
    Map,
    Point,
    PopupEvent,
    TileErrorEvent,
    TileEvent,
    TileLayer,
    TooltipEvent,
} from "leaflet";
import { TRANSPARENT_PIXEL } from "./consts";
import { LayerGroupProvider } from "./layer-group.provider";
import { LayerProvider } from "./layer.provider";

/**
 * Angular2 directive for Leaflet tile-layers.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-tile-layer
 *         [(url)]="..."
 *         [(display)]="..."
 *         [(opacity)]="..."
 *         [(zIndex)]="..."
 *
 *         (add)="..."
 *         (remove)="..."
 *         (popupopen)="..."
 *         (popupclose)="..."
 *         (tooltipopen)="..."
 *         (tooltipclose)="..."
 *         (click)="..."
 *         (dblclick)="..."
 *         (mousedown)="..."
 *         (mouseover)="..."
 *         (mouseout)="..."
 *         (contextmenu)="..."
 *         (loading)="..."
 *         (tileunload)="..."
 *         (tileloadstart)="..."
 *         (tileerror)="..."
 *         (tileload)="..."
 *         (load)="..."
 *
 *         [tileSize]="..."
 *         [updateWhenIdle]="..."
 *         [updateWhenZooming]="..."
 *         [updateInterval]="..."
 *         [bounds]="..."
 *         [noWrap]="..."
 *         [className]="..."
 *         [keepBuffer]="..."
 *         [maxZoom]="..."
 *         [minZoom]="..."
 *         [maxNativeZoom]="..."
 *         [minNativeZoom]="..."
 *         [subdomains]="..."
 *         [errorTileUrl]="..."
 *         [zoomOffset]="..."
 *         [tms]="..."
 *         [zoomReverse]="..."
 *         [detectRetina]="..."
 *         [crossOrigin]="..."
 *         [attribution]="...">
 *     </yaga-tile-layer>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#tilelayer Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Tile-Layer%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/tile-layer.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/tilelayerdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/tile-layer-directive
 */
@Directive({
    providers: [ LayerProvider ],
    selector: "yaga-tile-layer",
})
export class TileLayerDirective extends TileLayer implements OnDestroy  {
    /**
     * Two-Way bound property for the URL.
     * Use it with `<yaga-tile-layer [(url)]="someValue">` or `<yaga-tile-layer (urlChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-seturl Original Leaflet documentation
     */
    @Output() public urlChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-tile-layer [(display)]="someValue">`
     * or `<yaga-tile-layer (displayChange)="processEvent($event)">`
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the opacity of the layer.
     * Use it with `<yaga-tile-layer [(opacity)]="someValue">`
     * or `<yaga-tile-layer (opacityChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-opacity Original Leaflet documentation
     */
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the zIndex of the layer.
     * Use it with `<yaga-tile-layer [(zIndex)]="someValue">`
     * or `<yaga-tile-layer (zIndexChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setzindex Original Leaflet documentation
     */
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-tile-layer (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-add Original Leaflet documentation
     */
    @Output("add") public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-tile-layer (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-remove Original Leaflet documentation
     */
    @Output("remove") public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-tile-layer (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupopen Original Leaflet documentation
     */
    @Output("popupopen") public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-tile-layer (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupclose Original Leaflet documentation
     */
    @Output("popupclose") public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-tile-layer (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipopen Original Leaflet documentation
     */
    @Output("tooltipopen") public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-tile-layer (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipclose Original Leaflet documentation
     */
    @Output("tooltipclose") public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-tile-layer (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-click Original Leaflet documentation
     */
    @Output("click") public clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired dblclick event.
     * Use it with `<yaga-tile-layer (dblclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-dblclick Original Leaflet documentation
     */
    @Output("dblclick") public dblclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-tile-layer (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-mousedown Original Leaflet documentation
     */
    @Output("mousedown") public mousedownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-tile-layer (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-mouseover Original Leaflet documentation
     */
    @Output("mouseover") public mouseoverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-tile-layer (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-mouseout Original Leaflet documentation
     */
    @Output("mouseout") public mouseoutEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-tile-layer (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-contextmenu Original Leaflet documentation
     */
    @Output("contextmenu") public contextmenuEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired loading event.
     * Use it with `<yaga-tile-layer (loading)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-loading Original Leaflet documentation
     */
    @Output("loading") public loadingEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired tileunload event.
     * Use it with `<yaga-tile-layer (tileunload)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileunload Original Leaflet documentation
     */
    @Output("tileunload") public tileunloadEvent: EventEmitter<TileEvent> = new EventEmitter();
    /**
     * From leaflet fired tileloadstart event.
     * Use it with `<yaga-tile-layer (tileloadstart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileloadstart Original Leaflet documentation
     */
    @Output("tileloadstart") public tileloadstartEvent: EventEmitter<TileEvent> = new EventEmitter();
    /**
     * From leaflet fired tileerror event.
     * Use it with `<yaga-tile-layer (tileerror)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileerror Original Leaflet documentation
     */
    @Output("tileerror") public tileerrorEvent: EventEmitter<TileErrorEvent> = new EventEmitter();
    /**
     * From leaflet fired tileload event.
     * Use it with `<yaga-tile-layer (tileload)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileload Original Leaflet documentation
     */
    @Output("tileload") public tileloadEvent: EventEmitter<TileEvent> = new EventEmitter();
    /**
     * From leaflet fired load event.
     * Use it with `<yaga-tile-layer (load)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-load Original Leaflet documentation
     */
    @Output("load") public loadEvent: EventEmitter<LeafletEvent> = new EventEmitter();

    constructor(
        protected layerGroupProvider: LayerGroupProvider,
        layerProvider: LayerProvider,
    ) {
        // Transparent 1px image:
        super(TRANSPARENT_PIXEL, { errorTileUrl: TRANSPARENT_PIXEL });

        layerProvider.ref = this;

        this.on("remove", () => {
            this.displayChange.emit(false);
        });
        this.on("add", () => {
            this.displayChange.emit(true);
        });

        this.addTo(this.layerGroupProvider.ref!);

        // Events
        this.on("add", (event: LeafletEvent) => {
            this.addEvent.emit(event);
        });
        this.on("remove", (event: LeafletEvent) => {
            this.removeEvent.emit(event);
        });
        this.on("popupopen", (event: LeafletEvent) => {
            this.popupopenEvent.emit(event as PopupEvent);
        });
        this.on("popupclose", (event: LeafletEvent) => {
            this.popupcloseEvent.emit(event as PopupEvent);
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
        this.on("mouseover", (event: LeafletEvent) => {
            this.mouseoverEvent.emit(event as LeafletMouseEvent);
        });
        this.on("mouseout", (event: LeafletEvent) => {
            this.mouseoutEvent.emit(event as LeafletMouseEvent);
        });
        this.on("contextmenu", (event: LeafletEvent) => {
            this.contextmenuEvent.emit(event as LeafletMouseEvent);
        });
        this.on("loading", (event: LeafletEvent) => {
            this.loadingEvent.emit(event);
        });
        this.on("tileunload", (event: LeafletEvent) => {
            this.tileunloadEvent.emit(event as TileEvent);
        });
        this.on("tileloadstart", (event: LeafletEvent) => {
            this.tileloadstartEvent.emit(event as TileEvent);
        });
        this.on("tileerror", (event: LeafletEvent) => {
            this.tileerrorEvent.emit(event as TileErrorEvent);
        });
        this.on("tileload", (event: LeafletEvent) => {
            this.tileloadEvent.emit(event as TileEvent);
        });
        this.on("load", (event: LeafletEvent) => {
            this.loadEvent.emit(event);
        });
    }

    /**
     * This function gets called from Angular on destroy of the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/OnDestroy-class.html
     */
    public ngOnDestroy(): void {
        this.removeFrom(this.layerGroupProvider.ref as Map);
    }

    /**
     * Derived method of the original setUrl method.
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-seturl Original Leaflet documentation
     */
    public setUrl(url: string, noRedraw?: boolean): this {
        if (this.url === url) {
            return this;
        }
        this.urlChange.emit(url);
        return super.setUrl(url, noRedraw);
    }
    /**
     * Two-Way bound property for the URL.
     * Use it with `<yaga-tile-layer [(url)]="someValue">` or `<yaga-tile-layer [url]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-seturl Original Leaflet documentation
     */
    @Input() public set url(val: string) {
        this.setUrl(val);
    }
    public get url(): string {
        return (this as any)._url;
    }

    /**
     * Derived method of the original setOpacity method.
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setopacity Original Leaflet documentation
     */
    public setOpacity(val: number): this {
        if (this.opacity === val) {
            return this;
        }
        this.opacityChange.emit(val);
        return super.setOpacity(val);
    }
    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-tile-layer [(opacity)]="someValue">` or `<yaga-tile-layer [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setopacity Original Leaflet documentation
     */
    @Input() public set opacity(val: number | undefined) {
        if (val === undefined) {
            val = 1;
        }
        this.setOpacity(val);
    }
    public get opacity(): number | undefined {
        return this.options.opacity;
    }

    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer [display]="someValue">`
     */
    @Input() public set display(val: boolean) {
        const isDisplayed: boolean = this.display;
        if (isDisplayed === val) {
            return;
        }
        let pane: HTMLElement;
        let container: HTMLElement;
        let map: Map;
        let events: any; // Dictionary of functions
        let eventKeys: string[];
        try {
            pane = this.getPane() as HTMLElement;
            container = this.getContainer() as HTMLImageElement;
            map = (this as any)._map;
            events = this.getEvents!();
            eventKeys = Object.keys(events);
        } catch (err) {
            /* istanbul ignore next */
            return;
        }
        if (val) {
            // show layer
            pane.appendChild(container);
            for (const eventKey of eventKeys) {
                map.on(eventKey, events[eventKey], this);
            }
            this.redraw();
        } else {
            // hide layer
            pane.removeChild(container);
            for (const eventKey of eventKeys) {
                map.off(eventKey, events[eventKey], this);
            }
        }
    }
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer [display]="someValue">`
     */
    public get display(): boolean {
        let pane: HTMLElement;
        let container: HTMLElement;
        try {
            pane = this.getPane() as HTMLElement;
            container = this.getContainer() as HTMLImageElement;
        } catch (err) {
            /* istanbul ignore next */
            return false;
        }
        /* tslint:disable:prefer-for-of */
        for (let i: number = 0; i < pane.children.length; i += 1) {
            /* tslint:enable */
            /* istanbul ignore else */
            if (pane.children[i] === container) {
                return true;
            }
        }
        return false;
    }

    /**
     * Derived method of the original setZIndexmethod.
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setzindex Original Leaflet documentation
     */
    public setZIndex(val: number): this {
        super.setZIndex(val);
        this.zIndexChange.emit(val);
        return this;
    }
    /**
     * Two-Way bound property for the zIndex.
     * Use it with `<yaga-tile-layer [(zIndex)]="someValue">` or `<yaga-tile-layer [zIndex]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setzindex Original Leaflet documentation
     */
    @Input() public set zIndex(val: number | undefined) {
        if (val === undefined) {
            val = 1;
        }
        this.setZIndex(val);
    }
    public get zIndex(): number | undefined {
        return this.options.zIndex;
    }

    /**
     * Input for the tileSize.
     * Use it with `<yaga-tile-layer [tileSize]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileSize Original Leaflet documentation
     */
    @Input() public set tileSize(val: Point) {
        this.options.tileSize = val;
        this.redraw();
    }
    public get tileSize(): Point { // TODO: is this correct that it is always a Point?
        return (this.options.tileSize as Point);
    }

    /**
     * Input for the updateWhenIdle.
     * Use it with `<yaga-tile-layer [updateWhenIdle]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-updatewhenidle Original Leaflet documentation
     */
    @Input() public set updateWhenIdle(val: boolean) {
        this.options.updateWhenIdle = val;
    }
    public get updateWhenIdle(): boolean {
        return !!this.options.updateWhenIdle;
    }

    /**
     * Input for the updateWhenZooming.
     * Use it with `<yaga-tile-layer [updateWhenZooming]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-updatewhenzooming Original Leaflet documentation
     */
    @Input() public set updateWhenZooming(val: boolean) {
        this.options.updateWhenZooming = val;
    }
    public get updateWhenZooming(): boolean {
        return !!this.options.updateWhenZooming;
    }

    /**
     * Input for the updateInterval.
     * Use it with `<yaga-tile-layer [updateInterval]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-updateinterval Original Leaflet documentation
     */
    @Input() public set updateInterval(val: number | undefined) {
        this.options.updateInterval = val;
    }
    public get updateInterval(): number | undefined {
        return this.options.updateInterval;
    }

    /**
     * Input for the bounds.
     * Use it with `<yaga-tile-layer [bounds]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-bounds Original Leaflet documentation
     */
    @Input() public set bounds(val: LatLngBoundsExpression | undefined) {
        this.options.bounds = val;
        this.redraw();
    }
    public get bounds(): LatLngBoundsExpression | undefined {
        return this.options.bounds;
    }

    /**
     * Input for the noWrap.
     * Use it with `<yaga-tile-layer [noWrap]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-nowrap Original Leaflet documentation
     */
    @Input() public set noWrap(val: boolean) {
        this.options.noWrap = val;
    }
    public get noWrap(): boolean {
        return !!this.options.noWrap;
    }

    /**
     * Input for the className.
     * Use it with `<yaga-tile-layer [className]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-classname Original Leaflet documentation
     */
    @Input() public set className(val: string | undefined) {
        this.options.className = val;
        this.redraw();
    }
    public get className(): string | undefined {
        return this.options.className;
    }

    /**
     * Input for the keepBuffer.
     * Use it with `<yaga-tile-layer [keepBuffer]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-keepbuffer Original Leaflet documentation
     */
    @Input() public set keepBuffer(val: number | undefined) {
        this.options.keepBuffer = val;
    }
    public get keepBuffer(): number | undefined {
        return this.options.keepBuffer;
    }

    /**
     * Input for the maxZoom.
     * Use it with `<yaga-tile-layer [maxZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-maxzoom Original Leaflet documentation
     */
    @Input() public set maxZoom(val: number | undefined) {
        this.options.maxZoom = val;
        if ((this as any)._map) {
            ((this as any)._map as any)._updateZoomLevels();
        }
        this.redraw();
    }
    public get maxZoom(): number | undefined {
        return this.options.maxZoom;
    }

    /**
     * Input for the minZoom.
     * Use it with `<yaga-tile-layer [minZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-minzoom Original Leaflet documentation
     */
    @Input() public set minZoom(val: number | undefined) {
        this.options.minZoom = val;
        if ((this as any)._map) {
            ((this as any)._map as any)._updateZoomLevels();
        }
        this.redraw();
    }
    public get minZoom(): number | undefined {
        return this.options.minZoom;
    }

    /**
     * Input for the maxNativeZoom.
     * Use it with `<yaga-tile-layer [maxNativeZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-maxnativezoom Original Leaflet documentation
     */
    @Input() public set maxNativeZoom(val: number | undefined) {
        this.options.maxNativeZoom = val;
        this.redraw();
    }
    public get maxNativeZoom(): number | undefined {
        return this.options.maxNativeZoom;
    }

    /**
     * Input for the minNativeZoom.
     * Use it with `<yaga-tile-layer [minNativeZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-minnativezoom Original Leaflet documentation
     */
    @Input() public set minNativeZoom(val: number | undefined) {
        this.options.minNativeZoom = val;
        this.redraw();
    }
    public get minNativeZoom(): number | undefined {
        return this.options.minNativeZoom;
    }

    /**
     * Input for the subdomains.
     * Use it with `<yaga-tile-layer [subdomains]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-subdomains Original Leaflet documentation
     */
    @Input() public set subdomains(val: string[]) {
        this.options.subdomains = val;
        this.redraw();
    }
    public get subdomains(): string[] {
        if (typeof (this.options.subdomains as string) === "string") {
            this.options.subdomains = (this.options.subdomains as string).split("");
        }
        return (this.options.subdomains as string[]);
    }

    /**
     * Input for the errorTileUrl.
     * Use it with `<yaga-tile-layer [errorTileUrl]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-errortileurl Original Leaflet documentation
     */
    @Input() public set errorTileUrl(val: string | undefined) {
        this.options.errorTileUrl = val;
        this.redraw();
    }
    public get errorTileUrl(): string | undefined {
        return this.options.errorTileUrl;
    }

    /**
     * Input for the zoomOffset.
     * Use it with `<yaga-tile-layer [zoomOffset]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-zoomoffset Original Leaflet documentation
     */
    @Input() public set zoomOffset(val: number | undefined) {
        this.options.zoomOffset = val;
        this.redraw();
    }
    public get zoomOffset(): number | undefined {
        return this.options.zoomOffset;
    }

    /**
     * Input for the tms.
     * Use it with `<yaga-tile-layer [tms]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tms Original Leaflet documentation
     */
    @Input() public set tms(val: boolean) {
        this.options.tms = val;
        this.redraw();
    }
    public get tms(): boolean {
        return !!this.options.tms;
    }

    /**
     * Input for the zoomReverse.
     * Use it with `<yaga-tile-layer [zoomReverse]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-zoomreverse Original Leaflet documentation
     */
    @Input() public set zoomReverse(val: boolean) {
        this.options.zoomReverse = val;
        this.redraw();
    }
    public get zoomReverse(): boolean {
        return !!this.options.zoomReverse;
    }

    /**
     * Input for the detectRetina.
     * Use it with `<yaga-tile-layer [detectRetina]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-detectretina Original Leaflet documentation
     */
    @Input() public set detectRetina(val: boolean) {
        this.options.detectRetina = val;
        this.redraw();
    }
    public get detectRetina(): boolean {
        return !!this.options.detectRetina;
    }

    /**
     * Input for the crossOrigin.
     * Use it with `<yaga-tile-layer [crossOrigin]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-crossorigin Original Leaflet documentation
     */
    @Input() public set crossOrigin(val: boolean) {
        this.options.crossOrigin = val;
        this.redraw();
    }
    public get crossOrigin(): boolean {
        return !!this.options.crossOrigin;
    }

    /**
     * Input for the attribution.
     * Use it with `<yaga-tile-layer [attribution]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-attribution Original Leaflet documentation
     */
    @Input() public set attribution(val: string) {
        if ((this as any)._map && (this as any)._map.attributionControl) {
            const oldAttribution = this.getAttribution!();
            if (oldAttribution) {
                ((this as any)._map.attributionControl as Control.Attribution).removeAttribution(oldAttribution);
            }
            ((this as any)._map.attributionControl as Control.Attribution).addAttribution(val);
        }
        this.options.attribution = val;
    }
    public get attribution(): string {
        return this.getAttribution!() || "";
    }
}
