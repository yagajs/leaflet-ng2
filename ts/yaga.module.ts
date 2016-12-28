import { NgModule }      from '@angular/core';
import { MapComponent,
    ImageOverlayDirective,
    PopupDirective,
    TileLayerDirective,
    IconDirective,
    DivIconDirective } from './index';
@NgModule({
    declarations: [ MapComponent, TileLayerDirective, ImageOverlayDirective, PopupDirective, IconDirective, DivIconDirective ],
    exports: [ MapComponent, TileLayerDirective, ImageOverlayDirective, PopupDirective, IconDirective, DivIconDirective ]
})
export class YagaModule { }
