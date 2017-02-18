import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    OnDestroy,
    Optional,
    ContentChild,
    AfterViewInit } from '@angular/core';
import { CircleMarker,
    CircleMarkerOptions,
    Event,
    PopupEvent,
    TooltipEvent,
    PathOptions,
    FillRule,
    LineCapShape,
    LineJoinShape,
    LatLng,
    LatLngTuple,
    LatLngLiteral } from 'leaflet';
import { MapComponent } from './map.component';
import { lng2lat } from './lng2lat';

import { GenericGeoJSONFeature } from '@yaga/generic-geojson';

// Content-Child imports
import { PopupDirective } from './popup.directive';
import { TooltipDirective } from './tooltip.directive';

@Directive({
    selector: 'yaga-circle-marker'
})
export class CircleMarkerDirective<T> extends CircleMarker implements OnDestroy, AfterViewInit {
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

    @Output() public positionChange: EventEmitter<LatLng> = new EventEmitter();
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    @Output() public radiusChange: EventEmitter<number> = new EventEmitter();
    /* tslint:disable:max-line-length */
    @Output() public geoJSONChange: EventEmitter<GenericGeoJSONFeature<GeoJSON.Point, T>> = new EventEmitter();
    /* tslint:enable */

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

    @Optional() @ContentChild(PopupDirective) public popupDirective: PopupDirective;
    @Optional() @ContentChild(TooltipDirective) public tooltipDirective: TooltipDirective;

    private initialized: boolean = false;

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent
    ) {
        super([0, 0]);

        this.feature = this.feature || {type: 'Feature', properties: {}, geometry: {type: 'Point', coordinates: []}};
        this.feature.properties = this.feature.properties || {};

        this.on('remove', () => {
            this.displayChange.emit(false);
        });
        this.on('add', () => {
            this.displayChange.emit(true);
        });

        mapComponent.addLayer(this);

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

    ngAfterViewInit(): void {
        this.initialized = true;
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

    setLatLng(val: LatLng | LatLngTuple | LatLngLiteral): this {
        super.setLatLng((<any>val));
        if (!this.initialized) {
            return this;
        }
        this.positionChange.emit((<any>this)._latlng);
        this.latChange.emit((<any>this)._latlng.lat);
        this.lngChange.emit((<any>this)._latlng.lng);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    }
    @Input() set position(val:  LatLng | LatLngTuple | LatLngLiteral) {
        this.setLatLng(val);
    }
    get position():  LatLng | LatLngTuple | LatLngLiteral { // it is always a LatLng!
        return (<any>this)._latlng;
    }

    @Input() set lat(val: number) {
        this.setLatLng([val, this.lng]);
    }
    get lat(): number {
        return (<any>this)._latlng.lat;
    }
    @Input() set lng(val: number) {
        this.setLatLng([this.lat, val]);
    }
    get lng(): number {
        return (<any>this)._latlng.lng;
    }

    setRadius(val: number): this {
        super.setRadius(val);
        this.radiusChange.emit(val);
        return this;
    }

    @Input() set radius(val: number) {
        this.setRadius(val);
    }
    get radius(): number {
        return this.getRadius();
    }

    @Input() set geoJSON(val: GenericGeoJSONFeature<GeoJSON.Point, T>) {
        this.feature.properties = val.properties;

        let geomType: any = val.geometry.type; // Normally 'Point'

        /* istanbul ignore if */
        if (geomType !== 'Point') {
            throw new Error('Unsupported geometry type: ' + geomType );
        }
        this.setLatLng(<any>lng2lat(val.geometry.coordinates));
    }
    get geoJSON(): GenericGeoJSONFeature<GeoJSON.Point, T> {
        return (<GenericGeoJSONFeature<GeoJSON.Point, T>>this.toGeoJSON());
    }


    setStyle(style: PathOptions): this {
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
    @Input() set opacity(val: number) {
        this.setStyle({opacity: val});
    }
    get opacity(): number {
        return this.options.opacity;
    }
    @Input() set stroke(val: boolean) {
        this.setStyle({stroke: val});
    }
    get stroke(): boolean {
        return this.options.stroke;
    }
    @Input() set color(val: string) {
        this.setStyle({color: val});
    }
    get color(): string {
        return this.options.color;
    }
    @Input() set weight(val: number) {
        this.setStyle({weight: val});
    }
    get weight(): number {
        return this.options.weight;
    }
    @Input() set lineCap(val: LineCapShape) {
        this.setStyle({lineCap: val});
    }
    get lineCap(): LineCapShape {
        return this.options.lineCap;
    }
    @Input() set lineJoin(val: LineJoinShape) {
        this.setStyle({lineJoin: val});
    }
    get lineJoin(): LineJoinShape {
        return this.options.lineJoin;
    }
    @Input() set dashArray(val: string) {
        this.setStyle({dashArray: val});
    }
    get dashArray(): string {
        return this.options.dashArray;
    }
    @Input() set dashOffset(val: string) {
        this.setStyle({dashOffset: val});
    }
    get dashOffset(): string {
        return this.options.dashOffset;
    }
    @Input() set fill(val: boolean) {
        this.setStyle({fill: val});
    }
    get fill(): boolean {
        return this.options.fill;
    }
    @Input() set fillColor(val: string) {
        this.setStyle({fillColor: val});
    }
    get fillColor(): string {
        return this.options.fillColor;
    }
    @Input() set fillOpacity(val: number) {
        this.setStyle({fillOpacity: val});
    }
    get fillOpacity(): number {
        return this.options.fillOpacity;
    }
    @Input() set fillRule(val: FillRule) {
        this.setStyle({fillRule: val});
    }
    get fillRule(): FillRule {
        return this.options.fillRule;
    }
    @Input() set className(val: string) {
        this.setStyle({className: val});
    }
    get className(): string {
        return this.options.className;
    }
    @Input() set style(val: CircleMarkerOptions) {
        this.setStyle(val);
    }
    get style(): CircleMarkerOptions {
        return this.options;
    }

    @Input() set display(val: boolean) {
        var isDisplayed: boolean = this.display;
        if (isDisplayed === val) {
            return;
        }
        var container: HTMLElement;
        try {
            container = this.getElement();
        } catch (err) {
            /* istanbul ignore next */
            return;
        }
        this.displayChange.emit(val);
        container.style.display = val ? '' : 'none';
    }
    get display(): boolean {
        var container: HTMLElement;
        try {
            container = this.getElement();
        } catch (err) {
            /* istanbul ignore next */
            return false;
        }
        return container.style.display !== 'none' && !!container.parentElement;
    }

    @Input() set interactive(val: boolean) {
        var map: MapComponent = (<MapComponent>(<any>this)._map);
        this.options.interactive = val;
        this.onRemove(map);
        this.onAdd(map);
    }
    get interactive(): boolean {
        return this.options.interactive;
    }

    @Input() set properties(val: T) {
        this.feature.properties = val;
        this.geoJSONChange.emit(this.geoJSON);
    }
    get properties(): T {
        return (<T>this.feature.properties);
    }
}
