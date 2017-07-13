import {
    Directive,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import {
    Control,
    Event,
    LatLngBoundsExpression,
    Map,
    Point,
    PopupEvent,
    TileErrorEvent,
    TileEvent,
    TileLayer,
    TooltipEvent,
    WMSParams,
} from 'leaflet';
import { TRANSPARENT_PIXEL } from './consts';
import { MapComponent } from './map.component';

@Directive({
    selector: 'yaga-wms-layer',
})
export class WmsLayerDirective extends TileLayer.WMS implements OnDestroy  {
    @Output() public urlChange: EventEmitter<string> = new EventEmitter();
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();

    @Output() public layersChange: EventEmitter<string[]> = new EventEmitter();
    @Output() public stylesChange: EventEmitter<string[]> = new EventEmitter();
    @Output() public formatChange: EventEmitter<string> = new EventEmitter();
    @Output() public versionChange: EventEmitter<string> = new EventEmitter();
    @Output() public transparentChange: EventEmitter<boolean> = new EventEmitter();

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
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent,
    ) {
        // Transparent 1px image:
        super(TRANSPARENT_PIXEL, {layers: ''});

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

    public ngOnDestroy(): void {
        this.removeFrom((this as any)._map);
    }

    public setUrl(url: string, noRedraw?: boolean): this {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return super.setUrl(url, noRedraw);
    }
    @Input() public set url(val: string) {
        this.setUrl(val);
    }
    public get url(): string {
        return (this as any)._url;
    }

    public setOpacity(val: number): this {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return super.setOpacity(val);
    }
    @Input() public set opacity(val: number) {
        this.setOpacity(val);
    }
    public get opacity(): number {
        return this.options.opacity;
    }

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
            pane = this.getPane();
            container = this.getContainer();
            map = (this as any)._map;
            events = this.getEvents();
            eventKeys = Object.keys(events);
        } catch (err) {
            /* istanbul ignore next */
            return;
        }
        if (val) {
            // show layer
            pane.appendChild(container);
            for (const oventKey of eventKeys) {
                map.on(oventKey, events[oventKey], this);
            }
            this.redraw();
        } else {
            // hide layer
            pane.removeChild(container);
            for (const oventKey of eventKeys) {
                map.off(oventKey, events[oventKey], this);
            }
        }
    }
    public get display(): boolean {
        let pane: HTMLElement;
        let container: HTMLElement;
        try {
            pane = this.getPane();
            container = this.getContainer();
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

    public setZIndex(val: number): this {
        super.setZIndex(val);
        this.zIndexChange.emit(val);
        return this;
    }
    @Input() public set zIndex(val: number) {
        this.setZIndex(val);
    }
    public get zIndex(): number {
        return this.options.zIndex;
    }

    @Input() public set tileSize(val: Point) {
        this.options.tileSize = val;
    }
    public get tileSize(): Point { // TODO: is this correct that it is always a Point?
        return (this.options.tileSize as Point);
    }

    @Input() public set updateWhenIdle(val: boolean) {
        this.options.updateWhenIdle = val;
    }
    public get updateWhenIdle(): boolean {
        return this.options.updateWhenIdle;
    }

    @Input() public set updateWhenZooming(val: boolean) {
        this.options.updateWhenZooming = val;
    }
    public get updateWhenZooming(): boolean {
        return this.options.updateWhenZooming;
    }

    @Input() public set updateInterval(val: number) {
        this.options.updateInterval = val;
    }
    public get updateInterval(): number {
        return this.options.updateInterval;
    }

    @Input() public set bounds(val: LatLngBoundsExpression) {
        this.options.bounds = val;
    }
    public get bounds(): LatLngBoundsExpression {
        return this.options.bounds;
    }

    @Input() public set noWrap(val: boolean) {
        this.options.noWrap = val;
    }
    public get noWrap(): boolean {
        return this.options.noWrap;
    }

    @Input() public set className(val: string) {
        this.options.className = val;
    }
    public get className(): string {
        return this.options.className;
    }

    @Input() public set keepBuffer(val: number) {
        this.options.keepBuffer = val;
    }
    public get keepBuffer(): number {
        return this.options.keepBuffer;
    }

    @Input() public set maxNativeZoom(val: number) {
        this.options.maxNativeZoom = val;
    }
    public get maxNativeZoom(): number {
        return this.options.maxNativeZoom;
    }
    @Input() public set minNativeZoom(val: number) {
        this.options.minNativeZoom = val;
    }
    public get minNativeZoom(): number {
        return this.options.minNativeZoom;
    }

    @Input() public set subdomains(val: string[]) {
        this.options.subdomains = val;
    }
    public get subdomains(): string[] {
        if (typeof (this.options.subdomains as string) === 'string') {
            this.options.subdomains = (this.options.subdomains as string).split('');
        }
        return (this.options.subdomains as string[]);
    }

    @Input() public set errorTileUrl(val: string) {
        this.options.errorTileUrl = val;
    }
    public get errorTileUrl(): string {
        return this.options.errorTileUrl;
    }

    @Input() public set zoomOffset(val: number) {
        this.options.zoomOffset = val;
    }
    public get zoomOffset(): number {
        return this.options.zoomOffset;
    }

    @Input() public set tms(val: boolean) {
        this.options.tms = val;
    }
    public get tms(): boolean {
        return this.options.tms;
    }

    @Input() public set zoomReverse(val: boolean) {
        this.options.zoomReverse = val;
    }
    public get zoomReverse(): boolean {
        return this.options.zoomReverse;
    }

    @Input() public set detectRetina(val: boolean) {
        this.options.detectRetina = val;
    }
    public get detectRetina(): boolean {
        return this.options.detectRetina;
    }

    @Input() public set crossOrigin(val: boolean) {
        this.options.crossOrigin = val;
    }
    public get crossOrigin(): boolean {
        return this.options.crossOrigin;
    }

    @Input() public set uppercase(val: boolean) {
        this.options.uppercase = val;
    }
    public get uppercase(): boolean {
        return this.options.uppercase;
    }

    // WMS Params
    public setParams(params: WMSParams, redraw?: boolean): this {
        super.setParams(params, redraw);
        this.layersChange.emit(this.wmsParams.layers.split(','));
        this.stylesChange.emit(this.wmsParams.styles.split(','));
        this.formatChange.emit(this.wmsParams.format);
        this.versionChange.emit(this.wmsParams.version);
        this.transparentChange.emit(this.wmsParams.transparent);
        return this;
    }
    @Input() public set layers(val: string[]) {
        const newParams: WMSParams = Object.create(this.wmsParams);
        newParams.layers = val.join(',');
        this.setParams(newParams);
    }
    public get layers(): string[] {
        return this.wmsParams.layers.split(',');
    }
    @Input() public set styles(val: string[]) {
        const newParams: WMSParams = Object.create(this.wmsParams);
        newParams.styles = val.join(',');
        this.setParams(newParams);
    }
    public get styles(): string[] {
        return this.wmsParams.styles.split(',');
    }
    @Input() public set format(val: string) {
        const newParams: WMSParams = Object.create(this.wmsParams);
        newParams.format = val;
        this.setParams(newParams);
    }
    public get format(): string {
        return this.wmsParams.format;
    }
    @Input() public set version(val: string) {
        const newParams: WMSParams = Object.create(this.wmsParams);
        newParams.version = val;
        this.setParams(newParams);
    }
    public get version(): string {
        return this.wmsParams.version;
    }
    @Input() public set transparent(val: boolean) {
        const newParams: WMSParams = Object.create(this.wmsParams);
        newParams.transparent = val;
        this.setParams(newParams);
    }
    public get transparent(): boolean {
        return this.wmsParams.transparent;
    }
    /**
     * Input for the attribution.
     * Use it with `<yaga-wms-layer [attribution]="someValue">`
     * @link http://leafletjs.com/reference-1.0.2.html#wmslayer-attribution Original Leaflet documentation
     */
    @Input() public set attribution(val: string) {
        if ((this as any)._map && (this as any)._map.attributionControl) {
            ((this as any)._map.attributionControl as Control.Attribution).removeAttribution(this.getAttribution());
            ((this as any)._map.attributionControl as Control.Attribution).addAttribution(val);
        }
        this.options.attribution = val;
    }
    public get attribution(): string {
        return this.getAttribution();
    }
}
