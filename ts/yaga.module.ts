import { NgModule }      from '@angular/core';
import { MapComponent }   from './map.component';
import { TileLayerDirective }   from './tile-layer.directive';
import { ScaleControlDirective }   from './scale-control.directive';
@NgModule({
    declarations: [ MapComponent, TileLayerDirective, ScaleControlDirective ],
    exports: [ MapComponent, TileLayerDirective, ScaleControlDirective ]
})
export class YagaModule { }
