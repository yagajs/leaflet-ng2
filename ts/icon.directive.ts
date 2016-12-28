import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    ElementRef } from '@angular/core';
import { Icon,
    IconOptions,
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
        (<IconOptions>(<any>this).options).iconUrl = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get iconUrl(): string {
        return (<IconOptions>(<any>this).options).iconUrl;
    }
    @Input() set iconSize(val: Point) {
        (<IconOptions>(<any>this).options).iconSize = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get iconSize(): Point {
        return (<Point>(<IconOptions>(<any>this).options).iconSize);
    }
    @Input() set iconAnchor(val: Point) {
        (<IconOptions>(<any>this).options).iconAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get iconAnchor(): Point {
        return (<Point>(<IconOptions>(<any>this).options).iconAnchor);
    }
    @Input() set popupAnchor(val: Point) {
        (<IconOptions>(<any>this).options).popupAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get popupAnchor(): Point {
        return (<Point>(<IconOptions>(<any>this).options).popupAnchor);
    }
    @Input() set shadowUrl(val: string) {
        (<IconOptions>(<any>this).options).shadowUrl = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get shadowUrl(): string {
        return (<IconOptions>(<any>this).options).shadowUrl;
    }
    @Input() set shadowSize(val: Point) {
        (<IconOptions>(<any>this).options).shadowSize = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get shadowSize(): Point {
        return (<Point>(<IconOptions>(<any>this).options).shadowSize);
    }
    @Input() set shadowAnchor(val: Point) {
        (<IconOptions>(<any>this).options).shadowAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get shadowAnchor(): Point {
        return (<Point>(<IconOptions>(<any>this).options).shadowAnchor);
    }
}
