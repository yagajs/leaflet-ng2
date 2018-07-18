import { expect } from "chai";
import { marker, point } from "leaflet";
import {
    DivIconDirective, LayerGroupProvider,
    LeafletEvent,
    MapComponent, MapProvider,
    Point,
} from "./index";
import { randomNumber } from "./spec";

describe("DivIcon Directive", () => {

    let map: MapComponent;
    let icon: DivIconDirective;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        icon = new DivIconDirective({nativeElement: document.createElement("div")}, { ref: marker([0, 0]) });
    });

    // Events
    describe("(update)", () => {
        it("should fire event in Angular when changing", (done: Mocha.Done) => {
            icon.updateEvent.subscribe((event: any) => {
                expect(event.target).to.equal(icon);
                return done();
            });
            icon.iconAnchor = point(1, 2);
        });
    });

    // Inputs
    describe("[iconSize]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: Point = point(randomNumber(100, 0, 0), randomNumber(100, 0, 0));
            icon.iconSize = val;
            expect(icon.options.iconSize).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: Point = point(randomNumber(100, 0, 0), randomNumber(100, 0, 0));
            icon.iconSize = val;
            expect(icon.iconSize).to.equal(val);
        });
        it("should fire an event in Angular when changing in Angular", (done: Mocha.Done) => {
            const val: Point = point(randomNumber(100, 0, 0), randomNumber(100, 0, 0));
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.iconSize = val;
        });
    });
    describe("[iconAnchor]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: Point = point(randomNumber(100, 0, 0), randomNumber(100, 0, 0));
            icon.iconAnchor = val;
            expect(icon.options.iconAnchor).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: Point = point(randomNumber(100, 0, 0), randomNumber(100, 0, 0));
            icon.iconAnchor = val;
            expect(icon.iconAnchor).to.equal(val);
        });
        it("should fire an event in Angular when changing in Angular", (done: Mocha.Done) => {
            const val: Point = point(randomNumber(100, 0, 0), randomNumber(100, 0, 0));
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.iconAnchor = val;
        });
    });
    describe("[popupAnchor]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: Point = point(randomNumber(100, 0, 0), randomNumber(100, 0, 0));
            icon.popupAnchor = val;
            expect(icon.options.popupAnchor).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: Point = point(randomNumber(100, 0, 0), randomNumber(100, 0, 0));
            icon.popupAnchor = val;
            expect(icon.popupAnchor).to.equal(val);
        });
        it("should fire an event in Angular when changing in Angular", (done: Mocha.Done) => {
            const val: Point = point(randomNumber(100, 0, 0), randomNumber(100, 0, 0));
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.popupAnchor = val;
        });
    });
    describe(".createIcon(oldDivIcon)", () => {
        it("should add the .yaga-div-icon class", () => {
            const val: HTMLElement = document.createElement("div");
            expect(icon.createIcon(val).getAttribute("class")!.split("yaga-div-icon").length).to.equal(2);
        });
        it("should not add the .yaga-div-icon class again", () => {
            const val: HTMLElement = document.createElement("div");
            val.setAttribute("class", "yaga-div-icon");
            expect(icon.createIcon(val).getAttribute("class")!.split("yaga-div-icon").length).to.equal(2);
        });
    });
});
