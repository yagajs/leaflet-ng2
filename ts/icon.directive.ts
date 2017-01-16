import { Directive,
    Input,
    Output,
    EventEmitter } from '@angular/core';
import { Icon,
    Event,
    Point } from 'leaflet';
import { TRANSPARENT_PIXEL } from './consts';

@Directive({
    selector: 'yaga-icon'
})
export class IconDirective extends Icon  {

    @Output('update') public updateEvent: EventEmitter<Event> = new EventEmitter();

    constructor() {
        super({
            iconUrl: TRANSPARENT_PIXEL
        });
    }

    @Input() set iconUrl(val: string) {
        this.options.iconUrl = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get iconUrl(): string {
        return this.options.iconUrl;
    }
    @Input() set iconSize(val: Point) {
        this.options.iconSize = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get iconSize(): Point {
        return (<Point>this.options.iconSize);
    }
    @Input() set iconAnchor(val: Point) {
        this.options.iconAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get iconAnchor(): Point {
        return (<Point>this.options.iconAnchor);
    }
    @Input() set popupAnchor(val: Point) {
        this.options.popupAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get popupAnchor(): Point {
        return (<Point>this.options.popupAnchor);
    }
    @Input() set shadowUrl(val: string) {
        this.options.shadowUrl = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get shadowUrl(): string {
        return this.options.shadowUrl;
    }
    @Input() set shadowSize(val: Point) {
        this.options.shadowSize = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get shadowSize(): Point {
        return (<Point>this.options.shadowSize);
    }
    @Input() set shadowAnchor(val: Point) {
        this.options.shadowAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get shadowAnchor(): Point {
        return (<Point>this.options.shadowAnchor);
    }
}
