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
    selector: 'yaga-div-icon',
})
export class DivIconDirective extends DivIcon  {
    @Output('update') public updateEvent: EventEmitter<Event> = new EventEmitter();
    public contentHtml: HTMLElement;

    constructor(
        @Inject(ElementRef) elementRef: ElementRef,
    ) {
        super({});
        this.contentHtml = elementRef.nativeElement;

        if (typeof MutationObserver === 'function') {
            const mutationObserver = new MutationObserver(() => {
                this.updateEvent.emit({
                    target: this,
                    type: 'update',
                });
            });
            mutationObserver.observe(
                this.contentHtml,
                {
                    attributes: true,
                    characterData: true,
                    childList: true,
                    subtree: true,
                },
            );
        } else {
            this.contentHtml.addEventListener('DOMSubtreeModified', () => {
                this.updateEvent.emit({
                    target: this,
                    type: 'update',
                });
            });
        }
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
        oldDivIcon = super.createIcon(oldDivIcon);
        if (oldDivIcon.getAttribute('class').split(' ').indexOf('yaga-div-icon') === -1) {
            oldDivIcon.setAttribute('class', oldDivIcon.getAttribute('class') + ' yaga-div-icon');
        }
        oldDivIcon.appendChild(this.contentHtml.cloneNode(true));
        return oldDivIcon;
    }
}
