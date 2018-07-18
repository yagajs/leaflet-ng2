import {
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from "@angular/core";
import {
    Control,
    ControlPosition,
    LeafletEvent,
    LeafletMouseEvent,
    Map,
} from "leaflet";
import { MapProvider } from "./map.provider";
import { enhanceMouseEvent } from "./mouse-event-helper";

/**
 * Angular2 directive for the attribution-control of Leaflet.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-scale-control
 *         [(display)]="..."
 *         [(zIndex)]="..."
 *         [(position)]="..."
 *
 *         [metric]="..."
 *         [imperial]="..."
 *         [maxWidth]="..."
 *
 *         (add)="..."
 *         (remove)="..."
 *         (click)="..."
 *         (dblclick)="..."
 *         (mousedown)="..."
 *         (mouseover)="..."
 *         (mouseout)="..."
 *         >
 *     </yaga-scale-control>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#control-scale Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Scale-Control%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/attribution-control.directive.js.html
 * Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/scalecontroldirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/scale-control-directive/
 */
@Directive({
    selector: "yaga-scale-control",
})
export class ScaleControlDirective extends Control.Scale implements OnDestroy  {
    /**
     * Two-Way bound property for the display status of the control.
     * Use it with `<yaga-scale-control [(display)]="someValue">`
     * or `<yaga-scale-control (displayChange)="processEvent($event)">`
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the zIndex of the control.
     * Use it with `<yaga-scale-control [(zIndex)]="someValue">`
     * or `<yaga-scale-control (zIndexChange)="processEvent($event)">`
     */
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the position of the control.
     * Use it with `<yaga-scale-control [(position)]="someValue">`
     * or `<yaga-scale-control (positionChange)="processEvent($event)">`
     */
    @Output() public positionChange: EventEmitter<ControlPosition> = new EventEmitter();

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-scale-control (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-add Original Leaflet documentation
     */
    @Output("add") public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-scale-control (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-remove Original Leaflet documentation
     */
    @Output("remove") public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-scale-control (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-click Original Leaflet documentation
     */
    @Output("click") public clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired dblclick event.
     * Use it with `<yaga-scale-control (dblclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-dblclick Original Leaflet documentation
     */
    @Output("dblclick") public dblclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-scale-control (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-mousedown Original Leaflet documentation
     */
    @Output("mousedown") public mousedownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-scale-control (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-mouseover Original Leaflet documentation
     */
    @Output("mouseover") public mouseoverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-scale-control (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-mouseout Original Leaflet documentation
     */
    @Output("mouseout") public mouseoutEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();

    constructor(
        protected mapProvider: MapProvider,
    ) {
        super();
        this.mapProvider.ref!.addControl(this);

        // Events
        this.getContainer()!.addEventListener("click", (event: MouseEvent) => {
            this.clickEvent.emit(enhanceMouseEvent(event, (this as any)._map as Map));
        });
        this.getContainer()!.addEventListener("dblclick", (event: MouseEvent) => {
            this.dblclickEvent.emit(enhanceMouseEvent(event, (this as any)._map as Map));
        });
        this.getContainer()!.addEventListener("mousedown", (event: MouseEvent) => {
            this.mousedownEvent.emit(enhanceMouseEvent(event, (this as any)._map as Map));
        });
        this.getContainer()!.addEventListener("mouseover", (event: MouseEvent) => {
            this.mouseoverEvent.emit(enhanceMouseEvent(event, (this as any)._map as Map));
        });
        this.getContainer()!.addEventListener("mouseout", (event: MouseEvent) => {
            this.mouseoutEvent.emit(enhanceMouseEvent(event, (this as any)._map as Map));
        });
    }

    /**
     * Internal method to provide the removal of the control in Leaflet, when removing it from the Angular template
     */
    public ngOnDestroy(): void {
        this.mapProvider.ref!.removeControl(this);
    }

    /**
     * Derived remove function
     */
    public remove(): this {
        /* tslint:disable */
        super.remove();
        this.displayChange.emit(false);
        this.removeEvent.emit({target: this, type: "remove"});
        return this;
    }
    /**
     * Derived addTo function
     */
    public addTo(map: Map) {
        /* tslint:disable */
        super.addTo(map);
        this.displayChange.emit(true);
        this.addEvent.emit({target: this, type: "add"});
        return this;
    }
    /**
     * Derived method of the original setPosition.
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-setposition Original Leaflet documentation
     */
    public setPosition(val: ControlPosition): this {
        super.setPosition(val);
        this.positionChange.emit(val);
        return this;
    }

    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-scale-control [(opacity)]="someValue">`
     * or `<yaga-scale-control [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-opacity Original Leaflet documentation
     */
    @Input() public set opacity(val: number | undefined) {
        if (typeof val === "number") {
            this.getContainer()!.style.opacity = val.toString();
            return;
        }
        this.getContainer()!.style.opacity = null;
    }
    public get opacity(): number | undefined {
        const val = this.getContainer()!.style.opacity;
        if (typeof val === "string") {
            return parseFloat(val);
        }
    }

    /**
     * Two-Way bound property for the display state.
     * Use it with `<yaga-scale-control [(display)]="someValue">`
     * or `<yaga-scale-control [display]="someValue">`
     */
    @Input() public set display(val: boolean) {
        if (!(this as any)._map) {
            // No map available...
            return;
        }
        if (val) {
            this.getContainer()!.style.display = "";
            return;
        }
        this.getContainer()!.style.display = "none";
        return;
    }
    public get display(): boolean {
        return !!(this as any)._map && this.getContainer()!.style.display !== "none";
    }

    /**
     * Two-Way bound property for the position.
     * Use it with `<yaga-scale-control [(position)]="someValue">`
     * or `<yaga-scale-control [position]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-position Original Leaflet documentation
     */
    @Input() public set position(val: ControlPosition) {
        this.setPosition(val);
    }
    public get position(): ControlPosition {
        return this.getPosition();
    }

    /**
     * Two-Way bound property for the zIndex of the control.
     * Use it with `<yaga-scale-control [(zIndex)]="someValue">`
     * or `<yaga-scale-control (zIndexChange)="processEvent($event)">`
     */
    @Input() public set zIndex(zIndex: number | undefined) {
        if (typeof zIndex === "number") {
            this.getContainer()!.style.zIndex = zIndex.toString();
            return;
        }
        this.getContainer()!.style.zIndex = null;
    }
    public get zIndex(): number | undefined {
        const val = this.getContainer()!.style.zIndex;
        if (typeof val === "string") {
            return parseInt(val, 10);
        }
    }

    /**
     * Input for scale max-width.
     * Use it with `<yaga-scale-control [(maxWidth)]="someValue">`
     * or `<yaga-scale-control [maxWidth]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-maxwidth Original Leaflet documentation
     */
    @Input() public set maxWidth(val: number | undefined) {
        this.options.maxWidth = val;
        (this as any)._update();
    }
    public get maxWidth(): number | undefined {
        return this.options.maxWidth;
    }

    /**
     * Input for state of metric-scale state.
     * Use it with `<yaga-scale-control [(metric)]="someValue">`
     * or `<yaga-scale-control [metric]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-metric Original Leaflet documentation
     */
    @Input() public set metric(val: boolean) {
        while (this.getContainer()!.hasChildNodes()) {
            this.getContainer()!.removeChild(
                this.getContainer()!.lastChild!,
            );
        }
        this.options.metric = val;
        (this as any)._addScales(
            this.options,
            "leaflet-control-scale-line",
            this.getContainer()!,
        );
        (this as any)._update();
    }
    public get metric(): boolean {
        return !!this.options.metric;
    }

    /**
     * Input for state of imperial-scale state.
     * Use it with `<yaga-scale-control [(imperial)]="someValue">`
     * or `<yaga-scale-control [imperial]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-imperial Original Leaflet documentation
     */
    @Input() public set imperial(val: boolean) {
        while (this.getContainer()!.hasChildNodes()) {
            this.getContainer()!.removeChild(
                this.getContainer()!.lastChild!,
            );
        }
        this.options.imperial = val;
        (this as any)._addScales(
            this.options,
            "leaflet-control-scale-line",
            this.getContainer()!,
        );
        (this as any)._update();
    }
    public get imperial(): boolean {
        return !!this.options.imperial;
    }
}
