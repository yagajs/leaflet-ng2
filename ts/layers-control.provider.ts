import { Injectable } from "@angular/core";
import { Control } from "leaflet";

/**
 * Injectable Angular provider to reference to Leaflets layer-control
 * @link http://leafletjs.com/reference-1.2.0.html#layer
 */
@Injectable()
export class LayersControlProvider {
    public ref?: Control.Layers;
}
