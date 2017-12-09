import {
    AfterContentInit,
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import { Feature as GeoJSONFeature } from 'geojson';
import {
    FillRule,
    LatLng,
    LatLngBounds,
    latLngBounds,
    LatLngBoundsLiteral,
    LatLngExpression,
    LatLngTuple,
    LeafletMouseEvent,
    LineCapShape,
    LineJoinShape,
    PathOptions,
    PolylineOptions,
    PopupEvent,
    Rectangle,
    TooltipEvent,
} from 'leaflet';
import { LayerGroupProvider } from './layer-group.provider';
import { lng2lat } from './lng2lat';
import { MapComponent } from './map.component';

@Directive({
    selector: 'yaga-rectangle',
})
export class RectangleDirective<T> extends Rectangle implements OnDestroy, AfterContentInit {
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public strokeChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public colorChange: EventEmitter<string> = new EventEmitter();
    @Output() public weightChange: EventEmitter<number> = new EventEmitter();
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    @Output() public lineCapChange: EventEmitter<string> = new EventEmitter();
    @Output() public lineJoinChange: EventEmitter<string> = new EventEmitter();
    @Output() public dashArrayChange: EventEmitter<string> = new EventEmitter();
    @Output() public dashOffsetChange: EventEmitter<string> = new EventEmitter();
    @Output() public fillChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public fillColorChange: EventEmitter<string> = new EventEmitter();
    @Output() public fillOpacityChange: EventEmitter<number> = new EventEmitter();
    @Output() public fillRuleChange: EventEmitter<string> = new EventEmitter();
    // @Output() public rendererChange: EventEmitter<number> = new EventEmitter();
    @Output() public classNameChange: EventEmitter<string> = new EventEmitter();
    @Output() public styleChange: EventEmitter<PathOptions> = new EventEmitter();

    @Output() public latLngsChange: EventEmitter<LatLng[]> = new EventEmitter();
    @Output() public boundsChange: EventEmitter<LatLngBounds> = new EventEmitter();
    @Output() public northChange: EventEmitter<number> = new EventEmitter();
    @Output() public eastChange: EventEmitter<number> = new EventEmitter();
    @Output() public southChange: EventEmitter<number> = new EventEmitter();
    @Output() public westChange: EventEmitter<number> = new EventEmitter();
    /* tslint:disable:max-line-length */
    @Output() public geoJSONChange: EventEmitter<GeoJSONFeature<GeoJSON.Polygon | GeoJSON.MultiPolygon, T>> = new EventEmitter();
    /* tslint:enable */

    @Output('add') public addEvent: EventEmitter<Event> = new EventEmitter();
    @Output('remove') public removeEvent: EventEmitter<Event> = new EventEmitter();
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

    private initialized: boolean = false;

    constructor(
        layerGroupProvider: LayerGroupProvider,
    ) {
        super(latLngBounds([0, 0], [0, 0]));

        this.feature = this.feature || {type: 'Feature', properties: {}, geometry: {type: 'Polygon', coordinates: []}};
        this.feature.properties = this.feature.properties || {};

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

    public ngAfterContentInit(): void {
        this.initialized = true;
    }

    public ngOnDestroy(): void {
        this.removeFrom((this as any)._map);
    }

    public setBounds(val: LatLngBounds | LatLngBoundsLiteral): this {
        super.setBounds((val as any));
        if (!this.initialized) {
            return this;
        }
        this.boundsChange.emit(this.getBounds());
        this.northChange.emit(this.getBounds().getNorth());
        this.eastChange.emit(this.getBounds().getEast());
        this.southChange.emit(this.getBounds().getSouth());
        this.westChange.emit(this.getBounds().getWest());
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

    public setLatLngs(val: (
        Array<(LatLng | LatLngTuple | LatLngExpression)> |
        Array<Array<(LatLng | LatLngTuple | LatLngExpression)>> |
        Array<Array<Array<(LatLng | LatLngTuple | LatLngExpression)>>>)): this {

        super.setLatLngs((val as any));
        this.latLngsChange.emit((this as any)._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    }
    public addLatLng(
        val: (LatLng | LatLngTuple | LatLngExpression) |Array<(LatLng | LatLngTuple | LatLngExpression)>,
    ): this {
        super.addLatLng((val as any));
        this.latLngsChange.emit((this as any)._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    }
    @Input() public set latLngs(val: LatLng[] | LatLng[][] | LatLng[][][]) {
        this.setLatLngs(val);
    }
    public get latLngs(): LatLng[] | LatLng[][] | LatLng[][][] {
        return (this as any)._latlngs;
    }

    @Input() public set geoJSON(val: GeoJSONFeature<GeoJSON.Polygon | GeoJSON.MultiPolygon, T>) {
        this.feature.properties = val.properties;

        const geomType: any = val.geometry.type; // Normally '(Multi)Polygon'

        /* istanbul ignore if */
        if (geomType !== 'Polygon' && geomType !== 'MultiPolygon') {
            throw new Error('Unsupported geometry type: ' + geomType );
        }
        this.setLatLngs(lng2lat(val.geometry.coordinates) as any);
    }
    public get geoJSON(): GeoJSONFeature<GeoJSON.Polygon | GeoJSON.MultiPolygon, T> {
        return (this.toGeoJSON() as GeoJSONFeature<GeoJSON.Polygon | GeoJSON.MultiPolygon, T>);
    }

    public setStyle(style: PathOptions): this {
        super.setStyle(style);
        if (style.hasOwnProperty('stroke')) {
            this.strokeChange.emit(style.stroke);
        }
        if (style.hasOwnProperty('color')) {
            this.colorChange.emit(style.color);
        }
        if (style.hasOwnProperty('weight')) {
            this.weightChange.emit(style.weight);
        }
        if (style.hasOwnProperty('opacity')) {
            this.opacityChange.emit(style.opacity);
        }
        if (style.hasOwnProperty('lineCap')) {
            this.lineCapChange.emit(style.lineCap);
        }
        if (style.hasOwnProperty('lineJoin')) {
            this.lineJoinChange.emit(style.lineJoin);
        }
        if (style.hasOwnProperty('dashArray')) {
            this.dashArrayChange.emit(style.dashArray);
        }
        if (style.hasOwnProperty('dashOffset')) {
            this.dashOffsetChange.emit(style.dashOffset);
        }
        if (style.hasOwnProperty('fill')) {
            this.fillChange.emit(style.fill);
        }
        if (style.hasOwnProperty('fillColor')) {
            this.fillColorChange.emit(style.fillColor);
        }
        if (style.hasOwnProperty('fillOpacity')) {
            this.fillOpacityChange.emit(style.fillOpacity);
        }
        if (style.hasOwnProperty('fillRule')) {
            this.fillRuleChange.emit(style.fillRule);
        }
        if (style.hasOwnProperty('className')) {
            this.classNameChange.emit(style.className);
        }
        this.styleChange.emit(style);

        return this;
    }
    @Input() public set opacity(val: number) {
        this.setStyle({opacity: val});
    }
    public get opacity(): number {
        return this.options.opacity;
    }
    @Input() public set stroke(val: boolean) {
        this.setStyle({stroke: val});
    }
    public get stroke(): boolean {
        return this.options.stroke;
    }
    @Input() public set color(val: string) {
        this.setStyle({color: val});
    }
    public get color(): string {
        return this.options.color;
    }
    @Input() public set weight(val: number) {
        this.setStyle({weight: val});
    }
    public get weight(): number {
        return this.options.weight;
    }
    @Input() public set lineCap(val: LineCapShape) {
        this.setStyle({lineCap: val});
    }
    public get lineCap(): LineCapShape {
        return this.options.lineCap;
    }
    @Input() public set lineJoin(val: LineJoinShape) {
        this.setStyle({lineJoin: val});
    }
    public get lineJoin(): LineJoinShape {
        return this.options.lineJoin;
    }
    @Input() public set dashArray(val: string) {
        this.setStyle({dashArray: val});
    }
    public get dashArray(): string {
        return this.options.dashArray;
    }
    @Input() public set dashOffset(val: string) {
        this.setStyle({dashOffset: val});
    }
    public get dashOffset(): string {
        return this.options.dashOffset;
    }
    @Input() public set fill(val: boolean) {
        this.setStyle({fill: val});
    }
    public get fill(): boolean {
        return this.options.fill;
    }
    @Input() public set fillColor(val: string) {
        this.setStyle({fillColor: val});
    }
    public get fillColor(): string {
        return this.options.fillColor;
    }
    @Input() public set fillOpacity(val: number) {
        this.setStyle({fillOpacity: val});
    }
    public get fillOpacity(): number {
        return this.options.fillOpacity;
    }
    @Input() public set fillRule(val: FillRule) {
        this.setStyle({fillRule: val});
    }
    public get fillRule(): FillRule {
        return this.options.fillRule;
    }
    @Input() public set className(val: string) {
        this.setStyle({className: val});
    }
    public get className(): string {
        return this.options.className;
    }
    @Input() public set style(val: PolylineOptions) {
        this.setStyle(val);
    }
    public get style(): PolylineOptions {
        return this.options;
    }

    @Input() public set display(val: boolean) {
        const isDisplayed: boolean = this.display;
        if (isDisplayed === val) {
            return;
        }
        let container: HTMLElement;
        try {
            container = this.getElement() as HTMLElement;
        } catch (err) {
            /* istanbul ignore next */
            return;
        }
        this.displayChange.emit(val);
        container.style.display = val ? '' : 'none';
    }
    public get display(): boolean {
        let container: HTMLElement;
        try {
            container = this.getElement() as HTMLElement;
        } catch (err) {
            /* istanbul ignore next */
            return false;
        }
        return container.style.display !== 'none' && !!container.parentElement;
    }

    @Input() public set interactive(val: boolean) {
        const map: MapComponent = ((this as any)._map as MapComponent);
        this.options.interactive = val;
        this.onRemove(map);
        this.onAdd(map);
    }
    public get interactive(): boolean {
        return this.options.interactive;
    }

    @Input() public set smoothFactor(val: number) {
        this.options.smoothFactor = val;
        this.redraw();
    }
    public get smoothFactor(): number {
        return this.options.smoothFactor;
    }
    @Input() public set noClip(val: boolean) {
        this.options.noClip = val;
        this.redraw();
    }
    public get noClip(): boolean {
        return this.options.noClip;
    }

    @Input() public set properties(val: T) {
        this.feature.properties = val;
        this.geoJSONChange.emit(this.geoJSON);
    }
    public get properties(): T {
        return (this.feature.properties as T);
    }
}
