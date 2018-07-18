import { expect } from "chai";
import { Feature as GeoJSONFeature } from "geojson";
import { latLng, point, SVG } from "leaflet";
import {
    CircleMarkerDirective,
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

describe("Circle-Marker Directive", () => {
    let map: MapComponent;
    let layer: CircleMarkerDirective<any>;
    const TEST_VALUE: LatLng = latLng(0, 1);
    const TEST_POINT: LatLngExpression = [3, 4];
    const TEST_GEOJSON: GeoJSONFeature<GeoJSON.Point, any> = {
        geometry: {
            coordinates: [1, 3],
            type: "Point",
        },
        properties: {},
        type: "Feature",
    };
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        (map as any)._renderer = (map as any)._renderer || new SVG();

        layer = new CircleMarkerDirective<any>({ ref: map }, {} as any);
        layer.ngAfterContentInit();
    });

    createPathTests(CircleMarkerDirective);

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
                done();
            });

            layer.position = TEST_VALUE;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.equal(TEST_VALUE);
                done();
            });

            layer.setLatLng(TEST_VALUE);
        });
        it("should fire geoJSON-change event when changing in Angular", (done: Mocha.Done) => {
            layer.geoJSONChange.subscribe(() => {
                done();
            });
            layer.position = TEST_VALUE;
        });
        it("should fire geoJSON-change event when changing in Leaflet", (done: Mocha.Done) => {
            layer.geoJSONChange.subscribe(() => {
                done();
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
                done();
            });

            layer.lat = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomLat();

            layer.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
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
                done();
            });

            layer.lng = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomLng();

            layer.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
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
                done();
            });

            layer.radius = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(100);

            layer.radiusChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            layer.setRadius(val);
        });
    });

    describe("[(geoJSON)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.geoJSON = TEST_GEOJSON;
            expect(
                (layer.position as LatLng).lng,
            ).to.equal(TEST_GEOJSON.geometry.coordinates[0]);
            expect(
                (layer.position as LatLng).lat,
            ).to.equal(TEST_GEOJSON.geometry.coordinates[1]);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.geoJSON = TEST_GEOJSON;
            expect(
                layer.geoJSON.geometry.coordinates[0],
            ).to.equal(TEST_GEOJSON.geometry.coordinates[0]);
            expect(
                layer.geoJSON.geometry.coordinates[1],
            ).to.equal(TEST_GEOJSON.geometry.coordinates[1]);
        });
        it("should be changed geoJSON in Angular when changing in latlngs Leaflet", () => {
            layer.setLatLng(TEST_POINT);
            expect(
                layer.geoJSON.geometry.coordinates[0],
            ).to.equal(TEST_POINT[1]);
            expect(
                layer.geoJSON.geometry.coordinates[1],
            ).to.equal(TEST_POINT[0]);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.Point, any>) => {
                expect(
                    eventVal.geometry.coordinates[0],
                ).to.equal(TEST_GEOJSON.geometry.coordinates[0]);
                expect(
                    eventVal.geometry.coordinates[1],
                ).to.equal(TEST_GEOJSON.geometry.coordinates[1]);
                done();
            });

            layer.geoJSON = TEST_GEOJSON;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            layer.geoJSONChange.subscribe((eventVal: GeoJSONFeature<GeoJSON.Point, any>) => {
                const values: [number, number] = (eventVal.geometry.coordinates as any);

                expect(values[0]).to.equal(TEST_POINT[1]);
                expect(values[1]).to.equal(TEST_POINT[0]);
                done();
            });

            layer.setLatLng(TEST_POINT);
        });
    });

    describe("[properties]", () => {
        interface ITestProperties {
            test: string;
        }
        let layerWithProps: CircleMarkerDirective<ITestProperties>;
        const TEST_OBJECT: ITestProperties = {
            test: "OK",
        };
        beforeEach(() => {
            layerWithProps = new CircleMarkerDirective<any>({ ref: map }, {} as any);
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            layerWithProps.properties = TEST_OBJECT;
            expect(layerWithProps.feature.properties).to.equal(TEST_OBJECT);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layerWithProps.properties = TEST_OBJECT;
            expect(layerWithProps.properties).to.equal(TEST_OBJECT);
        });
        it("should emit an event for GeoJSONChange when changing in Angular", (done: Mocha.Done) => {
            layerWithProps.geoJSONChange.subscribe(
                (val: GeoJSONFeature<GeoJSON.GeometryObject, ITestProperties>) => {
                    expect(val.properties).to.equal(TEST_OBJECT);
                    done();
                },
            );
            layerWithProps.properties = TEST_OBJECT;
        });
    });

    // Events
    describe("(add)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.addEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("add", testEvent);
        });
    });
    describe("(remove)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.removeEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("remove", testEvent);
        });
    });
    describe("(popupopen)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.popupopenEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("popupopen", testEvent);
        });
    });
    describe("(popupclose)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.popupcloseEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("popupclose", testEvent);
        });
    });
    describe("(tooltipopen)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.tooltipopenEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("tooltipopen", testEvent);
        });
    });
    describe("(tooltipclose)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.tooltipcloseEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("tooltipclose", testEvent);
        });
    });
    describe("(click)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.clickEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("click", testEvent);
        });
    });
    describe("(dblclick)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.dblclickEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("dblclick", testEvent);
        });
    });
    describe("(mousedown)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.mousedownEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("mousedown", testEvent);
        });
    });
    describe("(mouseover)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.mouseoverEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("mouseover", testEvent);
        });
    });
    describe("(mouseout)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.mouseoutEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("mouseout", testEvent);
        });
    });
    describe("(contextmenu)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.contextmenuEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("contextmenu", testEvent);
        });
    });

    describe("Popup in Circle Directive", () => {
        let popup: PopupDirective;
        let testDiv: HTMLElement;

        beforeEach(() => {
            testDiv = document.createElement("div");
            layer = new CircleMarkerDirective<any>({ ref: map }, {} as any);
            popup = new PopupDirective({ nativeElement: testDiv }, { ref: layer });
        });
        it("should bind popup", () => {
            layer.ngAfterContentInit();
            expect((layer as any)._popup).to.equal(popup);
        });
    });

    describe("Tooltip in Circle Directive", () => {
        let tooltip: TooltipDirective;
        let testDiv: HTMLElement;
        beforeEach(() => {
            testDiv = document.createElement("div");
            layer = new CircleMarkerDirective<any>({ ref: map }, {} as any);
            tooltip = new TooltipDirective({ ref: layer }, { nativeElement: testDiv });
        });
        it("should bind tooltip", () => {
            expect((layer as any)._tooltip).to.equal(tooltip);
        });
    });

    describe("Destroying a Circle Directive", () => {
        before(() => {
            // Hack to get write-access to readonly property
            layer = new CircleMarkerDirective<any>({ ref: map }, {} as any);
        });
        it("should remove Circle Directive from map on destroy", () => {
            expect(map.hasLayer(layer)).to.equal(true);

            layer.ngOnDestroy();

            expect(map.hasLayer(layer)).to.equal(false);
        });
    });

});
