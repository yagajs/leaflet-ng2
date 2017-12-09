import { Injectable } from '@angular/core';
import { Control } from 'leaflet';

@Injectable()
export class LayersControlProvider {
    public ref: Control.Layers;
}
