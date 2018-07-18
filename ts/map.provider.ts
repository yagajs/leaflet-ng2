import { Injectable } from "@angular/core";
import { Map } from "leaflet";

/**
 * Injectable Angular provider to reference to Leaflets map
 * @link http://leafletjs.com/reference-1.2.0.html#map
 */
@Injectable()
export class MapProvider {
    public ref?: Map;
}
