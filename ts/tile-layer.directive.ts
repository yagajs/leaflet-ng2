import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    OnDestroy } from '@angular/core';
import { TileLayer,
    TileLayerOptions,
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

@Directive({
    selector: 'yaga-tile-layer'
})
export class TileLayerDirective extends TileLayer implements OnDestroy  {
    @Output() public urlChange: EventEmitter<string> = new EventEmitter();
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();

    @Output('add') public addEvent: EventEmitter<Event> = new EventEmitter();
    @Output('remove') public removeEvent: EventEmitter<Event> = new EventEmitter();
    @Output('popupopen') public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    @Output('popupclose') public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    @Output('tooltipopen') public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    @Output('tooltipclose') public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    @Output('click') public clickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('dbclick') public dbclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mousedown') public mousedownEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mouseover') public mouseoverEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mouseout') public mouseoutEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('contextmenu') public contextmenuEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('loading') public loadingEvent: EventEmitter<Event> = new EventEmitter();
    @Output('tileunload') public tileunloadEvent: EventEmitter<TileEvent> = new EventEmitter();
    @Output('tileloadstart') public tileloadstartEvent: EventEmitter<TileEvent> = new EventEmitter();
    @Output('tileerror') public tileerrorEvent: EventEmitter<TileErrorEvent> = new EventEmitter();
    @Output('tileload') public tileloadEvent: EventEmitter<TileEvent> = new EventEmitter();
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

    ngOnDestroy(): void {
        console.log('Destroy');
        this.removeFrom((<any>this)._map);
    }

    setUrl(url: string, noRedraw?: boolean): this {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return super.setUrl(url, noRedraw);
    }
    @Input() set url(val: string) {
        this.setUrl(val);
    }
    get url(): string {
        return (<any>this)._url;
    }


    setOpacity(val: number): this {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return super.setOpacity(val);
    }
    @Input() set opacity(val: number) {
        this.setOpacity(val);
    }
    get opacity(): number {
        return (<TileLayerOptions>(<any>this).options).opacity;
    }

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

    setZIndex(val: number): this {
        super.setZIndex(val);
        this.zIndexChange.emit(val);
        return this;
    }
    @Input() set zIndex(val: number) {
        this.setZIndex(val);
    }
    get zIndex(): number {
        return (<TileLayerOptions>(<any>this).options).zIndex;
    }

    @Input() set tileSize(val: Point) {
        (<TileLayerOptions>(<any>this).options).tileSize = val;
    }
    get tileSize(): Point { // TODO: is this correct that it is always a Point?
        return (<Point>(<TileLayerOptions>(<any>this).options).tileSize);
    }

    @Input() set updateWhenIdle(val: boolean) {
        (<TileLayerOptions>(<any>this).options).updateWhenIdle = val;
    }
    get updateWhenIdle(): boolean {
        return (<TileLayerOptions>(<any>this).options).updateWhenIdle;
    }

    @Input() set updateWhenZooming(val: boolean) {
        (<TileLayerOptions>(<any>this).options).updateWhenZooming = val;
    }
    get updateWhenZooming(): boolean {
        return (<TileLayerOptions>(<any>this).options).updateWhenZooming;
    }

    @Input() set updateInterval(val: number) {
        (<TileLayerOptions>(<any>this).options).updateInterval = val;
    }
    get updateInterval(): number {
        return (<TileLayerOptions>(<any>this).options).updateInterval;
    }

    @Input() set bounds(val: LatLngBoundsExpression) {
        (<TileLayerOptions>(<any>this).options).bounds = val;
    }
    get bounds(): LatLngBoundsExpression {
        return (<TileLayerOptions>(<any>this).options).bounds;
    }

    @Input() set noWrap(val: boolean) {
        (<TileLayerOptions>(<any>this).options).noWrap = val;
    }
    get noWrap(): boolean {
        return (<TileLayerOptions>(<any>this).options).noWrap;
    }

    @Input() set className(val: string) {
        (<TileLayerOptions>(<any>this).options).className = val;
    }
    get className(): string {
        return (<TileLayerOptions>(<any>this).options).className;
    }

    @Input() set keepBuffer(val: number) {
        (<TileLayerOptions>(<any>this).options).keepBuffer = val;
    }
    get keepBuffer(): number {
        return (<TileLayerOptions>(<any>this).options).keepBuffer;
    }

    @Input() set maxNativeZoom(val: number) {
        (<TileLayerOptions>(<any>this).options).maxNativeZoom = val;
    };
    get maxNativeZoom(): number {
        return (<TileLayerOptions>(<any>this).options).maxNativeZoom;
    }

    @Input() set subdomains(val: string[]) {
        (<TileLayerOptions>(<any>this).options).subdomains = val;
    };
    get subdomains(): string[] {
        if (typeof (<string>(<TileLayerOptions>(<any>this).options).subdomains) === 'string') {
            (<TileLayerOptions>(<any>this).options).subdomains = (<string>(<TileLayerOptions>(<any>this).options).subdomains).split('');
        }
        return (<string[]>(<TileLayerOptions>(<any>this).options).subdomains);
    }

    @Input() set errorTileUrl(val: string) {
        (<TileLayerOptions>(<any>this).options).errorTileUrl = val;
    };
    get errorTileUrl(): string {
        return (<TileLayerOptions>(<any>this).options).errorTileUrl;
    }

    @Input() set zoomOffset(val: number) {
        (<TileLayerOptions>(<any>this).options).zoomOffset = val;
    };
    get zoomOffset(): number {
        return (<TileLayerOptions>(<any>this).options).zoomOffset;
    }

    @Input() set tms(val: boolean) {
        (<TileLayerOptions>(<any>this).options).tms = val;
    };
    get tms(): boolean {
        return (<TileLayerOptions>(<any>this).options).tms;
    }

    @Input() set zoomReverse(val: boolean) {
        (<TileLayerOptions>(<any>this).options).zoomReverse = val;
    };
    get zoomReverse(): boolean {
        return (<TileLayerOptions>(<any>this).options).zoomReverse;
    }

    @Input() set detectRetina(val: boolean) {
        (<TileLayerOptions>(<any>this).options).detectRetina = val;
    };
    get detectRetina(): boolean {
        return (<TileLayerOptions>(<any>this).options).detectRetina;
    }

    @Input() set crossOrigin(val: boolean) {
        (<TileLayerOptions>(<any>this).options).crossOrigin = val;
    };
    get crossOrigin(): boolean {
        return (<TileLayerOptions>(<any>this).options).crossOrigin;
    }
}
