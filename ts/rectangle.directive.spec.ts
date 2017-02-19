import { RectangleDirective,
    MapComponent,
    PopupDirective,
    TooltipDirective,
    LatLngExpression,
    LatLngBounds,
    LatLng,
    GenericGeoJSONFeature,
    lng2lat } from './index';
import { point, SVG, latLng, latLngBounds } from 'leaflet';
import { expect } from 'chai';
import { createPathTests } from './path-directives.spec';

describe('Rectangle Directive', () => {
    createPathTests(RectangleDirective);

    let map: MapComponent,
        layer: RectangleDirective<any>;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        (<any>map)._renderer = (<any>map)._renderer || new SVG();

        layer = new RectangleDirective<any>(map);
    });

    describe('[(latlngs)]', () => {
        describe('for Polygons', () => {
            const TEST_VALUE: LatLng[][] = [[latLng(0, 1), latLng(1, 1), latLng(1, 0)]];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.latLngs = TEST_VALUE;
                expect((<any>layer)._latlngs).to.deep.equal(TEST_VALUE);
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
                /* istanbul ignore if */
                if ((<LatLng[][]>layer.latLngs)[0][3].lat !== 3 ||
                    (<LatLng[][]>layer.latLngs)[0][3].lng !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.latLngs }`);
                }
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
                    // todo: test for correct data
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire geoJSON-change event when changing in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    // todo: test for correct data
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire an change event when adding in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    // todo: test for correct data
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe('for MultiPolygons', () => {
            const TEST_VALUE: LatLng[][][] = [
                [[latLng(1, 0), latLng(1, 1), latLng(0, 1)]],
                [[latLng(0, 1), latLng(1, 1), latLng(1, 0)]]
            ];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.latLngs = TEST_VALUE;
                expect((<any>layer)._latlngs).to.deep.equal(TEST_VALUE);
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
                /* istanbul ignore if */
                if (layer.latLngs[0][0][3].lat !== 3 ||
                    layer.latLngs[0][0][3].lng !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.latLngs[0][0] }`);
                }
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
                    // todo: test for correct data
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire geoJSON-change event when changing in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    // todo: test for correct data
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire an change event when adding in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    // todo: test for correct data
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
                    type: 'Polygon'
                },
                properties: {},
                type: 'Feature'
            };
            const TEST_POLYGON: LatLngExpression[][] = [[[0, 0], [1, 0], [1, 1], [0, 0]]];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if ((<LatLng[][]>layer.latLngs)[0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0] ||
                    (<LatLng[][]>layer.latLngs)[0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][1] ||
                    (<LatLng[][]>layer.latLngs)[0][1].lng !== TEST_VALUE.geometry.coordinates[0][1][0] ||
                    (<LatLng[][]>layer.latLngs)[0][1].lat !== TEST_VALUE.geometry.coordinates[0][1][1] ||
                    (<LatLng[][]>layer.latLngs)[0][2].lng !== TEST_VALUE.geometry.coordinates[0][2][0] ||
                    (<LatLng[][]>layer.latLngs)[0][2].lat !== TEST_VALUE.geometry.coordinates[0][2][1]) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ (<any>layer)._latlngs }`);
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
                    expect(lng2lat((<any>eventVal.geometry.coordinates))).to.deep.equal(TEST_POLYGON);
                    return done();
                });

                layer.setLatLngs(TEST_POLYGON);
            });
            it('should fire an event when adding in Leaflet', (done: MochaDone) => {
                layer.setLatLngs(TEST_POLYGON);
                layer.geoJSONChange.subscribe((eventVal: GenericGeoJSONFeature<GeoJSON.Polygon, any>) => {
                    const values: [number, number][][] = (<any>eventVal.geometry.coordinates);
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
                    type: 'MultiPolygon'
                },
                properties: {},
                type: 'Feature'
            };
            const TEST_MULTIPOLYGON: LatLngExpression[][][] = [
                [[[0, 0], [1, 0], [1, 1], [0, 0]]],
                [[[0, 0], [0, 1], [1, 1], [0, 0]]]
            ];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.geoJSON = TEST_VALUE;

                /* istanbul ignore if */
                if ((<LatLng[][]>layer.latLngs)[0][0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0][0] ||
                    (<LatLng[][]>layer.latLngs)[0][0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][0][1] ||
                    (<LatLng[][]>layer.latLngs)[0][0][1].lng !== TEST_VALUE.geometry.coordinates[0][0][1][0] ||
                    (<LatLng[][]>layer.latLngs)[0][0][1].lat !== TEST_VALUE.geometry.coordinates[0][0][1][1] ||
                    (<LatLng[][]>layer.latLngs)[0][0][2].lng !== TEST_VALUE.geometry.coordinates[0][0][2][0] ||
                    (<LatLng[][]>layer.latLngs)[0][0][2].lat !== TEST_VALUE.geometry.coordinates[0][0][2][1] ||

                    (<LatLng[][]>layer.latLngs)[1][0][0].lng !== TEST_VALUE.geometry.coordinates[1][0][0][0] ||
                    (<LatLng[][]>layer.latLngs)[1][0][0].lat !== TEST_VALUE.geometry.coordinates[1][0][0][1] ||
                    (<LatLng[][]>layer.latLngs)[1][0][1].lng !== TEST_VALUE.geometry.coordinates[1][0][1][0] ||
                    (<LatLng[][]>layer.latLngs)[1][0][1].lat !== TEST_VALUE.geometry.coordinates[1][0][1][1] ||
                    (<LatLng[][]>layer.latLngs)[1][0][2].lng !== TEST_VALUE.geometry.coordinates[1][0][2][0] ||
                    (<LatLng[][]>layer.latLngs)[1][0][2].lat !== TEST_VALUE.geometry.coordinates[1][0][2][1] ) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ (<any>layer)._latlngs }`);
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

                expect(lng2lat((<any>layer.geoJSON.geometry.coordinates))).to.deep.equal(TEST_MULTIPOLYGON);
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
                    const values: [number, number][][][] = (<any>eventVal.geometry.coordinates);
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

    describe('[(bounds)]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.bounds = val;
            expect(layer.getBounds().equals(val)).to.equal(true);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.bounds = val;
            expect(layer.bounds.equals(val)).to.equal(true);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.setBounds(val);
            expect(layer.bounds.equals(val)).to.equal(true);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);

            layer.boundsChange.subscribe((eventVal: LatLngBounds) => {
                expect(eventVal.equals(val)).to.equal(true);
                done();
            });
            layer.ngAfterViewInit();
            layer.bounds = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);

            layer.boundsChange.subscribe((eventVal: LatLngBounds) => {
                expect(eventVal.equals(val)).to.equal(true);
                done();
            });

            layer.ngAfterViewInit();
            layer.setBounds(val);
        });
    });

    describe('[(north)]', () => {
        beforeEach(() => {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random();
            layer.north = val;
            expect(layer.getBounds().getNorth()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random();
            layer.north = val;
            expect(layer.north).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random();
            layer.setBounds([
                [0, 0],
                [val, 0]
            ]);
            expect(layer.north).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.northChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterViewInit();
            layer.north = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.northChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterViewInit();
            layer.setBounds([
                [0, 0],
                [val, 0]
            ]);
        });
    });
    describe('[(east)]', () => {
        beforeEach(() => {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random();
            layer.east = val;
            expect(layer.getBounds().getEast()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random();
            layer.east = val;
            expect(layer.east).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random();
            layer.setBounds([
                [0, val],
                [0, 0]
            ]);
            expect(layer.east).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.eastChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterViewInit();
            layer.east = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.eastChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterViewInit();
            layer.setBounds([
                [0, val],
                [0, 0]
            ]);
        });
    });
    describe('[(south)]', () => {
            beforeEach(() => {
                layer.setBounds([[0, 0], [1, 1]]);
            });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random();
            layer.south = val;
            expect(layer.getBounds().getSouth()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random();
            layer.south = val;
            expect(layer.south).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random();
            layer.setBounds([
                [val, 0],
                [1, 1]
            ]);
            expect(layer.south).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.southChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterViewInit();
            layer.south = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.southChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterViewInit();
            layer.setBounds([
                [val, 0],
                [1, 1]
            ]);
        });
    });
    describe('[(west)]', () => {
        beforeEach(() => {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random();
            layer.west = val;
            expect(layer.getBounds().getWest()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random();
            layer.west = val;
            expect(layer.west).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random();
            layer.setBounds(latLngBounds([
                [0, val],
                [1, 1]
            ]));
            expect(layer.west).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.westChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterViewInit();
            layer.west = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.westChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterViewInit();
            layer.setBounds([
                [0, val],
                [1, 1]
            ]);
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
        let layerWithProperties: RectangleDirective<ITestProperties>;
        const TEST_OBJECT: ITestProperties = {
            test: 'OK'
        };
        beforeEach(() => {
            layerWithProperties = new RectangleDirective<ITestProperties>(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            layerWithProperties.properties = TEST_OBJECT;
            expect(layerWithProperties.feature.properties).to.deep.equal(TEST_OBJECT);
        });
        it('should be changed in Angular when changing in Angular', () => {
            layerWithProperties.properties = TEST_OBJECT;
            expect(layerWithProperties.properties).to.deep.equal(TEST_OBJECT);
        });
        it('should emit an event for GeoJSONChange when changing in Angular', (done: MochaDone) => {
            layerWithProperties.geoJSONChange.subscribe((eventVal: GenericGeoJSONFeature<GeoJSON.GeometryObject, ITestProperties>) => {
                expect(eventVal.properties).to.deep.equal(TEST_OBJECT);
                done();
            });
            layerWithProperties.properties = TEST_OBJECT;
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

    describe('Popup in Rectangle Directive', () => {
        let layerWithPopup: RectangleDirective<any>,
            popup: PopupDirective,
            testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            popup = new PopupDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithPopup = Object.create(new RectangleDirective<any>(map), { popupDirective: {value: popup} });
            layerWithPopup.ngAfterViewInit();
        });
        it('should bind popup', () => {
            expect((<any>layerWithPopup)._popup).to.equal(popup);
        });
    });

    describe('Tooltip in Rectangle Directive', () => {
        let layerWithTooltip: RectangleDirective<any>,
            tooltip: TooltipDirective,
            testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            tooltip = new TooltipDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithTooltip = Object.create(new RectangleDirective<any>(map), { tooltipDirective: {value: tooltip} });
            layerWithTooltip.ngAfterViewInit();
        });
        it('should bind tooltip', () => {
            expect((<any>layerWithTooltip)._tooltip).to.equal(tooltip);
        });
    });

    describe('Destroying a Rectangle Directive', () => {
        it('should remove Rectangle Directive from map on destroy', () => {
            expect(map.hasLayer(layer)).to.equal(true);
        });
    });
});
