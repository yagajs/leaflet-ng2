import {
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    Output,
} from "@angular/core";
import {
    Content,
    Direction,
    LatLng,
    latLng,
    LatLngExpression,
    LeafletEvent,
    Point,
    Tooltip,
} from "leaflet";
import { LayerProvider } from "./layer.provider";

/**
 * Angular2 directive for Leaflet tooltips.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-marker>
 *         <yaga-tooltip
 *             [(content)]="..."
 *             [(opened)]="..."
 *             [(lat)]="..."
 *             [(lng)]="..."
 *             [(position)]="..."
 *             [(opacity)]="..."
 *
 *             (open)="..."
 *             (close)="..."
 *
 *             [className]="..."
 *             [pane]="..."
 *             [interactive]="..."
 *             [sticky]="..."
 *             [direction]="..."
 *             [permanent]="..."
 *             [offset]="..."
 *             >
 *             <p>You can pass your content right here!</p>
 *         </yaga-tooltip>
 *     </yaga-marker>
 * </yaga-map>
 * ```
 */
@Directive({
    selector: "yaga-tooltip",
})
export class TooltipDirective extends Tooltip implements OnDestroy {
    /**
     * Two-Way bound property for the content of a tooltip.
     * Use it with `<yaga-tooltip [(content)]="someValue">` or `<yaga-tooltip (contentChange)="processEvent($event)">`
     *
     * You can also pass the content directly within the web-component as view-content
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setcontent Original Leaflet documentation
     */
    @Output() public contentChange: EventEmitter<Content> = new EventEmitter();
    /**
     * Two-Way bound property for the state of being opened.
     * Use it with `<yaga-tooltip [(opened)]="someValue">` or `<yaga-tooltip (openedChange)="processEvent($event)">`
     *
     * You can also use the `tooltipOpened` property in the parent directives
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-openon Original Leaflet documentation
     */
    @Output() public openedChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the latitude position of the tooltip.
     * Use it with `<yaga-tooltip [(lat)]="someValue">` or `<yaga-tooltip (latChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setlatlng Original Leaflet documentation
     */
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the longitude position of the tooltip.
     * Use it with `<yaga-tooltip [(lng)]="someValue">` or `<yaga-tooltip (lngChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setlatlng Original Leaflet documentation
     */
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the position (LatLng) of the tooltip.
     * Use it with `<yaga-tooltip [(position)]="someValue">` or `<yaga-tooltip (positionChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setlatlng Original Leaflet documentation
     */
    @Output() public positionChange: EventEmitter<LatLng> = new EventEmitter();
    /**
     * Two-Way bound property for the opacity of the tooltip.
     * Use it with `<yaga-tooltip [(opacity)]="someValue">` or `<yaga-tooltip (opacityChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setlatlng Original Leaflet documentation
     */
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();

    /**
     * From leaflet fired open event.
     * Use it with `<yaga-tooltip (open)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-tooltipopen Original Leaflet documentation
     */
    @Output("open") public openEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired close event.
     * Use it with `<yaga-tooltip (close)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-tooltipclose Original Leaflet documentation
     */
    @Output("close") public closeEvent: EventEmitter<LeafletEvent> = new EventEmitter();

    constructor(
        protected layerProvider: LayerProvider,
        @Inject(ElementRef) elementRef: ElementRef,
    ) {
        super();
        this.setContent(elementRef.nativeElement);

        this.on("add", (event: LeafletEvent): void => {
            this.openEvent.emit(event);
            this.openedChange.emit(true);
        });
        this.on("remove", (event: LeafletEvent): void => {
            this.closeEvent.emit(event);
            this.openedChange.emit(false);
        });
        this.layerProvider.ref!.bindTooltip(this);
    }

    /**
     * This function gets called from Angular on destroy of the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/OnDestroy-class.html
     */
    public ngOnDestroy(): void {
        this.layerProvider.ref!.unbindTooltip();
    }

    /**
     * Derived method of the original setContent method.
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setcontent Original Leaflet documentation
     */
    public setContent(content: any): this { // Content
        this.contentChange.emit((content));
        return super.setContent((content as HTMLElement));
    }
    /**
     * Two-Way bound property for the content.
     * Use it with `<yaga-tooltip [(content)]="someValue">` or `<yaga-tooltip [content]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setcontent Original Leaflet documentation
     */
    @Input() public set content(val: Content) {
        this.setContent(val);
    }
    public get content(): Content {
        return this.getContent() || "";
    }

    /**
     * Two-Way bound property for the opened state.
     * Use it with `<yaga-tooltip [(opened)]="someValue">` or `<yaga-tooltip [opened]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-openon Original Leaflet documentation
     */
    @Input() public set opened(val: boolean) {
        if (val) {
            this.layerProvider.ref!.openTooltip();
            return;
        }
        this.layerProvider.ref!.closeTooltip();
    }
    public get opened(): boolean {
        return !!(this as any)._map;
    }

    /**
     * Derived method of the original setLatLng method.
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setlatlng Original Leaflet documentation
     */
    public setLatLng(latlng: LatLngExpression): this {
        super.setLatLng(latlng);
        this.latChange.emit(this.lat);
        this.lngChange.emit(this.lng);
        this.positionChange.emit(latLng(this.lat, this.lng));
        return this;
    }
    /**
     * Two-Way bound property for the latitude position of the tooltip.
     * Use it with `<yaga-tooltip [(lat)]="someValue">` or `<yaga-tooltip [lat]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setlatlng Original Leaflet documentation
     */
    @Input() public set lat(val: number) {
        this.setLatLng([val, this.lng]);
    }
    public get lat(): number {
        if (!this.getLatLng()) {
            return NaN;
        }
        return this.getLatLng()!.lat;
    }

    /**
     * Two-Way bound property for the longitude position of the tooltip.
     * Use it with `<yaga-tooltip [(lng)]="someValue">` or `<yaga-tooltip [lng]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setlatlng Original Leaflet documentation
     */
    @Input() public set lng(val: number) {
        this.setLatLng([this.lat, val]);
    }
    public get lng(): number {
        if (!this.getLatLng()) {
            return NaN;
        }
        return this.getLatLng()!.lng;
    }

    /**
     * Two-Way bound property for the position of the tooltip.
     * Use it with `<yaga-tooltip [(position)]="someValue">` or `<yaga-tooltip [position]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setlatlng Original Leaflet documentation
     */
    @Input() public set position(val: LatLng) {
        this.setLatLng(val);
    }
    public get position(): LatLng {
        if (!this.getLatLng()) {
            return new LatLng(NaN, NaN);
        }
        return this.getLatLng()!;
    }

    /**
     * Derived method of the original setContent method.
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-setcontent Original Leaflet documentation
     */
    public setOpacity(val: number): void {
        super.setOpacity(val);
        this.opacityChange.emit(val);
    }
    /**
     * Two-Way bound property for the opacity of the tooltip.
     * Use it with `<yaga-tooltip [(opacity)]="someValue">` or `<yaga-tooltip [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-opacity Original Leaflet documentation
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
     * Input for the CSS class name.
     * Use it with `<yaga-tooltip [autoClose]="className">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-classname Original Leaflet documentation
     */
    @Input() public set className(val: string | undefined) {
        if (!(this as any)._container) {
            this.options.className = val;
            return;
        }
        const oldClassName = ((this as any)._container as HTMLDivElement).getAttribute("class") || "";

        const newClassNameSplited: string[] = oldClassName.split(` ${this.options.className} `);

        if (newClassNameSplited.length === 1) {
            newClassNameSplited.push("");
        }

        ((this as any)._container as HTMLDivElement).setAttribute("class", newClassNameSplited.join(` ${val} `).trim());
        this.options.className = val;
    }
    public get className(): string | undefined {
        return this.options.className;
    }
    /**
     * Input for the pane.
     * Use it with `<yaga-tooltip [pane]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-pane Original Leaflet documentation
     */
    @Input() public set pane(val: string | undefined) {
        this.options.pane = val;
        (this as any)._updateLayout();
    }
    public get pane(): string | undefined {
        return this.options.pane;
    }

    /**
     * Input for the interactive state.
     * Use it with `<yaga-tooltip [interactive]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-interactive Original Leaflet documentation
     */
    @Input() public set interactive(val: boolean) {
        this.options.interactive = val;
        (this as any)._updateLayout();
    }
    public get interactive(): boolean {
        return !!this.options.interactive;
    }

    /**
     * Input for the sticky.
     * Use it with `<yaga-tooltip [sticky]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-sticky Original Leaflet documentation
     */
    @Input() public set sticky(val: boolean) {
        (this as any)._initTooltipInteractions.call(this.layerProvider.ref, true);
        this.options.sticky = val;
        (this as any)._initTooltipInteractions.call(this.layerProvider.ref, false);
    }
    public get sticky(): boolean {
        return !!this.options.sticky;
    }

    /**
     * Input for the direction.
     * Use it with `<yaga-tooltip [direction]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-direction Original Leaflet documentation
     */
    @Input() public set direction(val: Direction | undefined) {
        this.options.direction = val;
        this.reopen();
    }
    public get direction(): Direction | undefined {
        return this.options.direction;
    }

    /**
     * Input for the permanent state.
     * Use it with `<yaga-tooltip [permanent]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-permanent Original Leaflet documentation
     */
    @Input() public set permanent(val: boolean) {
        (this as any)._initTooltipInteractions.call(this.layerProvider.ref, true);
        this.options.permanent = val;
        (this as any)._initTooltipInteractions.call(this.layerProvider.ref, false);
    }
    public get permanent(): boolean {
        return !!this.options.permanent;
    }

    /**
     * Input for the offset.
     * Use it with `<yaga-tooltip [offset]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tooltip-offset Original Leaflet documentation
     */
    @Input() public set offset(val: Point | undefined) {
        this.options.offset = val;
        this.reopen();
    }
    public get offset(): Point | undefined {
        return (this.options.offset as Point);
    }
    public reopen(force: boolean = false) {
        if (force || this.opened) {
            this.layerProvider.ref!.closeTooltip();
            this.layerProvider.ref!.openTooltip();
        }
    }
}
