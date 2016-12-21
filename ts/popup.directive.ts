import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    ElementRef } from '@angular/core';
import { Popup,
    PopupOptions,
    Point,
    LatLng,
    Event,
    Content,
    LatLngExpression,
    latLng } from 'leaflet';
import { MapComponent } from './map.component';

@Directive({
    selector: 'yaga-popup'
})
export class PopupDirective extends Popup  {
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

    setContent(content: any): this { // Content
        this.contentChange.emit((content));
        return super.setContent((<HTMLElement>content));
    }
    @Input() set content(val: Content) {
        this.setContent(val);
    }
    get content(): Content {
        return this.getContent();
    }

    @Input() set opened(val: boolean) {
        if (val) {
            this.openOn(this.map);
            return;
        }
        (<any>this)._close();
    }
    get opened(): boolean {
        return !!(<any>this)._map;
    }


    setLatLng(latlng: LatLngExpression): this {
        super.setLatLng(latlng);
        this.latChange.emit(this.lat);
        this.lngChange.emit(this.lng);
        this.positionChange.emit(latLng(this.lat, this.lng));
        return this;
    }
    @Input() set lat(val: number) {
        this.setLatLng([val, this.lng]);
    }
    get lat(): number {
        return this.getLatLng().lat;
    }

    @Input() set lng(val: number) {
        this.setLatLng([this.lat, val]);
    }
    get lng(): number {
        return this.getLatLng().lng;
    }

    @Input() set position(val: LatLng) {
        this.setLatLng(val);
    }
    get position(): LatLng {
        return this.getLatLng();
    }

    @Input() set maxWidth(val: number) {
        (<PopupOptions>(<any>this).options).maxWidth = val;
        (<any>this)._updateLayout();
    }
    get maxWidth(): number {
        return (<PopupOptions>(<any>this).options).maxWidth;
    }
    @Input() set minWidth(val: number) {
        (<PopupOptions>(<any>this).options).minWidth = val;
        (<any>this)._updateLayout();
    }
    get minWidth(): number {
        return (<PopupOptions>(<any>this).options).minWidth;
    }
    @Input() set maxHeight(val: number) {
        (<PopupOptions>(<any>this).options).maxHeight = val;
        (<any>this)._updateLayout();
    }
    get maxHeight(): number {
        return (<PopupOptions>(<any>this).options).maxHeight;
    }
    @Input() set autoPan(val: boolean) {
        (<PopupOptions>(<any>this).options).autoPan = val;
        (<any>this)._updateLayout();
    }
    get autoPan(): boolean {
        return (<PopupOptions>(<any>this).options).autoPan;
    }
    @Input() set autoPanPaddingTopLeft(val: Point) {
        (<PopupOptions>(<any>this).options).autoPanPaddingTopLeft = val;
        (<any>this)._updateLayout();
    }
    get autoPanPaddingTopLeft(): Point {
        return (<Point>(<PopupOptions>(<any>this).options).autoPanPaddingTopLeft);
    }
    @Input() set autoPanPaddingBottomRight(val: Point) {
        (<PopupOptions>(<any>this).options).autoPanPaddingBottomRight = val;
        (<any>this)._updateLayout();
    }
    get autoPanPaddingBottomRight(): Point {
        return (<Point>(<PopupOptions>(<any>this).options).autoPanPaddingBottomRight);
    }
    @Input() set autoPanPadding(val: Point) {
        (<PopupOptions>(<any>this).options).autoPanPadding = val;
        (<any>this)._updateLayout();
    }
    get autoPanPadding(): Point {
        return (<Point>(<PopupOptions>(<any>this).options).autoPanPadding);
    }
    @Input() set keepInView(val: boolean) {
        (<PopupOptions>(<any>this).options).keepInView = val;
        (<any>this)._updateLayout();
    }
    get keepInView(): boolean {
        return (<PopupOptions>(<any>this).options).keepInView;
    }
    @Input() set closeButton(val: boolean) {
        (<PopupOptions>(<any>this).options).closeButton = val;
        (<any>this)._updateLayout();
    }
    get closeButton(): boolean {
        return (<PopupOptions>(<any>this).options).closeButton;
    }
    @Input() set autoClose(val: boolean) {
        (<PopupOptions>(<any>this).options).autoClose = val;
        (<any>this)._updateLayout();
    }
    get autoClose(): boolean {
        return (<PopupOptions>(<any>this).options).autoClose;
    }
    @Input() set className(val: string) {
        (<PopupOptions>(<any>this).options).className = val;
        (<any>this)._updateLayout();
    }
    get className(): string {
        return (<PopupOptions>(<any>this).options).className;
    }
    @Input() set pane(val: string) {
        (<PopupOptions>(<any>this).options).pane = val;
        (<any>this)._updateLayout();
    }
    get pane(): string {
        return (<PopupOptions>(<any>this).options).pane;
    }
}
