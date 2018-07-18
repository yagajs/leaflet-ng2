import { expect } from "chai";
import { point } from "leaflet";
import {
    AttributionControlDirective,
    LayerGroupDirective,
    LayerGroupProvider,
    MapComponent,
    MapProvider,
} from "./index";

describe("Layer-Group Directive", () => {
    let map: MapComponent;
    let layer: LayerGroupDirective;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        layer = new LayerGroupDirective({ ref: map }, {} as any, {} as any);
    });

    describe("[(display)]", () => {
        it("should remove layer when not displaying", () => {
            layer.display = false;
            expect((layer as any)._map).to.equal(null);
        });
        it("should re-add layer when display is true again", () => {
            layer.display = false;
            layer.display = true;
            expect((layer as any)._map).to.equal((layer as any).parentLayerGroupProvider.ref);
        });
        it("should set to false by removing from map", (done: Mocha.Done) => {

            setTimeout(() => {
                layer.displayChange.subscribe((val: boolean) => {
                    expect(val).to.equal(false);
                    expect(layer.display).to.equal(false);
                    done();
                });
                map.removeLayer(layer);
            }, 0);

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

    // Inputs
    describe("[attribution]", () => {
        let attributionControl: AttributionControlDirective;
        beforeEach(() => {
            attributionControl = new AttributionControlDirective({ ref: map });
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "Test attribution";
            layer.attribution = val;
            // TODO: fix in official type definition
            expect((layer as any).options.attribution).to.equal(val);
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

    describe("Destroying a Layer-Group Directive", () => {
        it("should remove Tile-Layer Directive from map on destroy", () => {
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
