import { expect } from "chai";
import {
    BaseLayerDirective,
    LayerProvider,
    LayersControlProvider,
} from "./index";

describe("Base-Layer Directive", () => {
    const layerControlProvider: LayersControlProvider = new LayersControlProvider();
    let baseLayer: BaseLayerDirective;
    const layerProvider = new LayerProvider();
    layerProvider.ref = {} as any;

    describe("[caption]", () => {
        it("should be changed in Leaflet when changing in Angular", (done: Mocha.Done) => {
            const val: string = "my layer";
            layerControlProvider.ref = {
                removeLayer() {
                    /* do nothing */
                },
                addBaseLayer(ref: any, caption: string) {
                    expect(ref).equal(layerProvider.ref);
                    expect(caption).equal(val);
                    done();
                },
            } as any;
            baseLayer = new BaseLayerDirective(layerProvider, layerControlProvider);
            baseLayer.caption = val;
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
            baseLayer = new BaseLayerDirective(layerProvider, layerControlProvider);
            (layerControlProvider as any).ref._layers = [{layer: layerProvider.ref, name: val}];
            expect(baseLayer.caption).equal(val);
        });
    });
});
