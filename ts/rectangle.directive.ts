import {
    AfterContentInit,
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from "@angular/core";
import {Feature as GeoJSONFeature, Polygon as GeoJSONPolygon} from "geojson";
import {
    FillRule,
    LatLng,
    LatLngBounds,
    latLngBounds,
    LatLngBoundsLiteral,
    LatLngExpression,
    LatLngTuple,
    LeafletEvent,
    LeafletMouseEvent,
    LineCapShape,
    LineJoinShape,
    Map,
    PathOptions,
    PolylineOptions,
    PopupEvent,
    Rectangle,
    TooltipEvent,
} from "leaflet";
import { LayerGroupProvider } from "./layer-group.provider";
import { LayerProvider } from "./layer.provider";
import { lng2lat } from "./lng2lat";
import { MapComponent } from "./map.component";

/**
 * Angular2 directive for Leaflet rectangles.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-rectangle
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
 *         [(renderer)]="..."
 *         [(className)]="..."
 *         [(style)]="..."
 *         [(latLngs)]="..."
 *         [(bounds)]="..."
 *         [(north)]="..."
 *         [(east)]="..."
 *         [(south)]="..."
 *         [(west)]="..."
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
 *         [smoothFactor]="..."
 *         [noClip]="..."
 *         [properties]="..."
 *         >
 *     </yaga-rectangle>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#rectangle Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Rectangle%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/rectangle.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/rectangledirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/rectangle-directive
 */
@Directive({
    providers: [ LayerProvider ],
    selector: "yaga-rectangle",
})
export class RectangleDirective<T> extends Rectangle implements OnDestroy, AfterContentInit {
    /**
     * Two-Way bound property for the display status of the geometry.
     * Use it with `<yaga-rectangle [(display)]="someValue">`
     * or `<yaga-rectangle (displayChange)="processEvent($event)">`
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the stroke state of the geometry.
     * Use it with `<yaga-rectangle [(stroke)]="someValue">`
     * or `<yaga-rectangle (strokeChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-stroke Original Leaflet documentation
     */
    @Output() public strokeChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the line-color of the geometry.
     * Use it with `<yaga-rectangle [(color)]="someValue">`
     * or `<yaga-rectangle (colorChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-color Original Leaflet documentation
     */
    @Output() public colorChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the weight of the geometry.
     * Use it with `<yaga-rectangle [(weight)]="someValue">`
     * or `<yaga-rectangle (weightChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-weight Original Leaflet documentation
     */
    @Output() public weightChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the opacity of the geometry.
     * Use it with `<yaga-rectangle [(opacity)]="someValue">`
     * or `<yaga-rectangle (opacityChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-opacity Original Leaflet documentation
     */
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the lineCap of the geometry.
     * Use it with `<yaga-rectangle [(lineCap)]="someValue">`
     * or `<yaga-rectangle (lineCapChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-linecap Original Leaflet documentation
     */
    @Output() public lineCapChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the lineJoin of the geometry.
     * Use it with `<yaga-rectangle [(lineJoin)]="someValue">`
     * or `<yaga-rectangle (lineJoinChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-linejoin Original Leaflet documentation
     */
    @Output() public lineJoinChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the dashArray of the geometry.
     * Use it with `<yaga-rectangle [(dashArray)]="someValue">`
     * or `<yaga-rectangle (dashArrayChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-dasharray Original Leaflet documentation
     */
    @Output() public dashArrayChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the dashOffset of the geometry.
     * Use it with `<yaga-rectangle [(dashOffset)]="someValue">`
     * or `<yaga-rectangle (dashOffsetChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-dashoffset Original Leaflet documentation
     */
    @Output() public dashOffsetChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the fill state of the geometry.
     * Use it with `<yaga-rectangle [(fill)]="someValue">`
     * or `<yaga-rectangle (fillChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-fill Original Leaflet documentation
     */
    @Output() public fillChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the fill-color of the geometry.
     * Use it with `<yaga-rectangle [(fillColor)]="someValue">`
     * or `<yaga-rectangle (fillColorChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-fillcolor Original Leaflet documentation
     */
    @Output() public fillColorChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the fill-opacity of the geometry.
     * Use it with `<yaga-rectangle [(fillOpacity)]="someValue">`
     * or `<yaga-rectangle (fillOpacityChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-fillopacity Original Leaflet documentation
     */
    @Output() public fillOpacityChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the fill-rule of the geometry.
     * Use it with `<yaga-rectangle [(fillRule)]="someValue">`
     * or `<yaga-rectangle (fillRuleChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-fillrule Original Leaflet documentation
     */
    @Output() public fillRuleChange: EventEmitter<string> = new EventEmitter();
    // @Output() public rendererChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the className of the geometry.
     * Use it with `<yaga-rectangle [(className)]="someValue">`
     * or `<yaga-rectangle (classNameChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-classname Original Leaflet documentation
     */
    @Output() public classNameChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the css-style of the geometry.
     * Use it with `<yaga-rectangle [(style)]="someValue">`
     * or `<yaga-rectangle (styleChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-setstyle Original Leaflet documentation
     */
    @Output() public styleChange: EventEmitter<PathOptions> = new EventEmitter();

    /**
     * Two-Way bound property for the array of LatLngs of the geometry.
     * Use it with `<yaga-rectangle [(latLngs)]="someValue">`
     * or `<yaga-rectangle (latLngsChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.3.0.html#rectangle-setlatlngs Original Leaflet documentation
     */
    @Output() public latLngsChange: EventEmitter<LatLng[]> = new EventEmitter();
    /**
     * Two-Way bound property for the bounds of the rectangle.
     * Use it with `<yaga-rectangle [(bounds)]="someValue">`
     * or `<yaga-rectangle (boundsChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.3.0.html#rectangle-setbounds Original Leaflet documentation
     */
    @Output() public boundsChange: EventEmitter<LatLngBounds> = new EventEmitter();
    /**
     * Two-Way bound property for the north of the bounds of the rectangle.
     * Use it with `<yaga-rectangle [(north)]="someValue">`
     * or `<yaga-rectangle (northChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.3.0.html#rectangle-setbounds Original Leaflet documentation
     */
    @Output() public northChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the east of the bounds of the rectangle.
     * Use it with `<yaga-rectangle [(east)]="someValue">`
     * or `<yaga-rectangle (eastChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.3.0.html#rectangle-setbounds Original Leaflet documentation
     */
    @Output() public eastChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the south of the bounds of the rectangle.
     * Use it with `<yaga-rectangle [(south)]="someValue">`
     * or `<yaga-rectangle (southChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.3.0.html#rectangle-setbounds Original Leaflet documentation
     */
    @Output() public southChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the west of the bounds of the rectangle.
     * Use it with `<yaga-rectangle [(west)]="someValue">`
     * or `<yaga-rectangle (westChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.3.0.html#rectangle-setbounds Original Leaflet documentation
     */
    @Output() public westChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the corresponding GeoJSON.
     * Use it with `<yaga-rectangle [(geoJSON)]="someValue">`
     * or `<yaga-rectangle (geoJSONChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.3.0.html#rectangle-togeojson Original Leaflet documentation
     */
    /* tslint:disable:max-line-length */
    @Output() public geoJSONChange: EventEmitter<GeoJSONFeature<GeoJSON.Polygon | GeoJSON.MultiPolygon, T>> = new EventEmitter();
    /* tslint:enable */

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-rectangle (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-add Original Leaflet documentation
     */
    @Output("add") public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-rectangle (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-remove Original Leaflet documentation
     */
    @Output("remove") public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-rectangle (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-popupopen Original Leaflet documentation
     */
    @Output("popupopen") public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-rectangle (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-popupclose Original Leaflet documentation
     */
    @Output("popupclose") public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-rectangle (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-tooltipopen Original Leaflet documentation
     */
    @Output("tooltipopen") public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-rectangle (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-tooltipclose Original Leaflet documentation
     */
    @Output("tooltipclose") public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-rectangle (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-click Original Leaflet documentation
     */
    @Output("click") public clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired dblclick event.
     * Use it with `<yaga-rectangle (dblclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-dblclick Original Leaflet documentation
     */
    @Output("dblclick") public dblclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-rectangle (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-mousedown Original Leaflet documentation
     */
    @Output("mousedown") public mousedownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-rectangle (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-mouseover Original Leaflet documentation
     */
    @Output("mouseover") public mouseoverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-rectangle (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-mouseout Original Leaflet documentation
     */
    @Output("mouseout") public mouseoutEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-rectangle (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-contextmenu Original Leaflet documentation
     */
    @Output("contextmenu") public contextmenuEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();

    public feature: GeoJSONFeature<GeoJSONPolygon>; // This is not optional in this class

    private initialized: boolean = false;

    constructor(
        protected layerGroupProvider: LayerGroupProvider,
        layerProvider: LayerProvider,
    ) {
        super(latLngBounds([0, 0], [0, 0]));

        layerProvider.ref = this;

        this.feature = (this as any).feature || {
            geometry: {type: "Polygon", coordinates: []},
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
     * Derived method of the original setBounds.
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-setbounds Original Leaflet documentation
     */
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

    /**
     * Two-Way bound property for the bounds.
     * Use it with `<yaga-rectangle [(bounds)]="someValue">` or `<yaga-rectangle [bounds]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-setbounds Original Leaflet documentation
     */
    @Input() public set bounds(val: LatLngBounds) {
        this.setBounds(val);
    }
    public get bounds(): LatLngBounds {
        return this.getBounds();
    }
    /**
     * Two-Way bound property for the north of the bounds.
     * Use it with `<yaga-rectangle [(north)]="someValue">` or `<yaga-rectangle [north]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-setbounds Original Leaflet documentation
     */
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
    /**
     * Two-Way bound property for the east of the bounds.
     * Use it with `<yaga-rectangle [(east)]="someValue">` or `<yaga-rectangle [east]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-setbounds Original Leaflet documentation
     */
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
    /**
     * Two-Way bound property for the south of the bounds.
     * Use it with `<yaga-rectangle [(south)]="someValue">` or `<yaga-rectangle [south]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-setbounds Original Leaflet documentation
     */
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
    /**
     * Two-Way bound property for the west of the bounds.
     * Use it with `<yaga-rectangle [(west)]="someValue">` or `<yaga-rectangle [west]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-setbounds Original Leaflet documentation
     */
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

    /**
     * Derived method fof the original LatLngs.
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-addlatlngs Original Leaflet documentation
     */
    public setLatLngs(val: (
        Array<(LatLng | LatLngTuple | LatLngExpression)> |
        Array<Array<(LatLng | LatLngTuple | LatLngExpression)>> |
        Array<Array<Array<(LatLng | LatLngTuple | LatLngExpression)>>>)): this {

        super.setLatLngs((val as any));
        this.latLngsChange.emit((this as any)._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    }

    /**
     * Derived method of the original addLatLng.
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-addlatlngs Original Leaflet documentation
     */
    public addLatLng(
        val: (LatLng | LatLngTuple | LatLngExpression) |Array<(LatLng | LatLngTuple | LatLngExpression)>,
    ): this {
        super.addLatLng((val as any));
        this.latLngsChange.emit((this as any)._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    }
    /**
     * Two-Way bound property for the array of LatLngs for the geometry.
     * Use it with `<yaga-rectangle [(latLngs)]="someValue">` or `<yaga-rectangle [latLngs]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-setbounds Original Leaflet documentation
     */
    @Input() public set latLngs(val: LatLng[] | LatLng[][] | LatLng[][][]) {
        this.setLatLngs(val);
    }
    public get latLngs(): LatLng[] | LatLng[][] | LatLng[][][] {
        return (this as any)._latlngs;
    }

    /**
     * Two-Way bound property for the corresponding GeoJSON.
     * Use it with `<yaga-rectangle [(geoJSON)]="someValue">` or `<yaga-rectangle [geoJSON]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-togeojson Original Leaflet documentation
     */
    @Input() public set geoJSON(val: GeoJSONFeature<GeoJSON.Polygon | GeoJSON.MultiPolygon, T>) {
        this.feature.properties = val.properties;

        const geomType: any = val.geometry.type; // Normally "(Multi)Polygon"

        /* istanbul ignore if */
        if (geomType !== "Polygon" && geomType !== "MultiPolygon") {
            throw new Error("Unsupported geometry type: " + geomType );
        }
        this.setLatLngs(lng2lat(val.geometry.coordinates) as any);
    }
    public get geoJSON(): GeoJSONFeature<GeoJSON.Polygon | GeoJSON.MultiPolygon, T> {
        return (this.toGeoJSON() as GeoJSONFeature<GeoJSON.Polygon | GeoJSON.MultiPolygon, T>);
    }

    /**
     * Derived method of the original setStyle.
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-setstyle Original Leaflet documentation
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
     * Use it with `<yaga-rectangle [(opacity)]="someValue">` or `<yaga-rectangle [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-opacity Original Leaflet documentation
     */
    @Input() public set opacity(val: number | undefined) {
        this.setStyle({opacity: val});
    }
    public get opacity(): number | undefined {
        return this.options.opacity;
    }
    /**
     * Two-Way bound property for the stroke.
     * Use it with `<yaga-rectangle [(stroke)]="someValue">` or `<yaga-rectangle [stroke]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-stroke Original Leaflet documentation
     */
    @Input() public set stroke(val: boolean) {
        this.setStyle({stroke: val});
    }
    public get stroke(): boolean {
        return !!this.options.stroke;
    }
    /**
     * Two-Way bound property for the color.
     * Use it with `<yaga-rectangle [(color)]="someValue">` or `<yaga-rectangle [color]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-color Original Leaflet documentation
     */
    @Input() public set color(val: string | undefined) {
        this.setStyle({color: val});
    }
    public get color(): string | undefined {
        return this.options.color;
    }
    /**
     * Two-Way bound property for the weight.
     * Use it with `<yaga-rectangle [(weight)]="someValue">` or `<yaga-rectangle [weight]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-weight Original Leaflet documentation
     */
    @Input() public set weight(val: number | undefined) {
        this.setStyle({weight: val});
    }
    public get weight(): number | undefined {
        return this.options.weight;
    }
    /**
     * Two-Way bound property for the lineCap.
     * Use it with `<yaga-rectangle [(lineCap)]="someValue">` or `<yaga-rectangle [lineCap]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-linecap Original Leaflet documentation
     */
    @Input() public set lineCap(val: LineCapShape | undefined) {
        this.setStyle({lineCap: val});
    }
    public get lineCap(): LineCapShape | undefined {
        return this.options.lineCap;
    }
    /**
     * Two-Way bound property for the lineJoin.
     * Use it with `<yaga-rectangle [(lineJoin)]="someValue">` or `<yaga-rectangle [lineJoin]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-linejoin Original Leaflet documentation
     */
    @Input() public set lineJoin(val: LineJoinShape | undefined) {
        this.setStyle({lineJoin: val});
    }
    public get lineJoin(): LineJoinShape | undefined {
        return this.options.lineJoin;
    }
    /**
     * Two-Way bound property for the dashArray.
     * Use it with `<yaga-rectangle [(dashArray)]="someValue">` or `<yaga-rectangle [dashArray]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-dasharray Original Leaflet documentation
     */
    @Input() public set dashArray(val: string | undefined) {
        this.setStyle({dashArray: val});
    }
    public get dashArray(): string | undefined {
        return this.options.dashArray;
    }
    /**
     * Two-Way bound property for the dashOffset.
     * Use it with `<yaga-rectangle [(dashOffset)]="someValue">` or `<yaga-rectangle [dashOffset]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-dashoffset Original Leaflet documentation
     */
    @Input() public set dashOffset(val: string | undefined) {
        this.setStyle({dashOffset: val});
    }
    public get dashOffset(): string | undefined {
        return this.options.dashOffset;
    }
    /**
     * Two-Way bound property for the fill.
     * Use it with `<yaga-rectangle [(fill)]="someValue">` or `<yaga-rectangle [fill]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-fill Original Leaflet documentation
     */
    @Input() public set fill(val: boolean) {
        this.setStyle({fill: val});
    }
    public get fill(): boolean {
        return !!this.options.fill;
    }
    /**
     * Two-Way bound property for the fillColor.
     * Use it with `<yaga-rectangle [(fillColor)]="someValue">` or `<yaga-rectangle [fillColor]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-fillcolor Original Leaflet documentation
     */
    @Input() public set fillColor(val: string | undefined) {
        this.setStyle({fillColor: val});
    }
    public get fillColor(): string | undefined {
        return this.options.fillColor;
    }
    /**
     * Two-Way bound property for the fillOpacity.
     * Use it with `<yaga-rectangle [(fillOpacity)]="someValue">` or `<yaga-rectangle [fillOpacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-fillopacity Original Leaflet documentation
     */
    @Input() public set fillOpacity(val: number | undefined) {
        this.setStyle({fillOpacity: val});
    }
    public get fillOpacity(): number | undefined {
        return this.options.fillOpacity;
    }
    /**
     * Two-Way bound property for the fillRule.
     * Use it with `<yaga-rectangle [(fillRule)]="someValue">` or `<yaga-rectangle [fillRule]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-fillrule Original Leaflet documentation
     */
    @Input() public set fillRule(val: FillRule | undefined) {
        this.setStyle({fillRule: val});
    }
    public get fillRule(): FillRule | undefined {
        return this.options.fillRule;
    }
    /**
     * Two-Way bound property for the className.
     * Use it with `<yaga-rectangle [(className)]="someValue">` or `<yaga-rectangle [className]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-classname Original Leaflet documentation
     */
    @Input() public set className(val: string | undefined) {
        this.setStyle({className: val});
    }
    public get className(): string | undefined {
        return this.options.className;
    }
    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-rectangle [(style)]="someValue">` or `<yaga-rectangle [style]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-style Original Leaflet documentation
     */
    @Input() public set style(val: PolylineOptions) {
        this.setStyle(val);
    }
    public get style(): PolylineOptions {
        return this.options;
    }

    /**
     * Two-Way bound property for the display state.
     * Use it with `<yaga-rectangle [(display)]="someValue">` or `<yaga-rectangle [display]="someValue">`
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
     * Input for the interactive state.
     * Use it with `<yaga-rectangle [interactive]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-interactive Original Leaflet documentation
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
     * Input for the smoothFactor.
     * Use it with `<yaga-rectangle [smoothFactor]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-smoothfactor Original Leaflet documentation
     */
    @Input() public set smoothFactor(val: number | undefined) {
        this.options.smoothFactor = val;
        this.redraw();
    }
    public get smoothFactor(): number | undefined {
        return this.options.smoothFactor;
    }
    /**
     * Input for the noClip state.
     * Use it with `<yaga-rectangle [noClip]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#rectangle-noclip Original Leaflet documentation
     */
    @Input() public set noClip(val: boolean) {
        this.options.noClip = val;
        this.redraw();
    }
    public get noClip(): boolean {
        return !!this.options.noClip;
    }

    /**
     * Input for the GeoJSON properties.
     * Use it with `<yaga-rectangle [properties]="someValue">`
     */
    @Input() public set properties(val: T) {
        this.feature.properties = val;
        this.geoJSONChange.emit(this.geoJSON);
    }
    public get properties(): T {
        return (this.feature.properties as T);
    }
}
