import {
    AfterContentInit,
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from "@angular/core";
import {
    DivIcon,
    DragEndEvent,
    Handler,
    Icon,
    LatLng,
    LatLngLiteral,
    LatLngTuple,
    LeafletEvent,
    LeafletMouseEvent,
    Map,
    Marker,
    PopupEvent,
    TooltipEvent,
} from "leaflet";
import { LayerGroupProvider } from "./layer-group.provider";
import { LayerProvider } from "./layer.provider";
import { MarkerProvider } from "./marker.provider";

/**
 * Angular2 directive for markers of Leaflet.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-marker
 *         [(draggable)]="..."
 *         [(display)]="..."
 *         [(opacity)]="..."
 *         [(lat)]="..."
 *         [(lng)]="..."
 *         [(position)]="..."
 *         [(zIndexOffset)]="..."
 *         [(icon)]="..."
 *
 *         (dragend)="..."
 *         (dragstart)="..."
 *         (movestart)="..."
 *         (drag)="..."
 *         (moveend)="..."
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
 *
 *         [title]="..."
 *         [alt]="..."
 *         >
 *     </yaga-marker>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#marker Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Marker%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/marker.directive.js.html
 * Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/marker.directive.js.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/marker-directive/
 */
@Directive({
    providers: [ LayerProvider, MarkerProvider ],
    selector: "yaga-marker",
})
export class MarkerDirective extends Marker implements AfterContentInit, OnDestroy {
    /**
     * Two-Way bound property for the latlng-position of the geometry.
     * Use it with `<yaga-marker [(position)]="someValue">`
     * or `<yaga-marker (positionChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-setlatlng Original Leaflet documentation
     */
    @Output() public positionChange: EventEmitter<LatLng> = new EventEmitter();
    /**
     * Two-Way bound property for the latitude of the geometry.
     * Use it with `<yaga-marker [(lat)]="someValue">`
     * or `<yaga-marker (latChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-setlatlng Original Leaflet documentation
     */
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the longitude of the geometry.
     * Use it with `<yaga-marker [(lng)]="someValue">`
     * or `<yaga-marker (lngChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-setlatlng Original Leaflet documentation
     */
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the opacity of the geometry.
     * Use it with `<yaga-marker [(opacity)]="someValue">`
     * or `<yaga-marker (opacityChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-setopacity Original Leaflet documentation
     */
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the display status of the geometry.
     * Use it with `<yaga-marker [(display)]="someValue">`
     * or `<yaga-marker (displayChange)="processEvent($event)">`
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the offset of the zIndex.
     * Use it with `<yaga-marker [(zIndexOffset)]="someValue">`
     * or `<yaga-marker (zIndexOffsetChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.3.0.html#marker-zindexoffset Original Leaflet documentation
     */
    @Output() public zIndexOffsetChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the draggable state.
     * Use it with `<yaga-marker [(draggable)]="someValue">`
     * or `<yaga-marker (draggableChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.3.0.html#marker-dragging Original Leaflet documentation
     */
    @Output() public draggableChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the icon.
     * Use it with `<yaga-marker [(icon)]="someValue">`
     * or `<yaga-marker (iconChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.3.0.html#marker-seticon Original Leaflet documentation
     */
    @Output() public iconChange: EventEmitter<Icon | DivIcon> = new EventEmitter();
    @Output() public tooltipOpenedChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public popupOpenedChange: EventEmitter<boolean> = new EventEmitter();

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-marker (dragend)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-dragend Original Leaflet documentation
     */
    @Output("dragend") public dragendEvent: EventEmitter<DragEndEvent> = new EventEmitter();
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-marker (dragstart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-dragstart Original Leaflet documentation
     */
    @Output("dragstart") public dragstartEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-marker (movestart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-movestart Original Leaflet documentation
     */
    @Output("movestart") public movestartEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-marker (drag)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-drag Original Leaflet documentation
     */
    @Output("drag") public dragEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-marker (moveend)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-moveend Original Leaflet documentation
     */
    @Output("moveend") public moveendEvent: EventEmitter<LeafletEvent> = new EventEmitter();

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-marker (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-add Original Leaflet documentation
     */
    @Output("add") public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-marker (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-remove Original Leaflet documentation
     */
    @Output("remove") public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-marker (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-popupopen Original Leaflet documentation
     */
    @Output("popupopen") public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-marker (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-popupclose Original Leaflet documentation
     */
    @Output("popupclose") public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-marker (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-tooltipopen Original Leaflet documentation
     */
    @Output("tooltipopen") public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-marker (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-tooltipclose Original Leaflet documentation
     */
    @Output("tooltipclose") public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-marker (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-click Original Leaflet documentation
     */
    @Output("click") public clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired dblclick event.
     * Use it with `<yaga-marker (dblclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-dblclick Original Leaflet documentation
     */
    @Output("dblclick") public dblclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-marker (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-mousedown Original Leaflet documentation
     */
    @Output("mousedown") public mousedownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-marker (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-mouseover Original Leaflet documentation
     */
    @Output("mouseover") public mouseoverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-marker (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-mouseout Original Leaflet documentation
     */
    @Output("mouseout") public mouseoutEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-marker (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-contextmenu Original Leaflet documentation
     */
    @Output("contextmenu") public contextmenuEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();

    /**
     * Internal property to stop further processing while it is not initialized
     */
    private initialized: boolean = false;

    constructor(
        protected layerGroupProvider: LayerGroupProvider,
        layerProvider: LayerProvider,
        markerProvider: MarkerProvider,
    ) {
        super([0, 0]);
        layerProvider.ref = this;
        markerProvider.ref = this;
        this.layerGroupProvider.ref!.addLayer(this);

        this.on("remove", () => {
            this.displayChange.emit(false);
        });
        this.on("add", () => {
            this.displayChange.emit(true);
        });
        this.on("drag", () => {
            this.latChange.emit(this.getLatLng().lat);
            this.lngChange.emit(this.getLatLng().lng);
            this.positionChange.emit(this.getLatLng());
        });

        // Events
        this.on("dragend", (event: LeafletEvent) => {
            this.dragendEvent.emit(event as DragEndEvent);
        });
        this.on("dragstart", (event: LeafletEvent) => {
            this.dragstartEvent.emit(event);
        });
        this.on("movestart", (event: LeafletEvent) => {
            this.movestartEvent.emit(event);
        });
        this.on("drag", (event: LeafletEvent) => {
            this.dragEvent.emit(event);
        });
        this.on("moveend", (event: LeafletEvent) => {
            this.moveendEvent.emit(event);
        });
        this.on("add", (event: LeafletEvent) => {
            this.addEvent.emit(event);
        });
        this.on("remove", (event: LeafletEvent) => {
            this.removeEvent.emit(event);
        });
        this.on("popupopen", (event: LeafletEvent) => {
            this.popupopenEvent.emit(event as PopupEvent);
            this.popupOpenedChange.emit(true);
        });
        this.on("popupclose", (event: LeafletEvent) => {
            this.popupcloseEvent.emit(event as PopupEvent);
            this.popupOpenedChange.emit(false);
        });
        this.on("tooltipopen", (event: LeafletEvent) => {
            this.tooltipopenEvent.emit(event as TooltipEvent);
            this.tooltipOpenedChange.emit(true);
        });
        this.on("tooltipclose", (event: LeafletEvent) => {
            this.tooltipcloseEvent.emit(event as TooltipEvent);
            this.tooltipOpenedChange.emit(false);
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
        const oldDraggingEnable: () => any = this.dragging!.enable;
        const oldDraggingDisable: () => any = this.dragging!.disable;

        this.dragging!.enable = (): Handler => {
            const val: Handler = oldDraggingEnable.call(this.dragging);
            this.draggableChange.emit(true);
            return val;
        };
        this.dragging!.disable = (): Handler => {
            const val: Handler = oldDraggingDisable.call(this.dragging);
            this.draggableChange.emit(false);
            return val;
        };
    }
    /**
     * Internal method that provides the initialization of the directive
     */
    public ngAfterContentInit(): void {
        this.initialized = true; // Otherwise lng gets overwritten to 0
    }
    /**
     * Internal method to provide the removal of the layer in Leaflet, when removing it from the Angular template
     */
    public ngOnDestroy(): void {
        this.removeFrom(this.layerGroupProvider.ref as Map);
    }

    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-marker [(display)]="someValue">` or `<yaga-marker [display]="someValue">`
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
        } else {
            // hide layer
            pane.removeChild(container);
            for (const eventKey of eventKeys) {
                map.off(eventKey, events[eventKey], this);
            }
        }
    }
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
     * Derived method of the original setLatLng method.
     * @link http://leafletjs.com/reference-1.2.0.html#marker-setlatlng Original Leaflet documentation
     */
    public setLatLng(val: LatLng | LatLngLiteral | LatLngTuple): this {
        super.setLatLng((val as any));
        if (this.initialized) {
            this.positionChange.emit(this.getLatLng());
            this.latChange.emit(this.getLatLng().lat);
            this.lngChange.emit(this.getLatLng().lng);
        }
        return this;
    }
    /**
     * Two-Way bound property for the position of the marker.
     * Use it with `<yaga-marker [(position)]="someValue">` or `<yaga-marker [position]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-setlatlng Original Leaflet documentation
     */
    @Input() public set position(val: LatLng) {
        this.setLatLng(val);
    }
    public get position(): LatLng {
        return this.getLatLng();
    }
    /**
     * Two-Way bound property for the position of the marker.
     * Use it with `<yaga-marker [(lat)]="someValue">` or `<yaga-marker [lat]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-setlatlng Original Leaflet documentation
     */
    @Input() public set lat(val: number) {
        this.setLatLng([val, this.lng]);
    }
    public get lat(): number {
        return this.getLatLng().lat;
    }
    /**
     * Two-Way bound property for the position of the marker.
     * Use it with `<yaga-marker [(lng)]="someValue">` or `<yaga-marker [lng]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-setlatlng Original Leaflet documentation
     */
    @Input() public set lng(val: number) {
        this.setLatLng([this.lat, val]);
    }
    public get lng(): number {
        return this.getLatLng().lng;
    }

    /**
     * Derived method of the original setOpacity method.
     * @link http://leafletjs.com/reference-1.2.0.html#marker-setopacity Original Leaflet documentation
     */
    public setOpacity(val: number): this {
        if (this.opacity === val) {
            return this;
        }
        this.opacityChange.emit(val);
        return super.setOpacity(val);
    }
    /**
     * Two-Way bound property for the opacity of the marker.
     * Use it with `<yaga-marker [(opacity)]="someValue">` or `<yaga-marker [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-setopacity Original Leaflet documentation
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
     * Two-Way bound property for the state of the popup.
     * Use it with `<yaga-marker [(popupOpened)]="someValue">` or `<yaga-marker [popupOpened]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-openpopup Original Leaflet documentation
     */
    @Input() public set popupOpened(val: boolean) {
        if (val) {
            // It would not work without timeout!
            this.openPopup();
            return;
        }
        this.closePopup();
    }
    public get popupOpened(): boolean {
        return this.isPopupOpen();
    }

    /**
     * Two-Way bound property for the state of the popup.
     * Use it with `<yaga-marker [(tooltipOpened)]="someValue">` or `<yaga-marker [tooltipOpened]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-opentooltip Original Leaflet documentation
     */
    @Input() public set tooltipOpened(val: boolean) {
        if (val) {
            this.openTooltip();
            return;
        }
        this.closeTooltip();
    }
    public get tooltipOpened(): boolean {
        return this.isTooltipOpen();
    }

    /**
     * Derived method of the original setIcon method.
     * @link http://leafletjs.com/reference-1.2.0.html#marker-seticon Original Leaflet documentation
     */
    public setIcon(val: Icon | DivIcon): this {
        super.setIcon(val);
        this.iconChange.emit(val);
        return this;
    }
    /**
     * Two-Way bound property for the state of the popup.
     * Use it with `<yaga-marker [(icon)]="someValue">` or `<yaga-marker [icon]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-seticon Original Leaflet documentation
     */
    @Input() public set icon(val: Icon | DivIcon) {
        this.setIcon(val);
    }
    public get icon(): Icon | DivIcon {
        return this.options.icon!;
    }
    /**
     * Two-Way bound property for the state of the dragging.
     * Use it with `<yaga-marker [(draggable)]="someValue">` or `<yaga-marker [draggable]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-dragging Original Leaflet documentation
     */
    @Input() public set draggable(val: boolean) {
        if (val) {
            this.dragging!.enable();
            return;
        }
        this.dragging!.disable();
        return;
    }
    public get draggable(): boolean {
        return this.dragging!.enabled();
    }

    /**
     * Derived method of the original setZIndexOffset method.
     * @link http://leafletjs.com/reference-1.2.0.html#marker-zindexoffset Original Leaflet documentation
     */
    public setZIndexOffset(val: number): this {
        if (this.zIndexOffset === val) {
            return this;
        }
        this.zIndexOffsetChange.emit(val);
        return super.setZIndexOffset(val);
    }
    /**
     * Two-Way bound property for the offset of the zIndex.
     * Use it with `<yaga-marker [(draggable)]="someValue">` or `<yaga-marker [draggable]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-zindexoffset Original Leaflet documentation
     */
    @Input() public set zIndexOffset(val: number) {
        this.setZIndexOffset(val);
    }
    public get zIndexOffset(): number {
        return this.options.zIndexOffset || 0;
    }

    /**
     * Input for the title.
     * Use it with `<yaga-marker [title]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-title Original Leaflet documentation
     */
    @Input() public set title(val: string) {
        this.options.title = val;
        this.getElement()!.setAttribute("title", val);
    }
    public get title(): string {
        return this.getElement()!.getAttribute("title") || "";
    }
    /**
     * Input for the alternative text.
     * Use it with `<yaga-marker [alt]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#marker-title Original Leaflet documentation
     */
    @Input() public set alt(val: string | undefined) {
        this.options.alt = val;
        if (typeof val === "string") {
            this.getElement()!.setAttribute("alt", val);
            return;
        }
        this.getElement()!.removeAttribute("alt");
    }
    public get alt(): string | undefined {
        return this.getElement()!.getAttribute("alt") || undefined;
    }
}
