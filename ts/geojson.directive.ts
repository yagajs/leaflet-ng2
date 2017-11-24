import {
    AfterContentInit,
    ContentChild,
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Optional,
    Output,
    SkipSelf,
} from '@angular/core';
import {
    GeoJsonObject,
    GeometryObject,
    Point,
} from 'geojson';
import {
    GeoJSON,
    LatLng,
    Layer,
    LeafletEvent,
    LeafletMouseEvent,
    Marker,
    PathOptions,
    PopupEvent,
    TooltipEvent,
} from 'leaflet';
import { DEFAULT_STYLE } from './consts';
import { YagaLayerGroup } from './layer-group.provider';

import { GenericGeoJSONFeature, GenericGeoJSONFeatureCollection } from '@yaga/generic-geojson';

// Content-Child imports
import { PopupDirective } from './popup.directive';
import { TooltipDirective } from './tooltip.directive';

/**
 * Interface for the styler function of the GeoJSON directive.
 *
 * You can return an individual style (PathOption) for each feature. As basis you get the feature itself and the default
 * style.
 *
 * *Note: This functions is enhanced against the original style function with a default style*
 * @link http://leafletjs.com/reference-1.2.0.html#geojson-style Original Leaflet documentation
 */
export type IGeoJSONStylerFn<T> = (
    geoJSON: GenericGeoJSONFeature<GeometryObject, T>,
    defaultStyle: PathOptions,
) => PathOptions;
/**
 * Interface for the filter function of the GeoJSON directive.
 *
 * You can return a boolean value on each feature according if you want to add the feature or not.
 * @link http://leafletjs.com/reference-1.2.0.html#geojson-filter Original Leaflet documentation
 */
export type IGeoJSONFilterFn<T> = (feature: GenericGeoJSONFeature<GeometryObject, T>) => boolean;
/**
 * Interface for the point to layer function of the GeoJSON directive.
 *
 * You can return any type of Layer that should represent the feature of type point.
 * @link http://leafletjs.com/reference-1.2.0.html#geojson-pointtolayer Original Leaflet documentation
 */
export type IGeoJSONPointToLayerFn<T> = (geoJSON: GenericGeoJSONFeature<Point, T>, latLng: LatLng) => Layer;

/**
 * Interface for the protected middleware property of the GeoJSON directive.
 */
export interface IGeoJSONDirectiveMiddlewareDictionary<T> {
    styler?: IGeoJSONStylerFn<T>;
    filter?: IGeoJSONFilterFn<T>;
    pointToLayer?: IGeoJSONPointToLayerFn<T>;
    defaultStyle?: PathOptions;
}

