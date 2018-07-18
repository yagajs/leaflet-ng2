import { Injectable } from "@angular/core";
import { Layer } from "leaflet";

/**
 * Injectable Angular provider to structure Leaflet layers with Angulars DI
 * @link http://leafletjs.com/reference-1.2.0.html#layer
 */
@Injectable()
export class LayerProvider {
    public ref?: Layer;
}
