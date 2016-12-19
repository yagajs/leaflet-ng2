import { NgModule }      from '@angular/core';
import { MapComponent,
    ImageOverlayDirective,
    PopupDirective,
    TileLayerDirective } from './index';
@NgModule({
    declarations: [ MapComponent, TileLayerDirective, ImageOverlayDirective, PopupDirective ],
    exports: [ MapComponent, TileLayerDirective, ImageOverlayDirective, PopupDirective ]
})
export class YagaModule { }
