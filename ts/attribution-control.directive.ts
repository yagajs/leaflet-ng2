import {
    Directive,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import { Control,
    ControlPosition,
    Event } from 'leaflet';
import { ATTRIBUTION_PREFIX } from './consts';
import { MapComponent } from './map.component';

@Directive({
    selector: 'yaga-attribution-control',
})
export class AttributionControlDirective extends Control.Attribution implements OnDestroy  {
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();
    @Output() public positionChange: EventEmitter<ControlPosition> = new EventEmitter();
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
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent,
    ) {
        super({prefix: ATTRIBUTION_PREFIX});
        mapComponent.addControl(this);

        const self: this = this;

        /* tslint:disable:only-arrow-functions */
        this.onRemove = function(): any {
            self.displayChange.emit(false);
            self.removeEvent.emit({target: self, type: 'remove'});
            return self;
        };

        this.onAdd = function(): HTMLElement {
            self.displayChange.emit(true);
            self.addEvent.emit({target: self, type: 'add'});
            return self.getContainer();
        };
        /* tslint:enable */

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

    public setPrefix(prefix: string): this {
        super.setPrefix(prefix);
        this.prefixChange.emit(prefix);
        return this;
    }
    @Input() public set prefix(val: string) {
        this.setPrefix(val);
    }
    public get prefix(): string {
        return (this.options.prefix as string);
    }

    public addAttribution(val: string): this {
        super.addAttribution(val);
        this.attributionsChange.emit(this.attributions);
        return this;
    }
    public removeAttribution(val: string): this {
        super.removeAttribution(val);
        this.attributionsChange.emit(this.attributions);
        return this;
    }
    @Input() public set attributions(val: string[]) {
        this.removeAllAttributions(true);
        for (const attr of val) {
            super.addAttribution(attr);
        }
        this.attributionsChange.emit(this.attributions);
    }
    public get attributions(): string[] {
        const keys: string[] = Object.keys((this as any)._attributions);
        const arr: string[] = [];
        for (const key of keys) {
            if ((this as any)._attributions[key] === 1) {
                arr.push(key);
            }
        }
        return arr;
    }

    public removeAllAttributions(silent?: boolean): this {
        const keys: string[] = Object.keys((this as any)._attributions);
        for (const key of keys) {
            super.removeAttribution(key);
        }
        if (silent) {
            return this;
        }
        this.attributionsChange.emit([]);
        return this;
    }
}
