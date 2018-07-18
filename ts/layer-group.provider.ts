import { Injectable } from "@angular/core";
import { LayerGroup, Map } from "leaflet";

/**
 * Injectable Angular provider to structure Leaflet layer-groups with Angulars DI
 * @link http://leafletjs.com/reference-1.2.0.html#layer-group
 */
@Injectable()
export class LayerGroupProvider {
    public ref?: Map | LayerGroup;
}
