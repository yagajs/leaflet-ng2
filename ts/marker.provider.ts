import { Injectable } from "@angular/core";
import { Marker } from "leaflet";

/**
 * Injectable Angular provider for Leaflet icons to apply to them with Angular DI
 * @link http://leafletjs.com/reference-1.2.0.html#marker
 */
@Injectable()
export class MarkerProvider {
    public ref?: Marker;
}
