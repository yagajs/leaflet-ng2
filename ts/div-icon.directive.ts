import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    ElementRef } from '@angular/core';
import { DivIcon,
    DivIconOptions,
    Event,
    Point } from 'leaflet';

@Directive({
    selector: 'yaga-icon'
})
export class DivIconDirective extends DivIcon  {

    @Output('update') public updateEvent: EventEmitter<Event> = new EventEmitter();

    protected contentHtml: HTMLElement;

    constructor(
        @Inject(ElementRef) elementRef: ElementRef
    ) {
        super({});
        this.contentHtml = elementRef.nativeElement;
    }

    @Input() set iconSize(val: Point) {
        (<DivIconOptions>(<any>this).options).iconSize = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get iconSize(): Point {
        return (<Point>(<DivIconOptions>(<any>this).options).iconSize);
    }
    @Input() set iconAnchor(val: Point) {
        (<DivIconOptions>(<any>this).options).iconAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get iconAnchor(): Point {
        return (<Point>(<DivIconOptions>(<any>this).options).iconAnchor);
    }
    @Input() set popupAnchor(val: Point) {
        (<DivIconOptions>(<any>this).options).popupAnchor = val;
        this.updateEvent.emit({
            target: this,
            type: 'update'
        });
    }
    get popupAnchor(): Point {
        return (<Point>(<DivIconOptions>(<any>this).options).popupAnchor);
    }

    createIcon(oldDivIcon: HTMLElement): HTMLElement {
        let clonedOptions: DivIconOptions = {
            bgPos: (<DivIconOptions>(<any>this).options).bgPos,
            className: (<DivIconOptions>(<any>this).options).className,
            html: '',
            iconAnchor: (<DivIconOptions>(<any>this).options).iconAnchor,
            iconSize: (<DivIconOptions>(<any>this).options).iconSize,
            popupAnchor: (<DivIconOptions>(<any>this).options).popupAnchor
        };
        oldDivIcon = super.createIcon.call({options: clonedOptions}, oldDivIcon);
        oldDivIcon.appendChild(this.contentHtml.cloneNode(true));
        return oldDivIcon;
    }
}
