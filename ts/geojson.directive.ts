import {
    AfterContentInit,
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
    GeoJSON,
    LatLng,
    Layer,
    LeafletEvent,
    LeafletMouseEvent,
    PathOptions,
    PopupEvent,
    TooltipEvent,
} from 'leaflet';
import { MapComponent } from './map.component';
import { MarkerDirective } from './marker.directive';

import { GenericGeoJSONFeature, GenericGeoJSONFeatureCollection } from '@yaga/generic-geojson';

// Content-Child imports
import { PopupDirective } from './popup.directive';
import { TooltipDirective } from './tooltip.directive';

@Directive({
    selector: 'yaga-geojson',
})
export class GeoJSONDirective<T> extends GeoJSON implements OnDestroy, AfterContentInit {
    /* tslint:disable:max-line-length */
    @Output() public dataChange: EventEmitter<GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>> = new EventEmitter();
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
    @Output('onEachFeature') public onEachFeatureEvent: EventEmitter<{feature: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>, layer: Layer}> = new EventEmitter();
    /* tslint:enable */

    public defaultStyle: PathOptions = {};

    @Optional() @ContentChild(PopupDirective) public popupDirective: PopupDirective;
    @Optional() @ContentChild(TooltipDirective) public tooltipDirective: TooltipDirective;

    protected mapComponent: MapComponent;
    protected initialized: boolean = false;

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent,
    ) {
        super(({features: [], type: 'FeatureCollection'} as GeoJSON.GeoJsonObject), {
            filter: (feature: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>) => {
                return this.filterFeatures(feature);
            },
            onEachFeature: (feature: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>, layer: Layer) => {
                this.onEachFeatureEvent.emit({feature, layer});
            },
            pointToLayer: (geoJSON: GenericGeoJSONFeature<GeoJSON.Point, T>, latLng: LatLng): Layer => {
                return this.pointToLayer(geoJSON, latLng);
            },
            style: (geoJSON: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>): PathOptions => {
                return this.styler(geoJSON, this.defaultStyle);
            },
        });

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

    public ngAfterContentInit(): void {
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

    public pointToLayer(geoJSON: GenericGeoJSONFeature<GeoJSON.Point, T>, latLng: LatLng): Layer {
        const marker: MarkerDirective = new MarkerDirective(this.mapComponent);
        marker.setLatLng(latLng);
        return marker;
    }

    public styler(geoJSON: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>, defaultStyle: PathOptions): PathOptions {
        return defaultStyle;
    }

    public filterFeatures(geoJSON: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>): boolean {
        return true;
    }

    public addData(data: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>): Layer {
        const returnValue: Layer = super.addData(data);

        if (!this.initialized) {
            return returnValue;
        }

        this.dataChange.emit((this.toGeoJSON() as GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>));
        return returnValue;
    }

    public setData(val: GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>): this {
        super.clearLayers();
        super.addData(val);
        this.dataChange.emit((this.toGeoJSON() as GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>));
        return this;
    }

    @Input() public set data(val: GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>) {
        this.setData(val);
    }
    public get data(): GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T> {
        return (this.toGeoJSON() as GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>);
    }
}
