import { Injectable } from '@angular/core';
import { Map } from 'leaflet';

@Injectable()
export class MapProvider {
    public ref: Map;
}
