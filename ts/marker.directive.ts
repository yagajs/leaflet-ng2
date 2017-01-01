import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    ElementRef,
    ContentChild,
    AfterViewInit,
    OnDestroy } from '@angular/core';
import { Marker,
    MarkerOptions,
    Event,
    DragEndEvent,
    Point,
    LatLng,
    LatLngLiteral,
    LatLngTuple,
    Icon,
    Map,
    Handler } from 'leaflet';
import { MapComponent } from './map.component';

// Content-Child imports
import { PopupDirective } from './popup.directive';
import { TooltipDirective } from './tooltip.directive';
import { IconDirective } from './icon.directive';

@Directive({
    selector: 'yaga-marker'
})
export class MarkerDirective extends Marker implements AfterViewInit, OnDestroy {
    @Output() public positionChange: EventEmitter<LatLng> = new EventEmitter();
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public zindexChange: EventEmitter<number> = new EventEmitter();
    @Output() public draggableChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public iconChange: EventEmitter<Icon> = new EventEmitter();
    @Output() public tooltipOpenedChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public popupOpenedChange: EventEmitter<boolean> = new EventEmitter();

    @Output('dragend') public dragendEvent: EventEmitter<DragEndEvent> = new EventEmitter();
    @Output('dragstart') public dragstartEvent: EventEmitter<Event> = new EventEmitter();
    @Output('movestart') public movestartEvent: EventEmitter<Event> = new EventEmitter();
    @Output('drag') public dragEvent: EventEmitter<Event> = new EventEmitter();
    @Output('moveend') public moveendEvent: EventEmitter<Event> = new EventEmitter();

    @ContentChild(PopupDirective) public popupDirective: PopupDirective;
    @ContentChild(TooltipDirective) public tooltipDirective: TooltipDirective;
    @ContentChild(IconDirective) public iconDirective: IconDirective;

    private initialized: boolean = false;

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent
    ) {
        super([0, 0]);
        mapComponent.addLayer(this);

        this.on('remove', () => {
            this.displayChange.emit(false);
        });
        this.on('add', () => {
            this.displayChange.emit(true);
        });
        this.on('drag', (event: DragEndEvent) => {
            this.latChange.emit(this.getLatLng().lat);
            this.lngChange.emit(this.getLatLng().lng);
            this.positionChange.emit(this.getLatLng());
        });

        // Events
        this.on('dragend', (event: DragEndEvent) => {
            this.dragendEvent.emit(event);
        });
        this.on('dragstart', (event: Event) => {
            this.dragstartEvent.emit(event);
        });
        this.on('movestart', (event: Event) => {
            this.movestartEvent.emit(event);
        });
        this.on('drag', (event: Event) => {
            this.dragEvent.emit(event);
        });
        this.on('moveend', (event: Event) => {
            this.moveendEvent.emit(event);
        });
        let oldDraggingEnable: Function = this.dragging.enable;
        let oldDraggingDisable: Function = this.dragging.disable;

        this.dragging.enable = (): Handler => {
            let val: Handler = oldDraggingEnable.call(this.dragging);
            this.draggableChange.emit(true);
            return val;
        };
        this.dragging.disable = (): Handler => {
            let val: Handler = oldDraggingDisable.call(this.dragging);
            this.draggableChange.emit(false);
            return val;
        };
        // TODO: this.addIcon(IconDirective / DivIconDirective)
    }

    ngAfterViewInit(): void {
        this.initialized = true; // Otherwise lng gets overwritten to 0
        if (this.iconDirective) {
            this.setIcon(this.iconDirective);
            this.iconDirective.updateEvent.subscribe((event: Event) => {
                this.setIcon(event.target); // TODO: with event.target or with this.iconDirective???
            });
        }
        if (this.popupDirective) {
            this.bindPopup(this.popupDirective);
        }
        if (this.tooltipDirective) {
            this.bindTooltip(this.tooltipDirective);
        }
    }

    ngOnDestroy(): void {
        this.removeFrom((<any>this)._map);
    }

    @Input() set display(val: boolean) {
        var isDisplayed: boolean = this.display;
        if (isDisplayed === val) {
            return;
        }
        var pane: HTMLElement,
            container: HTMLElement,
            map: Map,
            events: any, // Dictionary of functions
            eventKeys: string[];
        try {
            pane = this.getPane();
            container = this.getElement();
            map = (<any>this)._map;
            events = this.getEvents();
            eventKeys = Object.keys(events);
        } catch (err) {
            /* istanbul ignore next */
            return;
        }
        if (val) {
            // show layer
            pane.appendChild(container);
            for (let i: number = 0; i < eventKeys.length; i += 1) {
                map.on(eventKeys[i], events[eventKeys[i]], this);
            }
        } else {
            // hide layer
            pane.removeChild(container);
            for (let i: number = 0; i < eventKeys.length; i += 1) {
                map.off(eventKeys[i], events[eventKeys[i]], this);
            }
        }
    }
    get display(): boolean {
        var pane: HTMLElement,
            container: HTMLElement;
        try {
            pane = this.getPane();
            container = this.getElement();
        } catch (err) {
            /* istanbul ignore next */
            return false;
        }
        for (let i: number = 0; i < pane.children.length; i += 1) {
            /* istanbul ignore else */
            if (pane.children[i] === container) {
                return true;
            }
        }
        return false;
    }

    setLatLng(val: LatLng | LatLngLiteral | LatLngTuple): this {
        super.setLatLng((<any>val));
        if (this.initialized) {
            this.positionChange.emit(this.getLatLng());
            this.latChange.emit(this.getLatLng().lat);
            this.lngChange.emit(this.getLatLng().lng);
        }
        return this;
    }
    @Input() set position(val: LatLng) {
        this.setLatLng(val);
    }
    get position(): LatLng {
        return this.getLatLng();
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

    setOpacity(val: number): this {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return super.setOpacity(val);
    }
    @Input() set opacity(val: number) {
        this.setOpacity(val);
    }
    get opacity(): number {
        return this.options.opacity;
    }

    setIcon(val: Icon): this {
        super.setIcon(val);
        this.iconChange.emit(val);
        return this;
    }
    @Input() set icon(val: Icon) {
        this.setIcon(val);
    }
    get icon(): Icon {
        return this.options.icon;
    }
    @Input() set draggable(val: boolean) {
        if (val) {
            this.dragging.enable();
            return;
        }
        this.dragging.disable();
        return;
    }
    get draggable(): boolean {
        return this.dragging.enabled();
    }

    @Input() set title(val: string) {
        this.options.title = val;
        this.getElement().setAttribute('title', val);
    }
    get title(): string {
        return this.getElement().getAttribute('title');
    }
    @Input() set alt(val: string) {
        this.options.alt = val;
        this.getElement().setAttribute('alt', val);
    }
    get alt(): string {
        return this.getElement().getAttribute('alt');
    }
}
