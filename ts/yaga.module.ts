import { NgModule }      from '@angular/core';
import { MapComponent,
    ImageOverlayDirective,
    PopupDirective,
    TileLayerDirective,
    IconDirective } from './index';
@NgModule({
    declarations: [ MapComponent, TileLayerDirective, ImageOverlayDirective, PopupDirective, IconDirective ],
    exports: [ MapComponent, TileLayerDirective, ImageOverlayDirective, PopupDirective, IconDirective ]
})
export class YagaModule { }
