import {
    Directive,
    Input,
    OnDestroy,
} from "@angular/core";
import { Layer } from "leaflet";
import { LayerProvider } from "./layer.provider";
import { LayersControlProvider } from "./layers-control.provider";

/**
 * Angular2 directive for adding layers to the layers-control of Leaflet as base-layer.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-layers-control>
 *         <!-- This can be any other layer... -->
 *         <yaga-tile-layer yaga-base-layer [caption]="'OSM'"></yaga-tile-layer>
 *     </yaga-attribution-control>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#control-layers-addbaselayer Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Base-Layer%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/base-layer.directive.js.html
 * Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/baselayerdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/layers-control-directive/
 */
@Directive({
    selector: "[yaga-base-layer]",
})
export class BaseLayerDirective implements OnDestroy  {
    constructor(
        protected layer: LayerProvider,
        public layersControlProvider: LayersControlProvider,
    ) {}

    @Input() public set caption(value: string) {
      this.layersControlProvider.ref!.removeLayer(this.layer.ref!);
      this.layersControlProvider.ref!.addBaseLayer(this.layer.ref!, value);
    }
    public get caption(): string {
        for (const layer of ((this.layersControlProvider.ref! as any)._layers as Array<{layer: Layer, name: string}>)) {
            if (layer.layer === this.layer.ref) {
                return layer.name;
            }
        }
        return "";
    }

    /**
     * Internal method to provide the removal from the control in Leaflet, when removing it from the Angular template
     */
    public ngOnDestroy(): void {
        this.layersControlProvider.ref!.removeLayer(this.layer.ref!);
    }
}
