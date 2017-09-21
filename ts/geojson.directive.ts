import {
    AfterViewInit,
    ContentChild,
    Directive,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
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
import { MapComponent } from './map.component';

import { GenericGeoJSONFeature, GenericGeoJSONFeatureCollection } from '@yaga/generic-geojson';

// Content-Child imports
import { PopupDirective } from './popup.directive';
import { TooltipDirective } from './tooltip.directive';

export type IGeoJSONStylerFn<T> = (
    geoJSON: GenericGeoJSONFeature<GeometryObject, T>,
    defaultStyle: PathOptions,
) => PathOptions;
export type IGeoJSONFilterFn<T> = (feature: GenericGeoJSONFeature<GeometryObject, T>) => boolean;
export type IGeoJSONPointToLayerFn<T> = (geoJSON: GenericGeoJSONFeature<Point, T>, latLng: LatLng) => Layer;

export interface IGeoJSONDirectiveMiddlewareDictionary<T> {
    styler?: IGeoJSONStylerFn<T>;
    filter?: IGeoJSONFilterFn<T>;
    pointToLayer?: IGeoJSONPointToLayerFn<T>;
    defaultStyle?: PathOptions;
}

@Directive({
    selector: 'yaga-geojson',
})
export class GeoJSONDirective<T> extends GeoJSON implements OnDestroy, AfterViewInit {
    /* tslint:disable:max-line-length */
    @Output() public dataChange: EventEmitter<GenericGeoJSONFeatureCollection<GeometryObject, T>> = new EventEmitter();
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

    /* tslint:disable:max-line-length */
    @Output('onEachFeature') public onEachFeatureEvent: EventEmitter<{feature: GenericGeoJSONFeature<GeometryObject, T>, layer: Layer}> = new EventEmitter();
    /* tslint:enable */

    @Optional() @ContentChild(PopupDirective) public popupDirective: PopupDirective;
    @Optional() @ContentChild(TooltipDirective) public tooltipDirective: TooltipDirective;

    protected mapComponent: MapComponent;
    protected initialized: boolean = false;
    protected middleware: IGeoJSONDirectiveMiddlewareDictionary<T> = {};

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent,
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
                const defaultStyle = this.middleware.defaultStyle || DEFAULT_STYLE;
                if (this.middleware.styler) {
                    return this.middleware.styler(geoJSON, defaultStyle);
                }
                return defaultStyle;
            },
        });

        this.middleware.defaultStyle = DEFAULT_STYLE;

        this.mapComponent = mapComponent;
        mapComponent.addLayer(this);

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

    public ngAfterViewInit(): void {
        this.initialized = true;
        if (this.popupDirective) {
            this.bindPopup(this.popupDirective);
        }
        if (this.tooltipDirective) {
            this.bindTooltip(this.tooltipDirective);
        }
    }

    public ngOnDestroy(): void {
        this.removeFrom((this as any)._map);
    }

    public addData(data: GenericGeoJSONFeature<GeometryObject, T>): Layer {
        const returnValue: Layer = super.addData(data);

        if (!this.initialized) {
            return returnValue;
        }

        this.dataChange.emit((this.toGeoJSON() as GenericGeoJSONFeatureCollection<GeometryObject, T>));
        return returnValue;
    }

    public setData(val: GenericGeoJSONFeatureCollection<GeometryObject, T>): this {
        super.clearLayers();
        super.addData(val);
        this.dataChange.emit((this.toGeoJSON() as GenericGeoJSONFeatureCollection<GeometryObject, T>));
        return this;
    }

    @Input() public set data(val: GenericGeoJSONFeatureCollection<GeometryObject, T>) {
        this.setData(val);
    }
    public get data(): GenericGeoJSONFeatureCollection<GeometryObject, T> {
        return (this.toGeoJSON() as GenericGeoJSONFeatureCollection<GeometryObject, T>);
    }

    @Input public set filter(filterFn: IGeoJSONFilterFn<T>) {
        this.middleware.filter = filterFn;
    }
    public get filter(): IGeoJSONFilterFn<T> {
        return this.middleware.filter;
    }

    @Input public set pointToLayer(pointToLayerFn: IGeoJSONPointToLayerFn<T>) {
        this.middleware.pointToLayer = pointToLayerFn;
    }
    public get pointToLayer(): IGeoJSONPointToLayerFn<T> {
        return this.middleware.pointToLayer;
    }

    @Input public set styler(stylerFn: IGeoJSONStylerFn<T>) {
        this.middleware.styler = stylerFn;
    }
    public get styler(): IGeoJSONStylerFn<T> {
        return this.middleware.styler;
    }

    @Input public set defaultStyle(style: PathOptions) {
        this.middleware.defaultStyle = style;
    }
    public get defaultStyle(): PathOptions {
        return this.middleware.defaultStyle;
    }
}
