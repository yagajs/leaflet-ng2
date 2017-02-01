/// <reference path="../typings/index.d.ts" />

import { GeoJSONDirective,
    MapComponent,
    PopupDirective,
    TooltipDirective,
    LatLng } from './index';
import { expect } from 'chai';
import { point, SVG, Layer } from 'leaflet';
import { IGenericGeoJSONFeature, IGenericGeoJSONFeatureCollection } from './d.ts/generic-geojson';

describe('GeoJSON Directive', () => {
    let map: MapComponent,
        layer: GeoJSONDirective<any>;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        (<any>map)._renderer = (<any>map)._renderer || new SVG();

        layer = new GeoJSONDirective(map);
    });
    const TEST_VALUE: IGenericGeoJSONFeatureCollection<GeoJSON.GeometryObject, any> = {
        features: [
            {
                geometry: {
                    coordinates: [7, 51],
                    type: 'Point'
                },
                properties: {
                    test: 'OK'
                },
                type: 'Feature'
            }
        ],
        type: 'FeatureCollection'
    };

    describe('[(data)]', () => {

        it('should be changed in Leaflet when changing in Angular', () => {
            layer.data = TEST_VALUE;

            expect(layer.toGeoJSON()).to.deep.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.data = TEST_VALUE;
            expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it('should be changed data in Angular when changing in Leaflet', () => {
            layer.setData(TEST_VALUE);
            expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it('should be changed geoJSON in Angular when adding in latlngs Leaflet', () => {
            layer.addData(TEST_VALUE.features[0]);
            expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            layer.dataChange.subscribe((eventVal: LatLng[]) => {
                expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });

            layer.data = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            layer.dataChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.LineString, any>) => {
                expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });

            layer.setData(TEST_VALUE);
        });
        it('should fire an event when adding in Leaflet', (done: MochaDone) => {
            layer.ngAfterViewInit();
            layer.dataChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.LineString, any>) => {
                expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });
            layer.addData(TEST_VALUE.features[0]);
        });
    });


    const testHandle: any = {};
    const testEvent: any = { testHandle };

    describe('(add)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.addEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('add', testEvent);
        });
    });
    describe('(remove)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.removeEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('remove', testEvent);
        });
    });
    describe('(popupopen)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.popupopenEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('popupopen', testEvent);
        });
    });
    describe('(popupclose)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.popupcloseEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('popupclose', testEvent);
        });
    });
    describe('(tooltipopen)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.tooltipopenEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('tooltipopen', testEvent);
        });
    });
    describe('(tooltipclose)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.tooltipcloseEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('tooltipclose', testEvent);
        });
    });
    describe('(click)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.clickEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('click', testEvent);
        });
    });
    describe('(dbclick)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.dbclickEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('dbclick', testEvent);
        });
    });
    describe('(mousedown)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.mousedownEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mousedown', testEvent);
        });
    });
    describe('(mouseover)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.mouseoverEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mouseover', testEvent);
        });
    });
    describe('(mouseout)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.mouseoutEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mouseout', testEvent);
        });
    });
    describe('(contextmenu)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            layer.contextmenuEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('contextmenu', testEvent);
        });
    });

    describe('Popup in GeoJSON Directive', () => {
        let popup: PopupDirective,
            testDiv: HTMLElement,
            puLayer: GeoJSONDirective<any>;
        before(() => {
            testDiv = document.createElement('div');
            popup = new PopupDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            puLayer = Object.create(new GeoJSONDirective<any>(map), { popupDirective: {value: popup} });
        });
        it('should bind popup', () => {
            puLayer.ngAfterViewInit();
            expect((<any>puLayer)._popup).to.equal(popup);
        });
    });

    describe('Tooltip in GeoJSON Directive', () => {
        let tooltip: TooltipDirective,
            testDiv: HTMLElement,
            ttLayer: GeoJSONDirective<any>;
        before(() => {
            testDiv = document.createElement('div');
            tooltip = new TooltipDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            ttLayer = Object.create(new GeoJSONDirective<any>(map), { tooltipDirective: {value: tooltip} });
        });
        it('should bind tooltip', () => {
            ttLayer.ngAfterViewInit();
            expect(ttLayer.tooltipDirective).to.equal(tooltip);
            // expect((<any>layer)._tooltip).to.equal(tooltip);
        });
    });

    describe('Destroying a GeoJSON Directive', () => {
        it('should remove Polyline Directive from map on destroy', () => {
            /* istanbul ignore if */
            if (!map.hasLayer(layer)) {
                throw new Error('The layer is not part of the map before destroying');
            }
            layer.ngOnDestroy();
            /* istanbul ignore if */
            if (map.hasLayer(layer)) {
                throw new Error('The layer is still part of the map after destroying');
            }
        });
    });

});

