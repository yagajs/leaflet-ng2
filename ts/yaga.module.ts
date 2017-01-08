import { NgModule } from '@angular/core';

import { MapComponent } from './map.component';
import { TileLayerDirective } from './tile-layer.directive';
import { ImageOverlayDirective } from './image-overlay.directive';
import { PopupDirective } from './popup.directive';
import { TooltipDirective } from './tooltip.directive';
import { IconDirective } from './icon.directive';
import { DivIconDirective } from './div-icon.directive';
import { MarkerDirective } from './marker.directive';
import { PolylineDirective } from './polyline.directive';
import { PolygonDirective } from './polygon.directive';
import { RectangleDirective } from './rectangle.directive';
import { CircleDirective } from './circle.directive';
import { CircleMarkerDirective } from './circle-marker.directive';
import { ScaleControlDirective }   from './scale-control.directive';

@NgModule({
    declarations: [
        MapComponent,
        TileLayerDirective,
        ImageOverlayDirective,
        PopupDirective,
        TooltipDirective,
        IconDirective,
        DivIconDirective,
        MarkerDirective,
        PolylineDirective,
        PolygonDirective,
        RectangleDirective,
        CircleDirective,
        CircleMarkerDirective,
        ScaleControlDirective
    ],
    exports: [
        MapComponent,
        TileLayerDirective,
        ImageOverlayDirective,
        PopupDirective,
        TooltipDirective,
        IconDirective,
        DivIconDirective,
        MarkerDirective,
        PolylineDirective,
        PolygonDirective,
        RectangleDirective,
        CircleDirective,
        CircleMarkerDirective,
        ScaleControlDirective
    ]
})
export class YagaModule { }
