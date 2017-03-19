import { NgModule } from '@angular/core';

import { AttributionControlDirective } from './attribution-control.directive';
import { CircleMarkerDirective } from './circle-marker.directive';
import { CircleDirective } from './circle.directive';
import { DivIconDirective } from './div-icon.directive';
import { GeoJSONDirective } from './geojson.directive';
import { IconDirective } from './icon.directive';
import { ImageOverlayDirective } from './image-overlay.directive';
import { MapComponent } from './map.component';
import { MarkerDirective } from './marker.directive';
import { PolygonDirective } from './polygon.directive';
import { PolylineDirective } from './polyline.directive';
import { PopupDirective } from './popup.directive';
import { RectangleDirective } from './rectangle.directive';
import { ScaleControlDirective }   from './scale-control.directive';
import { TileLayerDirective } from './tile-layer.directive';
import { TooltipDirective } from './tooltip.directive';
import { WmsLayerDirective } from './wms-layer.directive';
import { ZoomControlDirective } from './zoom-control.directive';

@NgModule({
    declarations: [
        AttributionControlDirective,
        CircleMarkerDirective,
        CircleDirective,
        DivIconDirective,
        GeoJSONDirective,
        IconDirective,
        ImageOverlayDirective,
        MapComponent,
        MarkerDirective,
        PolygonDirective,
        PolylineDirective,
        PopupDirective,
        RectangleDirective,
        ScaleControlDirective,
        TileLayerDirective,
        TooltipDirective,
        WmsLayerDirective,
        ZoomControlDirective,
    ],
    exports: [
        AttributionControlDirective,
        CircleMarkerDirective,
        CircleDirective,
        DivIconDirective,
        GeoJSONDirective,
        IconDirective,
        ImageOverlayDirective,
        MapComponent,
        MarkerDirective,
        PolygonDirective,
        PolylineDirective,
        PopupDirective,
        RectangleDirective,
        ScaleControlDirective,
        TileLayerDirective,
        TooltipDirective,
        WmsLayerDirective,
        ZoomControlDirective,
    ],
})
export class YagaModule { }
