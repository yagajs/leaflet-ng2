import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    OnDestroy } from '@angular/core';
import { TileLayer,
    LatLngBoundsExpression,
    Point,
    Map,
    Event,
    PopupEvent,
    TooltipEvent,
    TileEvent,
    TileErrorEvent } from 'leaflet';
import { MapComponent } from './map.component';
import { TRANSPARENT_PIXEL } from './consts';

/**
 * Directive for Tile-Layers
 * @link http://leafletjs.com/reference-1.0.2.html#tilelayer Original Leaflet documentation
 * @link http://leaflet-ng2.yagajs.org/latest/browser-test?grep=Tile-Layer%20Directive Unit-Test
 * @link http://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/tile-layer.directive.js.html Test coverage
 * @link http://leaflet-ng2.yagajs.org/latest/typedoc/classes/tilelayerdirective.html API documentation
 * @example http://leaflet-ng2.yagajs.org/latest/examples#tile-layer-directive
 */
@Directive({
    selector: 'yaga-tile-layer'
})
export class TileLayerDirective extends TileLayer implements OnDestroy  {
    /**
     * Two-Way binded property for the URL.
     * Use it with `<yaga-tile-layer [(url)]="someValue">` or `<yaga-tile-layer (urlChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-seturl Original Leaflet documentation
     */
    @Output() public urlChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way binded property for the display status of the layer.
     * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer (displayChange)="processEvent($event)">`
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way binded property for the opacity of the layer.
     * Use it with `<yaga-tile-layer [(opacity)]="someValue">` or `<yaga-tile-layer (opacityChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-opacity Original Leaflet documentation
     */
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way binded property for the zIndex of the layer.
     * Use it with `<yaga-tile-layer [(zIndex)]="someValue">` or `<yaga-tile-layer (zIndexChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-setzindex Original Leaflet documentation
     */
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();

    /**
     * Form leaflet fired add event.
     * Use it with `<yaga-tile-layer (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-add Original Leaflet documentation
     */
    @Output('add') public addEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Form leaflet fired remove event.
     * Use it with `<yaga-tile-layer (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-remove Original Leaflet documentation
     */
    @Output('remove') public removeEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Form leaflet fired popupopen event.
     * Use it with `<yaga-tile-layer (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-popupopen Original Leaflet documentation
     */
    @Output('popupopen') public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * Form leaflet fired popupclose event.
     * Use it with `<yaga-tile-layer (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-popupclose Original Leaflet documentation
     */
    @Output('popupclose') public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * Form leaflet fired tooltipopen event.
     * Use it with `<yaga-tile-layer (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tooltipopen Original Leaflet documentation
     */
    @Output('tooltipopen') public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * Form leaflet fired tooltipclose event.
     * Use it with `<yaga-tile-layer (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tooltipclose Original Leaflet documentation
     */
    @Output('tooltipclose') public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * Form leaflet fired click event.
     * Use it with `<yaga-tile-layer (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-click Original Leaflet documentation
     */
    @Output('click') public clickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Form leaflet fired dbclick event.
     * Use it with `<yaga-tile-layer (dbclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-dbclick Original Leaflet documentation
     */
    @Output('dbclick') public dbclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Form leaflet fired mousedown event.
     * Use it with `<yaga-tile-layer (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-mousedown Original Leaflet documentation
     */
    @Output('mousedown') public mousedownEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Form leaflet fired mouseover event.
     * Use it with `<yaga-tile-layer (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-mouseover Original Leaflet documentation
     */
    @Output('mouseover') public mouseoverEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Form leaflet fired mouseout event.
     * Use it with `<yaga-tile-layer (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-mouseout Original Leaflet documentation
     */
    @Output('mouseout') public mouseoutEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Form leaflet fired contextmenu event.
     * Use it with `<yaga-tile-layer (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-contextmenu Original Leaflet documentation
     */
    @Output('contextmenu') public contextmenuEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Form leaflet fired loading event.
     * Use it with `<yaga-tile-layer (loading)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-loading Original Leaflet documentation
     */
    @Output('loading') public loadingEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * Form leaflet fired tileunload event.
     * Use it with `<yaga-tile-layer (tileunload)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tileunload Original Leaflet documentation
     */
    @Output('tileunload') public tileunloadEvent: EventEmitter<TileEvent> = new EventEmitter();
    /**
     * Form leaflet fired tileloadstart event.
     * Use it with `<yaga-tile-layer (tileloadstart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tileloadstart Original Leaflet documentation
     */
    @Output('tileloadstart') public tileloadstartEvent: EventEmitter<TileEvent> = new EventEmitter();
    /**
     * Form leaflet fired tileerror event.
     * Use it with `<yaga-tile-layer (tileerror)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tileerror Original Leaflet documentation
     */
    @Output('tileerror') public tileerrorEvent: EventEmitter<TileErrorEvent> = new EventEmitter();
    /**
     * Form leaflet fired tileload event.
     * Use it with `<yaga-tile-layer (tileload)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tileload Original Leaflet documentation
     */
    @Output('tileload') public tileloadEvent: EventEmitter<TileEvent> = new EventEmitter();
    /**
     * Form leaflet fired load event.
     * Use it with `<yaga-tile-layer (load)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-load Original Leaflet documentation
     */
    @Output('load') public loadEvent: EventEmitter<Event> = new EventEmitter();

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent
    ) {
        // Transparent 1px image:
        super(TRANSPARENT_PIXEL);

        this.on('remove', () => {
            this.displayChange.emit(false);
        });
        this.on('add', () => {
            this.displayChange.emit(true);
        });

        this.addTo(mapComponent);

        // Events
        this.on('add', (event: Event) => {
            this.addEvent.emit(event);
        });
        this.on('remove', (event: Event) => {
            this.removeEvent.emit(event);
        });
        this.on('popupopen', (event: PopupEvent) => {
            this.popupopenEvent.emit(event);
        });
        this.on('popupclose', (event: PopupEvent) => {
            this.popupcloseEvent.emit(event);
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
        this.on('dbclick', (event: MouseEvent) => {
            this.dbclickEvent.emit(event);
        });
        this.on('mousedown', (event: MouseEvent) => {
            this.mousedownEvent.emit(event);
        });
        this.on('mouseover', (event: MouseEvent) => {
            this.mouseoverEvent.emit(event);
        });
        this.on('mouseout', (event: MouseEvent) => {
            this.mouseoutEvent.emit(event);
        });
        this.on('contextmenu', (event: MouseEvent) => {
            this.contextmenuEvent.emit(event);
        });
        this.on('loading', (event: Event) => {
            this.loadingEvent.emit(event);
        });
        this.on('tileunload', (event: TileEvent) => {
            this.tileunloadEvent.emit(event);
        });
        this.on('tileloadstart', (event: TileEvent) => {
            this.tileloadstartEvent.emit(event);
        });
        this.on('tileerror', (event: TileErrorEvent) => {
            this.tileerrorEvent.emit(event);
        });
        this.on('tileload', (event: TileEvent) => {
            this.tileloadEvent.emit(event);
        });
        this.on('load', (event: Event) => {
            this.loadEvent.emit(event);
        });
    }

    /**
     * This function gets called from Angular on destroy of the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/OnDestroy-class.html
     */
    ngOnDestroy(): void {
        console.log('Destroy');
        this.removeFrom((<any>this)._map);
    }

    /**
     * Derived method of the original setUrl method.
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-seturl Original Leaflet documentation
     */
    setUrl(url: string, noRedraw?: boolean): this {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return super.setUrl(url, noRedraw);
    }
    /**
     * Two-Way binded property for the URL.
     * Use it with `<yaga-tile-layer [(url)]="someValue">` or `<yaga-tile-layer [url]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-seturl Original Leaflet documentation
     */
    @Input() set url(val: string) {
        this.setUrl(val);
    }
    get url(): string {
        return (<any>this)._url;
    }

    /**
     * Derived method of the original setOpacity method.
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-setopacity Original Leaflet documentation
     */
    setOpacity(val: number): this {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return super.setOpacity(val);
    }
    /**
     * Two-Way binded property for the opacity.
     * Use it with `<yaga-tile-layer [(opacity)]="someValue">` or `<yaga-tile-layer [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-setopacity Original Leaflet documentation
     */
    @Input() set opacity(val: number) {
        this.setOpacity(val);
    }
    get opacity(): number {
        return this.options.opacity;
    }

    /**
     * Two-Way binded property for the display status of the layer.
     * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer [display]="someValue">`
     */
    @Input() set display(val: boolean) {
        var isDisplayed: boolean = this.display;
        if (isDisplayed === val) {
            return;
        }
        var pane: HTMLElement,
            container: HTMLElement,
            map: Map,
            events: any, // Dictionary of functions
            eventKeys: string[];
        try {
            pane = this.getPane();
            container = this.getContainer();
            map = (<any>this)._map;
            events = this.getEvents();
            eventKeys = Object.keys(events);
        } catch (err) {
            /* istanbul ignore next */
            return;
        }
        if (val) {
            // show layer
            pane.appendChild(container);
            for (let i: number = 0; i < eventKeys.length; i += 1) {
                map.on(eventKeys[i], events[eventKeys[i]], this);
            }
            this.redraw();
        } else {
            // hide layer
            pane.removeChild(container);
            for (let i: number = 0; i < eventKeys.length; i += 1) {
                map.off(eventKeys[i], events[eventKeys[i]], this);
            }
        }
    }
    /**
     * Two-Way binded property for the display status of the layer.
     * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer [display]="someValue">`
     */
    get display(): boolean {
        var pane: HTMLElement,
            container: HTMLElement;
        try {
            pane = this.getPane();
            container = this.getContainer();
        } catch (err) {
            /* istanbul ignore next */
            return false;
        }
        for (let i: number = 0; i < pane.children.length; i += 1) {
            /* istanbul ignore else */
            if (pane.children[i] === container) {
                return true;
            }
        }
        return false;
    }

    /**
     * Derived method of the original setZIndexmethod.
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-setzindex Original Leaflet documentation
     */
    setZIndex(val: number): this {
        super.setZIndex(val);
        this.zIndexChange.emit(val);
        return this;
    }
    /**
     * Two-Way binded property for the zIndex.
     * Use it with `<yaga-tile-layer [(zIndex)]="someValue">` or `<yaga-tile-layer [zIndex]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-setzindex Original Leaflet documentation
     */
    @Input() set zIndex(val: number) {
        this.setZIndex(val);
    }
    get zIndex(): number {
        return this.options.zIndex;
    }


    /**
     * Input for the tileSize.
     * Use it with `<yaga-tile-layer [tileSize]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tileSize Original Leaflet documentation
     */
    @Input() set tileSize(val: Point) {
        this.options.tileSize = val;
        this.redraw();
    }
    get tileSize(): Point { // TODO: is this correct that it is always a Point?
        return (<Point>this.options.tileSize);
    }

    /**
     * Input for the updateWhenIdle.
     * Use it with `<yaga-tile-layer [updateWhenIdle]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-updatewhenidle Original Leaflet documentation
     */
    @Input() set updateWhenIdle(val: boolean) {
        this.options.updateWhenIdle = val;
    }
    get updateWhenIdle(): boolean {
        return this.options.updateWhenIdle;
    }

    /**
     * Input for the updateWhenZooming.
     * Use it with `<yaga-tile-layer [updateWhenZooming]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-updatewhenzooming Original Leaflet documentation
     */
    @Input() set updateWhenZooming(val: boolean) {
        this.options.updateWhenZooming = val;
    }
    get updateWhenZooming(): boolean {
        return this.options.updateWhenZooming;
    }

    /**
     * Input for the updateInterval.
     * Use it with `<yaga-tile-layer [updateInterval]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-updateinterval Original Leaflet documentation
     */
    @Input() set updateInterval(val: number) {
        this.options.updateInterval = val;
    }
    get updateInterval(): number {
        return this.options.updateInterval;
    }

    /**
     * Input for the bounds.
     * Use it with `<yaga-tile-layer [bounds]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-bounds Original Leaflet documentation
     */
    @Input() set bounds(val: LatLngBoundsExpression) {
        this.options.bounds = val;
        this.redraw();
    }
    get bounds(): LatLngBoundsExpression {
        return this.options.bounds;
    }

    /**
     * Input for the noWrap.
     * Use it with `<yaga-tile-layer [noWrap]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-nowrap Original Leaflet documentation
     */
    @Input() set noWrap(val: boolean) {
        this.options.noWrap = val;
    }
    get noWrap(): boolean {
        return this.options.noWrap;
    }

    /**
     * Input for the className.
     * Use it with `<yaga-tile-layer [className]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-classname Original Leaflet documentation
     */
    @Input() set className(val: string) {
        this.options.className = val;
        this.redraw();
    }
    get className(): string {
        return this.options.className;
    }

    /**
     * Input for the keepBuffer.
     * Use it with `<yaga-tile-layer [keepBuffer]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-keepbuffer Original Leaflet documentation
     */
    @Input() set keepBuffer(val: number) {
        this.options.keepBuffer = val;
    }
    get keepBuffer(): number {
        return this.options.keepBuffer;
    }

    /**
     * Input for the maxNativeZoom.
     * Use it with `<yaga-tile-layer [maxNativeZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-maxnativezoom Original Leaflet documentation
     */
    @Input() set maxNativeZoom(val: number) {
        this.options.maxNativeZoom = val;
        this.redraw();
    };
    get maxNativeZoom(): number {
        return this.options.maxNativeZoom;
    }

    /**
     * Input for the minNativeZoom.
     * Use it with `<yaga-tile-layer [minNativeZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-minnativezoom Original Leaflet documentation
     */
    @Input() set minNativeZoom(val: number) {
        this.options.minNativeZoom = val;
        this.redraw();
    };
    get minNativeZoom(): number {
        return this.options.minNativeZoom;
    }

    /**
     * Input for the subdomains.
     * Use it with `<yaga-tile-layer [subdomains]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-subdomains Original Leaflet documentation
     */
    @Input() set subdomains(val: string[]) {
        this.options.subdomains = val;
    };
    get subdomains(): string[] {
        if (typeof (<string>this.options.subdomains) === 'string') {
            this.options.subdomains = (<string>this.options.subdomains).split('');
        }
        return (<string[]>this.options.subdomains);
    }

    /**
     * Input for the errorTileUrl.
     * Use it with `<yaga-tile-layer [errorTileUrl]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-errortileurl Original Leaflet documentation
     */
    @Input() set errorTileUrl(val: string) {
        this.options.errorTileUrl = val;
        this.redraw();
    };
    get errorTileUrl(): string {
        return this.options.errorTileUrl;
    }

    /**
     * Input for the zoomOffset.
     * Use it with `<yaga-tile-layer [zoomOffset]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-zoomoffset Original Leaflet documentation
     */
    @Input() set zoomOffset(val: number) {
        this.options.zoomOffset = val;
        this.redraw();
    };
    get zoomOffset(): number {
        return this.options.zoomOffset;
    }

    /**
     * Input for the tms.
     * Use it with `<yaga-tile-layer [tms]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-tms Original Leaflet documentation
     */
    @Input() set tms(val: boolean) {
        this.options.tms = val;
        this.redraw();
    };
    get tms(): boolean {
        return this.options.tms;
    }

    /**
     * Input for the zoomReverse.
     * Use it with `<yaga-tile-layer [zoomReverse]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-zoomreverse Original Leaflet documentation
     */
    @Input() set zoomReverse(val: boolean) {
        this.options.zoomReverse = val;
        this.redraw();
    };
    get zoomReverse(): boolean {
        return this.options.zoomReverse;
    }

    /**
     * Input for the detectRetina.
     * Use it with `<yaga-tile-layer [detectRetina]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-detectretina Original Leaflet documentation
     */
    @Input() set detectRetina(val: boolean) {
        this.options.detectRetina = val;
        this.redraw();
    };
    get detectRetina(): boolean {
        return this.options.detectRetina;
    }

    /**
     * Input for the crossOrigin.
     * Use it with `<yaga-tile-layer [crossOrigin]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#tilelayer-crossorigin Original Leaflet documentation
     */
    @Input() set crossOrigin(val: boolean) {
        this.options.crossOrigin = val;
        this.redraw();
    };
    get crossOrigin(): boolean {
        return this.options.crossOrigin;
    }
}
