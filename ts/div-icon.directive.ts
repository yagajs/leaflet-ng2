import {
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    Output,
} from '@angular/core';
import {
    DivIcon,
    DivIconOptions,
    Event,
    Point,
} from 'leaflet';

@Directive({
    selector: 'yaga-icon',
})
export class DivIconDirective extends DivIcon  {
    @Output('update') public updateEvent: EventEmitter<Event> = new EventEmitter();
    protected contentHtml: HTMLElement;

    constructor(
        @Inject(ElementRef) elementRef: ElementRef,
    ) {
        super({});
        this.contentHtml = elementRef.nativeElement;
    }

    @Input() public set iconSize(val: Point) {
        this.options.iconSize = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get iconSize(): Point {
        return (this.options.iconSize as Point);
    }
    @Input() public set iconAnchor(val: Point) {
        this.options.iconAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get iconAnchor(): Point {
        return (this.options.iconAnchor as Point);
    }
    @Input() public set popupAnchor(val: Point) {
        this.options.popupAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update',
        });
    }
    public get popupAnchor(): Point {
        return (this.options.popupAnchor as Point);
    }

    public createIcon(oldDivIcon: HTMLElement): HTMLElement {
        const clonedOptions: DivIconOptions = Object.create(this.options);
        clonedOptions.html = '';
        oldDivIcon = super.createIcon.call({options: clonedOptions}, oldDivIcon);
        oldDivIcon.appendChild(this.contentHtml.cloneNode(true));
        return oldDivIcon;
    }
}
