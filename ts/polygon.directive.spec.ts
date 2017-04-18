import { GenericGeoJSONFeature } from '@yaga/generic-geojson';
import { expect } from 'chai';
import { latLng, point, SVG } from 'leaflet';
import {
    LatLng,
    LatLngExpression,
    lng2lat,
    MapComponent,
    PolygonDirective,
    PopupDirective,
    TooltipDirective,
} from './index';
import { createPathTests } from './path-directives.spec';

describe('Polygon Directive', () => {
    createPathTests(PolygonDirective);

    let map: MapComponent;
    let layer: PolygonDirective<any>;

    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any> map)._size = point(100, 100);
        (<any> map)._pixelOrigin = point(50, 50);
        (<any> map)._renderer = (<any> map)._renderer || new SVG();

        layer = new PolygonDirective<any> (map);
    });

    describe('[(latlngs)]', () => {
        describe('for Polygons', () => {
            const TEST_VALUE: LatLng[][] = [[latLng(0, 1), latLng(1, 1), latLng(1, 0)]];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.latLngs = TEST_VALUE;
                expect((<any> layer)._latlngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.latLngs = TEST_VALUE;
                expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setLatLngs(TEST_VALUE);
                expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when adding in Leaflet', () => {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                expect((<LatLng[][]> layer.latLngs)[0][3].lat).to.equal(3);
                expect((<LatLng[][]> layer.latLngs)[0][3].lng).to.equal(3);
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.latLngs = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire geoJSON-change event when changing in Angular', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire geoJSON-change event when changing in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire an change event when adding in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe('for MultiPolygons', () => {
            const TEST_VALUE: LatLng[][][] = [
                [[latLng(1, 0), latLng(1, 1), latLng(0, 1)]],
                [[latLng(0, 1), latLng(1, 1), latLng(1, 0)]],
            ];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.latLngs = TEST_VALUE;
                expect((<any> layer)._latlngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.latLngs = TEST_VALUE;
                expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setLatLngs(TEST_VALUE);
                expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when adding in Leaflet', () => {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                expect(layer.latLngs[0][0][3].lat).to.equal(3);
                expect(layer.latLngs[0][0][3].lng).to.equal(3);
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][][]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.latLngs = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][][]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire geoJSON-change event when changing in Angular', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire geoJSON-change event when changing in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire an change event when adding in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });

    describe('[(geoJSON)]', () => {
        describe('for Polygon', () => {
            const TEST_VALUE: GenericGeoJSONFeature<GeoJSON.Polygon, any> = {
                geometry: {
                    coordinates: [[[0, 1], [1, 1], [0, 0], [0, 1]]],
                    type: 'Polygon',
                },
                properties: {},
                type: 'Feature',
            };
            const TEST_POLYGON: LatLngExpression[][] = [[[0, 0], [1, 0], [1, 1], [0, 0]]];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if ((<LatLng[][]> layer.latLngs)[0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0] ||
                    (<LatLng[][]> layer.latLngs)[0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][1] ||
                    (<LatLng[][]> layer.latLngs)[0][1].lng !== TEST_VALUE.geometry.coordinates[0][1][0] ||
                    (<LatLng[][]> layer.latLngs)[0][1].lat !== TEST_VALUE.geometry.coordinates[0][1][1] ||
                    (<LatLng[][]> layer.latLngs)[0][2].lng !== TEST_VALUE.geometry.coordinates[0][2][0] ||
                    (<LatLng[][]> layer.latLngs)[0][2].lat !== TEST_VALUE.geometry.coordinates[0][2][1]) {
                    throw new Error(
                        `Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ (<any> layer)._latlngs }`,
                    );
                }

            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.geoJSON = TEST_VALUE;
                expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it('should be changed geoJSON in Angular when changing in latlngs Leaflet', () => {
                layer.setLatLngs(TEST_POLYGON);
                expect(lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_POLYGON);
            });
            it('should be changed geoJSON in Angular when adding in latlngs Leaflet', () => {
                layer.setLatLngs(TEST_POLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][3][1] !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.geoJSON.geometry.coordinates }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.geoJSONChange.subscribe((eventVal: LatLng[]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.geoJSON = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe((eventVal: GenericGeoJSONFeature<GeoJSON.Polygon, any>) => {
                    expect(lng2lat((<any> eventVal.geometry.coordinates))).to.deep.equal(TEST_POLYGON);
                    return done();
                });

                layer.setLatLngs(TEST_POLYGON);
            });
            it('should fire an event when adding in Leaflet', (done: MochaDone) => {
                layer.setLatLngs(TEST_POLYGON);
                layer.geoJSONChange.subscribe((eventVal: GenericGeoJSONFeature<GeoJSON.Polygon, any>) => {
                    const values: Array<Array<[number, number]>> = (<any> eventVal.geometry.coordinates);
                    /* istanbul ignore if */
                    if (values[0][3][0] !== 3 ||
                        values[0][3][1] !== 3) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe('for MultiPolygon', () => {
            const TEST_VALUE: GenericGeoJSONFeature<GeoJSON.MultiPolygon, any> = {
                geometry: {
                    coordinates: [
                        [[[1, 0], [1, 1], [0, 1], [1, 0]]],
                        [[[0, 1], [1, 1], [0, 0], [0, 1]]],
                    ],
                    type: 'MultiPolygon',
                },
                properties: {},
                type: 'Feature',
            };
            const TEST_MULTIPOLYGON: LatLngExpression[][][] = [
                [[[0, 0], [1, 0], [1, 1], [0, 0]]],
                [[[0, 0], [0, 1], [1, 1], [0, 0]]],
            ];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.geoJSON = TEST_VALUE;

                /* istanbul ignore if */
                if ((<LatLng[][]> layer.latLngs)[0][0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0][0] ||
                    (<LatLng[][]> layer.latLngs)[0][0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][0][1] ||
                    (<LatLng[][]> layer.latLngs)[0][0][1].lng !== TEST_VALUE.geometry.coordinates[0][0][1][0] ||
                    (<LatLng[][]> layer.latLngs)[0][0][1].lat !== TEST_VALUE.geometry.coordinates[0][0][1][1] ||
                    (<LatLng[][]> layer.latLngs)[0][0][2].lng !== TEST_VALUE.geometry.coordinates[0][0][2][0] ||
                    (<LatLng[][]> layer.latLngs)[0][0][2].lat !== TEST_VALUE.geometry.coordinates[0][0][2][1] ||

                    (<LatLng[][]> layer.latLngs)[1][0][0].lng !== TEST_VALUE.geometry.coordinates[1][0][0][0] ||
                    (<LatLng[][]> layer.latLngs)[1][0][0].lat !== TEST_VALUE.geometry.coordinates[1][0][0][1] ||
                    (<LatLng[][]> layer.latLngs)[1][0][1].lng !== TEST_VALUE.geometry.coordinates[1][0][1][0] ||
                    (<LatLng[][]> layer.latLngs)[1][0][1].lat !== TEST_VALUE.geometry.coordinates[1][0][1][1] ||
                    (<LatLng[][]> layer.latLngs)[1][0][2].lng !== TEST_VALUE.geometry.coordinates[1][0][2][0] ||
                    (<LatLng[][]> layer.latLngs)[1][0][2].lat !== TEST_VALUE.geometry.coordinates[1][0][2][1] ) {
                    throw new Error(
                        `Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ (<any> layer)._latlngs }`,
                    );
                }

            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.geoJSON = TEST_VALUE;
                expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it('should be changed geoJSON in Angular when changing in latlngs Leaflet', () => {
                layer.setLatLngs(TEST_MULTIPOLYGON);

                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== 'MultiPolygon') {
                    throw new Error('Received wrong geometry type: ' + layer.geoJSON.geometry.type);
                }

                expect(lng2lat((<any> layer.geoJSON.geometry.coordinates))).to.deep.equal(TEST_MULTIPOLYGON);
            });
            it('should be changed geoJSON in Angular when adding in latlngs Leaflet', () => {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== 'MultiPolygon') {
                    throw new Error('Received wrong geometry type: ' + layer.geoJSON.geometry.type);
                }
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][0][3][1] !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.geoJSON.geometry.coordinates }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.geoJSONChange.subscribe((eventVal: GeoJSON.Feature<GeoJSON.MultiPolygon>) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.geoJSON = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe((eventVal: GenericGeoJSONFeature<GeoJSON.MultiPolygon, any>) => {
                    expect(lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_MULTIPOLYGON);
                    return done();
                });

                layer.setLatLngs(TEST_MULTIPOLYGON);
            });
            it('should fire an event when adding in Leaflet', (done: MochaDone) => {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.geoJSONChange.subscribe((eventVal: GenericGeoJSONFeature<GeoJSON.MultiPolygon, any>) => {
                    const values: Array<Array<Array<[number, number]>>> = (<any> eventVal.geometry.coordinates);
                    /* istanbul ignore if */
                    if (values[0][0][3][0] !== 3 ||
                        values[0][0][3][1] !== 3) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });

    describe('[smoothFactor]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            layer.smoothFactor = val;
            expect(layer.options.smoothFactor).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            layer.smoothFactor = val;
            expect(layer.smoothFactor).to.equal(val);
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
            layer.geoJSONChange.subscribe((val: GenericGeoJSONFeature<GeoJSON.GeometryObject, ITestProperties>) => {
                expect(val.properties).to.equal(TEST_OBJECT);
                return done();
            });
            layer.properties = TEST_OBJECT;
        });
    });

    describe('[noClip]', () => {
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.noClip = false;
            expect(layer.options.noClip).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.options.noClip = false;
            layer.noClip = true;
            expect(layer.options.noClip).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.noClip = false;
            expect(layer.noClip).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.noClip = true;
            expect(layer.noClip).to.equal(true);
        });
    });

    describe('Popup in Polygon Directive', () => {
        let layerWithPopup: PolygonDirective<any>;
        let popup: PopupDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            popup = new PopupDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithPopup = Object.create(new PolygonDirective<any> (map), { popupDirective: {value: popup} });
            layerWithPopup.ngAfterViewInit();
        });
        it('should bind popup', () => {
            expect((<any> layerWithPopup)._popup).to.equal(popup);
        });
    });

    describe('Tooltip in Polygon Directive', () => {
        let layerWithTooltip: PolygonDirective<any>;
        let tooltip: TooltipDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            tooltip = new TooltipDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithTooltip = Object.create(new PolygonDirective<any> (map), { tooltipDirective: {value: tooltip} });
            layerWithTooltip.ngAfterViewInit();
        });
        it('should bind tooltip', () => {
            expect((<any> layerWithTooltip)._tooltip).to.equal(tooltip);
        });
    });

    describe('Destroying a Polygon Directive', () => {
        it('should remove Polygon Directive from map on destroy', () => {
            expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
