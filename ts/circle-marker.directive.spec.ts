/// <reference path="../typings/index.d.ts" />

import { CircleMarkerDirective,
    MapComponent,
    PopupDirective,
    TooltipDirective,
    LatLngExpression,
    LatLng } from './index';
import { point, SVG, latLng } from 'leaflet';
import { createPathTests } from './path-directives.spec';
import { IGenericGeoJSONFeature } from './d.ts/generic-geojson';
import { expect } from 'chai';

describe('Circle Directive', () => {
    var map: MapComponent,
        layer: CircleMarkerDirective<any>;
    const TEST_VALUE: LatLng = latLng(0, 1);
    const TEST_POINT: LatLngExpression = [3, 4];
    const TEST_GEOJSON: IGenericGeoJSONFeature<GeoJSON.Point, any> = {
        geometry: {
            coordinates: [1, 3],
            type: 'Point'
        },
        properties: {},
        type: 'Feature'
    };
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        (<any>map)._renderer = (<any>map)._renderer || new SVG();

        layer = new CircleMarkerDirective<any>(map);
        layer.ngAfterViewInit();
    });

    createPathTests(CircleMarkerDirective);

    describe('[(position)]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            layer.position = TEST_VALUE;
            expect((<any>layer)._latlng).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.position = TEST_VALUE;
            expect(layer.position).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            layer.setLatLng(TEST_VALUE);
            expect(layer.position).to.equal(TEST_VALUE);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.equal(TEST_VALUE);
                done();
            });

            layer.position = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.equal(TEST_VALUE);
                done();
            });

            layer.setLatLng(TEST_VALUE);
        });
        it('should fire geoJSON-change event when changing in Angular', (done: MochaDone) => {
            layer.geoJSONChange.subscribe(() => {
                done();
            });
            layer.position = TEST_VALUE;
        });
        it('should fire geoJSON-change event when changing in Leaflet', (done: MochaDone) => {
            layer.geoJSONChange.subscribe(() => {
                done();
            });
            layer.setLatLng(TEST_VALUE);
        });
    });

    describe('[(lat)]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lat = val;
            expect(layer.getLatLng().lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lat = val;
            expect(layer.lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            layer.setLatLng([val, 0]);
            expect(layer.lat).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.lat = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });


            layer.setLatLng([val, 0]);
        });
    });
    describe('[(lng)]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lng = val;
            expect(layer.getLatLng().lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lng = val;
            expect(layer.lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            layer.setLatLng([0, val]);
            expect(layer.lng).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.lng = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.setLatLng([0, val]);
        });
    });
    describe('[(radius)]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.radius = val;
            expect(layer.getRadius()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.radius = val;
            expect(layer.radius).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            layer.setRadius(val);
            expect(layer.radius).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.radiusChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.radius = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.radiusChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.setRadius(val);
        });
    });

    describe('[(geoJSON)]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            layer.geoJSON = TEST_GEOJSON;
            expect(
                (<LatLng>layer.position).lng
            ).to.equal(TEST_GEOJSON.geometry.coordinates[0]);
            expect(
                (<LatLng>layer.position).lat
            ).to.equal(TEST_GEOJSON.geometry.coordinates[1]);
        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.geoJSON = TEST_GEOJSON;
            expect(
                layer.geoJSON.geometry.coordinates[0]
            ).to.equal(TEST_GEOJSON.geometry.coordinates[0]);
            expect(
                layer.geoJSON.geometry.coordinates[1]
            ).to.equal(TEST_GEOJSON.geometry.coordinates[1]);
        });
        it('should be changed geoJSON in Angular when changing in latlngs Leaflet', () => {
            layer.setLatLng(TEST_POINT);
            expect(
                layer.geoJSON.geometry.coordinates[0]
            ).to.equal(TEST_POINT[1]);
            expect(
                layer.geoJSON.geometry.coordinates[1]
            ).to.equal(TEST_POINT[0]);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            layer.geoJSONChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.Point, any>) => {
                expect(
                    eventVal.geometry.coordinates[0]
                ).to.equal(TEST_GEOJSON.geometry.coordinates[0]);
                expect(
                    eventVal.geometry.coordinates[1]
                ).to.equal(TEST_GEOJSON.geometry.coordinates[1]);
                done();
            });

            layer.geoJSON = TEST_GEOJSON;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            layer.geoJSONChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.Point, any>) => {
                const values: [number, number] = (<any>eventVal.geometry.coordinates);

                expect(values[0]).to.equal(TEST_POINT[1]);
                expect(values[1]).to.equal(TEST_POINT[0]);
                done();
            });

            layer.setLatLng(TEST_POINT);
        });
    });

    describe('[properties]', () => {
        interface ITestProperties {
            test: string;
        }
        var layerWithProps: CircleMarkerDirective<ITestProperties>;
        const TEST_OBJECT: ITestProperties = {
            test: 'OK'
        };
        beforeEach(() => {
            layerWithProps = new CircleMarkerDirective<any>(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            layerWithProps.properties = TEST_OBJECT;
            expect(layerWithProps.feature.properties).to.equal(TEST_OBJECT);
        });
        it('should be changed in Angular when changing in Angular', () => {
            layerWithProps.properties = TEST_OBJECT;
            expect(layerWithProps.properties).to.equal(TEST_OBJECT);
        });
        it('should emit an event for GeoJSONChange when changing in Angular', (done: MochaDone) => {
            layerWithProps.geoJSONChange.subscribe((val: IGenericGeoJSONFeature<GeoJSON.GeometryObject, ITestProperties>) => {
                expect(val.properties).to.equal(TEST_OBJECT);
                done();
            });
            layerWithProps.properties = TEST_OBJECT;
        });
    });

    describe('Popup in Circle Directive', () => {
        var popup: PopupDirective;
        var testDiv: HTMLElement;

        beforeEach(() => {
            testDiv = document.createElement('div');
            popup = new PopupDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layer = Object.create(new CircleMarkerDirective<any>(map), { popupDirective: {value: popup} });
        });
        it('should bind popup', () => {
            layer.ngAfterViewInit();
            expect((<any>layer)._popup).to.be.ok;
            expect((<any>layer)._popup).to.equal(popup);
        });
    });

    describe('Tooltip in Circle Directive', () => {
        var tooltip: TooltipDirective;
        var testDiv: HTMLElement;
        beforeEach(() => {
            testDiv = document.createElement('div');
            tooltip = new TooltipDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layer = Object.create(new CircleMarkerDirective<any>(map), { tooltipDirective: {value: tooltip} });
        });
        it('should bind tooltip', () => {
            layer.ngAfterViewInit();
            expect((<any>layer)._tooltip).to.be.ok;
            expect((<any>layer)._tooltip).to.equal(tooltip);
        });
    });

    describe('Destroying a Circle Directive', () => {
        var tooltip: TooltipDirective;
        var testDiv: HTMLElement;

        before(() => {
            // Hack to get write-access to readonly property
            layer = new CircleMarkerDirective<any>(map);
        });
        it('should remove Circle Directive from map on destroy', () => {
            expect(map.hasLayer(layer)).to.be.ok;

            layer.ngOnDestroy();

            expect(map.hasLayer(layer)).to.not.be.ok;
        });
    });

});
