import { Injectable } from '@angular/core';
import { LayerGroup as LeafletLayerGroupInterface, Map as LeafletMapInterface } from 'leaflet';

@Injectable()
export class YagaLayerGroup {
    public handle: LeafletLayerGroupInterface | LeafletMapInterface;
}
