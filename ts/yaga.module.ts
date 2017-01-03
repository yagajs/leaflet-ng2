import { NgModule } from '@angular/core';

import { MapComponent } from './map.component';
import { TileLayerDirective } from './tile-layer.directive';
import { ImageOverlayDirective } from './image-overlay.directive';
import { PopupDirective } from './popup.directive';
import { TooltipDirective } from './tooltip.directive';
import { IconDirective } from './icon.directive';
import { DivIconDirective } from './div-icon.directive';
import { PolylineDirective } from './polyline.directive';
import { PolygonDirective } from './polygon.directive';

@NgModule({
    declarations: [
        MapComponent,
        TileLayerDirective,
        ImageOverlayDirective,
        PopupDirective,
        TooltipDirective,
        IconDirective,
        DivIconDirective,
<<<<<<< HEAD
        MarkerDirective,
        PolylineDirective,
        PolygonDirective
=======
        PolylineDirective
>>>>>>> polyline-directive
    ],
    exports: [
        MapComponent,
        TileLayerDirective,
        ImageOverlayDirective,
        PopupDirective,
        TooltipDirective,
        IconDirective,
        DivIconDirective,
<<<<<<< HEAD
        MarkerDirective,
        PolylineDirective,
        PolygonDirective
=======
        PolylineDirective
>>>>>>> polyline-directive
    ]
})
export class YagaModule { }
