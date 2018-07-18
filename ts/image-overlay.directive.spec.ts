import { expect } from "chai";
import { latLngBounds, point } from "leaflet";
import {
    AttributionControlDirective,
    IMAGE_OVERLAY_URL,
    ImageOverlayDirective,
    LatLngBounds,
    LayerGroupProvider,
    MapComponent,
    MapProvider,
} from "./index";
import { randomLatLngBounds, randomNumber } from "./spec";

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

describe("Image-Overlay Directive", () => {
    let map: MapComponent;
    let layer: ImageOverlayDirective;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        layer = new ImageOverlayDirective({ ref: map }, {} as any);
    });

    describe("[(display)]", () => {
        it("should remove DOM container when not displaying", () => {
            layer.display = false;
            expect(hasAsChild(layer.getPane()!, layer.getElement()!)).to.equal(false);
        });
        it("should re-add DOM container when display is true again", () => {
            layer.display = false;
            layer.display = true;

            expect(hasAsChild(layer.getPane()!, layer.getElement()!)).to.equal(true);
        });
        it("should remove EventListeners when not displaying", (done: Mocha.Done) => {
            const zoomEvents: Array<{fn: () => any}> = (map as any)._events.zoom;
            const length: number = zoomEvents.length;
            /* tslint:disable:no-string-literal */
            const originalEventListener: (event: Event) => void = layer.getEvents!()["zoom"];
            /* tslint:enable */

            layer.display = false;

            for (let i: number = 0; i < length; i += 1) { // TODO: for is not looping!
                /* istanbul ignore if */
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done(new Error("There is still an event on listener"));
                }
                return done();
            }
        });
        it("should re-add EventListeners when display is true again", (done: Mocha.Done) => {
            const zoomEvents: Array<{fn: () => any}> = (map as any)._events.zoom;
            const length: number = zoomEvents.length;
            /* tslint:disable:no-string-literal */
            const originalEventListener: (event: Event) => void = layer.getEvents!()["zoom"];
            /* tslint:enable */

            layer.display = false;
            layer.display = true;

            for (let i: number = 0; i < length; i += 1) { // TODO: for is not looping!
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done();
                }
            }
            /* istanbul ignore next */
            return done(new Error("There is no event on listener"));
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
    describe("[(url)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            layer.url = IMAGE_OVERLAY_URL;
            expect(((layer as any)._url as string)).to.equal(IMAGE_OVERLAY_URL);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.url = IMAGE_OVERLAY_URL;
            expect(layer.url).to.equal(IMAGE_OVERLAY_URL);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            layer.setUrl(IMAGE_OVERLAY_URL);
            expect(layer.url).to.equal(IMAGE_OVERLAY_URL);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            layer.urlChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(IMAGE_OVERLAY_URL);
                return done();
            });

            layer.url = IMAGE_OVERLAY_URL;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            layer.url = IMAGE_OVERLAY_URL;
            layer.urlChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(IMAGE_OVERLAY_URL + "?test");
                return done();
            });

            layer.setUrl(IMAGE_OVERLAY_URL + "?test");
        });
        it("should not emit anything when changing into same url", (done: Mocha.Done) => {
            layer.setUrl(IMAGE_OVERLAY_URL);
            setTimeout(() => {
                /* istanbul ignore next */
                layer.urlChange.subscribe(() => {
                    return done(new Error("Event fired"));
                });
                layer.setUrl(IMAGE_OVERLAY_URL);
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
            expect(layer.options.opacity).to.equal(val);
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
    describe("[(bounds)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: LatLngBounds = randomLatLngBounds();
            layer.bounds = val;
            expect(layer.getBounds()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: LatLngBounds = randomLatLngBounds();
            layer.bounds = val;
            expect(layer.bounds).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: LatLngBounds = randomLatLngBounds();
            layer.setBounds(val);
            expect(layer.bounds).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: LatLngBounds = randomLatLngBounds();

            layer.boundsChange.subscribe((eventVal: LatLngBounds) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.bounds = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: LatLngBounds = randomLatLngBounds();

            layer.boundsChange.subscribe((eventVal: LatLngBounds) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setBounds(val);
        });
    });

    describe("[(north)]", () => {
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
                return done();
            });

            layer.north = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(90);

            layer.northChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setBounds([
                [0, 0],
                [val, 0],
            ]);
        });
    });
    describe("[(east)]", () => {
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
                return done();
            });

            layer.east = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(180);

            layer.eastChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setBounds([
                [0, val],
                [0, 0],
            ]);
        });
    });
    describe("[(south)]", () => {
        beforeEach(() => {
            layer.setBounds(latLngBounds([
                [0, 0],
                [1, 1],
            ]));
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
                return done();
            });

            layer.south = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(0, -90);

            layer.southChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setBounds([
                [val, 0],
                [1, 1],
            ]);
        });
    });
    describe("[(west)]", () => {
        beforeEach(() => {
            layer.setBounds(latLngBounds([
                [0, 0],
                [1, 1],
            ]));
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
                return done();
            });

            layer.west = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber(0, -180);

            layer.westChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setBounds([
                [0, val],
                [1, 1],
            ]);
        });
    });

    // Events
    describe("(add)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.addEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
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
    describe("(load)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.loadEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire("load", testEvent);
        });
    });
    describe("(error)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.errorEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testEvent.testHandle);
                expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire("error", testEvent);
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
    describe("[interactive]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.interactive = false;
            expect(layer.options.interactive).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.options.interactive = false;
            layer.interactive = true;
            expect(layer.options.interactive).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.interactive = false;
            expect(layer.interactive).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.interactive = true;
            expect(layer.interactive).to.equal(true);
        });
    });
    describe("[alt]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "Test alt";
            layer.alt = val;
            expect(layer.options.alt !== val || layer.getElement()!.getAttribute("alt") !== val).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string = "Test alt";
            layer.alt = val;
            expect(layer.alt !== val).to.equal(false);
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

    describe("Destroying a Image-Overlay Directive", () => {
        it("should remove Image-Overlay Directive from map on destroy", () => {
            expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            expect(map.hasLayer(layer)).to.equal(false);
        });
    });

});
