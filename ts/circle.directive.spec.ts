import { GenericGeoJSONFeature } from '@yaga/generic-geojson';
import { expect } from 'chai';
import { latLng, point, SVG } from 'leaflet';
import {
    CircleDirective,
    LatLng,
    LatLngExpression,
    MapComponent,
    PopupDirective,
    TooltipDirective,
} from './index';
import { createPathTests } from './path-directives.spec';

describe('Circle Directive', () => {
    let map: MapComponent;
    let layer: CircleDirective<any>;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        (map as any)._renderer = (map as any)._renderer || new SVG();

        layer = new CircleDirective<any>(map);
        layer.ngAfterContentInit();
    });

    createPathTests(CircleDirective);

    describe('[(position)]', () => {
        const TEST_VALUE: LatLng = latLng(0, 1);

        it('should be changed in Leaflet when changing in Angular', () => {
            layer.position = TEST_VALUE;
            expect((layer as any)._latlng).to.equal(TEST_VALUE);
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
                return done();
            });

            layer.position = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.equal(TEST_VALUE);
                return done();
            });

            layer.setLatLng(TEST_VALUE);
        });
        it('should fire geoJSON-change event when changing in Angular', (done: MochaDone) => {
            layer.geoJSONChange.subscribe(() => {
                return done();
            });
            layer.position = TEST_VALUE;
        });
        it('should fire geoJSON-change event when changing in Leaflet', (done: MochaDone) => {
            layer.geoJSONChange.subscribe(() => {
                return done();
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
                return done();
            });

            layer.lat = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
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
                return done();
            });

            layer.lng = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setLatLng([0, val]);
        });
    });
    describe('[(radius)]', () => {
        const TEST_VALUE: LatLng = latLng(0, 1);
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
                return done();
            });

            layer.radius = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.radiusChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setRadius(val);
        });
    });

    describe('[(geoJSON)]', () => {
        const TEST_VALUE: GenericGeoJSONFeature<GeoJSON.Point, any> = {
            geometry: {
                coordinates: [1, 3],
                type: 'Point',
            },
            properties: {},
            type: 'Feature',
        };
        const TEST_POINT: LatLngExpression = [3, 4];
        it('should be changed in Leaflet when changing in Angular', () => {
            layer.geoJSON = TEST_VALUE;
            expect((layer.position as LatLng).lng).to.equal(TEST_VALUE.geometry.coordinates[0]);
            expect((layer.position as LatLng).lat).to.equal(TEST_VALUE.geometry.coordinates[1]);
        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.geoJSON = TEST_VALUE;
            expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
        });
        it('should be changed geoJSON in Angular when changing in latlngs Leaflet', () => {
            layer.setLatLng(TEST_POINT);
            expect(layer.geoJSON.geometry.coordinates[0]).to.equal(TEST_POINT[1]);
            expect(layer.geoJSON.geometry.coordinates[1]).to.equal(TEST_POINT[0]);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            layer.geoJSONChange.subscribe((eventVal: GenericGeoJSONFeature<GeoJSON.Point, any>) => {
                expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });

            layer.geoJSON = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            layer.geoJSONChange.subscribe((eventVal: GenericGeoJSONFeature<GeoJSON.Point, any>) => {
                expect(eventVal.geometry.coordinates[0]).to.equal(TEST_POINT[1]);
                expect(eventVal.geometry.coordinates[1]).to.equal(TEST_POINT[0]);
                return done();
            });

            layer.setLatLng(TEST_POINT);
        });
    });

    describe('[properties]', () => {
        interface ITestProperties {
            test: string;
        }
        const TEST_OBJECT: ITestProperties = {
            test: 'OK',
        };
        it('should be changed in Leaflet when changing in Angular', () => {
            layer.properties = TEST_OBJECT;
            expect(layer.feature.properties).to.equal(TEST_OBJECT);
        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.properties = TEST_OBJECT;
            expect(layer.properties).to.equal(TEST_OBJECT);
        });
        it('should emit an event for GeoJSONChange when changing in Angular', (done: MochaDone) => {
            /* tslint:disable:max-line-length */
            layer.geoJSONChange.subscribe((eventVal: GenericGeoJSONFeature<GeoJSON.GeometryObject, ITestProperties>) => {
                expect(eventVal.properties).to.equal(TEST_OBJECT);
                return done();
            });
            /* tslint:enable */
            layer.properties = TEST_OBJECT;
        });
    });

    describe('Popup in Circle Directive', () => {
        let layerWithPopup: CircleDirective<any>;
        let popup: PopupDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            popup = new PopupDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithPopup = Object.create(new CircleDirective<any>(map), { popupDirective: {value: popup} });
            layerWithPopup.ngAfterContentInit();
        });
        it('should bind popup', () => {
            expect((layerWithPopup as any)._popup).to.equal(popup);
        });
    });

    describe('Tooltip in Circle Directive', () => {
        let layerWithTooltip: CircleDirective<any>;
        let tooltip: TooltipDirective;
        let testDiv: HTMLElement;
        before(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (map as any)._size = point(100, 100);
            (map as any)._pixelOrigin = point(50, 50);
            (map as any)._renderer = (map as any)._renderer || new SVG();
            testDiv = document.createElement('div');
            tooltip = new TooltipDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithTooltip = Object.create(new CircleDirective<any>(map), { tooltipDirective: {value: tooltip} });
            layerWithTooltip.ngAfterContentInit();
        });
        it('should bind tooltip', () => {
            expect((layerWithTooltip as any)._tooltip).to.equal(tooltip);
        });
    });

    describe('Destroying a Circle Directive', () => {
        it('should remove Circle Directive from map on destroy', () => {
            expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