@Directive({
    providers: [ YagaLayerGroup ],
    selector: 'yaga-geojson',
})
export class GeoJSONDirective<T> extends GeoJSON implements OnDestroy, AfterContentInit {
    /* tslint:disable:max-line-length */
    @Output() public dataChange: EventEmitter<GenericGeoJSONFeatureCollection<GeometryObject, T>> = new EventEmitter();
    /* tslint:enable */

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-geojson (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-add Original Leaflet documentation
     */
    @Output('add') public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-geojson (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-remove Original Leaflet documentation
     */
    @Output('remove') public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-geojson (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-popupopen Original Leaflet documentation
     */
    @Output('popupopen') public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-geojson (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-popupclose Original Leaflet documentation
     */
    @Output('popupclose') public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-geojson (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-tooltipopen Original Leaflet documentation
     */
    @Output('tooltipopen') public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-geojson (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-tooltipclose Original Leaflet documentation
     */
    @Output('tooltipclose') public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-geojson (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-click Original Leaflet documentation
     */
    @Output('click') public clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired dbclick event.
     * Use it with `<yaga-geojson (dbclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-dbclick Original Leaflet documentation
     */
    @Output('dbclick') public dbclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-geojson (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-mousedown Original Leaflet documentation
     */
    @Output('mousedown') public mousedownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-geojson (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-mouseover Original Leaflet documentation
     */
    @Output('mouseover') public mouseoverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-geojson (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-mouseout Original Leaflet documentation
     */
    @Output('mouseout') public mouseoutEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-geojson (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-contextmenu Original Leaflet documentation
     */
    @Output('contextmenu') public contextmenuEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();

    /* tslint:disable:max-line-length */
    @Output('onEachFeature') public onEachFeatureEvent: EventEmitter<{feature: GenericGeoJSONFeature<GeometryObject, T>, layer: Layer}> = new EventEmitter();
    /* tslint:enable */

    /**
     * Imports a child popup directive if there is one defined
     */
    @Optional() @ContentChild(PopupDirective) public popupDirective: PopupDirective;
    /**
     * Imports a child tooltip directive if there is one defined
     */
    @Optional() @ContentChild(TooltipDirective) public tooltipDirective: TooltipDirective;

    /**
     * Property to prevent changes before directive is initialized
     */
    protected initialized: boolean = false;
    /**
     * Object that stores the middleware functions and the default style
     */
    protected middleware: IGeoJSONDirectiveMiddlewareDictionary<T> = {
        defaultStyle: DEFAULT_STYLE,
    };

    constructor(
        @SkipSelf() parentLayerGroup: YagaLayerGroup,
        layerGroup: YagaLayerGroup,
    ) {
        super(({features: [], type: 'FeatureCollection'} as GeoJsonObject), {
            filter: (feature: GenericGeoJSONFeature<GeometryObject, T>) => {
                if (this.middleware.filter) {
                    return this.middleware.filter(feature);
                }
                return true;
            },
            onEachFeature: (feature: GenericGeoJSONFeature<GeometryObject, T>, layer: Layer) => {
                this.onEachFeatureEvent.emit({feature, layer});
            },
            pointToLayer: (geoJSON: GenericGeoJSONFeature<Point, T>, latLng: LatLng): Layer => {
                if (this.middleware.pointToLayer) {
                    return this.middleware.pointToLayer(geoJSON, latLng);
                }
                return new Marker(latLng);
            },
            style: (geoJSON: GenericGeoJSONFeature<GeometryObject, T>): PathOptions => {
                const defaultStyle = this.middleware.defaultStyle;
                if (this.middleware.styler) {
                    return this.middleware.styler(geoJSON, defaultStyle);
                }
                return defaultStyle;
            },
        });

        layerGroup.handle = this;
        parentLayerGroup.handle.addLayer(this);

        // Events
        this.on('add', (event: LeafletEvent) => {
            this.addEvent.emit(event);
        });
        this.on('remove', (event: LeafletEvent) => {
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

    /**
     * Internal method that provides the initialization of the child popup or tooltip
     */
    public ngAfterContentInit(): void {
        this.initialized = true;
        if (this.popupDirective) {
            this.bindPopup(this.popupDirective);
        }
        if (this.tooltipDirective) {
            this.bindTooltip(this.tooltipDirective);
        }
    }

    /**
     * Internal method to provide the removal of the layer in Leaflet, when removing it from the Angular template
     */
    public ngOnDestroy(): void {
        this.removeFrom((this as any)._map);
    }

    /**
     * Derived method of the original addData.
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-adddata Original Leaflet documentation
     */
    public addData(data: GenericGeoJSONFeature<GeometryObject, T>): Layer {
        const returnValue: Layer = super.addData(data);

        if (!this.initialized) {
            return returnValue;
        }

        this.dataChange.emit((this.toGeoJSON() as GenericGeoJSONFeatureCollection<GeometryObject, T>));
        return returnValue;
    }

    /**
     * Method to remove all existing data and add the new data in one step.
     *
     * *Note: this is a combination of `clearLayers` and `addData`*
     */
    public setData(val: GenericGeoJSONFeatureCollection<GeometryObject, T>): this {
        super.clearLayers();
        super.addData(val);
        this.dataChange.emit((this.toGeoJSON() as GenericGeoJSONFeatureCollection<GeometryObject, T>));
        return this;
    }

    /**
     * Two-Way bound property for the data geoJSON data.
     * Use it with `<yaga-geojson [(data)]="someValue">` or `<yaga-geojson [data]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-l-geojson Original Leaflet documentation
     */
    @Input() public set data(val: GenericGeoJSONFeatureCollection<GeometryObject, T>) {
        this.setData(val);
    }
    public get data(): GenericGeoJSONFeatureCollection<GeometryObject, T> {
        return (this.toGeoJSON() as GenericGeoJSONFeatureCollection<GeometryObject, T>);
    }

    /**
     * Input for the filter function.
     * Use it with `<yaga-geojson [filter]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-filter Original Leaflet documentation
     */
    @Input() public set filter(filterFn: IGeoJSONFilterFn<T>) {
        this.middleware.filter = filterFn;
    }
    public get filter(): IGeoJSONFilterFn<T> {
        return this.middleware.filter;
    }

    /**
     * Input for the pointToLayer function.
     * Use it with `<yaga-geojson [pointToLayer]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-pointtolayer Original Leaflet documentation
     */
    @Input() public set pointToLayer(pointToLayerFn: IGeoJSONPointToLayerFn<T>) {
        this.middleware.pointToLayer = pointToLayerFn;
    }
    public get pointToLayer(): IGeoJSONPointToLayerFn<T> {
        return this.middleware.pointToLayer;
    }

    /**
     * Input for the styler function.
     * Use it with `<yaga-geojson [styler]="someValue">`
     *
     * *Note: The function can follow the `IGeoJSONStylerFn` interface. It enhances the leaflet ones with the default
     * style as second parameter*
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-style Original Leaflet documentation
     */
    @Input() public set styler(stylerFn: IGeoJSONStylerFn<T>) {
        this.middleware.styler = stylerFn;
    }
    public get styler(): IGeoJSONStylerFn<T> {
        return this.middleware.styler;
    }

    /**
     * Input for the default style.
     * Use it with `<yaga-geojson [defaultStyle]="someValue">`
     *
     * *Note: Leaflet does not provide a default style, it just provides a style function!*
     */
    @Input() public set defaultStyle(style: PathOptions) {
        this.middleware.defaultStyle = style;
    }
    public get defaultStyle(): PathOptions {
        return this.middleware.defaultStyle;
    }
}
