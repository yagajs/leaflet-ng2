import { Injectable } from '@angular/core';
import { Layer as LeafletLayerInterface, Map as LeafletMapInterface } from 'leaflet';

@Injectable()
export class YagaLayer {
    public handle: LeafletLayerInterface | LeafletMapInterface;
}
