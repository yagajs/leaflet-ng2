import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    ElementRef,
    OnDestroy } from '@angular/core';
import { Tooltip,
    Point,
    LatLng,
    Event,
    Content,
    LatLngExpression,
    latLng,
    Direction } from 'leaflet';
import { MapComponent } from './map.component';

@Directive({
    selector: 'yaga-tooltip'
})
export class TooltipDirective extends Tooltip implements OnDestroy {
    @Output() public contentChange: EventEmitter<Content> = new EventEmitter();
    @Output() public openedChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    @Output() public positionChange: EventEmitter<LatLng> = new EventEmitter();
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();

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

    ngOnDestroy(): void {
        if ((<any>this)._source) {
            (<any>this)._source.unbindTooltip();
        }
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
            this.map.openTooltip(this);
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

    setOpacity(val: number): void {
        super.setOpacity(val);
        this.opacityChange.emit(val);
    }
    @Input() set opacity(val: number) {
        this.setOpacity(val);
    }
    get opacity(): number {
        return this.options.opacity;
    }

    @Input() set className(val: string) {
        this.options.className = val;
        (<any>this)._updateLayout();
    }
    get className(): string {
        return this.options.className;
    }
    @Input() set pane(val: string) {
        this.options.pane = val;
        (<any>this)._updateLayout();
    }
    get pane(): string {
        return this.options.pane;
    }

    @Input() set interactive(val: boolean) {
        this.options.interactive = val;
        (<any>this)._updateLayout();
    }
    get interactive(): boolean {
        return this.options.interactive;
    }

    @Input() set sticky(val: boolean) {
        this.options.sticky = val;
    }
    get sticky(): boolean {
        return this.options.sticky;
    }

    @Input() set direction(val: Direction) {
        this.options.direction = val;
    }
    get direction(): Direction {
        return this.options.direction;
    }

    @Input() set permanent(val: boolean) {
        this.options.permanent = val;
    }
    get permanent(): boolean {
        return this.options.permanent;
    }

    @Input() set offset(val: Point) {
        this.options.offset = val;
    }
    get offset(): Point {
        return (<Point>this.options.offset);
    }
}
