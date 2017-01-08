import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    OnDestroy } from '@angular/core';
import { Control,
    ControlPosition,
    Map,
    Event } from 'leaflet';
import { MapComponent } from './map.component';

@Directive({
    selector: 'yaga-scale-control'
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
        super();
        mapComponent.addControl(this);

        const self: this = this;

        const originalOnRemove: Function = this.onRemove;
        this.onRemove = function (map: Map): any {
            originalOnRemove.call(this, map);
            self.displayChange.emit(false);
            self.removeEvent.emit({type: 'remove', target: self});
            return self;
        };

        const originalOnAdd: Function = this.onAdd;
        this.onAdd = function (map: Map): HTMLElement {
            const tmp: HTMLElement = originalOnAdd.call(this, map);
            self.displayChange.emit(true);
            self.addEvent.emit({type: 'add', target: self});
            return tmp;
        };

        // Events
        this.getContainer().addEventListener('click', (event: MouseEvent) => {
            this.clickEvent.emit(event);
        });
        this.getContainer().addEventListener('dbclick', (event: MouseEvent) => {
            this.dbclickEvent.emit(event);
        });
        this.getContainer().addEventListener('mousedown', (event: MouseEvent) => {
            this.mousedownEvent.emit(event);
        });
        this.getContainer().addEventListener('mouseover', (event: MouseEvent) => {
            this.mouseoverEvent.emit(event);
        });
        this.getContainer().addEventListener('mouseout', (event: MouseEvent) => {
            this.mouseoutEvent.emit(event);
        });
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
        this.getContainer().style.opacity = val.toString();
    }
    get opacity(): number {
        return parseFloat(this.getContainer().style.opacity);
    }

    @Input() set display(val: boolean) {
        if (!(<any>this)._map) {
            // No map available...
            return;
        }
        if (val) {
            this.getContainer().style.display = '';
            return;
        }
        this.getContainer().style.display = 'none';
        return;
    }
    get display(): boolean {
        return (<any>this)._map && this.getContainer().style.display !== 'none';
    }

    @Input() set position(val: ControlPosition) {
      this.setPosition(val);
    }
    get position (): ControlPosition {
      return this.getPosition();
    }

    @Input() set maxWidth(val: number) {
      this.options.maxWidth = val;
      (<any>this)._update();
    }
    get maxWidth(): number {
      return this.options.maxWidth;
    }

    @Input() set metric(val: boolean) {
      while (this.getContainer().hasChildNodes()) {
          this.getContainer().removeChild(
            this.getContainer().lastChild
          );
      }
      this.options.metric = val;
      (<any>this)._addScales(
        this.options,
        'leaflet-control-scale-line',
        this.getContainer()
      );
      (<any>this)._update();
    }
    get metric(): boolean {
      return this.options.metric;
    }

    @Input() set imperial(val: boolean) {
      while (this.getContainer().hasChildNodes()) {
          this.getContainer().removeChild(
            this.getContainer().lastChild
          );
      }
      this.options.imperial = val;
      (<any>this)._addScales(
        this.options,
        'leaflet-control-scale-line',
        this.getContainer()
      );
      (<any>this)._update();
    }
    get imperial (): boolean {
      return this.options.imperial;
    }
}
