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
    Direction,
    LatLng,
    latLng,
    LatLngExpression,
    LeafletEvent,
    Map,
    Point,
    Tooltip,
} from 'leaflet';
import { MapProvider } from './map.provider';

@Directive({
    selector: 'yaga-tooltip',
})
export class TooltipDirective extends Tooltip implements OnDestroy {
    @Output() public contentChange: EventEmitter<Content> = new EventEmitter();
    @Output() public openedChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    @Output() public positionChange: EventEmitter<LatLng> = new EventEmitter();
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();

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
            (this as any)._source.unbindTooltip();
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
        return this.getContent();
    }

    @Input() public set opened(val: boolean) {
        if (val) {
            this.map.openTooltip(this);
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

    public setOpacity(val: number): void {
        super.setOpacity(val);
        this.opacityChange.emit(val);
    }
    @Input() public set opacity(val: number) {
        this.setOpacity(val);
    }
    public get opacity(): number {
        return this.options.opacity;
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

    @Input() public set interactive(val: boolean) {
        this.options.interactive = val;
        (this as any)._updateLayout();
    }
    public get interactive(): boolean {
        return this.options.interactive;
    }

    @Input() public set sticky(val: boolean) {
        this.options.sticky = val;
    }
    public get sticky(): boolean {
        return this.options.sticky;
    }

    @Input() public set direction(val: Direction) {
        this.options.direction = val;
    }
    public get direction(): Direction {
        return this.options.direction;
    }

    @Input() public set permanent(val: boolean) {
        this.options.permanent = val;
    }
    public get permanent(): boolean {
        return this.options.permanent;
    }

    @Input() public set offset(val: Point) {
        this.options.offset = val;
    }
    public get offset(): Point {
        return (this.options.offset as Point);
    }
}
