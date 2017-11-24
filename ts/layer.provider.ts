import { Injectable } from '@angular/core';
import { Layer as LeafletLayerInterface } from 'leaflet';

@Injectable()
export class YagaLayer {
    public handle: LeafletLayerInterface;
}
