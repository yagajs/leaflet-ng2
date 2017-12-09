import { Injectable } from '@angular/core';
import { Marker } from 'leaflet';

@Injectable()
export class MarkerProvider {
    public ref: Marker;
}
