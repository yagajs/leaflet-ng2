import {
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from "@angular/core";
import {
    Control,
    ImageOverlay,
    LatLngBounds,
    latLngBounds,
    LatLngBoundsExpression,
    LeafletEvent,
    LeafletMouseEvent,
    Map,
    PopupEvent,
    TooltipEvent,
} from "leaflet";
import { TRANSPARENT_PIXEL } from "./consts";
import { LayerGroupProvider } from "./layer-group.provider";
import { LayerProvider } from "./layer.provider";

/**
 * Angular2 directive for Leaflet image overlays.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-image-overlay
 *         [(url)]="..."
 *         [(display)]="..."
 *         [(opacity)]="..."
 *         [(zIndex)]="..."
 *         [(bounds)]="..."
 *         [(north)]="..."
 *         [(east)]="..."
 *         [(south)]="..."
 *         [(west)]="..."
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
 *         (load)="..."
 *         (error)="..."
 *
 *         [crossOrigin]="..."
 *         [alt]="..."
 *         [interactive]="..."
 *         [attribution]="..."
 *         >
 *     </yaga-image-overlay>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Image-Overlay%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/image-overlay.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/imageoverlaydirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/image-overlay-directive
 */
@Directive({
    providers: [ LayerProvider ],
    selector: "yaga-image-overlay",
})
export class ImageOverlayDirective extends ImageOverlay implements OnDestroy  {
    /**
     * Two-Way bound property for the URL.
     * Use it with `<yaga-image-overlay [(url)]="someValue">` or
     * `<yaga-image-overlay (urlChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-seturl Original Leaflet documentation
     */
    @Output() public urlChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-image-overlay [(display)]="someValue">`
     * or `<yaga-image-overlay (displayChange)="processEvent($event)">`
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the opacity of the layer.
     * Use it with `<yaga-image-overlay [(opacity)]="someValue">`
     * or `<yaga-image-overlay (opacityChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-opacity Original Leaflet documentation
     */
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    // maybe implement -> @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();

    /**
     * Two-Way bound property for the bounds of the image.
     * Use it with `<yaga-image-overlay [(bounds)]="someValue">`
     * or `<yaga-image-overlay (opacityChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-setbounds Original Leaflet documentation
     */
    @Output() public boundsChange: EventEmitter<LatLngBounds> = new EventEmitter();
    /**
     * Two-Way bound property for the north bounds of the image.
     * Use it with `<yaga-image-overlay [(north)]="someValue">`
     * or `<yaga-image-overlay (northChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-setbounds Original Leaflet documentation
     */
    @Output() public northChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the east bounds of the image.
     * Use it with `<yaga-image-overlay [(east)]="someValue">`
     * or `<yaga-image-overlay (eastChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-setbounds Original Leaflet documentation
     */
    @Output() public eastChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the south bounds of the image.
     * Use it with `<yaga-image-overlay [(south)]="someValue">`
     * or `<yaga-image-overlay (southChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-setbounds Original Leaflet documentation
     */
    @Output() public southChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the west bounds of the image.
     * Use it with `<yaga-image-overlay [(west)]="someValue">`
     * or `<yaga-image-overlay (westChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-setbounds Original Leaflet documentation
     */
    @Output() public westChange: EventEmitter<number> = new EventEmitter();

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-image-overlay (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-add Original Leaflet documentation
     */
    @Output("add") public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-image-overlay (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-remove Original Leaflet documentation
     */
    @Output("remove") public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-image-overlay (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-popupopen Original Leaflet documentation
     */
    @Output("popupopen") public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-image-overlay (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-popupclose Original Leaflet documentation
     */
    @Output("popupclose") public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-image-overlay (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-tooltipopen Original Leaflet documentation
     */
    @Output("tooltipopen") public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-image-overlay (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-tooltipclose Original Leaflet documentation
     */
    @Output("tooltipclose") public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-image-overlay (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-click Original Leaflet documentation
     */
    @Output("click") public clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired dblclick event.
     * Use it with `<yaga-image-overlay (dblclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-dblclick Original Leaflet documentation
     */
    @Output("dblclick") public dblclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-image-overlay (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-mousedown Original Leaflet documentation
     */
    @Output("mousedown") public mousedownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-image-overlay (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-mouseover Original Leaflet documentation
     */
    @Output("mouseover") public mouseoverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-image-overlay (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-mouseout Original Leaflet documentation
     */
    @Output("mouseout") public mouseoutEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-image-overlay (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-contextmenu Original Leaflet documentation
     */
    @Output("contextmenu") public contextmenuEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired load event.
     * Use it with `<yaga-image-overlay (load)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-load Original Leaflet documentation
     */
    @Output("load") public loadEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired error event.
     * Use it with `<yaga-image-overlay (error)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-error Original Leaflet documentation
     */
    @Output("error") public errorEvent: EventEmitter<LeafletEvent> = new EventEmitter();

    constructor(
        protected layerGroupProvider: LayerGroupProvider,
        layerProvider: LayerProvider,
    ) {
        // Transparent 1px image:
        super(TRANSPARENT_PIXEL, [[0, 0], [1, 1]], {});

        layerProvider.ref = this;

        this.on("remove", () => {
            this.displayChange.emit(false);
        });
        this.on("add", () => {
            this.displayChange.emit(true);
        });

        this.layerGroupProvider.ref!.addLayer(this);

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
        this.on("load", (event: LeafletEvent) => {
            this.loadEvent.emit(event);
        });
        this.on("error", (event: LeafletEvent) => {
            this.errorEvent.emit(event);
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
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-seturl Original Leaflet documentation
     */
    public setUrl(url: string): this {
        if (this.url === url) {
            return this;
        }
        this.urlChange.emit(url);
        return super.setUrl(url);
    }
    /**
     * Two-Way bound property for the URL.
     * Use it with `<yaga-image-overlay [(url)]="someValue">` or `<yaga-image-overlay [url]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-seturl Original Leaflet documentation
     */
    @Input() public set url(val: string) {
        this.setUrl(val);
    }
    public get url(): string {
        return (this as any)._url;
    }

    /**
     * Derived method of the original setOpacity method.
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-setopacity Original Leaflet documentation
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
     * Use it with `<yaga-image-overlay [(opacity)]="someValue">` or `<yaga-image-overlay [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-setopacity Original Leaflet documentation
     */
    @Input() public set opacity(val: number) {
        this.setOpacity(val);
    }
    public get opacity(): number {
        if (this.options.hasOwnProperty("opacity") && this.options.opacity !== undefined) {
            return this.options.opacity;
        }
        return 1;
    }

    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-image-overlay [(display)]="someValue">` or `<yaga-image-overlay [display]="someValue">`
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
            container = this.getElement() as HTMLImageElement;
            map = (this as any)._map;
            events = (this as any).getEvents();
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
     * Use it with `<yaga-image-overlay [(display)]="someValue">` or `<yaga-image-overlay [display]="someValue">`
     */
    public get display(): boolean {
        let pane: HTMLElement;
        let container: HTMLElement;
        try {
            pane = this.getPane() as HTMLElement;
            container = this.getElement() as HTMLImageElement;
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
     * Derived method of the original setBounds method.
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-setbounds Original Leaflet documentation
     */
    public setBounds(val: LatLngBoundsExpression): this {
        super.setBounds(latLngBounds((val as any)));

        this.boundsChange.emit(this.bounds);
        this.northChange.emit(this.north);
        this.eastChange.emit(this.east);
        this.southChange.emit(this.south);
        this.westChange.emit(this.west);

        return this;
    }
    /**
     * Two-Way bound property for the bounds of the image.
     * Use it with `<yaga-image-overlay [(bounds)]="someValue">` or `<yaga-image-overlay [bounds]="someValue">`
     */
    @Input() public set bounds(val: LatLngBounds) {
        this.setBounds(val);
    }
    public get bounds(): LatLngBounds {
        return this.getBounds();
    }
    /**
     * Two-Way bound property for the north bounds of the image.
     * Use it with `<yaga-image-overlay [(north)]="someValue">` or `<yaga-image-overlay [north]="someValue">`
     */
    @Input() public set north(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();

        // super because we call the change listeners ourselves
        super.setBounds(latLngBounds([
            [oldBounds.getSouth(), oldBounds.getWest()],
            [val, oldBounds.getEast()],
        ]));

        this.boundsChange.emit(this.bounds);
        this.northChange.emit(val);
    }
    public get north(): number {
        return this.getBounds().getNorth();
    }
    /**
     * Two-Way bound property for the east bounds of the image.
     * Use it with `<yaga-image-overlay [(east)]="someValue">` or `<yaga-image-overlay [east]="someValue">`
     */
    @Input() public set east(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();
        super.setBounds(latLngBounds([
            [oldBounds.getSouth(), oldBounds.getWest()],
            [oldBounds.getNorth(), val],
        ]));

        this.boundsChange.emit(this.bounds);
        this.eastChange.emit(val);
    }
    public get east(): number {
        return this.getBounds().getEast();
    }
    /**
     * Two-Way bound property for the south bounds of the image.
     * Use it with `<yaga-image-overlay [(south)]="someValue">` or `<yaga-image-overlay [south]="someValue">`
     */
    @Input() public set south(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();
        super.setBounds(latLngBounds([
            [val, oldBounds.getWest()],
            [oldBounds.getNorth(), oldBounds.getEast()],
        ]));

        this.boundsChange.emit(this.bounds);
        this.southChange.emit(val);
    }
    public get south(): number {
        return this.getBounds().getSouth();
    }
    /**
     * Two-Way bound property for the west bounds of the image.
     * Use it with `<yaga-image-overlay [(west)]="someValue">` or `<yaga-image-overlay [west]="someValue">`
     */
    @Input() public set west(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();
        super.setBounds(latLngBounds([
            [oldBounds.getSouth(), val],
            [oldBounds.getNorth(), oldBounds.getEast()],
        ]));

        this.boundsChange.emit(this.bounds);
        this.westChange.emit(val);
    }
    public get west(): number {
        return this.getBounds().getWest();
    }

    /**
     * Input for the crossOrigin.
     * Use it with `<yaga-image-overlay [crossOrigin]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-crossorigin Original Leaflet documentation
     */
    @Input() public set crossOrigin(val: boolean) {
        this.options.crossOrigin = val;
        this.getElement()!.crossOrigin = val ? "" : null;
    }
    public get crossOrigin(): boolean {
        return !!this.options.crossOrigin;
    }

    /**
     * Input for the alternative text.
     * Use it with `<yaga-image-overlay [alt]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-alt Original Leaflet documentation
     */
    @Input() public set alt(val: string) {
        this.options.alt = val;
        this.getElement()!.alt = val;
    }
    public get alt(): string {
        return this.getElement()!.alt;
    }
    /**
     * Input for the state of interaction.
     * Use it with `<yaga-image-overlay [interactive]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-interactive Original Leaflet documentation
     */
    @Input() public set interactive(val: boolean) {
        this.options.interactive = val;
        this.onRemove(((this as any)._map as any));
        this.onAdd(((this as any)._map as any));
    }
    public get interactive(): boolean {
        return !!this.options.interactive;
    }

    /**
     * Input for the attribution.
     * Use it with `<yaga-image-overlay [attribution]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#imageoverlay-attribution Original Leaflet documentation
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
