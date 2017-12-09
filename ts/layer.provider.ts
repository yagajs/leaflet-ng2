import { Injectable } from '@angular/core';
import { Layer } from 'leaflet';

@Injectable()
export class LayerProvider {
    public ref: Layer;
}
