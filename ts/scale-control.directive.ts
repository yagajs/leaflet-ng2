import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    OnDestroy } from '@angular/core';
import { Control,
    ControlPosition } from 'leaflet';
import { MapComponent } from './map.component';

@Directive({
    selector: 'yaga-tile-layer'
})
export class ScaleControlDirective extends Control.Scale implements OnDestroy  {
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();
    @Output() public positionChange: EventEmitter<string> = new EventEmitter();

    @Output('add') public addEvent: EventEmitter<Event> = new EventEmitter();
    @Output('remove') public removeEvent: EventEmitter<Event> = new EventEmitter();
    @Output('click') public clickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('dbclick') public dbclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mousedown') public mousedownEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mouseover') public mouseoverEvent: EventEmitter<MouseEvent> = new EventEmitter();
    @Output('mouseout') public mouseoutEvent: EventEmitter<MouseEvent> = new EventEmitter();

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent
    ) {
        // Transparent 1px image:
        super();
        mapComponent.addControl(this);
    }

    ngOnDestroy(): void {
        (<MapComponent>(<any>this)._map).removeControl(this);
    }

    setPosition(val: ControlPosition): this {
      super.setPosition(val);
      this.positionChange.emit(val);
      return this;
    }

    @Input() set opacity(val: number) {
        (<HTMLElement>(<any>this)._container).style.opacity = val.toString();
    }
    get opacity(): number {
        return parseFloat((<HTMLElement>(<any>this)._container).style.opacity);
    }

    @Input() set display(val: boolean) {
      return;
    }
    get display(): boolean {
        return false;
    }

    @Input() set position(val: ControlPosition) {
      this.setPosition(val);
    }
    get position (): ControlPosition {
      return this.getPosition();
    }

    @Input() set maxWidth(val: number) {
      (<Control.ScaleOptions>(<any>this).options).maxWidth = val;
      (<any>this)._update();
    }
    get maxWidth(): number {
      return (<Control.ScaleOptions>(<any>this).options).maxWidth;
    }

    @Input() set metric(val: boolean) {
      while ((<HTMLElement>(<any>this)._container).hasChildNodes()) {
          (<HTMLElement>(<any>this)._container).removeChild(
            (<HTMLElement>(<any>this)._container).lastChild
          );
      }
      (<Control.ScaleOptions>(<any>this).options).metric = val;
      (<any>this)._addScales(
        (<Control.ScaleOptions>(<any>this).options),
        'leaflet-control-scale-line',
        (<HTMLElement>(<any>this)._container)
      );
      (<any>this)._update();
    }
    get metric(): boolean {
      return (<Control.ScaleOptions>(<any>this).options).metric;
    }

    @Input() set imperial(val: boolean) {
      while ((<HTMLElement>(<any>this)._container).hasChildNodes()) {
          (<HTMLElement>(<any>this)._container).removeChild(
            (<HTMLElement>(<any>this)._container).lastChild
          );
      }
      (<Control.ScaleOptions>(<any>this).options).imperial = val;
      (<any>this)._addScales(
        (<Control.ScaleOptions>(<any>this).options),
        'leaflet-control-scale-line',
        (<HTMLElement>(<any>this)._container)
      );
      (<any>this)._update();
    }
    get imperial (): boolean {
      return (<Control.ScaleOptions>(<any>this).options).imperial;
    }
}
