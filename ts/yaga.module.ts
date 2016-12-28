import { NgModule }      from '@angular/core';
import { MapComponent,
    ImageOverlayDirective,
    PopupDirective,
    TileLayerDirective,
    IconDirective,
    DivIconDirective,
    MarkerDirective } from './index';
@NgModule({
    declarations: [
        MapComponent,
        TileLayerDirective,
        ImageOverlayDirective,
        PopupDirective,
        IconDirective,
        DivIconDirective,
        MarkerDirective
    ],
    exports: [
        MapComponent,
        TileLayerDirective,
        ImageOverlayDirective,
        PopupDirective,
        IconDirective,
        DivIconDirective,
        MarkerDirective
    ]
})
export class YagaModule { }
