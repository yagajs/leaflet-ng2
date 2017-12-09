import {
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import {
    Control,
    ImageOverlay,
    LatLngBounds,
    latLngBounds,
    LatLngBoundsExpression,
    LeafletEvent,
    LeafletMouseEvent,
    Map,
    PopupEvent,
    TooltipEvent,
} from 'leaflet';
import { TRANSPARENT_PIXEL } from './consts';
import { LayerGroupProvider } from './layer-group.provider';
import { LayerProvider } from './layer.provider';

@Directive({
    selector: 'yaga-image-overlay',
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

    @Output('add') public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    @Output('remove') public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    @Output('popupopen') public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    @Output('popupclose') public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    @Output('tooltipopen') public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    @Output('tooltipclose') public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    @Output('click') public clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    @Output('dbclick') public dbclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    @Output('mousedown') public mousedownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    @Output('mouseover') public mouseoverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    @Output('mouseout') public mouseoutEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    @Output('contextmenu') public contextmenuEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();

    constructor(
        layerGroupProvider: LayerGroupProvider,
        layerProvider: LayerProvider,
    ) {
        // Transparent 1px image:
        super(TRANSPARENT_PIXEL, [[0, 0], [1, 1]], {});

        layerProvider.ref = this;

        this.on('remove', () => {
            this.displayChange.emit(false);
        });
        this.on('add', () => {
            this.displayChange.emit(true);
        });

        layerGroupProvider.ref.addLayer(this);

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
        this.on('click', (event: LeafletMouseEvent) => {
            this.clickEvent.emit(event);
        });
        this.on('dbclick', (event: LeafletMouseEvent) => {
            this.dbclickEvent.emit(event);
        });
        this.on('mousedown', (event: LeafletMouseEvent) => {
            this.mousedownEvent.emit(event);
        });
        this.on('mouseover', (event: LeafletMouseEvent) => {
            this.mouseoverEvent.emit(event);
        });
        this.on('mouseout', (event: LeafletMouseEvent) => {
            this.mouseoutEvent.emit(event);
        });
        this.on('contextmenu', (event: LeafletMouseEvent) => {
            this.contextmenuEvent.emit(event);
        });
    }

    public ngOnDestroy(): void {
        this.removeFrom((this as any)._map);
    }

    public setUrl(url: string): this {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return super.setUrl(url);
    }
    @Input() public set url(val: string) {
        this.setUrl(val);
    }
    public get url(): string {
        return (this as any)._url;
    }

    public setOpacity(val: number): this {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return super.setOpacity(val);
    }
    @Input() public set opacity(val: number) {
        this.setOpacity(val);
    }
    public get opacity(): number {
        return this.options.opacity;
    }

    @Input() public set display(val: boolean) {
        const isDisplayed: boolean = this.display;
        if (isDisplayed === val) {
            return;
        }
        let pane: HTMLElement;
        let container: HTMLElement;
        let map: Map;
        let events: any; // Dictionary of functions
        let eventKeys: string[];
        try {
            pane = this.getPane();
            container = this.getElement();
            map = (this as any)._map;
            events = this.getEvents();
            eventKeys = Object.keys(events);
        } catch (err) {
            /* istanbul ignore next */
            return;
        }
        if (val) {
            // show layer
            pane.appendChild(container);
            for (const eventKey of eventKeys) {
                map.on(eventKey, events[eventKey], this);
            }
        } else {
            // hide layer
            pane.removeChild(container);
            for (const eventKey of eventKeys) {
                map.off(eventKey, events[eventKey], this);
            }
        }
    }
    public get display(): boolean {
        let pane: HTMLElement;
        let container: HTMLElement;
        try {
            pane = this.getPane();
            container = this.getElement();
        } catch (err) {
            /* istanbul ignore next */
            return false;
        }
        /* tslint:disable:prefer-for-of */
        for (let i: number = 0; i < pane.children.length; i += 1) {
            /* tslint:enable */
            /* istanbul ignore else */
            if (pane.children[i] === container) {
                return true;
            }
        }
        return false;
    }

    public setBounds(val: LatLngBoundsExpression): this {
        super.setBounds(latLngBounds((val as any)));

        this.boundsChange.emit(this.bounds);
        this.northChange.emit(this.north);
        this.eastChange.emit(this.east);
        this.southChange.emit(this.south);
        this.westChange.emit(this.west);

        return this;
    }
    @Input() public set bounds(val: LatLngBounds) {
        this.setBounds(val);
    }
    public get bounds(): LatLngBounds {
        return this.getBounds();
    }
    @Input() public set north(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();

        // super because we call the change listeners ourselves
        super.setBounds(latLngBounds([
            [oldBounds.getSouth(), oldBounds.getWest()],
            [val, oldBounds.getEast()],
        ]));

        this.boundsChange.emit(this.bounds);
        this.northChange.emit(val);
    }
    public get north(): number {
        return this.getBounds().getNorth();
    }
    @Input() public set east(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();
        super.setBounds(latLngBounds([
            [oldBounds.getSouth(), oldBounds.getWest()],
            [oldBounds.getNorth(), val],
        ]));

        this.boundsChange.emit(this.bounds);
        this.eastChange.emit(val);
    }
    public get east(): number {
        return this.getBounds().getEast();
    }
    @Input() public set south(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();
        super.setBounds(latLngBounds([
            [val, oldBounds.getWest()],
            [oldBounds.getNorth(), oldBounds.getEast()],
        ]));

        this.boundsChange.emit(this.bounds);
        this.southChange.emit(val);
    }
    public get south(): number {
        return this.getBounds().getSouth();
    }
    @Input() public set west(val: number) {
        const oldBounds: LatLngBounds = this.getBounds();
        super.setBounds(latLngBounds([
            [oldBounds.getSouth(), val],
            [oldBounds.getNorth(), oldBounds.getEast()],
        ]));

        this.boundsChange.emit(this.bounds);
        this.westChange.emit(val);
    }
    public get west(): number {
        return this.getBounds().getWest();
    }

    @Input() public set crossOrigin(val: boolean) {
        this.options.crossOrigin = val;
        this.getElement().crossOrigin = val ? '' : undefined;
    }
    public get crossOrigin(): boolean {
        return this.options.crossOrigin;
    }

    @Input() public set alt(val: string) {
        this.options.alt = val;
        this.getElement().alt = val;
    }
    public get alt(): string {
        return this.getElement().getAttribute('alt');
    }
    @Input() public set interactive(val: boolean) {
        this.options.interactive = val;
        this.onRemove(((this as any)._map as any));
        this.onAdd(((this as any)._map as any));
    }
    public get interactive(): boolean {
        return this.options.interactive;
    }
    @Input() public set attribution(val: string) {
        if ((this as any)._map && (this as any)._map.attributionControl) {
            ((this as any)._map.attributionControl as Control.Attribution).removeAttribution(this.getAttribution());
            ((this as any)._map.attributionControl as Control.Attribution).addAttribution(val);
        }
        this.options.attribution = val;
    }
    public get attribution(): string {
        return this.getAttribution();
    }
}
