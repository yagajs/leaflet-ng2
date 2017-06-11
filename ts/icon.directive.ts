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

    @Input() public set className(val: string) {
        this.options.className = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get className(): string {
        return this.options.className;
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
    @Input() public set iconRetinaUrl(val: string) {
        this.options.iconRetinaUrl = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get iconRetinaUrl(): string {
        return this.options.iconRetinaUrl;
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
    // We have to wait for adding the definition for tooltipAnchor
    // see: https://github.com/yagajs/leaflet-ng2/issues/220#issuecomment-307634276
    //
    // @Input() public set tooltipAnchor(val: Point) {
    //     this.options.tooltipAnchor = val;
    //     this.updateEvent.emit({
    //         target: this,
    //         type: 'update',
    //     });
    // }
    // public get tooltipAnchor(): Point {
    //     return (<Point> this.options.popupAnchor);
    // }
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
    @Input() public set shadowRetinaUrl(val: string) {
        this.options.shadowRetinaUrl = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get shadowRetinaUrl(): string {
        return this.options.shadowRetinaUrl;
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
