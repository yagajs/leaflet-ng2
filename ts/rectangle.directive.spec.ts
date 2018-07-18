import { expect } from "chai";
import { Feature as GeoJSONFeature } from "geojson";
import { latLng, latLngBounds, point, SVG } from "leaflet";
import {
    LatLng,
    LatLngBounds,
    LatLngExpression,
    LayerGroupProvider,
    lng2lat,
    MapComponent,
    MapProvider,
    PopupDirective,
    RectangleDirective,
    TooltipDirective,
} from "./index";
import { createPathTests } from "./path-directives.spec";
import { randomLatLng, randomLatLngBounds, randomNumber } from "./spec";

describe("Rectangle Directive", () => {
    createPathTests(RectangleDirective);

    let map: MapComponent;
    let layer: RectangleDirective<any>;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        (map as any)._renderer = (map as any)._renderer || new SVG();

        layer = new RectangleDirective<any> ({ ref: map }, {} as any);
    });

    describe("[(display)]", () => {
        it("should set DOM container style to display:none when not displaying", () => {
            layer.display = false;
            expect((layer.getElement() as HTMLElement).style.display).to.equal("none");
        });
        it("should reset DOM container style when display is true again", () => {
            layer.display = false;
            layer.display = true;
            expect((layer.getElement() as HTMLElement).style.display).to.not.equal("none");
        });
        it("should set to false by removing from map", (done: Mocha.Done) => {

            layer.displayChange.subscribe((val: boolean) => {
                expect(val).to.equal(false);
                expect(layer.display).to.equal(false);
                done();
            });

            map.removeLayer(layer);
        });
        it("should set to true when adding to map again", (done: Mocha.Done) => {
            map.removeLayer(layer);
            layer.displayChange.subscribe((val: boolean) => {
                expect(val).to.equal(true);
                expect(layer.display).to.equal(true);
                done();
            });

            map.addLayer(layer);
        });
    });
    describe("[(latlngs)]", () => {
        describe("for Polygons", () => {
            const TEST_VALUE: LatLng[][] = [[randomLatLng(), randomLatLng(), randomLatLng()]];
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.latLngs = TEST_VALUE;
                expect((layer as any)._latlngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.latLngs = TEST_VALUE;
                expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                layer.setLatLngs(TEST_VALUE);
                expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when adding in Leaflet", () => {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if ((layer.latLngs as LatLng[][])[0][3].lat !== 3 ||
                    (layer.latLngs as LatLng[][])[0][3].lng !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.latLngs }`);
                }
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.latLngs = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.setLatLngs(TEST_VALUE);
            });
            it("should fire geoJSON-change event when changing in Angular", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe(() => {
                    // todo: test for correct data
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it("should fire geoJSON-change event when changing in Leaflet", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe(() => {
                    // todo: test for correct data
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it("should fire an change event when adding in Leaflet", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe(() => {
                    // todo: test for correct data
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe("for MultiPolygons", () => {
            const TEST_VALUE: LatLng[][][] = [
                [[latLng(1, 0), latLng(1, 1), latLng(0, 1)]],
                [[latLng(0, 1), latLng(1, 1), latLng(1, 0)]],
            ];
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.latLngs = TEST_VALUE;
                expect((layer as any)._latlngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.latLngs = TEST_VALUE;
                expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                layer.setLatLngs(TEST_VALUE);
                expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when adding in Leaflet", () => {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if ((layer.latLngs as LatLng[][][])[0][0][3].lat !== 3 ||
                    (layer.latLngs as LatLng[][][])[0][0][3].lng !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ (layer.latLngs as LatLng[][][])[0][0] }`);
                }
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][][]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.latLngs = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][][]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.setLatLngs(TEST_VALUE);
            });
            it("should fire geoJSON-change event when changing in Angular", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe(() => {
                    // todo: test for correct data
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it("should fire geoJSON-change event when changing in Leaflet", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe(() => {
                    // todo: test for correct data
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it("should fire an change event when adding in Leaflet", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe(() => {
                    // todo: test for correct data
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });

    describe("[(geoJSON)]", () => {
        describe("for Polygon", () => {
            const TEST_VALUE: GeoJSONFeature<GeoJSON.Polygon, any> = {
                geometry: {
                    coordinates: [[[0, 1], [1, 1], [0, 0], [0, 1]]],
                    type: "Polygon",
                },
                properties: {},
                type: "Feature",
            };
            const TEST_POLYGON: LatLngExpression[][] = [[[0, 0], [1, 0], [1, 1], [0, 0]]];
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if ((layer.latLngs as LatLng[][])[0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0] ||
                    (layer.latLngs as LatLng[][])[0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][1] ||
                    (layer.latLngs as LatLng[][])[0][1].lng !== TEST_VALUE.geometry.coordinates[0][1][0] ||
                    (layer.latLngs as LatLng[][])[0][1].lat !== TEST_VALUE.geometry.coordinates[0][1][1] ||
                    (layer.latLngs as LatLng[][])[0][2].lng !== TEST_VALUE.geometry.coordinates[0][2][0] ||
                    (layer.latLngs as LatLng[][])[0][2].lat !== TEST_VALUE.geometry.coordinates[0][2][1]) {
                    /* tslint:disable:max-line-length */
                    throw new Error(`Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ (layer as any)._latlngs }`);
                    /* tslint:enable */
                }

            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.geoJSON = TEST_VALUE;
                expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it("should be changed geoJSON in Angular when changing in latlngs Leaflet", () => {
                layer.setLatLngs(TEST_POLYGON);
                expect(lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_POLYGON);
            });
            it("should be changed geoJSON in Angular when adding in latlngs Leaflet", () => {
                layer.setLatLngs(TEST_POLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][3][1] !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.geoJSON.geometry.coordinates }`);
                }
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe((eventVal: LatLng[]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.geoJSON = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.Polygon, any>) => {
                    expect(lng2lat((eventVal.geometry.coordinates as any))).to.deep.equal(TEST_POLYGON);
                    return done();
                });

                layer.setLatLngs(TEST_POLYGON);
            });
            it("should fire an event when adding in Leaflet", (done: Mocha.Done) => {
                layer.setLatLngs(TEST_POLYGON);
                layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.Polygon, any>) => {
                    const values: Array<Array<[number, number]>> = (eventVal.geometry.coordinates as any);
                    /* istanbul ignore if */
                    if (values[0][3][0] !== 3 ||
                        values[0][3][1] !== 3) {
                        return done(new Error("Received wrong value"));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe("for MultiPolygon", () => {
            const TEST_VALUE: GeoJSONFeature<GeoJSON.MultiPolygon, any> = {
                geometry: {
                    coordinates: [
                        [[[1, 0], [1, 1], [0, 1], [1, 0]]],
                        [[[0, 1], [1, 1], [0, 0], [0, 1]]],
                    ],
                    type: "MultiPolygon",
                },
                properties: {},
                type: "Feature",
            };
            const TEST_MULTIPOLYGON: LatLngExpression[][][] = [
                [[[0, 0], [1, 0], [1, 1], [0, 0]]],
                [[[0, 0], [0, 1], [1, 1], [0, 0]]],
            ];
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.geoJSON = TEST_VALUE;

                /* istanbul ignore if */
                if ((layer.latLngs as LatLng[][][])[0][0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0][0] ||
                    (layer.latLngs as LatLng[][][])[0][0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][0][1] ||
                    (layer.latLngs as LatLng[][][])[0][0][1].lng !== TEST_VALUE.geometry.coordinates[0][0][1][0] ||
                    (layer.latLngs as LatLng[][][])[0][0][1].lat !== TEST_VALUE.geometry.coordinates[0][0][1][1] ||
                    (layer.latLngs as LatLng[][][])[0][0][2].lng !== TEST_VALUE.geometry.coordinates[0][0][2][0] ||
                    (layer.latLngs as LatLng[][][])[0][0][2].lat !== TEST_VALUE.geometry.coordinates[0][0][2][1] ||

                    (layer.latLngs as LatLng[][][])[1][0][0].lng !== TEST_VALUE.geometry.coordinates[1][0][0][0] ||
                    (layer.latLngs as LatLng[][][])[1][0][0].lat !== TEST_VALUE.geometry.coordinates[1][0][0][1] ||
                    (layer.latLngs as LatLng[][][])[1][0][1].lng !== TEST_VALUE.geometry.coordinates[1][0][1][0] ||
                    (layer.latLngs as LatLng[][][])[1][0][1].lat !== TEST_VALUE.geometry.coordinates[1][0][1][1] ||
                    (layer.latLngs as LatLng[][][])[1][0][2].lng !== TEST_VALUE.geometry.coordinates[1][0][2][0] ||
                    (layer.latLngs as LatLng[][][])[1][0][2].lat !== TEST_VALUE.geometry.coordinates[1][0][2][1] ) {
                    /* tslint:disable:max-line-length */
                    throw new Error(`Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ (layer as any)._latlngs }`);
                    /* tslint:enable */
                }

            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.geoJSON = TEST_VALUE;
                expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it("should be changed geoJSON in Angular when changing in latlngs Leaflet", () => {
                layer.setLatLngs(TEST_MULTIPOLYGON);

                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== "MultiPolygon") {
                    throw new Error("Received wrong geometry type: " + layer.geoJSON.geometry.type);
                }

                expect(lng2lat((layer.geoJSON.geometry.coordinates as any))).to.deep.equal(TEST_MULTIPOLYGON);
            });
            it("should be changed geoJSON in Angular when adding in latlngs Leaflet", () => {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== "MultiPolygon") {
                    throw new Error("Received wrong geometry type: " + layer.geoJSON.geometry.type);
                }
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][0][3][1] !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.geoJSON.geometry.coordinates }`);
                }
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe((eventVal: GeoJSON.Feature<GeoJSON.MultiPolygon>) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.geoJSON = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.MultiPolygon, any>) => {
                    expect(lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_MULTIPOLYGON);
                    return done();
                });

                layer.setLatLngs(TEST_MULTIPOLYGON);
            });
            it("should fire an event when adding in Leaflet", (done: Mocha.Done) => {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.MultiPolygon, any>) => {
                    const values: Array<Array<Array<[number, number]>>> = (eventVal.geometry.coordinates as any);
                    /* istanbul ignore if */
                    if (values[0][0][3][0] !== 3 ||
                        values[0][0][3][1] !== 3) {
                        return done(new Error("Received wrong value"));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });

    describe("[(bounds)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: LatLngBounds = randomLatLngBounds();
            layer.bounds = val;
            expect(layer.getBounds().equals(val)).to.equal(true);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: LatLngBounds = randomLatLngBounds();
            layer.bounds = val;
            expect(layer.bounds.equals(val)).to.equal(true);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: LatLngBounds = randomLatLngBounds();
            layer.setBounds(val);
            expect(layer.bounds.equals(val)).to.equal(true);

        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: LatLngBounds = randomLatLngBounds();

            layer.boundsChange.subscribe((eventVal: LatLngBounds) => {
                expect(eventVal.equals(val)).to.equal(true);
                done();
            });
            layer.ngAfterContentInit();
            layer.bounds = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: LatLngBounds = randomLatLngBounds();

            layer.boundsChange.subscribe((eventVal: LatLngBounds) => {
                expect(eventVal.equals(val)).to.equal(true);
                done();
            });

            layer.ngAfterContentInit();
            layer.setBounds(val);
        });
    });

    describe("[(north)]", () => {
        beforeEach(() => {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(90);
            layer.north = val;
            expect(layer.getBounds().getNorth()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(90);
            layer.north = val;
            expect(layer.north).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber(90);
            layer.setBounds([
                [0, 0],
                [val, 0],
            ]);
            expect(layer.north).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber(90);

            layer.northChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterContentInit();
            layer.north = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(90);

            layer.northChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterContentInit();
            layer.setBounds([
                [0, 0],
                [val, 0],
            ]);
        });
    });
    describe("[(east)]", () => {
        beforeEach(() => {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(180);
            layer.east = val;
            expect(layer.getBounds().getEast()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(180);
            layer.east = val;
            expect(layer.east).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber(180);
            layer.setBounds([
                [0, val],
                [0, 0],
            ]);
            expect(layer.east).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber(180);

            layer.eastChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterContentInit();
            layer.east = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(180);

            layer.eastChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterContentInit();
            layer.setBounds([
                [0, val],
                [0, 0],
            ]);
        });
    });
    describe("[(south)]", () => {
        beforeEach(() => {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(0, -90);
            layer.south = val;
            expect(layer.getBounds().getSouth()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(0, -90);
            layer.south = val;
            expect(layer.south).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber(0, -90);
            layer.setBounds([
                [val, 0],
                [1, 1],
            ]);
            expect(layer.south).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber(0, -90);

            layer.southChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterContentInit();
            layer.south = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(0, -90);

            layer.southChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterContentInit();
            layer.setBounds([
                [val, 0],
                [1, 1],
            ]);
        });
    });
    describe("[(west)]", () => {
        beforeEach(() => {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(0, -180);
            layer.west = val;
            expect(layer.getBounds().getWest()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(0, -180);
            layer.west = val;
            expect(layer.west).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber(0, -180);
            layer.setBounds(latLngBounds([
                [0, val],
                [1, 1],
            ]));
            expect(layer.west).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber(0, -180);

            layer.westChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterContentInit();
            layer.west = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(0, -180);

            layer.westChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.ngAfterContentInit();
            layer.setBounds([
                [0, val],
                [1, 1],
            ]);
        });
    });

    describe("[smoothFactor]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            layer.smoothFactor = val;
            expect(layer.options.smoothFactor).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            layer.smoothFactor = val;
            expect(layer.smoothFactor).to.equal(val);
        });
    });

    describe("[properties]", () => {
        interface ITestProperties {
            test: string;
        }
        let layerWithProperties: RectangleDirective<ITestProperties>;
        const TEST_OBJECT: ITestProperties = {
            test: "OK",
        };
        beforeEach(() => {
            layerWithProperties = new RectangleDirective<ITestProperties> ({ ref: map }, {} as any);
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            layerWithProperties.properties = TEST_OBJECT;
            expect(layerWithProperties.feature.properties).to.deep.equal(TEST_OBJECT);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layerWithProperties.properties = TEST_OBJECT;
            expect(layerWithProperties.properties).to.deep.equal(TEST_OBJECT);
        });
        it("should emit an event for GeoJSONChange when changing in Angular", (done: Mocha.Done) => {
            layerWithProperties.geoJSONChange.subscribe(
                (eventVal: GeoJSONFeature<GeoJSON.GeometryObject, ITestProperties>) => {
                    expect(eventVal.properties).to.deep.equal(TEST_OBJECT);
                    done();
                },
            );
            layerWithProperties.properties = TEST_OBJECT;
        });
    });

    describe("[noClip]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.noClip = false;
            expect(layer.options.noClip).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.options.noClip = false;
            layer.noClip = true;
            expect(layer.options.noClip).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.noClip = false;
            expect(layer.noClip).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.noClip = true;
            expect(layer.noClip).to.equal(true);
        });
    });

    describe("Popup in Rectangle Directive", () => {
        let layerWithPopup: RectangleDirective<any>;
        let popup: PopupDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement("div");
            layerWithPopup = new RectangleDirective<any> ({ ref: map }, {} as any);
            popup = new PopupDirective({ nativeElement: testDiv }, { ref: layerWithPopup });

            layerWithPopup.ngAfterContentInit();
        });
        it("should bind popup", () => {
            expect((layerWithPopup as any)._popup).to.equal(popup);
        });
    });

    describe("Tooltip in Rectangle Directive", () => {
        let layerWithTooltip: RectangleDirective<any>;
        let tooltip: TooltipDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement("div");
            layerWithTooltip = new RectangleDirective<any> ({ ref: map }, {} as any);
            tooltip = new TooltipDirective({ ref: layerWithTooltip }, { nativeElement: testDiv });
        });
        it("should bind tooltip", () => {
            expect((layerWithTooltip as any)._tooltip).to.equal(tooltip);
        });
    });

    describe("Destroying a Rectangle Directive", () => {
        it("should remove Rectangle Directive from map on destroy", () => {
            /* istanbul ignore if */
            if (!map.hasLayer(layer)) {
                throw new Error("The layer is not part of the map before destroying");
            }
            layer.ngOnDestroy();
            /* istanbul ignore if */
            if (map.hasLayer(layer)) {
                throw new Error("The layer is still part of the map after destroying");
            }
        });
    });
});
