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

/**
 * Directive for the Attribution-Control
 * @link http://leafletjs.com/reference-1.0.2.html#control-attribution Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Attribution-Control%20Directive Unit-Test
 * @link TODO: https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/tile-layer.directive.js.html Test coverage
 * @link TODO: https://leaflet-ng2.yagajs.org/latest/typedoc/classes/tilelayerdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/attribution-control-directive
 */
@Directive({
    selector: 'yaga-attribution-control',
})
export class AttributionControlDirective extends Control.Attribution implements OnDestroy  {
    /**
     * Two-Way bound property for the display state.
     * Use it with `<yaga-attribution-control [(display)]="someValue">` or
     * `<yaga-tile-layer (displayChange)="processEvent($event)">`
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the Z-Index.
     * Use it with `<yaga-tile-layer [(zIndex)]="someValue">` or
     * `<yaga-tile-layer (zIndexChange)="processEvent($event)">`
     * @link TODO: http://leafletjs.com/reference-1.0.2.html#control-zindex Original Leaflet documentation
     */
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the Z-Index.
     * Use it with `<yaga-tile-layer [(zIndex)]="someValue">` or
     * `<yaga-tile-layer (zIndexChange)="processEvent($event)">`
     * @link TODO: http://leafletjs.com/reference-1.0.2.html#control-zindex Original Leaflet documentation
     */
    @Output() public positionChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the prefix.
     * Use it with `<yaga-tile-layer [(prefix)]="someValue">` or
     * `<yaga-tile-layer (prefixChange)="processEvent($event)">`
     * @link TODO: http://leafletjs.com/reference-1.0.2.html#control-zindex Original Leaflet documentation
     */
    @Output() public prefixChange: EventEmitter<string> = new EventEmitter();
    /**
     * Two-Way bound property for the list of attributions.
     * Use it with `<yaga-tile-layer [(attributions)]="someValue">` or
     * `<yaga-tile-layer (attributionsChange)="processEvent($event)">`
     * @link TODO: http://leafletjs.com/reference-1.0.2.html#control-zindex Original Leaflet documentation
     */
    @Output() public attributionsChange: EventEmitter<string[]> = new EventEmitter();

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-tile-layer (add)="processEvent($event)">`
     * @link TODO: http://leafletjs.com/reference-1.0.2.html#control-add Original Leaflet documentation
     */
    @Output('add') public addEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-tile-layer (remove)="processEvent($event)">`
     * @link TODO: http://leafletjs.com/reference-1.0.2.html#control-remove Original Leaflet documentation
     */
    @Output('remove') public removeEvent: EventEmitter<Event> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-tile-layer (click)="processEvent($event)">`
     * @link TODO: http://leafletjs.com/reference-1.0.2.html#control-click Original Leaflet documentation
     */
    @Output('click') public clickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired dbclick event.
     * Use it with `<yaga-tile-layer (dbclick)="processEvent($event)">`
     * @link TODO: http://leafletjs.com/reference-1.0.2.html#control-dbclick Original Leaflet documentation
     */
    @Output('dbclick') public dbclickEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-tile-layer (mousedown)="processEvent($event)">`
     * @link TODO: http://leafletjs.com/reference-1.0.2.html#control-mousedown Original Leaflet documentation
     */
    @Output('mousedown') public mousedownEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-tile-layer (mouseover)="processEvent($event)">`
     * @link TODO: http://leafletjs.com/reference-1.0.2.html#control-mouseover Original Leaflet documentation
     */
    @Output('mouseover') public mouseoverEvent: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-tile-layer (mouseout)="processEvent($event)">`
     * @link TODO: http://leafletjs.com/reference-1.0.2.html#control-mouseout Original Leaflet documentation
     */
    @Output('mouseout') public mouseoutEvent: EventEmitter<MouseEvent> = new EventEmitter();

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent,
    ) {
        super({prefix: ATTRIBUTION_PREFIX});
        mapComponent.addControl(this);

        const self: this = this;

        /* tslint:disable:only-arrow-functions */
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
        (<MapComponent> (<any> this)._map).removeControl(this);
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
        if (!(<any> this)._map) {
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
        return (<any> this)._map && this.getContainer().style.display !== 'none';
    }

    @Input() public set position(val: ControlPosition) {
      this.setPosition(val);
    }
    public get position (): ControlPosition {
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
        return (<string> this.options.prefix);
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
        for (let i: number = 0; i < val.length; i += 1) {
            super.addAttribution(val[i]);
        }
        this.attributionsChange.emit(this.attributions);
    }
    public get attributions(): string[] {
        const keys: string[] = Object.keys((<any> this)._attributions);
        const arr: string[] = [];
        for (let i: number = 0; i < keys.length; i += 1) {
            if ((<any> this)._attributions[keys[i]] === 1) {
                arr.push(keys[i]);
            }
        }
        return arr;
    }

    public removeAllAttributions(silent?: boolean): this {
        let keys: string[] = Object.keys((<any> this)._attributions);
        for (let i: number = 0; i < keys.length; i += 1) {
            super.removeAttribution(keys[i]);
        }
        if (silent) {
            return this;
        }
        this.attributionsChange.emit([]);
        return this;
    }
}
