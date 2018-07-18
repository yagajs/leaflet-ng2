import { expect } from "chai";
import { latLng, marker, point } from "leaflet";
import {
    Direction,
    EXAMPLE_CONTENT,
    LatLng,
    LayerGroupProvider,
    MapComponent,
    MapProvider,
    Point,
    TooltipDirective,
} from "./index";
import { randomLat, randomLatLng, randomLng, randomNumber } from "./spec";

describe("Tooltip Directive", () => {
    let map: MapComponent;
    let tooltip: TooltipDirective;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        tooltip = new TooltipDirective({ ref: marker([0, 0]) }, {nativeElement: document.createElement("div")});
        (tooltip as any)._contentNode = document.createElement("div");
        (tooltip as any)._container = document.createElement("div");
    });

    describe("[(opened)]", () => {
        beforeEach(() => {
            (tooltip as any)._wrapper = document.createElement("div");
            tooltip.setLatLng(latLng(0, 0));
            map.openTooltip(tooltip);
        });
        it("should remove DOM container when not opened", () => {
            tooltip.opened = false;
            /* istanbul ignore if */
            if (((tooltip as any)._container as HTMLElement).parentNode) {
                throw new Error("Map is still parent element of the tooltip");
            }
        });
        it("should re-add DOM container when opened is true again", () => {
            tooltip.opened = true;

            /* istanbul ignore if */
            if (!((tooltip as any)._container as HTMLElement).parentNode) {
                throw new Error("Map is still parent element of the tooltip");
            }
        });
    });
    describe("[(content)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            tooltip.content = EXAMPLE_CONTENT;
            expect(((tooltip as any)._content as string)).to.equal(EXAMPLE_CONTENT);
        });
        it("should be changed in Angular when changing in Angular", () => {
            tooltip.content = EXAMPLE_CONTENT;
            expect(tooltip.content).to.equal(EXAMPLE_CONTENT);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            tooltip.setContent(EXAMPLE_CONTENT);
            expect(tooltip.content).to.equal(EXAMPLE_CONTENT);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            tooltip.contentChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(EXAMPLE_CONTENT);
                return done();
            });

            tooltip.content = EXAMPLE_CONTENT;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            tooltip.content = EXAMPLE_CONTENT;
            tooltip.contentChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(EXAMPLE_CONTENT + "?test");
                return done();
            });

            tooltip.setContent(EXAMPLE_CONTENT + "?test");
        });
    });

    describe("[(opacity)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber();
            tooltip.opacity = val;
            expect(tooltip.options.opacity).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber();
            tooltip.opacity = val;
            expect(tooltip.opacity).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomNumber();
            tooltip.setOpacity(val);
            expect(tooltip.opacity).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomNumber();
            tooltip.opacityChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            tooltip.opacity = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomNumber();
            tooltip.opacityChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            tooltip.setOpacity(val);
        });
    });
    describe("[(lat)]", () => {
        beforeEach(() => {
            tooltip.setLatLng(latLng(0, 0));
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomLat();
            tooltip.lat = val;
            expect(tooltip.getLatLng()!.lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomLat();
            tooltip.lat = val;
            expect(tooltip.lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomLat();
            tooltip.setLatLng([val, 0]);
            expect(tooltip.lat).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomLat();

            tooltip.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            tooltip.lat = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomLat();

            tooltip.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            tooltip.setLatLng([val, 0]);
        });
    });
    describe("[(lng)]", () => {
        beforeEach(() => {
            tooltip.setLatLng(latLng(0, 0));
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomLng();
            tooltip.lng = val;
            expect(tooltip.getLatLng()!.lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomLng();
            tooltip.lng = val;
            expect(tooltip.lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomLng();
            tooltip.setLatLng([0, val]);
            expect(tooltip.lng).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomLng();

            tooltip.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            tooltip.lng = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomLng();

            tooltip.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            tooltip.setLatLng([0, val]);
        });
    });
    describe("[(position)]", () => {
        beforeEach(() => {
            tooltip.setLatLng(latLng(0, 0));
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: LatLng = randomLatLng();
            tooltip.position = val;
            expect(tooltip.getLatLng()!.equals(val)).to.equal(true);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: LatLng = randomLatLng();
            tooltip.position = val;
            expect(tooltip.position.equals(val)).to.equal(true);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: LatLng = randomLatLng();
            tooltip.setLatLng(val);
            expect(tooltip.position.equals(val)).to.equal(true);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: LatLng = randomLatLng();

            tooltip.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal.equals(val)).to.equal(true);
                return done();
            });

            tooltip.position = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: LatLng = randomLatLng();

            tooltip.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal.equals(val)).to.equal(true);
                return done();
            });

            tooltip.setLatLng(val);
        });
    });

    // Events
    describe("(open)", () => {
        beforeEach(() => {
            tooltip.setLatLng(latLng(0, 0));
        });
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            tooltip.openEvent.subscribe((event: any) => {
                expect(event.target).to.equal(tooltip);
                return done();
            });
            map.openTooltip(tooltip);
        });
    });
    describe("(close)", () => {
        beforeEach(() => {
            tooltip.setLatLng(latLng(0, 0));
            map.openTooltip(tooltip);
        });
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            tooltip.closeEvent.subscribe((event: any) => {
                expect(event.target).to.equal(tooltip);
                return done();
            });
            (tooltip as any)._close();
        });
    });

    // Inputs
    describe("[className]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "test-class";
            tooltip.className = val;
            expect(tooltip.options.className).to.equal(val);
        });
        it("should be changed in DOM when changing in Angular", () => {
            const val: string = "test-class";
            tooltip.className = val;
            expect(((tooltip as any)._container as HTMLDivElement).getAttribute("class")!.split(" ")).to.include(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string = "test-class";
            tooltip.className = val;
            expect(tooltip.className).to.equal(val);
        });
    });
    describe("[pane]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "test-class";
            tooltip.pane = val;
            expect(tooltip.options.pane).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string = "test-class";
            tooltip.pane = val;
            expect(tooltip.pane).to.equal(val);
        });
    });
    describe("[direction]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: Direction = "top";
            tooltip.direction = val;
            expect(tooltip.options.direction).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: Direction = "right";
            tooltip.direction = val;
            expect(tooltip.direction).to.equal(val);
        });
    });
    describe("[offset]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: Point = point(12, 34);
            tooltip.offset = val;
            expect(tooltip.options.offset).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: Point = point(12, 34);
            tooltip.offset = val;
            expect(tooltip.offset).to.equal(val);
        });
    });

    describe("[interactive]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            tooltip.interactive = false;
            expect(tooltip.options.interactive).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            tooltip.options.interactive = false;
            tooltip.interactive = true;
            expect(tooltip.options.interactive).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            tooltip.interactive = false;
            expect(tooltip.interactive).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            tooltip.interactive = true;
            expect(tooltip.interactive).to.equal(true);
        });
    });
    describe("[sticky]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            tooltip.sticky = false;
            expect(tooltip.options.sticky).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            tooltip.options.sticky = false;
            tooltip.sticky = true;
            expect(tooltip.options.sticky).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            tooltip.sticky = false;
            expect(tooltip.sticky).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            tooltip.sticky = true;
            expect(tooltip.sticky).to.equal(true);
        });
    });
    describe("[permanent]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            tooltip.permanent = false;
            expect(tooltip.options.permanent).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            tooltip.options.permanent = false;
            tooltip.permanent = true;
            expect(tooltip.options.permanent).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            tooltip.permanent = false;
            expect(tooltip.permanent).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            tooltip.permanent = true;
            expect(tooltip.permanent).to.equal(true);
        });
    });

    describe("Remove from source element on destroy", () => {
        it("should call unbindPopup on destroy", (done: Mocha.Done) => {
            (tooltip as any).layerProvider.ref = {
                unbindTooltip: done,
            };
            tooltip.ngOnDestroy();
        });
    });
});
