import { expect } from "chai";
import { latLngBounds, point } from "leaflet";
import {
    AttributionControlDirective,
    EXAMPLE_WMS_LAYER_NAMES,
    EXAMPLE_WMS_LAYER_URL,
    LatLngBoundsExpression,
    LayerGroupProvider,
    MapComponent,
    MapProvider,
    Point,
    WmsLayerDirective,
    WMSParams,
} from "./index";
import { randomNumber } from "./spec";

function hasAsChild(root: HTMLElement, child: HTMLElement): boolean {
    "use strict";
    const length: number = root.children.length;
    for (let i: number = 0; i < length; i += 1) {
        /* istanbul ignore else */
        if (root.children.item(i) === child) {
            return true;
        }
    }
    return false;
}

describe("WMS-Layer Directive", () => {
    let map: MapComponent;
    let layer: WmsLayerDirective;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        layer = new WmsLayerDirective({ ref: map }, {} as any);
    });

    describe("[(display)]", () => {
        it("should remove DOM container when not displaying", () => {
            layer.display = false;
            expect(hasAsChild(layer.getPane()!, (layer as any)._container)).to.equal(false);
        });
        it("should re-add DOM container when display is true again", () => {
            layer.display = false;
            layer.display = true;
            expect(hasAsChild(layer.getPane()!, (layer as any)._container)).to.equal(true);
        });
        it("should remove EventListeners when not displaying", (done: Mocha.Done) => {
            const moveEvents: Array<{fn: () => any}> = (map as any)._events.move;
            const length: number = moveEvents.length;
            /* tslint:disable:no-string-literal */
            const originalEventListener: (event: Event) => void = layer.getEvents!()["move"];
            /* tslint:enable */

            layer.display = false;

            for (let i: number = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (moveEvents[i] && moveEvents[i].fn === originalEventListener) {
                    return done(new Error("There is still an event on listener"));
                }
            }
            done();
        });
        it("should re-add EventListeners when display is true again", (done: Mocha.Done) => {
            const moveEvents: Array<{fn: () => any}> = (map as any)._events.move;
            const length: number = moveEvents.length;
            /* tslint:disable:no-string-literal */
            const originalEventListener: (event: Event) => void = layer.getEvents!()["move"];
            /* tslint:enable */

            layer.display = false;
            layer.display = true;

            for (let i: number = 0; i < length; i += 1) {
                if (moveEvents[i] && moveEvents[i].fn === originalEventListener) {
                    return done();
                }
            }
            /* istanbul ignore next */
            return done(new Error("There is no event on listener"));
        });
        it("should set to false by removing from map", (done: Mocha.Done) => {

            layer.displayChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(false);
                expect(layer.display).to.equal(false);
                done();
            });

            map.removeLayer(layer);
        });
        it("should set to true when adding to map again", (done: Mocha.Done) => {
            map.removeLayer(layer);
            layer.displayChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(true);
                expect(layer.display).to.equal(true);
                done();
            });

            map.addLayer(layer);
        });
    });
    describe("[(url)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.url = EXAMPLE_WMS_LAYER_URL;
            expect(((layer as any)._url as string)).to.equal(EXAMPLE_WMS_LAYER_URL);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.url = EXAMPLE_WMS_LAYER_URL;
            expect(layer.url).to.equal(EXAMPLE_WMS_LAYER_URL);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            layer.setUrl(EXAMPLE_WMS_LAYER_URL);
            expect(layer.url).to.equal(EXAMPLE_WMS_LAYER_URL);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            layer.urlChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(EXAMPLE_WMS_LAYER_URL);
                return done();
            });

            layer.url = EXAMPLE_WMS_LAYER_URL;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            layer.url = EXAMPLE_WMS_LAYER_URL;
            layer.urlChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(EXAMPLE_WMS_LAYER_URL + "?test");
                return done();
            });

            layer.setUrl(EXAMPLE_WMS_LAYER_URL + "?test");
        });
        it("should not emit anything when changing into same url", (done: Mocha.Done) => {
            layer.setUrl(EXAMPLE_WMS_LAYER_URL);
            setTimeout(() => {
                /* istanbul ignore next */
                layer.urlChange.subscribe(() => {
                    return done(new Error("Event fired"));
                });
                layer.setUrl(EXAMPLE_WMS_LAYER_URL);
                return done();
            }, 0);
        });
    });
    describe("[(opacity)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber();
            layer.opacity = val;
            expect(layer.options.opacity).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber();
            layer.opacity = val;
            expect(layer.opacity).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber();
            layer.setOpacity(val);
            expect(layer.opacity).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber();

            layer.opacityChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.opacity = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber();

            layer.opacityChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setOpacity(val);
        });
    });
    describe("[(zIndex)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(255, 0, 0);
            layer.zIndex = val;
            expect(layer.options.zIndex).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(255, 0, 0);
            layer.zIndex = val;
            expect(layer.zIndex).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber(255, 0, 0);
            layer.setZIndex(val);
            expect(layer.zIndex).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber(255, 0, 0);

            layer.zIndexChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.zIndex = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(255, 0, 0);

            layer.zIndexChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setZIndex(val);
        });
    });

    describe("[(layers)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.layers = EXAMPLE_WMS_LAYER_NAMES;
            expect(layer.wmsParams.layers).to.equal(EXAMPLE_WMS_LAYER_NAMES.join(","));
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.layers = EXAMPLE_WMS_LAYER_NAMES;
            expect(layer.layers).to.deep.equal(EXAMPLE_WMS_LAYER_NAMES);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            layer.setParams({layers: EXAMPLE_WMS_LAYER_NAMES.join(",")});
            expect(layer.layers).to.deep.equal(EXAMPLE_WMS_LAYER_NAMES);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            layer.layersChange.subscribe((eventVal: string[]) => {
                expect(eventVal).to.deep.equal(EXAMPLE_WMS_LAYER_NAMES);
                return done();
            });

            layer.layers = EXAMPLE_WMS_LAYER_NAMES;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            layer.layersChange.subscribe((eventVal: string[]) => {
                expect(eventVal).to.deep.equal(EXAMPLE_WMS_LAYER_NAMES);
                return done();
            });

            layer.setParams({layers: EXAMPLE_WMS_LAYER_NAMES.join(",")});
        });
    });
    describe("[(styles)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.styles = EXAMPLE_WMS_LAYER_NAMES;
            expect(layer.wmsParams.styles).to.equal(EXAMPLE_WMS_LAYER_NAMES.join(","));
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.styles = EXAMPLE_WMS_LAYER_NAMES;
            expect(layer.styles).to.deep.equal(EXAMPLE_WMS_LAYER_NAMES);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const params: WMSParams = Object.create(layer.wmsParams);
            params.styles = EXAMPLE_WMS_LAYER_NAMES.join(",");
            layer.setParams(params);
            expect(layer.styles).to.deep.equal(EXAMPLE_WMS_LAYER_NAMES);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            layer.stylesChange.subscribe((eventVal: string[]) => {
                expect(eventVal).to.deep.equal(EXAMPLE_WMS_LAYER_NAMES);
                return done();
            });

            layer.styles = EXAMPLE_WMS_LAYER_NAMES;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            layer.stylesChange.subscribe((eventVal: string[]) => {
                expect(eventVal).to.deep.equal(EXAMPLE_WMS_LAYER_NAMES);
                return done();
            });
            const params: WMSParams = Object.create(layer.wmsParams);
            params.styles = EXAMPLE_WMS_LAYER_NAMES.join(",");
            layer.setParams(params);
        });
    });
    describe("[(transparent)]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.transparent = false;
            expect(layer.wmsParams.transparent).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.wmsParams.transparent = false;
            layer.transparent = true;
            expect(layer.wmsParams.transparent).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.transparent = false;
            expect(layer.transparent).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.transparent = true;
            expect(layer.transparent).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Leaflet to false", () => {
            const params: WMSParams = Object.create(layer.wmsParams);
            params.transparent = false;
            layer.setParams(params);
            expect(layer.transparent).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Leaflet to true", () => {
            const params: WMSParams = Object.create(layer.wmsParams);
            params.transparent = true;
            layer.setParams(params);
            expect(layer.transparent).to.equal(true);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            layer.transparentChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(true);
                return done();
            });

            layer.transparent = true;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            layer.layers = EXAMPLE_WMS_LAYER_NAMES;
            layer.transparentChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(true);
                return done();
            });

            const params: WMSParams = Object.create(layer.wmsParams);
            params.transparent = true;
            layer.setParams(params);
        });
    });
    describe("[(format)]", () => {
        const FORMAT: string = "image/png";
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.format = FORMAT;
            expect(layer.wmsParams.format).to.equal(FORMAT);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.format = FORMAT;
            expect(layer.format).to.equal(FORMAT);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const params: WMSParams = Object.create(layer.wmsParams);
            params.format = FORMAT;
            layer.setParams(params);
            expect(layer.format).to.equal(FORMAT);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            layer.formatChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(FORMAT);
                return done();
            });

            layer.format = FORMAT;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            layer.formatChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(FORMAT);
                return done();
            });
            const params: WMSParams = Object.create(layer.wmsParams);
            params.format = FORMAT;
            layer.setParams(params);
        });
    });
    describe("[(version)]", () => {
        const VERSION: string = "1.0.0";
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.version = VERSION;
            expect(layer.wmsParams.version).to.equal(VERSION);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.version = VERSION;
            expect(layer.version).to.equal(VERSION);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const params: WMSParams = Object.create(layer.wmsParams);
            params.version = VERSION;
            layer.setParams(params);
            expect(layer.version).to.equal(VERSION);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            layer.versionChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(VERSION);
                return done();
            });

            layer.version = VERSION;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            layer.versionChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(VERSION);
                return done();
            });
            const params: WMSParams = Object.create(layer.wmsParams);
            params.version = VERSION;
            layer.setParams(params);
        });
    });

    // Events
    describe("(add)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.addEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire("contextmenu", testEvent);
        });
    });
    describe("(loading)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.loadingEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire("loading", testEvent);
        });
    });
    describe("(tileunload)", () => {
        beforeEach(() => {
            layer.off("tileunload", (layer as any)._onTileRemove); // Hack to disable another listener
        });
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.tileunloadEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire("tileunload", testEvent);
        });
    });
    describe("(tileloadstart)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.tileloadstartEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire("tileloadstart", testEvent);
        });
    });
    describe("(tileerror)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.tileerrorEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire("tileerror", testEvent);
        });
    });
    describe("(tileload)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            let called: boolean; // this event is called multiple times in the life-circle of leaflet
            setTimeout(() => {
                layer.tileloadEvent.subscribe((event: any) => {
                    /* istanbul ignore if */
                    if (called) {
                        return;
                    }
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    called = true;
                    return done();
                });
                layer.fire("tileload", testEvent);
            }, 1);
        });
    });
    describe("(load)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { target: layer, testHandle, type: "load" };
            let called: boolean; // this event is called multiple times in the life-circle of leaflet
            setTimeout(() => {
                layer.loadEvent.subscribe((event: any) => {
                    /* istanbul ignore if */
                    if (called) {
                        return;
                    }
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    called = true;
                    return done();
                });
                layer.fire("load", testEvent);
            }, 1);
        });
    });

    // Inputs
    describe("[tileSize]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const num: number = randomNumber(1000, 1, 0);
            const val: Point = point(num, num);
            layer.tileSize = val;
            expect(layer.options.tileSize).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const num: number = randomNumber(1000, 1, 0);
            const val: Point = point(num, num);
            layer.tileSize = val;
            expect(layer.tileSize).to.equal(val);
        });
    });
    describe("[bounds]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const num: number = randomNumber(1000, 1, 0);
            const val: LatLngBoundsExpression = latLngBounds([num, num], [num, num]);
            layer.bounds = val;
            expect(layer.options.bounds).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const num: number = randomNumber(1000, 1, 0);
            const val: LatLngBoundsExpression = latLngBounds([num, num], [num, num]);
            layer.bounds = val;
            expect(layer.bounds).to.equal(val);
        });
    });
    describe("[subdomains]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string[] = ["a", "b", "c", "d"];
            layer.subdomains = val;
            expect(layer.options.subdomains).to.deep.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string[] = ["a", "b", "c", "d"];
            layer.subdomains = val;
            expect(layer.subdomains).to.deep.equal(val);
        });
        it("should get an array of strings even if it has a string value", () => {
            const val: string = "abcdefg";
            layer.options.subdomains = val;
            expect(layer.subdomains).to.deep.equal(val.split(""));
        });
    });
    describe("[className]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "test-class";
            layer.className = val;
            expect(layer.options.className).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string = "test-class";
            layer.className = val;
            expect(layer.className).to.equal(val);
        });
    });
    describe("[errorTileUrl]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "http://test";
            layer.errorTileUrl = val;
            expect(layer.options.errorTileUrl).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string = "http://test";
            layer.errorTileUrl = val;
            expect(layer.errorTileUrl).to.equal(val);
        });
    });
    describe("[updateInterval]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(100, 1, 0);
            layer.updateInterval = val;
            expect(layer.options.updateInterval).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(100, 1, 0);
            layer.updateInterval = val;
            expect(layer.updateInterval).to.equal(val);
        });
    });
    describe("[keepBuffer]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(100, 1, 0);
            layer.keepBuffer = val;
            expect(layer.options.keepBuffer).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(100, 1, 0);
            layer.keepBuffer = val;
            expect(layer.keepBuffer).to.equal(val);
        });
    });
    describe("[maxZoom]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(20, 0, 0);
            layer.maxZoom = val;
            expect(layer.options.maxZoom).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(20, 0, 0);
            layer.maxZoom = val;
            expect(layer.maxZoom).to.equal(val);
        });
    });
    describe("[minZoom]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(5, 0, 0);
            layer.minZoom = val;
            expect(layer.options.minZoom).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(5, 0, 0);
            layer.minZoom = val;
            expect(layer.minZoom).to.equal(val);
        });
    });
    describe("[maxNativeZoom]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(100, 1, 0);
            layer.maxNativeZoom = val;
            expect(layer.options.maxNativeZoom).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(100, 1, 0);
            layer.maxNativeZoom = val;
            expect(layer.maxNativeZoom).to.equal(val);
        });
    });
    describe("[minNativeZoom]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = Math.ceil(Math.random() * 5);
            layer.minNativeZoom = val;
            expect(layer.options.minNativeZoom).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = Math.ceil(Math.random() * 5);
            layer.minNativeZoom = val;
            expect(layer.minNativeZoom).to.equal(val);
        });
    });
    describe("[zoomOffset]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(100, 1, 0);
            layer.zoomOffset = val;
            expect(layer.options.zoomOffset).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(100, 1, 0);
            layer.zoomOffset = val;
            expect(layer.zoomOffset).to.equal(val);
        });
    });
    describe("[tms]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.tms = false;
            expect(layer.options.tms).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.options.tms = false;
            layer.tms = true;
            expect(layer.options.tms).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.tms = false;
            expect(layer.tms).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.tms = true;
            expect(layer.tms).to.equal(true);
        });
    });
    describe("[zoomReverse]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.zoomReverse = false;
            expect(layer.options.zoomReverse).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.options.zoomReverse = false;
            layer.zoomReverse = true;
            expect(layer.options.zoomReverse).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.zoomReverse = false;
            expect(layer.zoomReverse).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.zoomReverse = true;
            expect(layer.zoomReverse).to.equal(true);
        });
    });
    describe("[detectRetina]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.detectRetina = false;
            expect(layer.options.detectRetina).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.options.detectRetina = false;
            layer.detectRetina = true;
            expect(layer.options.detectRetina).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.detectRetina = false;
            expect(layer.detectRetina).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.detectRetina = true;
            expect(layer.detectRetina).to.equal(true);
        });
    });
    describe("[crossOrigin]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.crossOrigin = false;
            expect(layer.options.crossOrigin).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.options.crossOrigin = false;
            layer.crossOrigin = true;
            expect(layer.options.crossOrigin).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.crossOrigin = false;
            expect(layer.crossOrigin).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.crossOrigin = true;
            expect(layer.crossOrigin).to.equal(true);
        });
    });
    describe("[updateWhenIdle]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.updateWhenIdle = false;
            expect(layer.options.updateWhenIdle).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.options.updateWhenIdle = false;
            layer.updateWhenIdle = true;
            expect(layer.options.updateWhenIdle).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.updateWhenIdle = false;
            expect(layer.updateWhenIdle).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.updateWhenIdle = true;
            expect(layer.updateWhenIdle).to.equal(true);
        });
    });
    describe("[updateWhenZooming]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.updateWhenZooming = false;
            expect(layer.options.updateWhenZooming).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.options.updateWhenZooming = false;
            layer.updateWhenZooming = true;
            expect(layer.options.updateWhenZooming).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.updateWhenZooming = false;
            expect(layer.updateWhenZooming).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.updateWhenZooming = true;
            expect(layer.updateWhenZooming).to.equal(true);
        });
    });
    describe("[noWrap]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.noWrap = false;
            expect(layer.options.noWrap).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.options.noWrap = false;
            layer.noWrap = true;
            expect(layer.options.noWrap).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.noWrap = false;
            expect(layer.noWrap).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.noWrap = true;
            expect(layer.noWrap).to.equal(true);
        });
    });
    describe("[uppercase]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.uppercase = false;
            expect(layer.options.uppercase).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.options.uppercase = false;
            layer.uppercase = true;
            expect(layer.options.uppercase).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.uppercase = false;
            expect(layer.uppercase).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.uppercase = true;
            expect(layer.uppercase).to.equal(true);
        });
    });
    describe("[attribution]", () => {
        let attributionControl: AttributionControlDirective;
        beforeEach(() => {
            attributionControl = new AttributionControlDirective({ ref: map });
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "Test attribution";
            layer.attribution = val;
            expect(layer.options.attribution).to.equal(val);
            expect(attributionControl.attributions).to.contain(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string = "Test attribution";
            layer.attribution = val;
            expect(layer.attribution).to.equal(val);
            expect(attributionControl.attributions).to.contain(val);
        });
        it("should remove old attribution when changing in Angular", () => {
            const oldVal: string = "Old test attribution";
            const newVal: string = "Test attribution";
            layer.attribution = oldVal;
            layer.attribution = newVal;
            expect(attributionControl.attributions).to.contain(newVal);
            expect(attributionControl.attributions).to.not.contain(oldVal);
        });
    });
    describe("Destroying a WMS-Layer Directive", () => {
        it("should remove WMS-Layer Directive from map on destroy", () => {
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
