import { NgModule }      from '@angular/core';
import { MapComponent }   from './map.component';
import { TileLayerDirective }   from './tile-layer.directive';
@NgModule({
    declarations: [ MapComponent, TileLayerDirective ],
    exports: [ MapComponent, TileLayerDirective ]
})
export class YagaModule { }
