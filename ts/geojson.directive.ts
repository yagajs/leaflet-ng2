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
import { GeoJSON,
    Event,
    PopupEvent,
    TooltipEvent,
    PathOptions,
    LatLng,
    Layer } from 'leaflet';
import { MarkerDirective } from './marker.directive';
import { MapComponent } from './map.component';

import { GenericGeoJSONFeatureCollection, GenericGeoJSONFeature } from '@yaga/generic-geojson';

// Content-Child imports
import { PopupDirective } from './popup.directive';
import { TooltipDirective } from './tooltip.directive';

@Directive({
    selector: 'yaga-geojson'
})
export class GeoJSONDirective<T> extends GeoJSON implements OnDestroy, AfterViewInit {
    /* tslint:disable:max-line-length */
    @Output() public dataChange: EventEmitter<GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>> = new EventEmitter();
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

    /* tslint:disable:max-line-length */
    @Output('onEachFeature') public onEachFeatureEvent: EventEmitter<{feature: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>, layer: Layer}> = new EventEmitter();
    /* tslint:enable */

    public defaultStyle: PathOptions = {};

    @Optional() @ContentChild(PopupDirective) public popupDirective: PopupDirective;
    @Optional() @ContentChild(TooltipDirective) public tooltipDirective: TooltipDirective;

    protected mapComponent: MapComponent;
    protected initialized: boolean = false;

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent
    ) {
        super((<GeoJSON.GeoJsonObject>{features: [], type: 'FeatureCollection'}), {
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
            }
        });


        this.mapComponent = mapComponent;
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

    pointToLayer(geoJSON: GenericGeoJSONFeature<GeoJSON.Point, T>, latLng: LatLng): Layer {
        const marker: MarkerDirective = new MarkerDirective(this.mapComponent);
        marker.setLatLng(latLng);
        return marker;
    }

    styler(geoJSON: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>, defaultStyle: PathOptions): PathOptions {
        return defaultStyle;
    }

    filterFeatures(geoJSON: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>): boolean {
        return true;
    }

    addData(data: GenericGeoJSONFeature<GeoJSON.GeometryObject, T>): Layer {
        const returnValue: Layer = super.addData(data);

        if (!this.initialized) {
            return returnValue;
        }

        this.dataChange.emit((<GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>>this.toGeoJSON()));
        return returnValue;
    }

    setData(val: GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>): this {
        super.clearLayers();
        super.addData(val);
        this.dataChange.emit((<GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>>this.toGeoJSON()));
        return this;
    }

    @Input() set data(val: GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>) {
        this.setData(val);
    }
    get data(): GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T> {
        return (<GenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, T>>this.toGeoJSON());
    }
}

