import { expect } from "chai";
import { Feature as GeoJSONFeature } from "geojson";
import { latLng, point, SVG } from "leaflet";
import {
    CircleDirective,
    LatLng,
    LatLngExpression,
    LayerGroupProvider,
    MapComponent,
    MapProvider,
    PopupDirective,
    TooltipDirective,
} from "./index";
import { createPathTests } from "./path-directives.spec";
import { randomLat, randomLng, randomNumber } from "./spec";

describe("Circle Directive", () => {
    let map: MapComponent;
    let layer: CircleDirective<any>;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        (map as any)._renderer = (map as any)._renderer || new SVG();

        layer = new CircleDirective<any>({ref: map}, {} as any);
        layer.ngAfterContentInit();
    });

    createPathTests(CircleDirective);

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
    describe("[(position)]", () => {
        const TEST_VALUE: LatLng = latLng(0, 1);

        it("should be changed in Leaflet when changing in Angular", () => {
            layer.position = TEST_VALUE;
            expect((layer as any)._latlng).to.equal(TEST_VALUE);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.position = TEST_VALUE;
            expect(layer.position).to.equal(TEST_VALUE);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            layer.setLatLng(TEST_VALUE);
            expect(layer.position).to.equal(TEST_VALUE);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.equal(TEST_VALUE);
                return done();
            });

            layer.position = TEST_VALUE;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.equal(TEST_VALUE);
                return done();
            });

            layer.setLatLng(TEST_VALUE);
        });
        it("should fire geoJSON-change event when changing in Angular", (done: Mocha.Done) => {
            layer.geoJSONChange.subscribe(() => {
                return done();
            });
            layer.position = TEST_VALUE;
        });
        it("should fire geoJSON-change event when changing in Leaflet", (done: Mocha.Done) => {
            layer.geoJSONChange.subscribe(() => {
                return done();
            });
            layer.setLatLng(TEST_VALUE);
        });
    });

    describe("[(lat)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomLat();
            layer.lat = val;
            expect(layer.getLatLng().lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomLat();
            layer.lat = val;
            expect(layer.lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomLat();
            layer.setLatLng([val, 0]);
            expect(layer.lat).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomLat();

            layer.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.lat = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomLat();

            layer.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setLatLng([val, 0]);
        });
    });
    describe("[(lng)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomLng();
            layer.lng = val;
            expect(layer.getLatLng().lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomLng();
            layer.lng = val;
            expect(layer.lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomLng();
            layer.setLatLng([0, val]);
            expect(layer.lng).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomLng();

            layer.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.lng = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomLng();

            layer.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setLatLng([0, val]);
        });
    });
    describe("[(radius)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(100);
            layer.radius = val;
            expect(layer.getRadius()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(100);
            layer.radius = val;
            expect(layer.radius).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber(100);
            layer.setRadius(val);
            expect(layer.radius).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber(100);

            layer.radiusChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.radius = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(100);

            layer.radiusChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setRadius(val);
        });
    });

    describe("[(geoJSON)]", () => {
        const TEST_VALUE: GeoJSONFeature<GeoJSON.Point, any> = {
            geometry: {
                coordinates: [1, 3],
                type: "Point",
            },
            properties: {},
            type: "Feature",
        };
        const TEST_POINT: LatLngExpression = [3, 4];
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.geoJSON = TEST_VALUE;
            expect((layer.position as LatLng).lng).to.equal(TEST_VALUE.geometry.coordinates[0]);
            expect((layer.position as LatLng).lat).to.equal(TEST_VALUE.geometry.coordinates[1]);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.geoJSON = TEST_VALUE;
            expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
        });
        it("should be changed geoJSON in Angular when changing in latlngs Leaflet", () => {
            layer.setLatLng(TEST_POINT);
            expect(layer.geoJSON.geometry.coordinates[0]).to.equal(TEST_POINT[1]);
            expect(layer.geoJSON.geometry.coordinates[1]).to.equal(TEST_POINT[0]);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.Point, any>) => {
                expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });

            layer.geoJSON = TEST_VALUE;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.Point, any>) => {
                expect(eventVal.geometry.coordinates[0]).to.equal(TEST_POINT[1]);
                expect(eventVal.geometry.coordinates[1]).to.equal(TEST_POINT[0]);
                return done();
            });

            layer.setLatLng(TEST_POINT);
        });
    });

    describe("[properties]", () => {
        interface ITestProperties {
            test: string;
        }
        const TEST_OBJECT: ITestProperties = {
            test: "OK",
        };
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.properties = TEST_OBJECT;
            expect(layer.feature.properties).to.equal(TEST_OBJECT);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.properties = TEST_OBJECT;
            expect(layer.properties).to.equal(TEST_OBJECT);
        });
        it("should emit an event for GeoJSONChange when changing in Angular", (done: Mocha.Done) => {
            /* tslint:disable:max-line-length */
            layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.GeometryObject, ITestProperties>) => {
                expect(eventVal.properties).to.equal(TEST_OBJECT);
                return done();
            });
            /* tslint:enable */
            layer.properties = TEST_OBJECT;
        });
    });

    describe("Popup in Circle Directive", () => {
        let layerWithPopup: CircleDirective<any>;
        let popup: PopupDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement("div");
            layerWithPopup = new CircleDirective<any>({ ref: map }, {} as any);
            popup = new PopupDirective({ nativeElement: testDiv }, { ref: layerWithPopup });
        });
        it("should bind popup", () => {
            expect((layerWithPopup as any)._popup).to.equal(popup);
        });
    });

    describe("Tooltip in Circle Directive", () => {
        let layerWithTooltip: CircleDirective<any>;
        let tooltip: TooltipDirective;
        let testDiv: HTMLElement;
        before(() => {
            map = new MapComponent(
                {nativeElement: document.createElement("div")},
                new LayerGroupProvider(),
                new MapProvider(),
            );
            (map as any)._size = point(100, 100);
            (map as any)._pixelOrigin = point(50, 50);
            (map as any)._renderer = (map as any)._renderer || new SVG();
            testDiv = document.createElement("div");
            layerWithTooltip = new CircleDirective<any>({ ref: map }, {} as any);
            tooltip = new TooltipDirective({ ref: layerWithTooltip }, { nativeElement: testDiv });
            layerWithTooltip.ngAfterContentInit();
        });
        it("should bind tooltip", () => {
            expect((layerWithTooltip as any)._tooltip).to.equal(tooltip);
        });
    });

    describe("Destroying a Circle Directive", () => {
        it("should remove Circle Directive from map on destroy", () => {
            expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
