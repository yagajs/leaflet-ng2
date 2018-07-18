import { expect } from "chai";
import { Feature as GeoJSONFeature } from "geojson";
import { latLng, point, SVG } from "leaflet";
import {
    LatLng,
    LatLngExpression,
    LayerGroupProvider,
    MapComponent,
    MapProvider,
    PolylineDirective,
    PopupDirective,
    TooltipDirective,
} from "./index";
import { lng2lat } from "./lng2lat";
import { createPathTests } from "./path-directives.spec";
import { randomNumber } from "./spec";

describe("Polyline Directive", () => {
    createPathTests(PolylineDirective);

    let map: MapComponent;
    let layer: PolylineDirective<any>;

    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        (map as any)._renderer = (map as any)._renderer || new SVG();

        layer = new PolylineDirective<any> ({ ref: map }, {} as any);
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
        describe("for LineStrings", () => {
            const TEST_VALUE: LatLng[] = [latLng(0, 1), latLng(1, 1), latLng(1, 0)];
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
                if ((layer.latLngs as LatLng[])[3].lat !== 3 ||
                    (layer.latLngs as LatLng[])[3].lng !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.latLngs }`);
                }
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.latLngs = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[]) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.setLatLngs(TEST_VALUE);
            });
            it("should fire geoJSON-change event when changing in Angular", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it("should fire geoJSON-change event when changing in Leaflet", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it("should fire an change event when adding in Leaflet", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe("for MultiLineStrings", () => {
            const TEST_VALUE: LatLng[][] = [
                [latLng(1, 0), latLng(1, 1), latLng(0, 1)],
                [latLng(0, 1), latLng(1, 1), latLng(1, 0)],
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
                if ((layer.latLngs as LatLng[][])[0][3].lat !== 3 ||
                    (layer.latLngs as LatLng[][])[0][3].lng !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.latLngs[2] }`);
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
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it("should fire geoJSON-change event when changing in Leaflet", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it("should fire an change event when adding in Leaflet", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });

    describe("[(geoJSON)]", () => {
        describe("for LineString", () => {
            const TEST_VALUE: GeoJSONFeature<GeoJSON.LineString, any> = {
                geometry: {
                    coordinates: [[0, 1], [1, 1], [0, 0]],
                    type: "LineString",
                },
                properties: {},
                type: "Feature",
            };
            const TEST_LINESTRING: LatLngExpression[] = [[0, 0], [1, 0], [1, 1]];
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if ((layer.latLngs as LatLng[])[0].lng !== TEST_VALUE.geometry.coordinates[0][0] ||
                    (layer.latLngs as LatLng[])[0].lat !== TEST_VALUE.geometry.coordinates[0][1] ||
                    (layer.latLngs as LatLng[])[1].lng !== TEST_VALUE.geometry.coordinates[1][0] ||
                    (layer.latLngs as LatLng[])[1].lat !== TEST_VALUE.geometry.coordinates[1][1] ||
                    (layer.latLngs as LatLng[])[2].lng !== TEST_VALUE.geometry.coordinates[2][0] ||
                    (layer.latLngs as LatLng[])[2].lat !== TEST_VALUE.geometry.coordinates[2][1]) {
                    throw new Error(
                        `Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ (layer as any)._latlngs }`,
                    );
                }

            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.geoJSON = TEST_VALUE;
                expect(layer.geoJSON.geometry.coordinates).deep.equal(TEST_VALUE.geometry.coordinates);
            });
            it("should be changed geoJSON in Angular when changing in latlngs Leaflet", () => {
                layer.setLatLngs(TEST_LINESTRING);
                expect(lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_LINESTRING);
            });
            it("should be changed geoJSON in Angular when adding in latlngs Leaflet", () => {
                layer.setLatLngs(TEST_LINESTRING);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[3][1] !== 3) {
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
                layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.LineString, any>) => {
                    expect(lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_LINESTRING);
                    return done();
                });

                layer.setLatLngs(TEST_LINESTRING);
            });
            it("should fire an event when adding in Leaflet", (done: Mocha.Done) => {
                layer.setLatLngs(TEST_LINESTRING);
                layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.LineString, any>) => {
                    const values: Array<[number, number]> = (eventVal.geometry.coordinates as any);
                    /* istanbul ignore if */
                    if (values[3][0] !== 3 ||
                        values[3][1] !== 3) {
                        return done(new Error("Received wrong value"));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe("for MultiLineString", () => {
            const TEST_VALUE: GeoJSONFeature<GeoJSON.MultiLineString, any> = {
                geometry: {
                    coordinates: [
                        [[1, 0], [1, 1], [0, 1]],
                        [[0, 1], [1, 1], [0, 0]],
                    ],
                    type: "MultiLineString",
                },
                properties: {},
                type: "Feature",
            };
            const TEST_MULTILINESTRING: LatLngExpression[][] = [
                [[0, 0], [1, 0], [1, 1]],
                [[0, 0], [0, 1], [1, 1]],
            ];
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.geoJSON = TEST_VALUE;

                /* istanbul ignore if */
                if ((layer.latLngs as LatLng[][])[0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0] ||
                    (layer.latLngs as LatLng[][])[0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][1] ||
                    (layer.latLngs as LatLng[][])[0][1].lng !== TEST_VALUE.geometry.coordinates[0][1][0] ||
                    (layer.latLngs as LatLng[][])[0][1].lat !== TEST_VALUE.geometry.coordinates[0][1][1] ||
                    (layer.latLngs as LatLng[][])[0][2].lng !== TEST_VALUE.geometry.coordinates[0][2][0] ||
                    (layer.latLngs as LatLng[][])[0][2].lat !== TEST_VALUE.geometry.coordinates[0][2][1] ||

                    (layer.latLngs as LatLng[][])[1][0].lng !== TEST_VALUE.geometry.coordinates[1][0][0] ||
                    (layer.latLngs as LatLng[][])[1][0].lat !== TEST_VALUE.geometry.coordinates[1][0][1] ||
                    (layer.latLngs as LatLng[][])[1][1].lng !== TEST_VALUE.geometry.coordinates[1][1][0] ||
                    (layer.latLngs as LatLng[][])[1][1].lat !== TEST_VALUE.geometry.coordinates[1][1][1] ||
                    (layer.latLngs as LatLng[][])[1][2].lng !== TEST_VALUE.geometry.coordinates[1][2][0] ||
                    (layer.latLngs as LatLng[][])[1][2].lat !== TEST_VALUE.geometry.coordinates[1][2][1] ) {
                    throw new Error(
                        `Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ (layer as any)._latlngs }`,
                    );
                }

            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.geoJSON = TEST_VALUE;

                expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it("should be changed geoJSON in Angular when changing in latlngs Leaflet", () => {
                layer.setLatLngs(TEST_MULTILINESTRING);

                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== "MultiLineString") {
                    throw new Error("Received wrong geometry type: " + layer.geoJSON.geometry.type);
                }
                expect(lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_MULTILINESTRING);
            });
            it("should be changed geoJSON in Angular when adding in latlngs Leaflet", () => {
                layer.setLatLngs(TEST_MULTILINESTRING);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== "MultiLineString") {
                    throw new Error("Received wrong geometry type: " + layer.geoJSON.geometry.type);
                }
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][3][1] !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.geoJSON.geometry.coordinates }`);
                }
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe((eventVal: GeoJSON.Feature<GeoJSON.MultiLineString>) => {
                    expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });

                layer.geoJSON = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.MultiLineString, any>) => {
                    expect(lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_MULTILINESTRING);
                    return done();
                });

                layer.setLatLngs(TEST_MULTILINESTRING);
            });
            it("should fire an event when adding in Leaflet", (done: Mocha.Done) => {
                layer.setLatLngs(TEST_MULTILINESTRING);
                layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.MultiLineString, any>) => {
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
    });

    describe("[smoothFactor]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 0, 0);
            layer.smoothFactor = val;
            /* istanbul ignore if */
            if (layer.options.smoothFactor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.smoothFactor }`);
            }
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 0, 0);
            layer.smoothFactor = val;
            /* istanbul ignore if */
            if (layer.smoothFactor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.smoothFactor }`);
            }
        });
    });

    describe("[properties]", () => {
        interface ITestProperties {
            test: string;
        }
        let layerWithPropertiesInterface: PolylineDirective<ITestProperties>;
        const TEST_OBJECT: ITestProperties = {
            test: "OK",
        };
        beforeEach(() => {
            layerWithPropertiesInterface = new PolylineDirective<ITestProperties> ({ ref: map }, {} as any);
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            layerWithPropertiesInterface.properties = TEST_OBJECT;
            /* istanbul ignore if */
            if (layerWithPropertiesInterface.feature.properties !== TEST_OBJECT) {
                /* tslint:disable:max-line-length */
                throw new Error(`Wrong value setted: ${ TEST_OBJECT } != ${ layerWithPropertiesInterface.feature.properties }`);
                /* tslint:enable */
            }
        });
        it("should be changed in Angular when changing in Angular", () => {
            layerWithPropertiesInterface.properties = TEST_OBJECT;
            /* istanbul ignore if */
            if (layerWithPropertiesInterface.properties !== TEST_OBJECT) {
                throw new Error(`Wrong value setted: ${ TEST_OBJECT } != ${ layerWithPropertiesInterface.properties }`);
            }
        });
        it("should emit an event for GeoJSONChange when changing in Angular", (done: Mocha.Done) => {
            layerWithPropertiesInterface.geoJSONChange.subscribe(
                (val: GeoJSONFeature<GeoJSON.GeometryObject, ITestProperties>) => {
                    /* istanbul ignore if */
                    if (val.properties !== TEST_OBJECT) {
                        return done(new Error("Wrong value received"));
                    }
                    done();
                },
            );
            layerWithPropertiesInterface.properties = TEST_OBJECT;
        });
    });

    describe("[noClip]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.noClip = false;
            /* istanbul ignore if */
            if (layer.options.noClip) {
                throw new Error(`It is not setted to false`);
            }
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.options.noClip = false;
            layer.noClip = true;
            /* istanbul ignore if */
            if (!layer.options.noClip) {
                throw new Error(`It is not setted to true`);
            }
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.noClip = false;
            /* istanbul ignore if */
            if (layer.noClip) {
                throw new Error(`It is not setted to false`);
            }
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.noClip = true;
            /* istanbul ignore if */
            if (!layer.noClip) {
                throw new Error(`It is not setted to true`);
            }
        });
    });

    describe("Popup in Polyline Directive", () => {
        let layerWithPopup: PolylineDirective<any>;
        let popup: PopupDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement("div");
            layerWithPopup = new PolylineDirective<any> ({ ref: map }, {} as any);
            popup = new PopupDirective({ nativeElement: testDiv }, { ref: layerWithPopup });
        });
        it("should bind popup", () => {
            /* istanbul ignore if */
            if (!(layerWithPopup as any)._popup) {
                throw new Error("There is no popup binded");
            }
            /* istanbul ignore if */
            if ((layerWithPopup as any)._popup !== popup) {
                throw new Error("There is a wrong popup binded");
            }
        });
    });

    describe("Tooltip in Polyline Directive", () => {
        let layerWithTooltip: PolylineDirective<any>;
        let tooltip: TooltipDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement("div");
            layerWithTooltip = new PolylineDirective<any> ({ ref: map }, {} as any);
            tooltip = new TooltipDirective({ ref: layerWithTooltip }, { nativeElement: testDiv });
        });
        it("should bind tooltip", () => {
            /* istanbul ignore if */
            if (!(layerWithTooltip as any)._tooltip) {
                throw new Error("There is no tooltip binded");
            }
            /* istanbul ignore if */
            if ((layerWithTooltip as any)._tooltip !== tooltip) {
                throw new Error("There is a wrong tooltip binded");
            }
        });
    });

    describe("Destroying a Polyline Directive", () => {
        it("should remove Polyline Directive from map on destroy", () => {
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
