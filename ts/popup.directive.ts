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
    LatLng,
    latLng,
    LatLngExpression,
    LeafletEvent,
    Point,
    Popup,
} from "leaflet";
import { LayerProvider } from "./layer.provider";

/**
 * Angular2 directive for Leaflet popups.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-marker>
 *         <yaga-popup
 *             [(content)]="..."
 *             [(opened)]="..."
 *             [(lat)]="..."
 *             [(lng)]="..."
 *             [(position)]="..."
 *
 *             (open)="..."
 *             (close)="..."
 *
 *             [maxWidth]="..."
 *             [minWidth]="..."
 *             [maxHeight]="..."
 *             [autoPan]="..."
 *             [autoPanPaddingTopLeft]="..."
 *             [autoPanPaddingBottomRight]="..."
 *             [autoPanPadding]="..."
 *             [keepInView]="..."
 *             [closeButton]="..."
 *             [autoClose]="..."
 *             [className]="..."
 *             [pane]="..."
 *             >
 *             <p>You can pass your content right here!</p>
 *         </yaga-popup>
 *     </yaga-marker>
 * </yaga-map>
 * ```
 */
@Directive({
    selector: "yaga-popup",
})
export class PopupDirective extends Popup implements OnDestroy {
    /**
     * Two-Way bound property for the content of a popup.
     * Use it with `<yaga-popup [(content)]="someValue">` or `<yaga-popup (contentChange)="processEvent($event)">`
     *
     * You can also pass the content directly within the web-component as view-content
     * @link http://leafletjs.com/reference-1.2.0.html#popup-setcontent Original Leaflet documentation
     */
    @Output() public contentChange: EventEmitter<Content> = new EventEmitter();
    /**
     * Two-Way bound property for the state of being opened.
     * Use it with `<yaga-popup [(opened)]="someValue">` or `<yaga-popup (openedChange)="processEvent($event)">`
     *
     * You can also use the `popupOpened` property in the parent directives
     * @link http://leafletjs.com/reference-1.2.0.html#popup-openon Original Leaflet documentation
     */
    @Output() public openedChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the latitude position of the popup.
     * Use it with `<yaga-popup [(lat)]="someValue">` or `<yaga-popup (latChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-setlatlng Original Leaflet documentation
     */
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the longitude position of the popup.
     * Use it with `<yaga-popup [(lng)]="someValue">` or `<yaga-popup (lngChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-setlatlng Original Leaflet documentation
     */
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the position (LatLng) of the popup.
     * Use it with `<yaga-popup [(position)]="someValue">` or `<yaga-popup (positionChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-setlatlng Original Leaflet documentation
     */
    @Output() public positionChange: EventEmitter<LatLng> = new EventEmitter();

    /**
     * From leaflet fired open event.
     * Use it with `<yaga-popup (open)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-popupopen Original Leaflet documentation
     */
    @Output("open") public openEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired close event.
     * Use it with `<yaga-popup (close)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-popupclose Original Leaflet documentation
     */
    @Output("close") public closeEvent: EventEmitter<LeafletEvent> = new EventEmitter();

    constructor(
        @Inject(ElementRef) elementRef: ElementRef,
        public layerProvider: LayerProvider,
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
        this.on("popupopen", (event: LeafletEvent): void => {
            this.openEvent.emit(event);
        });
        this.on("popuclose", (event: LeafletEvent): void => {
            this.closeEvent.emit(event);
        });

        this.layerProvider.ref!.bindPopup(this);
    }

    public ngOnDestroy(): void {
        this.layerProvider.ref!.unbindPopup();
    }

    /**
     * Derived method of the original setContent method.
     * @link http://leafletjs.com/reference-1.2.0.html#popup-setcontent Original Leaflet documentation
     */
    public setContent(content: any): this { // Content
        this.contentChange.emit((content));
        return super.setContent((content as HTMLElement));
    }
    /**
     * Two-Way bound property for the content.
     * Use it with `<yaga-popup [(content)]="someValue">` or `<yaga-popup [content]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-setcontent Original Leaflet documentation
     */
    @Input() public set content(val: Content) {
        this.setContent(val);
    }
    public get content(): Content {
        return this.getContent() as string | HTMLElement;
    }

    /**
     * Two-Way bound property for the opened state.
     * Use it with `<yaga-popup [(opened)]="someValue">` or `<yaga-popup [opened]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-openon Original Leaflet documentation
     */
    @Input() public set opened(val: boolean) {
        if (val) {
            this.layerProvider.ref!.openPopup();
            return;
        }
        this.layerProvider.ref!.closePopup();
    }
    public get opened(): boolean {
        return !!(this as any)._map;
    }

    /**
     * Derived method of the original setLatLng method.
     * @link http://leafletjs.com/reference-1.2.0.html#popup-setlatlng Original Leaflet documentation
     */
    public setLatLng(latlng: LatLngExpression): this {
        super.setLatLng(latlng);
        this.latChange.emit(this.lat);
        this.lngChange.emit(this.lng);
        this.positionChange.emit(latLng(this.lat, this.lng));
        return this;
    }
    /**
     * Two-Way bound property for the latitude position of the popup.
     * Use it with `<yaga-popup [(lat)]="someValue">` or `<yaga-popup [lat]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-setlatlng Original Leaflet documentation
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
     * Two-Way bound property for the longitude position of the popup.
     * Use it with `<yaga-popup [(lng)]="someValue">` or `<yaga-popup [lng]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-setlatlng Original Leaflet documentation
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
     * Two-Way bound property for the position of the popup.
     * Use it with `<yaga-popup [(position)]="someValue">` or `<yaga-popup [position]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-setlatlng Original Leaflet documentation
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
     * Input for the maxWidth.
     * Use it with `<yaga-popup [maxWidth]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-maxwidth Original Leaflet documentation
     */
    @Input() public set maxWidth(val: number| undefined) {
        this.options.maxWidth = val;
        this.reopen();
    }
    public get maxWidth(): number| undefined {
        return this.options.maxWidth;
    }
    /**
     * Input for the minWidth.
     * Use it with `<yaga-popup [minWidth]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-minwidth Original Leaflet documentation
     */
    @Input() public set minWidth(val: number| undefined) {
        this.options.minWidth = val;
        this.reopen();
    }
    public get minWidth(): number| undefined {
        return this.options.minWidth;
    }
    /**
     * Input for the maxHeight.
     * Use it with `<yaga-popup [maxHeight]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-maxheight Original Leaflet documentation
     */
    @Input() public set maxHeight(val: number| undefined) {
        this.options.maxHeight = val;
        this.reopen();
    }
    public get maxHeight(): number| undefined {
        return this.options.maxHeight;
    }
    /**
     * Input for the autoPan.
     * Use it with `<yaga-popup [autoPan]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-autopan Original Leaflet documentation
     */
    @Input() public set autoPan(val: boolean) {
        this.options.autoPan = val;
        this.reopen();
    }
    public get autoPan(): boolean {
        return !!this.options.autoPan;
    }
    /**
     * Input for the autoPanPaddingTopLeft.
     * Use it with `<yaga-popup [autoPanPaddingTopLeft]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-autopanpaddingtopleft Original Leaflet documentation
     */
    @Input() public set autoPanPaddingTopLeft(val: Point) {
        this.options.autoPanPaddingTopLeft = val;
        this.reopen();
    }
    public get autoPanPaddingTopLeft(): Point {
        return (this.options.autoPanPaddingTopLeft as Point);
    }
    /**
     * Input for the autoPanPaddingBottomRight.
     * Use it with `<yaga-popup [autoPanPaddingBottomRight]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-autopanpaddingbottomleft Original Leaflet documentation
     */
    @Input() public set autoPanPaddingBottomRight(val: Point) {
        this.options.autoPanPaddingBottomRight = val;
        this.reopen();
    }
    public get autoPanPaddingBottomRight(): Point {
        return (this.options.autoPanPaddingBottomRight as Point);
    }
    /**
     * Input for the autoPanPadding.
     * Use it with `<yaga-popup [autoPanPadding]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-autopanpadding Original Leaflet documentation
     */
    @Input() public set autoPanPadding(val: Point) {
        this.options.autoPanPadding = val;
        this.reopen();
    }
    public get autoPanPadding(): Point {
        return (this.options.autoPanPadding as Point);
    }
    /**
     * Input for the keyInView.
     * Use it with `<yaga-popup [keyInView]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-keyinview Original Leaflet documentation
     */
    @Input() public set keepInView(val: boolean) {
        this.options.keepInView = val;
        this.reopen();
    }
    public get keepInView(): boolean {
        return !!this.options.keepInView;
    }
    /**
     * Input for the closeButton.
     * Use it with `<yaga-popup [closeButton]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-closebutton Original Leaflet documentation
     */
    @Input() public set closeButton(val: boolean) {
        this.options.closeButton = val;
        this.reopen();
    }
    public get closeButton(): boolean {
        return !!this.options.closeButton;
    }
    /**
     * Input for the autoClose.
     * Use it with `<yaga-popup [autoClose]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-autoclose Original Leaflet documentation
     */
    @Input() public set autoClose(val: boolean) {
        this.options.autoClose = val;
        this.reopen();
    }
    public get autoClose(): boolean {
        return !!this.options.autoClose;
    }
    /**
     * Input for the CSS class name.
     * Use it with `<yaga-popup [autoClose]="className">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-classname Original Leaflet documentation
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
     * Use it with `<yaga-popup [pane]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#popup-pane Original Leaflet documentation
     */
    @Input() public set pane(val: string | undefined) {
        this.options.pane = val;
        this.reopen();
    }
    public get pane(): string | undefined {
        return this.options.pane;
    }

    public reopen(force: boolean = false) {
        if (force || this.opened) {
            this.layerProvider.ref!.closePopup();
            this.layerProvider.ref!.openPopup();
        }
    }
}
