import {
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
    LatLngExpression,
    LatLngTuple,
    LeafletEvent,
    LeafletMouseEvent,
    LineCapShape,
    LineJoinShape,
    PathOptions,
    Polyline,
    PolylineOptions,
    PopupEvent,
    TooltipEvent,
} from 'leaflet';
import { LayerGroupProvider } from './layer-group.provider';
import { LayerProvider } from './layer.provider';
import { lng2lat } from './lng2lat';
import { MapComponent } from './map.component';

@Directive({
    providers: [ LayerProvider ],
    selector: 'yaga-polyline',
})
export class PolylineDirective<T> extends Polyline implements OnDestroy {
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
    /* tslint:disable:max-line-length */
    @Output() public geoJSONChange: EventEmitter<GeoJSONFeature<GeoJSON.LineString | GeoJSON.MultiLineString, T>> = new EventEmitter();
    /* tslint:enable */

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
        super([]);

        layerProvider.ref = this;

        this.feature = this.feature ||
            {type: 'Feature', properties: {}, geometry: {type: 'LineString', coordinates: []}};
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

    public ngOnDestroy(): void {
        this.removeFrom((this as any)._map);
    }

    public setLatLngs(
        val: (
            Array<(LatLng | LatLngTuple | LatLngExpression)> |
                Array<Array<(LatLng | LatLngTuple | LatLngExpression)>>
            ),
    ): this {
        super.setLatLngs((val as any));
        this.latLngsChange.emit((this as any)._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    }
    public addLatLng(
        val: (LatLng | LatLngTuple | LatLngExpression) | Array<(LatLng | LatLngTuple | LatLngExpression)>,
    ): this {
        super.addLatLng((val as any));
        this.latLngsChange.emit((this as any)._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    }
    @Input() public set latLngs(val: LatLng[] | LatLng[][]) {
        this.setLatLngs(val);
    }
    public get latLngs(): LatLng[] | LatLng[][] {
        return (this as any)._latlngs;
    }

    @Input() public set geoJSON(val: GeoJSONFeature<GeoJSON.LineString | GeoJSON.MultiLineString, T>) {
        this.feature.properties = val.properties;

        const geomType: any = val.geometry.type; // Normally '(Multi)LineString'

        /* istanbul ignore if */
        if (geomType !== 'LineString' && geomType !== 'MultiLineString') {
            throw new Error('Unsupported geometry type: ' + geomType );
        }
        this.setLatLngs(lng2lat(val.geometry.coordinates) as any);
    }
    public get geoJSON(): GeoJSONFeature<GeoJSON.LineString | GeoJSON.MultiLineString, T> {
        return (this.toGeoJSON() as GeoJSONFeature<GeoJSON.LineString | GeoJSON.MultiLineString, T>);
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
