import { expect } from "chai";
import {
    LayerProvider,
    LayersControlProvider,
    OverlayLayerDirective,
} from "./index";

describe("Overlay-Layer Directive", () => {
    const layerControlProvider: LayersControlProvider = new LayersControlProvider();
    let overlay: OverlayLayerDirective;
    const layerProvider = new LayerProvider();
    layerProvider.ref = {} as any;

    describe("[caption]", () => {
        it("should be changed in Leaflet when changing in Angular", (done: Mocha.Done) => {
            const val: string = "my layer";
            layerControlProvider.ref = {
                removeLayer() {
                    /* do nothing */
                },
                addOverlay(ref: any, caption: string) {
                    expect(ref).equal(layerProvider.ref);
                    expect(caption).equal(val);
                    done();
                },
            } as any;
            overlay = new OverlayLayerDirective(layerProvider, layerControlProvider);
            overlay.caption = val;
        });
        it("should be readable", () => {
            const val: string = "my layer";
            layerControlProvider.ref = {
                removeLayer() {
                    /* do nothing */
                },
                addBaseLayer() {
                    /* do nothing */
                },
            } as any;
            overlay = new OverlayLayerDirective(layerProvider, layerControlProvider);
            (layerControlProvider as any).ref._layers = [{layer: layerProvider.ref, name: val}];
            expect(overlay.caption).equal(val);
        });
    });
});
