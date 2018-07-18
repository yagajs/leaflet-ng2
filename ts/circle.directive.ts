import {
    AfterContentInit,
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from "@angular/core";
import { Feature as GeoJSONFeature, Point as GeoJSONPoint } from "geojson";
import {
    Circle,
    CircleMarkerOptions,
    FillRule,
    LatLng,
    LatLngLiteral,
    LatLngTuple,
    LeafletEvent,
    LeafletMouseEvent,
    LineCapShape,
    LineJoinShape,
    Map,
    PathOptions,
    PopupEvent,
    TooltipEvent,
} from "leaflet";
import { LayerGroupProvider } from "./layer-group.provider";
import { LayerProvider } from "./layer.provider";
import { lng2lat } from "./lng2lat";
import { MapComponent } from "./map.component";

/**
 * Angular2 directive for Leaflet circles.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-circle
 *         [(display)]="..."
 *         [(stroke)]="..."
 *         [(color)]="..."
 *         [(weight)]="..."
 *         [(opacity)]="..."
 *         [(lineCap)]="..."
 *         [(lineJoin)]="..."
 *         [(dashArray)]="..."
 *         [(dashOffset)]="..."
 *         [(fill)]="..."
 *         [(fillColor)]="..."
 *         [(fillOpacity)]="..."
 *         [(fillRule)]="..."
 *         [(className)]="..."
 *         [(style)]="..."
 *         [(position)]="..."
 *         [(lat)]="..."
 *         [(lng)]="..."
 *         [(radius)]="..."
 *         [(geoJSON)]="..."
 *
 *         (add)="..."
 *         (remove)="..."
 *         (popupopen)="..."
 *         (popupclose)="..."
 *         (tooltipopen)="..."
 *         (tooltipclose)="..."
 *         (click)="..."
 *         (dblclick)="..."
 *         (mousedown)="..."
 *         (mouseover)="..."
 *         (mouseout)="..."
 *         (contextmenu)="..."
 *
 *         [interactive]="..."
 *         [properties]="..."
 *         >
 *     </yaga-circle>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#circle Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Tile-Layer%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/tile-layer.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/circledirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/tile-layer-directive
 */
@Directive({
    providers: [ LayerProvider ],
    selector: "yaga-circle",
})
export class CircleDirective<T> extends Circle implements OnDestroy, AfterContentInit {
    /**
     * Two-Way bound property for the display status of the geometry.
     * Use it with `<yaga-circle [(display)]="someValue">`
     * or `<yaga-circle (displayChange)="processEvent($event)">`
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the stroke state of the geometry.
     * Use it with `<yaga-circle [(stroke)]="someValue">`
     * or `<yaga-circle (strokeChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-stroke Original Leaflet documentation
     */
    @Output() public strokeChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the line-color of the geometry.
     * Use it with `<yaga-circle [(color)]="someValue">`
     * or `<yaga-circle (colorChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-color Original Leaflet documentation
     */
    @Output() public colorChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the weight of the geometry.
     * Use it with `<yaga-circle [(weight)]="someValue">`
     * or `<yaga-circle (weightChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-weight Original Leaflet documentation
     */
    @Output() public weightChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the opacity of the geometry.
     * Use it with `<yaga-circle [(opacity)]="someValue">`
     * or `<yaga-circle (opacityChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-opacity Original Leaflet documentation
     */
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the lineCap of the geometry.
     * Use it with `<yaga-circle [(lineCap)]="someValue">`
     * or `<yaga-circle (lineCapChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-linecap Original Leaflet documentation
     */
    @Output() public lineCapChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the lineJoin of the geometry.
     * Use it with `<yaga-circle [(lineJoin)]="someValue">`
     * or `<yaga-circle (lineJoinChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-linejoin Original Leaflet documentation
     */
    @Output() public lineJoinChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the dashArray of the geometry.
     * Use it with `<yaga-circle [(dashArray)]="someValue">`
     * or `<yaga-circle (dashArrayChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-dasharray Original Leaflet documentation
     */
    @Output() public dashArrayChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the dashOffset of the geometry.
     * Use it with `<yaga-circle [(dashOffset)]="someValue">`
     * or `<yaga-circle (dashOffsetChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-dashoffset Original Leaflet documentation
     */
    @Output() public dashOffsetChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the fill state of the geometry.
     * Use it with `<yaga-circle [(fill)]="someValue">`
     * or `<yaga-circle (fillChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-fill Original Leaflet documentation
     */
    @Output() public fillChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the fill-color of the geometry.
     * Use it with `<yaga-circle [(fillColor)]="someValue">`
     * or `<yaga-circle (fillColorChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-fillcolor Original Leaflet documentation
     */
    @Output() public fillColorChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the fill-opacity of the geometry.
     * Use it with `<yaga-circle [(fillOpacity)]="someValue">`
     * or `<yaga-circle (fillOpacityChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-fillopacity Original Leaflet documentation
     */
    @Output() public fillOpacityChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the fill-rule of the geometry.
     * Use it with `<yaga-circle [(fillRule)]="someValue">`
     * or `<yaga-circle (fillRuleChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-fillrule Original Leaflet documentation
     */
    @Output() public fillRuleChange: EventEmitter<string> = new EventEmitter();
    // @Output() public rendererChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the className of the geometry.
     * Use it with `<yaga-circle [(className)]="someValue">`
     * or `<yaga-circle (classNameChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-classname Original Leaflet documentation
     */
    @Output() public classNameChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the css-style of the geometry.
     * Use it with `<yaga-circle [(style)]="someValue">`
     * or `<yaga-circle (styleChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-setstyle Original Leaflet documentation
     */
    @Output() public styleChange: EventEmitter<PathOptions> = new EventEmitter();

    /**
     * Two-Way bound property for the latlng-position of the geometry.
     * Use it with `<yaga-circle [(position)]="someValue">`
     * or `<yaga-circle (positionChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-setlatlng Original Leaflet documentation
     */
    @Output() public positionChange: EventEmitter<LatLng> = new EventEmitter();
    /**
     * Two-Way bound property for the latitude of the geometry.
     * Use it with `<yaga-circle [(lat)]="someValue">`
     * or `<yaga-circle (latChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-setlatlng Original Leaflet documentation
     */
    @Output() public latChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the longitude of the geometry.
     * Use it with `<yaga-circle [(lng)]="someValue">`
     * or `<yaga-circle (lngChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-setlatlng Original Leaflet documentation
     */
    @Output() public lngChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the radius of the geometry.
     * Use it with `<yaga-circle [(radius)]="someValue">`
     * or `<yaga-circle (radiusChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-setradius Original Leaflet documentation
     */
    @Output() public radiusChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the geometry represented as GeoJSON.
     * Use it with `<yaga-circle [(geoJSON)]="someValue">`
     * or `<yaga-circle (geoJSONChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-togeojson Original Leaflet documentation
     */
    @Output() public geoJSONChange: EventEmitter<GeoJSONFeature<GeoJSON.Point, T>> = new EventEmitter();

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-circle (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-add Original Leaflet documentation
     */
    @Output("add") public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-circle (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-remove Original Leaflet documentation
     */
    @Output("remove") public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-circle (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-popupopen Original Leaflet documentation
     */
    @Output("popupopen") public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-circle (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-popupclose Original Leaflet documentation
     */
    @Output("popupclose") public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-circle (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-tooltipopen Original Leaflet documentation
     */
    @Output("tooltipopen") public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-circle (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-tooltipclose Original Leaflet documentation
     */
    @Output("tooltipclose") public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-circle (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-click Original Leaflet documentation
     */
    @Output("click") public clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired dblclick event.
     * Use it with `<yaga-circle (dblclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-dblclick Original Leaflet documentation
     */
    @Output("dblclick") public dblclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-circle (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-mousedown Original Leaflet documentation
     */
    @Output("mousedown") public mousedownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-circle (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-mouseover Original Leaflet documentation
     */
    @Output("mouseover") public mouseoverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-circle (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-mouseout Original Leaflet documentation
     */
    @Output("mouseout") public mouseoutEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-circle (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-contextmenu Original Leaflet documentation
     */
    @Output("contextmenu") public contextmenuEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();

    public feature: GeoJSONFeature<GeoJSONPoint>; // This is not optional in this class

    private initialized: boolean = false;

    constructor(
        protected layerGroupProvider: LayerGroupProvider,
        layerProvider: LayerProvider,
    ) {
        super([0, 0]);

        layerProvider.ref = this;

        this.feature = (this as any).feature || {
            geometry: {type: "Point", coordinates: []},
            properties: {},
            type: "Feature",
        };
        this.feature.properties = this.feature.properties || {};

        this.on("remove", () => {
            this.displayChange.emit(false);
        });
        this.on("add", () => {
            this.displayChange.emit(true);
        });

        this.layerGroupProvider.ref!.addLayer(this);

        // Events
        this.on("add", (event: LeafletEvent) => {
            this.addEvent.emit(event);
        });
        this.on("remove", (event: LeafletEvent) => {
            this.removeEvent.emit(event);
        });
        this.on("popupopen", (event: LeafletEvent) => {
            this.popupopenEvent.emit(event as PopupEvent);
        });
        this.on("popupclose", (event: LeafletEvent) => {
            this.popupcloseEvent.emit(event as PopupEvent);
        });
        this.on("tooltipopen", (event: LeafletEvent) => {
            this.tooltipopenEvent.emit(event as TooltipEvent);
        });
        this.on("tooltipclose", (event: LeafletEvent) => {
            this.tooltipcloseEvent.emit(event as TooltipEvent);
        });
        this.on("click", (event: LeafletEvent) => {
            this.clickEvent.emit(event as LeafletMouseEvent);
        });
        this.on("dblclick", (event: LeafletEvent) => {
            this.dblclickEvent.emit(event as LeafletMouseEvent);
        });
        this.on("mousedown", (event: LeafletEvent) => {
            this.mousedownEvent.emit(event as LeafletMouseEvent);
        });
        this.on("mouseover", (event: LeafletEvent) => {
            this.mouseoverEvent.emit(event as LeafletMouseEvent);
        });
        this.on("mouseout", (event: LeafletEvent) => {
            this.mouseoutEvent.emit(event as LeafletMouseEvent);
        });
        this.on("contextmenu", (event: LeafletEvent) => {
            this.contextmenuEvent.emit(event as LeafletMouseEvent);
        });
    }

    /**
     * Internal method that provides the initialization of the child popup or tooltip
     */
    public ngAfterContentInit(): void {
        this.initialized = true;
    }

    /**
     * Internal method to provide the removal of the layer in Leaflet, when removing it from the Angular template
     */
    public ngOnDestroy(): void {
        this.removeFrom(this.layerGroupProvider.ref as Map);
    }

    /**
     * Derived method of the original setLatLng.
     * @link http://leafletjs.com/reference-1.2.0.html#circle-setlatlng Original Leaflet documentation
     */
    public setLatLng(val: LatLng | LatLngTuple | LatLngLiteral): this {
        super.setLatLng((val as any));
        if (!this.initialized) {
            return this;
        }
        this.positionChange.emit((this as any)._latlng);
        this.latChange.emit((this as any)._latlng.lat);
        this.lngChange.emit((this as any)._latlng.lng);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    }

    /**
     * Two-Way bound property for the position of the circle.
     * Use it with `<yaga-circle [(position)]="someValue">` or `<yaga-circle [position]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-l-circle Original Leaflet documentation
     */
    @Input() public set position(val: LatLng | LatLngTuple | LatLngLiteral) {
        this.setLatLng(val);
    }
    public get position(): LatLng | LatLngTuple | LatLngLiteral { // it is always a LatLng!
        return (this as any)._latlng;
    }

    /**
     * Two-Way bound property for the latitude (position) of the circle.
     * Use it with `<yaga-circle [(lat)]="someValue">` or `<yaga-circle [lat]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-l-circle Original Leaflet documentation
     */
    @Input() public set lat(val: number) {
        this.setLatLng([val, this.lng]);
    }
    public get lat(): number {
        return (this as any)._latlng.lat;
    }
    /**
     * Two-Way bound property for the longitude (position) of the circle.
     * Use it with `<yaga-circle [(lng)]="someValue">` or `<yaga-circle [lng]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-l-circle Original Leaflet documentation
     */
    @Input() public set lng(val: number) {
        this.setLatLng([this.lat, val]);
    }
    public get lng(): number {
        return (this as any)._latlng.lng;
    }

    /**
     * Derived method of the original setRadius.
     * @link http://leafletjs.com/reference-1.2.0.html#circle-setradius Original Leaflet documentation
     */
    public setRadius(val: number): this {
        super.setRadius(val);
        this.radiusChange.emit(val);
        return this;
    }

    /**
     * Two-Way bound property for the radius of the circle.
     * Use it with `<yaga-circle [(radius)]="someValue">` or `<yaga-circle [radius]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-radius Original Leaflet documentation
     */
    @Input() public set radius(val: number) {
        this.setRadius(val);
    }
    public get radius(): number {
        return this.getRadius();
    }

    /**
     * Two-Way bound property for the geoJSON data.
     * Use it with `<yaga-circle [(geoJSON)]="someValue">` or `<yaga-circle [geoJSONChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-togeojson Original Leaflet documentation
     */
    @Input() public set geoJSON(val: GeoJSONFeature<GeoJSON.Point, T>) {
        this.feature.properties = val.properties;

        const geomType: any = val.geometry.type; // Normally "Point"

        /* istanbul ignore if */
        if (geomType !== "Point") {
            throw new Error("Unsupported geometry type: " + geomType );
        }
        this.setLatLng(lng2lat(val.geometry.coordinates) as any);
    }
    public get geoJSON(): GeoJSONFeature<GeoJSON.Point, T> {
        return (this.toGeoJSON() as GeoJSONFeature<GeoJSON.Point, T>);
    }
    /**
     * Derived method of the original setStyle.
     * @link http://leafletjs.com/reference-1.2.0.html#circle-setstyle Original Leaflet documentation
     */
    public setStyle(style: PathOptions): this {
        super.setStyle(style);
        if (style.hasOwnProperty("stroke")) {
            this.strokeChange.emit(style.stroke);
        }
        if (style.hasOwnProperty("color")) {
            this.colorChange.emit(style.color);
        }
        if (style.hasOwnProperty("weight")) {
            this.weightChange.emit(style.weight);
        }
        if (style.hasOwnProperty("opacity")) {
            this.opacityChange.emit(style.opacity);
        }
        if (style.hasOwnProperty("lineCap")) {
            this.lineCapChange.emit(style.lineCap);
        }
        if (style.hasOwnProperty("lineJoin")) {
            this.lineJoinChange.emit(style.lineJoin);
        }
        if (style.hasOwnProperty("dashArray")) {
            this.dashArrayChange.emit(style.dashArray);
        }
        if (style.hasOwnProperty("dashOffset")) {
            this.dashOffsetChange.emit(style.dashOffset);
        }
        if (style.hasOwnProperty("fill")) {
            this.fillChange.emit(style.fill);
        }
        if (style.hasOwnProperty("fillColor")) {
            this.fillColorChange.emit(style.fillColor);
        }
        if (style.hasOwnProperty("fillOpacity")) {
            this.fillOpacityChange.emit(style.fillOpacity);
        }
        if (style.hasOwnProperty("fillRule")) {
            this.fillRuleChange.emit(style.fillRule);
        }
        if (style.hasOwnProperty("className")) {
            this.classNameChange.emit(style.className);
        }
        this.styleChange.emit(style);

        return this;
    }
    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-circle [(opacity)]="someValue">` or `<yaga-circle [opacityChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-opacity Original Leaflet documentation
     */
    @Input() public set opacity(val: number | undefined) {
        this.setStyle({opacity: val});
    }
    public get opacity(): number | undefined {
        return this.options.opacity;
    }
    /**
     * Two-Way bound property for the stroke.
     * Use it with `<yaga-circle [(stroke)]="someValue">` or `<yaga-circle [strokeChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-stroke Original Leaflet documentation
     */
    @Input() public set stroke(val: boolean) {
        this.setStyle({stroke: val});
    }
    public get stroke(): boolean {
        if (this.options.hasOwnProperty("stroke") && this.options.stroke !== undefined) {
            return this.options.stroke;
        }
        return true;
    }
    /**
     * Two-Way bound property for the color.
     * Use it with `<yaga-circle [(color)]="someValue">` or `<yaga-circle [colorChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-color Original Leaflet documentation
     */
    @Input() public set color(val: string | undefined) {
        this.setStyle({color: val});
    }
    public get color(): string | undefined {
        return this.options.color;
    }
    /**
     * Two-Way bound property for the weight.
     * Use it with `<yaga-circle [(weight)]="someValue">` or `<yaga-circle [weightChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-weight Original Leaflet documentation
     */
    @Input() public set weight(val: number | undefined) {
        this.setStyle({weight: val});
    }
    public get weight(): number | undefined {
        return this.options.weight;
    }
    /**
     * Two-Way bound property for the lineCap.
     * Use it with `<yaga-circle [(lineCap)]="someValue">` or `<yaga-circle [lineCapChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-linecap Original Leaflet documentation
     */
    @Input() public set lineCap(val: LineCapShape | undefined) {
        this.setStyle({lineCap: val});
    }
    public get lineCap(): LineCapShape | undefined {
        return this.options.lineCap;
    }
    /**
     * Two-Way bound property for the lineJoin.
     * Use it with `<yaga-circle [(lineJoin)]="someValue">` or `<yaga-circle [lineJoinChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-linejoin Original Leaflet documentation
     */
    @Input() public set lineJoin(val: LineJoinShape | undefined) {
        this.setStyle({lineJoin: val});
    }
    public get lineJoin(): LineJoinShape | undefined {
        return this.options.lineJoin;
    }
    /**
     * Two-Way bound property for the dashArray.
     * Use it with `<yaga-circle [(dashArray)]="someValue">` or `<yaga-circle [dashArrayChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-dasharray Original Leaflet documentation
     */
    @Input() public set dashArray(val: string | undefined) {
        this.setStyle({dashArray: val});
    }
    public get dashArray(): string | undefined {
        return this.options.dashArray;
    }
    /**
     * Two-Way bound property for the dashOffset.
     * Use it with `<yaga-circle [(dashOffset)]="someValue">` or `<yaga-circle [dashOffsetChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-dashoffset Original Leaflet documentation
     */
    @Input() public set dashOffset(val: string | undefined) {
        this.setStyle({dashOffset: val});
    }
    public get dashOffset(): string | undefined {
        return this.options.dashOffset;
    }
    /**
     * Two-Way bound property for the fill.
     * Use it with `<yaga-circle [(fill)]="someValue">` or `<yaga-circle [fillChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-fill Original Leaflet documentation
     */
    @Input() public set fill(val: boolean) {
        this.setStyle({fill: val});
    }
    public get fill(): boolean {
        return this.options.fill || false;
    }
    /**
     * Two-Way bound property for the fillColor.
     * Use it with `<yaga-circle [(fillColor)]="someValue">` or `<yaga-circle [fillColorChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-fillcolor Original Leaflet documentation
     */
    @Input() public set fillColor(val: string | undefined) {
        this.setStyle({fillColor: val});
    }
    public get fillColor(): string | undefined {
        return this.options.fillColor;
    }
    /**
     * Two-Way bound property for the fillOpacity.
     * Use it with `<yaga-circle [(fillOpacity)]="someValue">` or `<yaga-circle [fillOpacityChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-fillopacity Original Leaflet documentation
     */
    @Input() public set fillOpacity(val: number | undefined) {
        this.setStyle({fillOpacity: val});
    }
    public get fillOpacity(): number | undefined {
        return this.options.fillOpacity;
    }
    /**
     * Two-Way bound property for the fillRule.
     * Use it with `<yaga-circle [(fillRule)]="someValue">` or `<yaga-circle [fillRuleChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-fillrule Original Leaflet documentation
     */
    @Input() public set fillRule(val: FillRule | undefined) {
        this.setStyle({fillRule: val});
    }
    public get fillRule(): FillRule | undefined {
        return this.options.fillRule;
    }
    /**
     * Two-Way bound property for the className.
     * Use it with `<yaga-circle [(className)]="someValue">` or `<yaga-circle [classNameChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-classname Original Leaflet documentation
     */
    @Input() public set className(val: string | undefined) {
        this.setStyle({className: val});
    }
    public get className(): string | undefined {
        return this.options.className;
    }
    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-circle [(style)]="someValue">` or `<yaga-circle [styleChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-style Original Leaflet documentation
     */
    @Input() public set style(val: CircleMarkerOptions) {
        this.setStyle(val);
    }
    public get style(): CircleMarkerOptions {
        return this.options;
    }

    /**
     * Two-Way bound property for the display state.
     * Use it with `<yaga-circle [(display)]="someValue">` or `<yaga-circle [displayChange]="someValue">`
     */
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
        container.style.display = val ? "" : "none";
    }
    public get display(): boolean {
        let container: HTMLElement;
        try {
            container = this.getElement() as HTMLElement;
        } catch (err) {
            /* istanbul ignore next */
            return false;
        }
        return container.style.display !== "none" && !!container.parentElement;
    }

    /**
     * Input for the GeoJSON properties.
     * Use it with `<yaga-circle [interactive]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circle-interactive Original Leaflet documentation
     */
    @Input() public set interactive(val: boolean) {
        const map: MapComponent = ((this as any)._map as MapComponent);
        this.options.interactive = val;
        this.onRemove(map);
        this.onAdd(map);
    }
    public get interactive(): boolean {
        return !!this.options.interactive;
    }

    /**
     * Input for the GeoJSON properties.
     * Use it with `<yaga-circle [properties]="someValue">`
     */
    @Input() public set properties(val: T) {
        this.feature.properties = val;
        this.geoJSONChange.emit(this.geoJSON);
    }
    public get properties(): T {
        return (this.feature.properties as T);
    }
}
