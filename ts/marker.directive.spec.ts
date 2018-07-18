import { expect } from "chai";
import { point } from "leaflet";
import {
    IconDirective,
    LatLng,
    LayerGroupProvider,
    MapComponent,
    MapProvider,
    MarkerDirective,
    PopupDirective,
    TooltipDirective,
    TRANSPARENT_PIXEL,
} from "./index";
import { randomLat, randomLatLng, randomLng, randomNumber } from "./spec";

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

describe("Marker Directive", () => {
    let map: MapComponent;
    let layer: MarkerDirective;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        layer = new MarkerDirective({ ref: map }, {} as any, {} as any);
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

            for (let i: number = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done(new Error("There is still an event on listener"));
                }
            }
            done();
        });
        it("should re-add EventListeners when display is true again", (done: Mocha.Done) => {
            const zoomEvents: Array<{fn: () => any}> = (map as any)._events.zoom;
            const length: number = zoomEvents.length;
            /* tslint:disable:no-string-literal */
            const originalEventListener: (event: Event) => void = layer.getEvents!()["zoom"];
            /* tslint:enable */

            layer.display = false;
            layer.display = true;

            for (let i: number = 0; i < length; i += 1) {
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done();
                }
            }
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
    describe("[(popupOpened)]", () => {
        beforeEach(() => {
            layer.bindPopup("test-popup");
        });
        it("should be opened in Leaflet when changing in Angular", () => {
            layer.popupOpened = true;
            expect(layer.isPopupOpen()).to.equal(true);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.popupOpened = true;
            expect(layer.popupOpened).to.equal(true);
        });
        it("should be changed in Angular when opened in Leaflet", () => {
            layer.openPopup();
            expect(layer.popupOpened).to.equal(true);
        });
        it("should fire an event when opening in Angular", (done: Mocha.Done) => {
            layer.popupOpenedChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(true);
                return done();
            });

            layer.popupOpened = true;
        });
        it("should fire an event when opening in Leaflet", (done: Mocha.Done) => {
            layer.popupOpenedChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(true);
                return done();
            });

            layer.openPopup();
        });
        // closing after opening
        it("should be closed in Leaflet when changing in Angular", () => {
            layer.popupOpened = true;
            layer.popupOpened = false;
            expect(layer.isPopupOpen()).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.popupOpened = true;
            layer.popupOpened = false;
            expect(layer.popupOpened).to.equal(false);
        });
        it("should be changed in Angular when closing in Leaflet", () => {
            layer.openPopup();
            layer.closePopup();
            expect(layer.popupOpened).to.equal(false);
        });
        it("should fire an event when opening in Angular", (done: Mocha.Done) => {
            layer.popupOpened = true;
            layer.popupOpenedChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(false);
                return done();
            });

            layer.popupOpened = false;
        });
        it("should fire an event when closing in Leaflet", (done: Mocha.Done) => {
            layer.openPopup();
            layer.popupOpenedChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(false);
                return done();
            });
            layer.closePopup();
        });
    });

    describe("[(tooltipOpened)]", () => {
        beforeEach(() => {
            layer.bindTooltip("test-tooltip");
        });
        it("should be opened in Leaflet when changing in Angular", () => {
            layer.tooltipOpened = true;
            expect(layer.isTooltipOpen()).to.equal(true);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.tooltipOpened = true;
            expect(layer.tooltipOpened).to.equal(true);
        });
        it("should be changed in Angular when opened in Leaflet", () => {
            layer.openTooltip();
            expect(layer.tooltipOpened).to.equal(true);
        });
        it("should fire an event when opening in Angular", (done: Mocha.Done) => {
            layer.tooltipOpenedChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(true);
                return done();
            });

            layer.tooltipOpened = true;
        });
        it("should fire an event when opening in Leaflet", (done: Mocha.Done) => {
            layer.tooltipOpenedChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(true);
                return done();
            });

            layer.openTooltip();
        });
        // closing after opening
        it("should be closed in Leaflet when changing in Angular", () => {
            layer.tooltipOpened = true;
            layer.tooltipOpened = false;
            expect(layer.isTooltipOpen()).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", () => {
            layer.tooltipOpened = true;
            layer.tooltipOpened = false;
            expect(layer.tooltipOpened).to.equal(false);
        });
        it("should be changed in Angular when closing in Leaflet", () => {
            layer.openTooltip();
            layer.closeTooltip();
            expect(layer.tooltipOpened).to.equal(false);
        });
        it("should fire an event when opening in Angular", (done: Mocha.Done) => {
            layer.tooltipOpened = true;
            layer.tooltipOpenedChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(false);
                return done();
            });

            layer.tooltipOpened = false;
        });
        it("should fire an event when closing in Leaflet", (done: Mocha.Done) => {
            layer.openTooltip();
            layer.tooltipOpenedChange.subscribe((eventVal: boolean) => {
                expect(eventVal).to.equal(false);
                return done();
            });
            layer.closeTooltip();
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
    describe("[(zIndexOffset)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber();
            layer.zIndexOffset = val;
            expect(layer.options.zIndexOffset).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber();
            layer.zIndexOffset = val;
            expect(layer.zIndexOffset).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber();
            layer.setZIndexOffset(val);
            expect(layer.zIndexOffset).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber();

            layer.zIndexOffsetChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.zIndexOffset = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber();

            layer.zIndexOffsetChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setZIndexOffset(val);
        });
    });

    describe("[(lat)]", () => {
        beforeEach(() => {
            layer.ngAfterContentInit();
        });
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
        beforeEach(() => {
            layer.ngAfterContentInit();
        });
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
    describe("[(position)]", () => {
        beforeEach(() => {
            layer.ngAfterContentInit();
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: LatLng = randomLatLng();
            layer.position = val;
            expect(layer.getLatLng()).to.deep.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: LatLng = randomLatLng();
            layer.position = val;
            expect(layer.position).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: LatLng = randomLatLng();
            layer.setLatLng(val);
            expect(layer.position).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: LatLng = randomLatLng();

            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.deep.equal(val);
                return done();
            });

            layer.position = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: LatLng = randomLatLng();

            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.deep.equal(val);
                return done();
            });

            layer.setLatLng(val);
        });
    });

    // TODO: icon
    describe("[title]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "http://test";
            layer.title = val;
            expect(layer.options.title).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string = "http://test";
            layer.title = val;
            expect(layer.title).to.equal(val);
        });
    });
    describe("[alt]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "http://test";
            layer.alt = val;
            expect(layer.options.alt).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string = "http://test";
            layer.alt = val;
            expect(layer.alt).to.equal(val);
        });
    });

    describe("[draggable]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            layer.draggable = false;
            expect(layer.dragging!.enabled()).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            layer.dragging!.disable();
            layer.draggable = true;
            expect(layer.dragging!.enabled()).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            layer.draggable = false;
            expect(layer.draggable).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            layer.draggable = true;
            expect(layer.draggable).to.equal(true);
        });
    });

    // Events
    describe("(dragend)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.dragendEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("dragend", testEvent);
        });
    });
    describe("(dragstart)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.dragstartEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("dragstart", testEvent);
        });
    });
    describe("(movestart)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.movestartEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("movestart", testEvent);
        });
    });
    describe("(drag)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.dragEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("drag", testEvent);
        });
    });
    describe("(moveend)", () => {
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.moveendEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("moveend", testEvent);
        });
    });

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

    describe("Popup in Marker Directive", () => {
        let layerWithPopup: MarkerDirective;
        let popup: PopupDirective;
        before(() => {
            layerWithPopup = new MarkerDirective({ ref: map }, {} as any, {} as any);
            popup = new PopupDirective({nativeElement: document.createElement("div")}, { ref: layerWithPopup });

            layerWithPopup.ngAfterContentInit();
        });
        it("should bind popup", () => {
            expect((layerWithPopup as any)._popup).to.equal(popup);
        });
    });

    describe("Tooltip in Marker Directive", () => {
        let layerWithTooltip: MarkerDirective;
        let tooltip: TooltipDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement("div");
            layerWithTooltip = new MarkerDirective({ ref: map }, {} as any, {} as any);
            tooltip = new TooltipDirective({ ref: layerWithTooltip }, { nativeElement: testDiv });
        });
        it("should bind tooltip", () => {
            expect((layerWithTooltip as any)._tooltip).to.equal(tooltip);
        });

    });

    describe("Icon in Marker Directive", () => {
        let layerWithIcon: MarkerDirective;
        let icon: IconDirective;
        before(() => {
            layerWithIcon = new MarkerDirective({ ref: map }, {} as any, {} as any);
            icon = new IconDirective({ ref: layerWithIcon });
            icon.iconUrl = TRANSPARENT_PIXEL;

            layerWithIcon.ngAfterContentInit();
        });
        it("should bind icon", () => {
            expect(((layerWithIcon as any)._icon as HTMLElement).getAttribute("src")).to.equal(TRANSPARENT_PIXEL);
        });
        it("should bind icon again on changes in icon directive", () => {
            const TEST_VALUE: string = "path/to/icon.png";
            icon.iconUrl = TEST_VALUE;
            expect(((layerWithIcon as any)._icon as HTMLElement).getAttribute("src")).to.equal(TEST_VALUE);
        });

    });

    describe("Destroying a Marker Directive", () => {
        it("should remove Marker Directive from map on destroy", () => {
            expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
