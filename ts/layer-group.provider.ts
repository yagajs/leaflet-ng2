import { Injectable } from '@angular/core';
import { LayerGroup, Map } from 'leaflet';

@Injectable()
export class LayerGroupProvider {
    public ref: Map | LayerGroup;
}
