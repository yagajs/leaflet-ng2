import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    OnDestroy } from '@angular/core';
import { ImageOverlay,
    LatLngBoundsExpression,
    Map,
    Event,
    PopupEvent,
    TooltipEvent,
    LatLngBounds,
    latLngBounds } from 'leaflet';
import { MapComponent } from './map.component';
import { TRANSPARENT_PIXEL } from './consts';

@Directive({
    selector: 'yaga-image-overlay'
})
export class ImageOverlayDirective extends ImageOverlay implements OnDestroy  {
    @Output() public urlChange: EventEmitter<string> = new EventEmitter();
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    // maybe implement -> @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();

    @Output() public boundsChange: EventEmitter<LatLngBounds> = new EventEmitter();
    @Output() public northChange: EventEmitter<number> = new EventEmitter();
    @Output() public eastChange: EventEmitter<number> = new EventEmitter();
    @Output() public southChange: EventEmitter<number> = new EventEmitter();
    @Output() public westChange: EventEmitter<number> = new EventEmitter();

    @Output('add') public addEvent: EventEmitter<Event> = new EventEmitter();
    @Output('remove') public removeEvent: EventEmitter<Event> = new EventEmitter();
    @Output('popupopen') public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    @Output('popupclose') public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    @Output('tooltipopen') public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    @Output('tooltipclose') public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    @Output('click') public clickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('dbclick') public dbclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mousedown') public mousedownEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mouseover') public mouseoverEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mouseout') public mouseoutEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('contextmenu') public contextmenuEvent: EventEmitter<MouseEvent> = new EventEmitter();

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent
    ) {
        // Transparent 1px image:
        super(TRANSPARENT_PIXEL, [[0, 0], [1, 1]], {});

        this.on('remove', () => {
            this.displayChange.emit(false);
        });
        this.on('add', () => {
            this.displayChange.emit(true);
        });

        this.addTo(mapComponent);

        // Events
        this.on('add', (event: Event) => {
            this.addEvent.emit(event);
        });
        this.on('remove', (event: Event) => {
            this.removeEvent.emit(event);
        });
        this.on('popupopen', (event: PopupEvent) => {
            this.popupopenEvent.emit(event);
        });
        this.on('popupclose', (event: PopupEvent) => {
            this.popupcloseEvent.emit(event);
        });
        this.on('tooltipopen', (event: TooltipEvent) => {
            this.tooltipopenEvent.emit(event);
        });
        this.on('tooltipclose', (event: TooltipEvent) => {
            this.tooltipcloseEvent.emit(event);
        });
        this.on('click', (event: MouseEvent) => {
            this.clickEvent.emit(event);
        });
        this.on('dbclick', (event: MouseEvent) => {
            this.dbclickEvent.emit(event);
        });
        this.on('mousedown', (event: MouseEvent) => {
            this.mousedownEvent.emit(event);
        });
        this.on('mouseover', (event: MouseEvent) => {
            this.mouseoverEvent.emit(event);
        });
        this.on('mouseout', (event: MouseEvent) => {
            this.mouseoutEvent.emit(event);
        });
        this.on('contextmenu', (event: MouseEvent) => {
            this.contextmenuEvent.emit(event);
        });
    }

    ngOnDestroy(): void {
        this.removeFrom((<any>this)._map);
    }

    setUrl(url: string): this {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return super.setUrl(url);
    }
    @Input() set url(val: string) {
        this.setUrl(val);
    }
    get url(): string {
        return (<any>this)._url;
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

    @Input() set display(val: boolean) {
        let isDisplayed: boolean = this.display;
        if (isDisplayed === val) {
            return;
        }
        let pane: HTMLElement,
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
        let pane: HTMLElement,
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

    setBounds(val: LatLngBoundsExpression): this {
        super.setBounds(latLngBounds((<any>val)));

        this.boundsChange.emit(this.bounds);
        this.northChange.emit(this.north);
        this.eastChange.emit(this.east);
        this.southChange.emit(this.south);
        this.westChange.emit(this.west);

        return this;
    }
    @Input() set bounds(val: LatLngBounds) {
        this.setBounds(val);
    }
    get bounds(): LatLngBounds {
        return this.getBounds();
    }
    @Input() set north(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();

        // super because we call the change listeners ourselves
        super.setBounds(latLngBounds([
            [oldBounds.getSouth(), oldBounds.getWest()],
            [val, oldBounds.getEast()]
        ]));

        this.boundsChange.emit(this.bounds);
        this.northChange.emit(val);
    }
    get north(): number {
        return this.getBounds().getNorth();
    }
    @Input() set east(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();
        super.setBounds(latLngBounds([
            [oldBounds.getSouth(), oldBounds.getWest()],
            [oldBounds.getNorth(), val]
        ]));

        this.boundsChange.emit(this.bounds);
        this.eastChange.emit(val);
    }
    get east(): number {
        return this.getBounds().getEast();
    }
    @Input() set south(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();
        super.setBounds(latLngBounds([
            [val, oldBounds.getWest()],
            [oldBounds.getNorth(), oldBounds.getEast()]
        ]));

        this.boundsChange.emit(this.bounds);
        this.southChange.emit(val);
    }
    get south(): number {
        return this.getBounds().getSouth();
    }
    @Input() set west(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();
        super.setBounds(latLngBounds([
            [oldBounds.getSouth(), val],
            [oldBounds.getNorth(), oldBounds.getEast()]
        ]));

        this.boundsChange.emit(this.bounds);
        this.westChange.emit(val);
    }
    get west(): number {
        return this.getBounds().getWest();
    }

    @Input() set crossOrigin(val: boolean) {
        this.options.crossOrigin = val;
        this.getElement().crossOrigin = val ? '' : undefined;
    }
    get crossOrigin(): boolean {
        return this.options.crossOrigin;
    }

    @Input() set alt(val: string) {
        this.options.alt = val;
        this.getElement().alt = val;
    }
    get alt(): string {
        return this.getElement().getAttribute('alt');
    }
    @Input() set interactive(val: boolean) {
        this.options.interactive = val;
        this.onRemove((<any>(<any>this)._map));
        this.onAdd((<any>(<any>this)._map));
    }
    get interactive(): boolean {
        return this.options.interactive;
    }
}
