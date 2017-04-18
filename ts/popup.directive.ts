import {
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import {
    Content,
    Event,
    LatLng,
    latLng,
    LatLngExpression,
    Point,
    Popup,
} from 'leaflet';
import { MapComponent } from './map.component';

@Directive({
    selector: 'yaga-popup',
})
export class PopupDirective extends Popup implements OnDestroy {
    @Output() public contentChange: EventEmitter<Content> = new EventEmitter();
    @Output() public openedChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    @Output() public positionChange: EventEmitter<LatLng> = new EventEmitter();

    @Output('open') public openEvent: EventEmitter<Event> = new EventEmitter();
    @Output('close') public closeEvent: EventEmitter<Event> = new EventEmitter();

    protected map: MapComponent;

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent,
        @Inject(ElementRef) elementRef: ElementRef,
    ) {
        super();

        this.map = mapComponent;
        this.setContent(elementRef.nativeElement);

        this.on('add', (event: Event): void => {
            this.openEvent.emit(event);
            this.openedChange.emit(true);
        });
        this.on('remove', (event: Event): void => {
            this.closeEvent.emit(event);
            this.openedChange.emit(false);
        });
    }

    public ngOnDestroy(): void {
        if ((<any> this)._source) {
            (<any> this)._source.unbindPopup();
        }
    }

    public setContent(content: any): this { // Content
        this.contentChange.emit((content));
        return super.setContent((<HTMLElement> content));
    }
    @Input() public set content(val: Content) {
        this.setContent(val);
    }
    public get content(): Content {
        return this.getContent() as string | HTMLElement;
    }

    @Input() public set opened(val: boolean) {
        if (val) {
            this.openOn(this.map);
            return;
        }
        (<any> this)._close();
    }
    public get opened(): boolean {
        return !!(<any> this)._map;
    }

    public setLatLng(latlng: LatLngExpression): this {
        super.setLatLng(latlng);
        this.latChange.emit(this.lat);
        this.lngChange.emit(this.lng);
        this.positionChange.emit(latLng(this.lat, this.lng));
        return this;
    }
    @Input() public set lat(val: number) {
        this.setLatLng([val, this.lng]);
    }
    public get lat(): number {
        return this.getLatLng().lat;
    }

    @Input() public set lng(val: number) {
        this.setLatLng([this.lat, val]);
    }
    public get lng(): number {
        return this.getLatLng().lng;
    }

    @Input() public set position(val: LatLng) {
        this.setLatLng(val);
    }
    public get position(): LatLng {
        return this.getLatLng();
    }

    @Input() public set maxWidth(val: number) {
        this.options.maxWidth = val;
        (<any> this)._updateLayout();
    }
    public get maxWidth(): number {
        return this.options.maxWidth;
    }
    @Input() public set minWidth(val: number) {
        this.options.minWidth = val;
        (<any> this)._updateLayout();
    }
    public get minWidth(): number {
        return this.options.minWidth;
    }
    @Input() public set maxHeight(val: number) {
        this.options.maxHeight = val;
        (<any> this)._updateLayout();
    }
    public get maxHeight(): number {
        return this.options.maxHeight;
    }
    @Input() public set autoPan(val: boolean) {
        this.options.autoPan = val;
        (<any> this)._updateLayout();
    }
    public get autoPan(): boolean {
        return this.options.autoPan;
    }
    @Input() public set autoPanPaddingTopLeft(val: Point) {
        this.options.autoPanPaddingTopLeft = val;
        (<any> this)._updateLayout();
    }
    public get autoPanPaddingTopLeft(): Point {
        return (<Point> this.options.autoPanPaddingTopLeft);
    }
    @Input() public set autoPanPaddingBottomRight(val: Point) {
        this.options.autoPanPaddingBottomRight = val;
        (<any> this)._updateLayout();
    }
    public get autoPanPaddingBottomRight(): Point {
        return (<Point> this.options.autoPanPaddingBottomRight);
    }
    @Input() public set autoPanPadding(val: Point) {
        this.options.autoPanPadding = val;
        (<any> this)._updateLayout();
    }
    public get autoPanPadding(): Point {
        return (<Point> this.options.autoPanPadding);
    }
    @Input() public set keepInView(val: boolean) {
        this.options.keepInView = val;
        (<any> this)._updateLayout();
    }
    public get keepInView(): boolean {
        return this.options.keepInView;
    }
    @Input() public set closeButton(val: boolean) {
        this.options.closeButton = val;
        (<any> this)._updateLayout();
    }
    public get closeButton(): boolean {
        return this.options.closeButton;
    }
    @Input() public set autoClose(val: boolean) {
        this.options.autoClose = val;
        (<any> this)._updateLayout();
    }
    public get autoClose(): boolean {
        return this.options.autoClose;
    }
    @Input() public set className(val: string) {
        this.options.className = val;
        (<any> this)._updateLayout();
    }
    public get className(): string {
        return this.options.className;
    }
    @Input() public set pane(val: string) {
        this.options.pane = val;
        (<any> this)._updateLayout();
    }
    public get pane(): string {
        return this.options.pane;
    }
}
