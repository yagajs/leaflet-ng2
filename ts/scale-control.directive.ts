import {
    Directive,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import {
    Control,
    ControlPosition,
    LeafletEvent,
    LeafletMouseEvent,
    Map,
} from 'leaflet';
import { MapComponent } from './map.component';
import { enhanceMouseEvent } from './mouse-event-helper';

@Directive({
    selector: 'yaga-scale-control',
})
export class ScaleControlDirective extends Control.Scale implements OnDestroy  {
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();
    @Output() public positionChange: EventEmitter<ControlPosition> = new EventEmitter();

    @Output('add') public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    @Output('remove') public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    @Output('click') public clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    @Output('dbclick') public dbclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    @Output('mousedown') public mousedownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    @Output('mouseover') public mouseoverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    @Output('mouseout') public mouseoutEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent,
    ) {
        super();
        mapComponent.addControl(this);

        const self: this = this;

        /* tslint:disable:only-arrow-functions */
        const originalOnRemove: (map: Map) => any = this.onRemove;
        this.onRemove = function(map: Map): any {
            originalOnRemove.call(this, map);
            self.displayChange.emit(false);
            self.removeEvent.emit({type: 'remove', target: self});
            return self;
        };

        const originalOnAdd: (map: Map) => HTMLElement = this.onAdd;
        this.onAdd = function(map: Map): HTMLElement {
            const tmp: HTMLElement = originalOnAdd.call(this, map);
            self.displayChange.emit(true);
            self.addEvent.emit({type: 'add', target: self});
            return tmp;
        };
        /* tslint:enable */

        // Events
        this.getContainer().addEventListener('click', (event: MouseEvent) => {
            this.clickEvent.emit(enhanceMouseEvent(event, (this as any)._map as Map));
        });
        this.getContainer().addEventListener('dbclick', (event: MouseEvent) => {
            this.dbclickEvent.emit(enhanceMouseEvent(event, (this as any)._map as Map));
        });
        this.getContainer().addEventListener('mousedown', (event: MouseEvent) => {
            this.mousedownEvent.emit(enhanceMouseEvent(event, (this as any)._map as Map));
        });
        this.getContainer().addEventListener('mouseover', (event: MouseEvent) => {
            this.mouseoverEvent.emit(enhanceMouseEvent(event, (this as any)._map as Map));
        });
        this.getContainer().addEventListener('mouseout', (event: MouseEvent) => {
            this.mouseoutEvent.emit(enhanceMouseEvent(event, (this as any)._map as Map));
        });
    }

    public ngOnDestroy(): void {
        ((this as any)._map as MapComponent).removeControl(this);
    }

    public setPosition(val: ControlPosition): this {
      super.setPosition(val);
      this.positionChange.emit(val);
      return this;
    }

    @Input() public set opacity(val: number) {
        this.getContainer().style.opacity = val.toString();
    }
    public get opacity(): number {
        return parseFloat(this.getContainer().style.opacity);
    }

    @Input() public set display(val: boolean) {
        if (!(this as any)._map) {
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
    public get display(): boolean {
        return (this as any)._map && this.getContainer().style.display !== 'none';
    }

    @Input() public set position(val: ControlPosition) {
      this.setPosition(val);
    }
    public get position(): ControlPosition {
      return this.getPosition();
    }

    @Input() public set maxWidth(val: number) {
      this.options.maxWidth = val;
      (this as any)._update();
    }
    public get maxWidth(): number {
      return this.options.maxWidth;
    }

    @Input() public set metric(val: boolean) {
      while (this.getContainer().hasChildNodes()) {
          this.getContainer().removeChild(
            this.getContainer().lastChild,
          );
      }
      this.options.metric = val;
      (this as any)._addScales(
        this.options,
        'leaflet-control-scale-line',
        this.getContainer(),
      );
      (this as any)._update();
    }
    public get metric(): boolean {
      return this.options.metric;
    }

    @Input() public set imperial(val: boolean) {
      while (this.getContainer().hasChildNodes()) {
          this.getContainer().removeChild(
            this.getContainer().lastChild,
          );
      }
      this.options.imperial = val;
      (this as any)._addScales(
        this.options,
        'leaflet-control-scale-line',
        this.getContainer(),
      );
      (this as any)._update();
    }
    public get imperial(): boolean {
      return this.options.imperial;
    }
}
