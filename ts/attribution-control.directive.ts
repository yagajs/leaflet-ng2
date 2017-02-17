import { Directive,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    OnDestroy } from '@angular/core';
import { Control,
    ControlPosition,
    Event } from 'leaflet';
import { MapComponent } from './map.component';

@Directive({
    selector: 'yaga-attribution-control'
})
export class AttributionControlDirective extends Control.Attribution implements OnDestroy  {
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();
    @Output() public positionChange: EventEmitter<string> = new EventEmitter();
    @Output() public prefixChange: EventEmitter<string> = new EventEmitter();
    @Output() public attributionsChange: EventEmitter<string[]> = new EventEmitter();

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
        super({prefix: '<a href="https://yagajs.org" title="A TypeScript library for interactive maps with Leaflet in Angular2">YAGA leaflet-ng2</a>'});
        mapComponent.addControl(this);

        const self: this = this;

        this.onRemove = function (): any {
            self.displayChange.emit(false);
            self.removeEvent.emit({target: self, type: 'remove'});
            return self;
        };

        this.onAdd = function (): HTMLElement {
            self.displayChange.emit(true);
            self.addEvent.emit({target: self, type: 'add'});
            return self.getContainer();
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

    setPrefix(prefix: string): this {
        super.setPrefix(prefix);
        this.prefixChange.emit(prefix);
        return this;
    }
    @Input() set prefix(val: string) {
        this.setPrefix(val);
    }
    get prefix(): string {
        return (<string>this.options.prefix);
    }

    addAttribution(val: string): this {
        super.addAttribution(val);
        this.attributionsChange.emit(this.attributions);
        return this;
    }
    removeAttribution(val: string): this {
        super.removeAttribution(val);
        this.attributionsChange.emit(this.attributions);
        return this;
    }
    @Input() set attributions(val: string[]) {
        this.removeAllAttributions(true);
        for (let i: number = 0; i < val.length; i += 1) {
            super.addAttribution(val[i]);
        }
        this.attributionsChange.emit(this.attributions);
    }
    get attributions(): string[] {
        return Object.keys((<any>this)._attributions);
    }

    public removeAllAttributions(silent?: boolean): this {
        let keys: string[] = Object.keys((<any>this)._attributions);
        for (let i: number; i < keys.length; i += 1) {
            super.removeAttribution(keys[i]);
        }
        if (silent) {
            return this;
        }
        this.attributionsChange.emit([]);
        return this;
    }
}
