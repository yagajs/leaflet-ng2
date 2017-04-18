import {
    Directive,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import {
    Event,
    Icon,
    Point,
} from 'leaflet';
import { TRANSPARENT_PIXEL } from './consts';

@Directive({
    selector: 'yaga-icon',
})
export class IconDirective extends Icon  {

    @Output('update') public updateEvent: EventEmitter<Event> = new EventEmitter();

    constructor() {
        super({
            iconUrl: TRANSPARENT_PIXEL,
        });
    }

    @Input() public set iconUrl(val: string) {
        this.options.iconUrl = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get iconUrl(): string {
        return this.options.iconUrl;
    }
    @Input() public set iconSize(val: Point) {
        this.options.iconSize = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get iconSize(): Point {
        return (<Point> this.options.iconSize);
    }
    @Input() public set iconAnchor(val: Point) {
        this.options.iconAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get iconAnchor(): Point {
        return (<Point> this.options.iconAnchor);
    }
    @Input() public set popupAnchor(val: Point) {
        this.options.popupAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get popupAnchor(): Point {
        return (<Point> this.options.popupAnchor);
    }
    @Input() public set shadowUrl(val: string) {
        this.options.shadowUrl = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get shadowUrl(): string {
        return this.options.shadowUrl;
    }
    @Input() public set shadowSize(val: Point) {
        this.options.shadowSize = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get shadowSize(): Point {
        return (<Point> this.options.shadowSize);
    }
    @Input() public set shadowAnchor(val: Point) {
        this.options.shadowAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get shadowAnchor(): Point {
        return (<Point> this.options.shadowAnchor);
    }
}
