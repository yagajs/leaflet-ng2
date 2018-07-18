import { expect } from "chai";
import { Feature as GeoJSONFeature, FeatureCollection as GeoJSONFeatureCollection } from "geojson";
import { Layer, Marker, PathOptions, point, SVG } from "leaflet";
import {
    DEFAULT_STYLE,
    GeoJSONDirective,
    IGeoJSONDirectiveMiddlewareDictionary,
    IGeoJSONFilterFn,
    LatLng,
    LayerGroupProvider,
    MapComponent,
    MapProvider,
    PopupDirective,
    TooltipDirective,
} from "./index";

describe("GeoJSON Directive", () => {
    let map: MapComponent;
    let layer: GeoJSONDirective<any>;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        (map as any)._renderer = (map as any)._renderer || new SVG();

        layer = new GeoJSONDirective({ ref: map }, new LayerGroupProvider(), {} as any);
    });
    const TEST_VALUE: GeoJSONFeatureCollection<GeoJSON.Point, any> = {
        features: [
            {
                geometry: {
                    coordinates: [7, 51],
                    type: "Point",
                },
                properties: {
                    test: "OK",
                },
                type: "Feature",
            },
        ],
        type: "FeatureCollection",
    };

    describe("[(data)]", () => {

        it("should be changed in Leaflet when changing in Angular", () => {
            layer.data = TEST_VALUE;

            expect(layer.toGeoJSON()).to.deep.equal(TEST_VALUE);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.data = TEST_VALUE;
            expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it("should be changed data in Angular when changing in Leaflet", () => {
            layer.setData(TEST_VALUE);
            expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it("should be changed geoJSON in Angular when adding in latlngs Leaflet", () => {
            layer.addData(TEST_VALUE.features[0]);
            expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            layer.ngAfterContentInit();
            layer.dataChange.subscribe((eventVal: LatLng[]) => {
                expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });

            layer.data = TEST_VALUE;
        });
        it("should fire an event when changing internal setData function", (done: Mocha.Done) => {
            layer.ngAfterContentInit();
            layer.dataChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.LineString, any>) => {
                expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });

            layer.setData(TEST_VALUE);
        });
        it("should fire an event when adding in Leaflet", (done: Mocha.Done) => {
            layer.ngAfterContentInit();
            layer.dataChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.LineString, any>) => {
                expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });
            layer.addData(TEST_VALUE.features[0]);
        });
    });
    describe("[filter]", () => {
        /* istanbul ignore next */
        const FILTER_FN: any = (): boolean => {
            return true;
        };
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.filter = FILTER_FN;
            expect(((layer as any).middleware).filter as IGeoJSONDirectiveMiddlewareDictionary<GeoJSON.Point>)
                .to.equal(FILTER_FN);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.filter = FILTER_FN;
            expect(layer.filter).to.equal(FILTER_FN);
        });
        it("should use the filter function when adding data", (done: Mocha.Done) => {
            const TEST_POINT: GeoJSONFeature<GeoJSON.Point, any> = {
                geometry: {
                    coordinates: [0, 1],
                    type: "Point",
                },
                properties: {},
                type: "Feature",
            };
            layer.filter = ((elem: GeoJSONFeature<GeoJSON.Point, any>): boolean => {
                expect(elem).to.equal(TEST_POINT);
                done();
                return true;
            }) as IGeoJSONFilterFn<any>;
            layer.data = {
                features: [TEST_POINT],
                type: "FeatureCollection",
            };
        });
    });

    describe("[pointToLayer]", () => {
        /* istanbul ignore next */
        const POINT_TO_LAYER_FN: any = (feature: GeoJSONFeature<GeoJSON.Point, any>): Layer => {
            return new Marker({lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0]});
        };
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.pointToLayer = POINT_TO_LAYER_FN;
            expect(((layer as any).middleware).pointToLayer as IGeoJSONDirectiveMiddlewareDictionary<GeoJSON.Point>)
                .to.equal(POINT_TO_LAYER_FN);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.pointToLayer = POINT_TO_LAYER_FN;
            expect(layer.pointToLayer).to.equal(POINT_TO_LAYER_FN);
        });
        it("should use the filter function when adding data", (done: Mocha.Done) => {
            const TEST_POINT: GeoJSONFeature<GeoJSON.Point, any> = {
                geometry: {
                    coordinates: [0, 1],
                    type: "Point",
                },
                properties: {},
                type: "Feature",
            };
            layer.pointToLayer = (feature: GeoJSONFeature<GeoJSON.Point, any>): Layer => {
                expect(feature).to.equal(TEST_POINT);
                done();
                return new Marker({lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0]});
            };
            layer.data = {
                features: [TEST_POINT],
                type: "FeatureCollection",
            };
        });
    });

    describe("[styler]", () => {
        /* istanbul ignore next */
        const STYLER_FN: any = (
            feature: GeoJSONFeature<GeoJSON.Point, any>,
            defaultStyle: PathOptions,
        ): PathOptions => {
            return {};
        };
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.styler = STYLER_FN;
            expect(((layer as any).middleware).styler as IGeoJSONDirectiveMiddlewareDictionary<GeoJSON.Point>)
                .to.equal(STYLER_FN);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.styler = STYLER_FN;
            expect(layer.styler).to.equal(STYLER_FN);
        });
        it("should use the filter function when adding data", (done: Mocha.Done) => {
            const TEST_POINT: GeoJSONFeature<GeoJSON.Point, any> = {
                geometry: {
                    coordinates: [0, 1],
                    type: "Point",
                },
                properties: {},
                type: "Feature",
            };
            /* tslint:disable:max-line-length */
            layer.styler = ((
                feature: GeoJSONFeature<GeoJSON.Point, any>,
                defaultStyle: PathOptions,
            ): PathOptions => {
                expect(feature).to.equal(TEST_POINT);
                done();
                return {};
            }) as any;
            /* tslint:enable */
            layer.data = {
                features: [TEST_POINT],
                type: "FeatureCollection",
            };
        });
    });

    describe("[defaultStyle]", () => {
        const NEW_DEFAULT_STYLE = {};
        it("should have the default style from consts as fallback", () => {
            expect(layer.defaultStyle)
                .to.equal(DEFAULT_STYLE);
            expect(((layer as any).middleware).defaultStyle as PathOptions)
                .to.equal(DEFAULT_STYLE);
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.defaultStyle = NEW_DEFAULT_STYLE;
            expect(((layer as any).middleware).defaultStyle as PathOptions)
                .to.equal(NEW_DEFAULT_STYLE);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.defaultStyle = NEW_DEFAULT_STYLE;
            expect(layer.defaultStyle).to.equal(NEW_DEFAULT_STYLE);
        });
        it("should use the default style from consts as fallback in the styler function", (done: Mocha.Done) => {
            const TEST_POINT: GeoJSONFeature<GeoJSON.Point, any> = {
                geometry: {
                    coordinates: [0, 1],
                    type: "Point",
                },
                properties: {},
                type: "Feature",
            };
            layer.styler = ((
                feature: GeoJSONFeature<GeoJSON.Point, any>,
                defaultStyle: PathOptions,
            ): PathOptions => {
                expect(defaultStyle).to.equal(DEFAULT_STYLE);
                done();
                return {};
            }) as any;
            layer.data = {
                features: [TEST_POINT],
                type: "FeatureCollection",
            };
        });
        it("should use the given default style in the styler function", (done: Mocha.Done) => {
            const TEST_POINT: GeoJSONFeature<GeoJSON.Point, any> = {
                geometry: {
                    coordinates: [0, 1],
                    type: "Point",
                },
                properties: {},
                type: "Feature",
            };
            layer.styler = ((
                feature: GeoJSONFeature<GeoJSON.Point, any>,
                defaultStyle: PathOptions,
            ): PathOptions => {
                expect(defaultStyle).to.equal(NEW_DEFAULT_STYLE);
                done();
                return {};
            }) as any;
            layer.defaultStyle = NEW_DEFAULT_STYLE;
            layer.data = {
                features: [TEST_POINT],
                type: "FeatureCollection",
            };
        });
    });
    const testHandle: any = {};
    const testEvent: any = { testHandle };

    describe("(add)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.addEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("add", testEvent);
        });
    });
    describe("(remove)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.removeEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("remove", testEvent);
        });
    });
    describe("(popupopen)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.popupopenEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("popupopen", testEvent);
        });
    });
    describe("(popupclose)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.popupcloseEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("popupclose", testEvent);
        });
    });
    describe("(tooltipopen)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.tooltipopenEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("tooltipopen", testEvent);
        });
    });
    describe("(tooltipclose)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.tooltipcloseEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("tooltipclose", testEvent);
        });
    });
    describe("(click)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.clickEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("click", testEvent);
        });
    });
    describe("(dblclick)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.dblclickEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("dblclick", testEvent);
        });
    });
    describe("(mousedown)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.mousedownEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("mousedown", testEvent);
        });
    });
    describe("(mouseover)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.mouseoverEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("mouseover", testEvent);
        });
    });
    describe("(mouseout)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.mouseoutEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("mouseout", testEvent);
        });
    });
    describe("(contextmenu)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            layer.contextmenuEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("contextmenu", testEvent);
        });
    });

    describe("Popup in GeoJSON Directive", () => {
        let popup: PopupDirective;
        let testDiv: HTMLElement;
        let puLayer: GeoJSONDirective<any>;
        before(() => {
            testDiv = document.createElement("div");
            puLayer = new GeoJSONDirective<any> ({ ref: map }, new LayerGroupProvider(), {} as any);
            popup = new PopupDirective({ nativeElement: testDiv }, { ref: puLayer });
        });
        it("should bind popup", () => {
            expect((puLayer as any)._popup).to.equal(popup);
        });
    });

    describe("Tooltip in GeoJSON Directive", () => {
        let tooltip: TooltipDirective;
        let testDiv: HTMLElement;
        let ttLayer: GeoJSONDirective<any>;
        before(() => {
            testDiv = document.createElement("div");
            ttLayer = new GeoJSONDirective<any> ({ ref: map }, new LayerGroupProvider(), {} as any);
            tooltip = new TooltipDirective({ ref: ttLayer }, { nativeElement: testDiv });
        });
        it("should bind tooltip", () => {
            expect((ttLayer as any)._tooltip).to.equal(tooltip);
        });
    });

    describe("Destroying a GeoJSON Directive", () => {
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
