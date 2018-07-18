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
 *     <yaga-zoom-control
 *         [(display)]="..."
 *         [(zIndex)]="..."
 *         [(position)]="..."
 *
 *         [zoomInText]="..."
 *         [zoomInTitle]="..."
 *         [zoomOutText]="..."
 *         [zoomOutTitle]="..."
 *
 *         (add)="..."
 *         (remove)="..."
 *         (click)="..."
 *         (dblclick)="..."
 *         (mousedown)="..."
 *         (mouseover)="..."
 *         (mouseout)="..."
 *         >
 *     </yaga-zoom-control>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#control-zoom Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Zoom-Control%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/zoom-control.directive.js.html
 * Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/zoomcontroldirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/zoom-control-directive/
 */
@Directive({
    selector: "yaga-zoom-control",
})
export class ZoomControlDirective extends Control.Zoom implements OnDestroy  {
    /**
     * Two-Way bound property for the display status of the control.
     * Use it with `<yaga-zoom-control [(display)]="someValue">`
     * or `<yaga-zoom-control (displayChange)="processEvent($event)">`
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * Two-Way bound property for the zIndex of the control.
     * Use it with `<yaga-zoom-control [(zIndex)]="someValue">`
     * or `<yaga-zoom-control (zIndexChange)="processEvent($event)">`
     */
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();
    /**
     * Two-Way bound property for the position of the control.
     * Use it with `<yaga-zoom-control [(position)]="someValue">`
     * or `<yaga-zoom-control (positionChange)="processEvent($event)">`
     */
    @Output() public positionChange: EventEmitter<ControlPosition> = new EventEmitter();

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-zoom-control (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-add Original Leaflet documentation
     */
    @Output("add") public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-zoom-control (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-remove Original Leaflet documentation
     */
    @Output("remove") public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-zoom-control (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-click Original Leaflet documentation
     */
    @Output("click") public clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired dblclick event.
     * Use it with `<yaga-zoom-control (dblclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-dblclick Original Leaflet documentation
     */
    @Output("dblclick") public dblclickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-zoom-control (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-mousedown Original Leaflet documentation
     */
    @Output("mousedown") public mousedownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-zoom-control (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-mouseover Original Leaflet documentation
     */
    @Output("mouseover") public mouseoverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter();
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-zoom-control (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-mouseout Original Leaflet documentation
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
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-setposition Original Leaflet documentation
     */
    public setPosition(val: ControlPosition): this {
        super.setPosition(val);
        this.positionChange.emit(val);
        return this;
    }

    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-zoom-control [(opacity)]="someValue">`
     * or `<yaga-zoom-control [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-opacity Original Leaflet documentation
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
     * Use it with `<yaga-zoom-control [(display)]="someValue">`
     * or `<yaga-zoom-control [display]="someValue">`
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
     * Use it with `<yaga-zoom-control [(position)]="someValue">`
     * or `<yaga-zoom-control [position]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-position Original Leaflet documentation
     */
    @Input() public set position(val: ControlPosition) {
        this.setPosition(val);
    }
    public get position(): ControlPosition {
        return this.getPosition();
    }

    /**
     * Two-Way bound property for the zIndex of the control.
     * Use it with `<yaga-zoom-control [(zIndex)]="someValue">`
     * or `<yaga-zoom-control (zIndexChange)="processEvent($event)">`
     */
    @Input() public set zIndex(zIndex: number | undefined) {
        if (zIndex === undefined) {
            zIndex = 0;
        }

        this.getContainer()!.style.zIndex = zIndex.toString();
    }

    public get zIndex(): number | undefined {
        const val = this.getContainer()!.style.zIndex;
        if (typeof val === "string") {
            return parseInt(val, 10);
        }
    }

    /**
     * Input for the text shown on the zoom in button.
     * Use it with `<yaga-zoom-control [(zoomInText)]="someValue">`
     * or `<yaga-zoom-control [zoomInText]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomintext Original Leaflet documentation
     */
    @Input() public set zoomInText(val: string | undefined) {
        this.options.zoomInText = val;
        if (typeof val === "string") {
            ((this as any)._zoomInButton as HTMLElement).textContent = val;
            return;
        }
        ((this as any)._zoomInButton as HTMLElement).textContent = null;
    }
    public get zoomInText(): string | undefined {
        return this.options.zoomInText;
    }

    /**
     * Input for the title connected to the zoom in button.
     * Use it with `<yaga-zoom-control [(zoomInTitle)]="someValue">`
     * or `<yaga-zoom-control [zoomInTitle]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomintitle Original Leaflet documentation
     */
    @Input() public set zoomInTitle(val: string | undefined) {
        this.options.zoomInTitle = val;
        if (typeof val === "string") {
            ((this as any)._zoomInButton as HTMLElement).setAttribute("title", val);
            return;
        }
        ((this as any)._zoomInButton as HTMLElement).removeAttribute("title");
    }
    public get zoomInTitle(): string | undefined {
        return this.options.zoomInTitle;
    }

    /**
     * Input for the text shown on the zoom out button.
     * Use it with `<yaga-zoom-control [(zoomOutText)]="someValue">`
     * or `<yaga-zoom-control [zoomOutText]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomouttext Original Leaflet documentation
     */
    @Input() public set zoomOutText(val: string | undefined) {
        this.options.zoomOutText = val;
        if (typeof val === "string") {
            ((this as any)._zoomOutButton as HTMLElement).textContent = val;
            return;
        }
        ((this as any)._zoomOutButton as HTMLElement).textContent = null;

    }
    public get zoomOutText(): string | undefined {
        return this.options.zoomOutText;
    }

    /**
     * Input for the title connected to the zoom out button.
     * Use it with `<yaga-zoom-control [(zoomOutTitle)]="someValue">`
     * or `<yaga-zoom-control [zoomOutTitle]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomouttitle Original Leaflet documentation
     */
    @Input() public set zoomOutTitle(val: string | undefined) {
        this.options.zoomOutTitle = val;
        if (typeof val === "string") {
            ((this as any)._zoomOutButton as HTMLElement).setAttribute("title", val);
            return;
        }
        ((this as any)._zoomOutButton as HTMLElement).removeAttribute("title");
    }
    public get zoomOutTitle(): string | undefined {
        return this.options.zoomOutTitle;
    }
}
