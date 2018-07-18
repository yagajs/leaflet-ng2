import { expect } from "chai";
import { latLng, marker, point } from "leaflet";
import {
    EXAMPLE_CONTENT,
    LatLng,
    LayerGroupProvider,
    MapComponent,
    MapProvider,
    Point,
    PopupDirective,
} from "./index";
import { randomLat, randomLatLng, randomLng, randomNumber } from "./spec";

describe("Popup Directive", () => {
    let map: MapComponent;
    let popup: PopupDirective;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        popup = new PopupDirective({nativeElement: document.createElement("div")}, { ref: marker([0, 0]) });
        (popup as any)._contentNode = document.createElement("div");
        (popup as any)._container = document.createElement("div");
        (popup as any)._wrapper = document.createElement("div");
    });

    describe("[(opened)]", () => {
        beforeEach(() => {
            (popup as any)._wrapper = document.createElement("div");
            popup.setLatLng(latLng(0, 0));
            popup.openOn(map);
        });
        it("should remove DOM container when not opened", () => {
            popup.opened = false;
            /* istanbul ignore if */
            if (((popup as any)._container as HTMLElement).parentNode) {
                throw new Error("Map is still parent element of the popup");
            }
        });
        it("should re-add DOM container when opened is true again", () => {
            popup.opened = true;

            /* istanbul ignore if */
            if (!((popup as any)._container as HTMLElement).parentNode) {
                throw new Error("Map is still parent element of the popup");
            }
        });
    });
    describe("[(content)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            popup.content = EXAMPLE_CONTENT;
            expect(((popup as any)._content as string)).to.equal(EXAMPLE_CONTENT);
        });
        it("should be changed in Angular when changing in Angular", () => {
            popup.content = EXAMPLE_CONTENT;
            expect(popup.content).to.equal(EXAMPLE_CONTENT);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            popup.setContent(EXAMPLE_CONTENT);
            expect(popup.content).to.equal(EXAMPLE_CONTENT);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            popup.contentChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(EXAMPLE_CONTENT);
                done();
            });

            popup.content = EXAMPLE_CONTENT;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            popup.content = EXAMPLE_CONTENT;
            popup.contentChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(EXAMPLE_CONTENT + "?test");
                done();
            });

            popup.setContent(EXAMPLE_CONTENT + "?test");
        });
    });
    describe("[(lat)]", () => {
        beforeEach(() => {
            popup.setLatLng(latLng(0, 0));
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomLat();
            popup.lat = val;
            expect(popup.getLatLng()!.lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomLat();
            popup.lat = val;
            expect(popup.lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomLat();
            popup.setLatLng([val, 0]);
            expect(popup.getLatLng()!.lat).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomLat();

            popup.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            popup.lat = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomLat();

            popup.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            popup.setLatLng([val, 0]);
        });
    });
    describe("[(lng)]", () => {
        beforeEach(() => {
            popup.setLatLng(latLng(0, 0));
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomLng();
            popup.lng = val;
            expect(popup.getLatLng()!.lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomLng();
            popup.lng = val;
            expect(popup.lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: number = randomLng();
            popup.setLatLng([0, val]);
            expect(popup.lng).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: number = randomLng();

            popup.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            popup.lng = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: number = randomLng();

            popup.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                done();
            });

            popup.setLatLng([0, val]);
        });
    });
    describe("[(position)]", () => {
        beforeEach(() => {
            popup.setLatLng(latLng(0, 0));
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: LatLng = randomLatLng();
            popup.position = val;
            expect(popup.getLatLng()!).to.deep.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: LatLng = randomLatLng();
            popup.position = val;
            expect(popup.position).to.deep.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: LatLng = randomLatLng();
            popup.setLatLng(val);
            expect(popup.position).to.deep.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: LatLng = randomLatLng();

            popup.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.deep.equal(val);
                done();
            });

            popup.position = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: LatLng = randomLatLng();

            popup.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.deep.equal(val);
                done();
            });

            popup.setLatLng(val);
        });
    });

    // Events
    describe("(open)", () => {
        beforeEach(() => {
            popup.setLatLng(latLng(0, 0));
        });
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            popup.openEvent.subscribe((event: any) => {
                expect(event.target).to.equal(popup);
                done();
            });
            popup.openOn(map);
        });
    });
    describe("(close)", () => {
        beforeEach(() => {
            popup.setLatLng(latLng(0, 0));
            popup.openOn(map);
        });
        it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
            popup.closeEvent.subscribe((event: any) => {
                expect(event.target).to.equal(popup);
                done();
            });
            (popup as any)._close();
        });
    });

    // Inputs
    describe("[maxWidth]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(1000, 0, 0);
            popup.maxWidth = val;
            expect(popup.options.maxWidth).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(1000, 0, 0);
            popup.maxWidth = val;
            expect(popup.maxWidth).to.equal(val);
        });
    });
    describe("[minWidth]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(1000, 0, 0);
            popup.minWidth = val;
            expect(popup.options.minWidth).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(1000, 0, 0);
            popup.minWidth = val;
            expect(popup.minWidth).to.equal(val);
        });
    });
    describe("[maxHeight]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(1000, 0, 0);
            popup.maxHeight = val;
            expect(popup.options.maxHeight).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(1000, 0, 0);
            popup.maxHeight = val;
            expect(popup.maxHeight).to.equal(val);
        });
    });
    describe("[autoPanPaddingTopLeft]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const num: number = randomNumber(1000, 0, 0);
            const val: Point = point(num, num);
            popup.autoPanPaddingTopLeft = val;
            expect(popup.options.autoPanPaddingTopLeft).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const num: number = randomNumber(1000, 0, 0);
            const val: Point = point(num, num);
            popup.autoPanPaddingTopLeft = val;
            expect(popup.autoPanPaddingTopLeft).to.equal(val);
        });
    });
    describe("[autoPanPaddingBottomRight]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const num: number = randomNumber(1000, 0, 0);
            const val: Point = point(num, num);
            popup.autoPanPaddingBottomRight = val;
            expect(popup.options.autoPanPaddingBottomRight).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const num: number = randomNumber(1000, 0, 0);
            const val: Point = point(num, num);
            popup.autoPanPaddingBottomRight = val;
            expect(popup.autoPanPaddingBottomRight).to.equal(val);
        });
    });
    describe("[autoPanPadding]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const num: number = randomNumber(1000, 0, 0);
            const val: Point = point(num, num);
            popup.autoPanPadding = val;
            expect(popup.options.autoPanPadding).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const num: number = randomNumber(1000, 0, 0);
            const val: Point = point(num, num);
            popup.autoPanPadding = val;
            expect(popup.autoPanPadding).to.equal(val);
        });
    });

    describe("[autoPan]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            popup.autoPan = false;
            expect(popup.options.autoPan).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            popup.options.autoPan = false;
            popup.autoPan = true;
            expect(popup.options.autoPan).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            popup.autoPan = false;
            expect(popup.autoPan).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            popup.autoPan = true;
            expect(popup.autoPan).to.equal(true);
        });
    });
    describe("[keepInView]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            popup.keepInView = false;
            expect(popup.options.keepInView).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            popup.options.keepInView = false;
            popup.keepInView = true;
            expect(popup.options.keepInView).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            popup.keepInView = false;
            expect(popup.keepInView).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            popup.keepInView = true;
            expect(popup.keepInView).to.equal(true);
        });
    });
    describe("[closeButton]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            popup.closeButton = false;
            expect(popup.options.closeButton).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            popup.options.closeButton = false;
            popup.closeButton = true;
            expect(popup.options.closeButton).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            popup.closeButton = false;
            expect(popup.closeButton).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            popup.closeButton = true;
            expect(popup.closeButton).to.equal(true);
        });
    });
    describe("[autoClose]", () => {
        it("should be changed to false in Leaflet when changing in Angular to false", () => {
            popup.autoClose = false;
            expect(popup.options.autoClose).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", () => {
            popup.options.autoClose = false;
            popup.autoClose = true;
            expect(popup.options.autoClose).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", () => {
            popup.autoClose = false;
            expect(popup.autoClose).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", () => {
            popup.autoClose = true;
            expect(popup.autoClose).to.equal(true);
        });
    });

    describe("[className]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "test-class";
            popup.className = val;
            expect(popup.options.className).to.equal(val);
        });
        it("should be changed in DOM when changing in Angular", () => {
            const val: string = "test-class";
            popup.className = val;
            expect(((popup as any)._container as HTMLDivElement).getAttribute("class")!.split(" ")).to.include(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string = "test-class";
            popup.className = val;
            expect(popup.className).to.equal(val);
        });
    });
    describe("[pane]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "test-class";
            popup.pane = val;
            expect(popup.options.pane).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string = "test-class";
            popup.pane = val;
            expect(popup.pane).to.equal(val);
        });
    });

    describe("Remove from source element on destroy", () => {
        it("should call unbindPopup on destroy", (done: Mocha.Done) => {
            (popup as any).layerProvider.ref = {
                unbindPopup: done,
            };
            popup.ngOnDestroy();
        });
    });
});
