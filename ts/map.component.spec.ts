import { expect } from "chai";
import { CRS, point } from "leaflet";
import {
    LatLngBounds,
    LayerGroupProvider,
    MapComponent,
    MapProvider,
} from "./index";
import { randomLat, randomLatLngBounds, randomLng, randomNumber } from "./spec";

describe("Map Component", () => {
    let map: MapComponent;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
    });

    describe("[(lat)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomLat();
            map.lat = val;
            expect(map.getCenter().lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomLat();
            map.lat = val;
            expect(map.lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomLat();
            map.setView([val, 0], 0);
            expect(map.lat).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomLat();

            map.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            map.lat = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomLat();

            map.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            map.setView([val, 0], 0);
        });
        it("should threshold rapid changes in Angular when changing in Leaflet", (done: Mocha.Done) => {
            let alreadyFired: boolean = false;

            map.latChange.subscribe(() => {
                /* istanbul ignore if */
                if (alreadyFired) {
                    return done(new Error("Already fired event"));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([randomLat(), 0], 0);
            setTimeout(() => {
                map.setView([randomLat(), 0], 0);
            }, 10);
        });
    });
    describe("[(lng)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomLng();
            map.lng = val;
            expect(map.getCenter().lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomLng();
            map.lng = val;
            expect(map.lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomLng();
            map.setView([0, val], 0);
            expect(map.lng).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomLng();

            map.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            map.lng = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomLng();

            map.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            map.setView([0, val], 0);
        });
        it("should threshold rapid changes in Angular when changing in Leaflet", (done: Mocha.Done) => {
            let alreadyFired: boolean = false;

            map.lngChange.subscribe(() => {
                /* istanbul ignore if */
                if (alreadyFired) {
                    return done(new Error("Already fired event"));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([0, randomLng()], 0);
            setTimeout(() => {
                map.setView([0, randomLng()], 0);
            }, 10);
        });
    });
    describe("[(zoom)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(15, 1, 0);
            map.zoom = val;
            expect(map.getZoom()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(15, 1, 0);
            map.zoom = val;
            expect(map.zoom).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber(15, 1, 0);
            map.setView([0, 0], val);
            expect(map.zoom).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber(15, 1, 0);

            map.zoomChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            map.zoom = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(15, 1, 0);

            map.zoomChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            map.setView([0, 0], val);
        });
        it("should threshold rapid changes in Angular when changing in Leaflet", (done: Mocha.Done) => {
            let alreadyFired: boolean = false;

            map.zoomChange.subscribe(() => {
                /* istanbul ignore if */
                if (alreadyFired) {
                    return done(new Error("Already fired event"));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([0, 0], randomNumber(15, 1, 0));
            setTimeout(() => {
                map.setView([0, 0], randomNumber(15, 1, 0));
            }, 10);
        });
    });
    describe("[(minZoom)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(15, 1, 0);
            map.minZoom = val;
            expect(map.getMinZoom()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(15, 1, 0);
            map.minZoom = val;
            expect(map.minZoom).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber(15, 1, 0);
            map.setMinZoom(val);
            expect(map.minZoom).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber(15, 1, 0);

            map.minZoomChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            map.minZoom = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(15, 1, 0);

            map.minZoomChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            map.setMinZoom(val);
        });
    });
    describe("[(maxZoom)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(15, 1, 0);
            map.maxZoom = val;
            expect(map.getMaxZoom()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(15, 1, 0);
            map.maxZoom = val;
            expect(map.maxZoom).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber(15, 1, 0);
            map.setMaxZoom(val);
            expect(map.maxZoom).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber(15, 1, 0);

            map.maxZoomChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            map.maxZoom = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(15, 1, 0);

            map.maxZoomChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            map.setMaxZoom(val);
        });
    });
    describe("[(maxBounds)]", () => {
        beforeEach(() => {
            // Fix for no browser-test
            (map as any)._size = point(100, 100);
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: LatLngBounds = randomLatLngBounds();
            map.setMaxBounds(val);
            expect(val.equals(map.options.maxBounds as LatLngBounds)).to.equal(true);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: LatLngBounds = randomLatLngBounds();
            map.maxBounds = val;
            expect(val.equals(map.maxBounds)).to.equal(true);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: LatLngBounds = randomLatLngBounds();
            map.setMaxBounds(val);
            expect(val.equals(map.maxBounds)).to.equal(true);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: LatLngBounds = randomLatLngBounds();

            map.maxBoundsChange.subscribe((eventVal: LatLngBounds) => {
                expect(val.equals(eventVal)).to.equal(true);
                return done();
            });

            map.maxBounds = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: LatLngBounds = randomLatLngBounds();

            map.maxBoundsChange.subscribe((eventVal: LatLngBounds) => {
                expect(val.equals(eventVal)).to.equal(true);
                return done();
            });

            map.setMaxBounds(val);
        });
    });

    // Events
    describe("(baselayerchange)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.baselayerchangeEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("baselayerchange", testEvent);
        });
    });
    describe("(overlayadd)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.overlayaddEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("overlayadd", testEvent);
        });
    });
    describe("(overlayremove)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.overlayremoveEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("overlayremove", testEvent);
        });
    });
    describe("(layeradd)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.layeraddEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("layeradd", testEvent);
        });
    });
    describe("(layerremove)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.layerremoveEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("layerremove", testEvent);
        });
    });
    describe("(zoomlevelschange)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.zoomlevelschangeEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("zoomlevelschange", testEvent);
        });
    });
    describe("(resize)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.resizeEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("resize", testEvent);
        });
    });
    describe("(unload)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.unloadEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("unload", testEvent);
        });
    });
    describe("(viewreset)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.viewresetEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("viewreset", testEvent);
        });
    });
    describe("(load)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.loadEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("load", testEvent);
        });
    });
    describe("(zoomstart)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.zoomstartEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("zoomstart", testEvent);
        });
    });
    describe("(movestart)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.movestartEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("movestart", testEvent);
        });
    });
    describe("(zoom)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.zoomEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("zoom", testEvent);
        });
    });
    describe("(move)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.moveEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("move", testEvent);
        });
    });
    describe("(boxzoomstart)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.boxzoomstartEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("boxzoomstart", testEvent);
        });
    });
    describe("(boxzoomend)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.boxzoomendEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("boxzoomend", testEvent);
        });
    });
    describe("(zoomend)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.zoomendEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("zoomend", testEvent);
        });
    });
    describe("(moveend)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.moveendEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("moveend", testEvent);
        });
    });
    describe("(popupopen)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.popupopenEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("popupopen", testEvent);
        });
    });
    describe("(popupclose)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.popupcloseEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("popupclose", testEvent);
        });
    });
    describe("(autopanstart)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.autopanstartEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("autopanstart", testEvent);
        });
    });
    describe("(tooltipopen)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.tooltipopenEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("tooltipopen", testEvent);
        });
    });
    describe("(tooltipclose)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.tooltipcloseEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("tooltipclose", testEvent);
        });
    });
    describe("(click)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.clickEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("click", testEvent);
        });
    });
    describe("(dblclick)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            map.doubleClickZoom.disable();
            const testHandle: any = {};
            const testEvent: any = { testHandle, originalEvent: {shiftKey: false }};
            map.dblclickEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("dblclick", testEvent);
        });
    });
    describe("(mousedown)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.mousedownEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("mousedown", testEvent);
        });
    });
    describe("(mouseup)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.mouseupEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("mouseup", testEvent);
        });
    });
    describe("(mouseover)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.mouseoverEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("mouseover", testEvent);
        });
    });
    describe("(mouseout)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.mouseoutEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("mouseout", testEvent);
        });
    });
    describe("(mousemove)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.mousemoveEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("mousemove", testEvent);
        });
    });
    describe("(contextmenu)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.contextmenuEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("contextmenu", testEvent);
        });
    });
    describe("(keypress)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.keypressEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("keypress", testEvent);
        });
    });
    describe("(preclick)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            map.preclickEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("preclick", testEvent);
        });
    });
    describe("(zoomanim)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle, center: {lat: 1, lng: 1}, zoom: 1 };
            map.zoomanimEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire("zoomanim", testEvent);
        });
    });

    describe("[closePopupOnClick]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.closePopupOnClick = false;
            expect(map.options.closePopupOnClick).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.options.closePopupOnClick = false;
            map.closePopupOnClick = true;
            expect(map.options.closePopupOnClick).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.closePopupOnClick = false;
            expect(map.closePopupOnClick).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.closePopupOnClick = true;
            expect(map.closePopupOnClick).to.equal(true);
        });
    });
    describe("[zoomSnap]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 0, 1);
            map.zoomSnap = val;
            expect(map.options.zoomSnap !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 0, 1);
            map.zoomSnap = val;
            expect(map.zoomSnap !== val).to.equal(false);
        });
    });
    describe("[zoomDelta]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 0, 1);
            map.zoomDelta = val;
            expect(map.options.zoomDelta !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 0, 1);
            map.zoomDelta = val;
            expect(map.zoomDelta !== val).to.equal(false);
        });
    });
    describe("[trackResize]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.trackResize = false;
            expect(map.options.trackResize).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.options.trackResize = false;
            map.trackResize = true;
            expect(map.options.trackResize).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.trackResize = false;
            expect(map.trackResize).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.trackResize = true;
            expect(map.trackResize).to.equal(true);
        });
    });
    describe("[boxZoomEnabled]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.boxZoomEnabled = false;
            expect(map.boxZoom.enabled()).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.boxZoom.disable();
            map.boxZoomEnabled = true;
            expect(map.boxZoom.enabled()).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.boxZoomEnabled = false;
            expect(map.boxZoomEnabled).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.boxZoomEnabled = true;
            expect(map.boxZoomEnabled).to.equal(true);
        });
    });
    describe("[doubleClickZoomEnabled]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.doubleClickZoomEnabled = false;
            expect(map.doubleClickZoom.enabled()).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.doubleClickZoom.disable();
            map.doubleClickZoomEnabled = true;
            expect(map.doubleClickZoom.enabled()).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.doubleClickZoomEnabled = false;
            expect(map.doubleClickZoomEnabled).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.doubleClickZoomEnabled = true;
            expect(map.doubleClickZoomEnabled).to.equal(true);
        });
    });
    describe("[draggingEnabled]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.draggingEnabled = false;
            expect(map.dragging.enabled()).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.dragging.disable();
            map.draggingEnabled = true;
            expect(map.dragging.enabled()).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.draggingEnabled = false;
            expect(map.draggingEnabled).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.draggingEnabled = true;
            expect(map.draggingEnabled).to.equal(true);
        });
    });
    describe("[fadeAnimation]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.fadeAnimation = false;
            expect(map.options.fadeAnimation).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.options.fadeAnimation = false;
            map.fadeAnimation = true;
            expect(map.options.fadeAnimation).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.fadeAnimation = false;
            expect(map.fadeAnimation).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.fadeAnimation = true;
            expect(map.fadeAnimation).to.equal(true);
        });
    });
    describe("[markerZoomAnimation]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.markerZoomAnimation = false;
            expect(map.options.markerZoomAnimation).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.options.markerZoomAnimation = false;
            map.markerZoomAnimation = true;
            expect(map.options.markerZoomAnimation).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.markerZoomAnimation = false;
            expect(map.markerZoomAnimation).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.markerZoomAnimation = true;
            expect(map.fadeAnimation).to.equal(true);
        });
    });
    describe("[transform3DLimit]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.transform3DLimit = val;
            expect(map.options.transform3DLimit !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.transform3DLimit = val;
            expect(map.transform3DLimit !== val).to.equal(false);
        });
    });
    describe("[zoomAnimation]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.zoomAnimation = false;
            expect(map.options.zoomAnimation).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.options.zoomAnimation = false;
            map.zoomAnimation = true;
            expect(map.options.zoomAnimation).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.zoomAnimation = false;
            expect(map.zoomAnimation).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.zoomAnimation = true;
            expect(map.zoomAnimation).to.equal(true);
        });
    });
    describe("[zoomAnimationThreshold]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.zoomAnimationThreshold = val;
            expect(map.options.zoomAnimationThreshold !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.zoomAnimationThreshold = val;
            expect(map.zoomAnimationThreshold !== val).to.equal(false);
        });
    });
    describe("[inertia]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.inertia = false;
            expect(map.options.inertia).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.options.inertia = false;
            map.inertia = true;
            expect(map.options.inertia).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.inertia = false;
            expect(map.inertia).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.inertia = true;
            expect(map.inertia).to.equal(true);
        });
    });
    describe("[inertiaDeceleration]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.inertiaDeceleration = val;
            expect(map.options.inertiaDeceleration !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.inertiaDeceleration = val;
            expect(map.inertiaDeceleration !== val).to.equal(false);
        });
    });
    describe("[inertiaMaxSpeed]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.inertiaMaxSpeed = val;
            expect(map.options.inertiaMaxSpeed !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.inertiaMaxSpeed = val;
            expect(map.inertiaMaxSpeed !== val).to.equal(false);
        });
    });
    describe("[easeLinearity]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.easeLinearity = val;
            expect(map.options.easeLinearity !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.easeLinearity = val;
            expect(map.easeLinearity !== val).to.equal(false);
        });
    });
    describe("[worldCopyJump]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.worldCopyJump = false;
            expect(map.options.worldCopyJump).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.options.worldCopyJump = false;
            map.worldCopyJump = true;
            expect(map.options.worldCopyJump).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.worldCopyJump = false;
            expect(map.worldCopyJump).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.worldCopyJump = true;
            expect(map.worldCopyJump).to.equal(true);
        });
    });
    describe("[maxBoundsViscosity]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.maxBoundsViscosity = val;
            expect(map.options.maxBoundsViscosity !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.maxBoundsViscosity = val;
            expect(map.maxBoundsViscosity !== val).to.equal(false);
        });
    });
    describe("[keyboardEnabled]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.keyboardEnabled = false;
            expect(map.keyboard.enabled()).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.keyboard.disable();
            map.keyboardEnabled = true;
            expect(map.keyboard.enabled()).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.keyboardEnabled = false;
            expect(map.keyboardEnabled).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.keyboardEnabled = true;
            expect(map.keyboardEnabled).to.equal(true);
        });
    });
    describe("[keyboardPanDelta]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.keyboardPanDelta = val;
            expect(map.options.keyboardPanDelta !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.keyboardPanDelta = val;
            expect(map.keyboardPanDelta !== val).to.equal(false);
        });
    });
    describe("[scrollWheelZoomEnabled]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.scrollWheelZoomEnabled = false;
            expect(map.scrollWheelZoom.enabled()).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.scrollWheelZoom.disable();
            map.scrollWheelZoomEnabled = true;
            expect(map.scrollWheelZoom.enabled()).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.scrollWheelZoomEnabled = false;
            expect(map.scrollWheelZoomEnabled).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.scrollWheelZoomEnabled = true;
            expect(map.scrollWheelZoomEnabled).to.equal(true);
        });
    });
    describe("[wheelDebounceTime]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.wheelDebounceTime = val;
            expect(map.options.wheelDebounceTime !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.wheelDebounceTime = val;
            expect(map.wheelDebounceTime !== val).to.equal(false);
        });
    });
    describe("[wheelPxPerZoomLevel]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.wheelPxPerZoomLevel = val;
            expect(map.options.wheelPxPerZoomLevel !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.wheelPxPerZoomLevel = val;
            expect(map.wheelPxPerZoomLevel !== val).to.equal(false);
        });
    });
    describe("[tapTolerance]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.tapTolerance = val;
            expect(map.options.tapTolerance !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(10, 1, 0);
            map.tapTolerance = val;
            expect(map.tapTolerance !== val).to.equal(false);
        });
    });
    describe("[tapEnabled]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.tapEnabled = false;
            expect(map.options.tap).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.options.tap = false;
            map.tapEnabled = true;
            expect(map.options.tap).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.tapEnabled = false;
            expect(map.tapEnabled).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.tapEnabled = true;
            expect(map.tapEnabled).to.equal(true);
        });
    });
    describe("[bounceAtZoomLimits]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.bounceAtZoomLimits = false;
            expect(map.options.bounceAtZoomLimits).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.options.bounceAtZoomLimits = false;
            map.bounceAtZoomLimits = true;
            expect(map.options.bounceAtZoomLimits).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.bounceAtZoomLimits = false;
            expect(map.bounceAtZoomLimits).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.bounceAtZoomLimits = true;
            expect(map.bounceAtZoomLimits).to.equal(true);
        });
    });
    describe("[touchZoomEnabled]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            map.touchZoomEnabled = false;
            expect(map.touchZoom.enabled()).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            map.touchZoom.disable();
            map.touchZoomEnabled = true;
            expect(map.touchZoom.enabled()).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            map.touchZoomEnabled = false;
            expect(map.touchZoomEnabled).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            map.touchZoomEnabled = true;
            expect(map.touchZoomEnabled).to.equal(true);
        });
    });
    describe("[crs]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: CRS = CRS.Simple;
            map.crs = val;
            expect(map.options.crs).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: CRS = CRS.Simple;
            map.crs = val;
            expect(map.crs).to.equal(val);
        });
    });
});
