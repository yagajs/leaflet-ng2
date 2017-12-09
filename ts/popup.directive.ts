import {
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import {
    Content,
    LatLng,
    latLng,
    LatLngExpression,
    LeafletEvent,
    Map,
    Point,
    Popup,
} from 'leaflet';
import { MapComponent } from './map.component';
import { MapProvider } from './map.provider';

@Directive({
    selector: 'yaga-popup',
})
export class PopupDirective extends Popup implements OnDestroy {
    @Output() public contentChange: EventEmitter<Content> = new EventEmitter();
    @Output() public openedChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    @Output() public positionChange: EventEmitter<LatLng> = new EventEmitter();

    @Output('open') public openEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    @Output('close') public closeEvent: EventEmitter<LeafletEvent> = new EventEmitter();

    protected map: Map;

    constructor(
        mapProvider: MapProvider,
        @Inject(ElementRef) elementRef: ElementRef,
    ) {
        super();

        this.map = mapProvider.ref;
        this.setContent(elementRef.nativeElement);

        this.on('add', (event: LeafletEvent): void => {
            this.openEvent.emit(event);
            this.openedChange.emit(true);
        });
        this.on('remove', (event: LeafletEvent): void => {
            this.closeEvent.emit(event);
            this.openedChange.emit(false);
        });
    }

    public ngOnDestroy(): void {
        if ((this as any)._source) {
            (this as any)._source.unbindPopup();
        }
    }

    public setContent(content: any): this { // Content
        this.contentChange.emit((content));
        return super.setContent((content as HTMLElement));
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
        (this as any)._close();
    }
    public get opened(): boolean {
        return !!(this as any)._map;
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
        (this as any)._updateLayout();
    }
    public get maxWidth(): number {
        return this.options.maxWidth;
    }
    @Input() public set minWidth(val: number) {
        this.options.minWidth = val;
        (this as any)._updateLayout();
    }
    public get minWidth(): number {
        return this.options.minWidth;
    }
    @Input() public set maxHeight(val: number) {
        this.options.maxHeight = val;
        (this as any)._updateLayout();
    }
    public get maxHeight(): number {
        return this.options.maxHeight;
    }
    @Input() public set autoPan(val: boolean) {
        this.options.autoPan = val;
        (this as any)._updateLayout();
    }
    public get autoPan(): boolean {
        return this.options.autoPan;
    }
    @Input() public set autoPanPaddingTopLeft(val: Point) {
        this.options.autoPanPaddingTopLeft = val;
        (this as any)._updateLayout();
    }
    public get autoPanPaddingTopLeft(): Point {
        return (this.options.autoPanPaddingTopLeft as Point);
    }
    @Input() public set autoPanPaddingBottomRight(val: Point) {
        this.options.autoPanPaddingBottomRight = val;
        (this as any)._updateLayout();
    }
    public get autoPanPaddingBottomRight(): Point {
        return (this.options.autoPanPaddingBottomRight as Point);
    }
    @Input() public set autoPanPadding(val: Point) {
        this.options.autoPanPadding = val;
        (this as any)._updateLayout();
    }
    public get autoPanPadding(): Point {
        return (this.options.autoPanPadding as Point);
    }
    @Input() public set keepInView(val: boolean) {
        this.options.keepInView = val;
        (this as any)._updateLayout();
    }
    public get keepInView(): boolean {
        return this.options.keepInView;
    }
    @Input() public set closeButton(val: boolean) {
        this.options.closeButton = val;
        (this as any)._updateLayout();
    }
    public get closeButton(): boolean {
        return this.options.closeButton;
    }
    @Input() public set autoClose(val: boolean) {
        this.options.autoClose = val;
        (this as any)._updateLayout();
    }
    public get autoClose(): boolean {
        return this.options.autoClose;
    }
    @Input() public set className(val: string) {
        this.options.className = val;
        (this as any)._updateLayout();
    }
    public get className(): string {
        return this.options.className;
    }
    @Input() public set pane(val: string) {
        this.options.pane = val;
        (this as any)._updateLayout();
    }
    public get pane(): string {
        return this.options.pane;
    }
}
