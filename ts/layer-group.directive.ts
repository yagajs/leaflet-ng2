import {
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    SkipSelf,
} from "@angular/core";
import {
    Control,
    LayerGroup,
    LeafletEvent,
    Map,
    PopupEvent,
    TooltipEvent,
} from "leaflet";
import { LayerGroupProvider } from "./layer-group.provider";
import { LayerProvider } from "./layer.provider";

/**
 * Angular2 directive for Leaflet layer-groups.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-layer-group
 *         [(display)]="..."
 *
 *         (add)="..."
 *         (remove)="..."
 *         (popupopen)="..."
 *         (popupclose)="..."
 *         (tooltipopen)="..."
 *         (tooltipclose)="..."
 *
 *         [attribution]="...">
 *         <!-- place other layers here... -->
 *     </yaga-layer-group>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#layergroup Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Layer-Group%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/layer-group.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/layergroupdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/layer-group-directive
 */
@Directive({
    providers: [ LayerGroupProvider, LayerProvider ],
    selector: "yaga-layer-group",
})
export class LayerGroupDirective extends LayerGroup implements OnDestroy  {
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-layer-group [(display)]="someValue">`
     * or `<yaga-layer-group (displayChange)="processEvent($event)">`
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-layer-group (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-add Original Leaflet documentation
     */
    @Output("add") public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-layer-group (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-remove Original Leaflet documentation
     */
    @Output("remove") public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-layer-group (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupopen Original Leaflet documentation
     */
    @Output("popupopen") public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-layer-group (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupclose Original Leaflet documentation
     */
    @Output("popupclose") public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-layer-group (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipopen Original Leaflet documentation
     */
    @Output("tooltipopen") public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-layer-group (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipclose Original Leaflet documentation
     */
    @Output("tooltipclose") public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-layer-group (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-click Original Leaflet documentation
     */

    constructor(
        @SkipSelf() protected parentLayerGroupProvider: LayerGroupProvider,
        layerGroupProvider: LayerGroupProvider,
        layerProvider: LayerProvider,
    ) {
        super();

        layerProvider.ref = this;
        layerGroupProvider.ref = this;

        this.on("remove", () => {
            (this as any)._map = null; // This seems to fix a bug in Leaflet
            this.displayChange.emit(false);
        });
        this.on("add", () => {
            this.displayChange.emit(true);
        });

        this.addTo(this.parentLayerGroupProvider.ref!);

        // Events
        this.on("add", (event: LeafletEvent) => {
            this.addEvent.emit(event);
        });
        this.on("remove", (event: LeafletEvent) => {
            this.removeEvent.emit(event);
        });
        this.on("popupopen", (event: LeafletEvent) => {
            this.popupopenEvent.emit(event as PopupEvent);
        });
        this.on("popupclose", (event: LeafletEvent) => {
            this.popupcloseEvent.emit(event as PopupEvent);
        });
        this.on("tooltipopen", (event: LeafletEvent) => {
            this.tooltipopenEvent.emit(event as TooltipEvent);
        });
        this.on("tooltipclose", (event: LeafletEvent) => {
            this.tooltipcloseEvent.emit(event as TooltipEvent);
        });
    }

    /**
     * This function gets called from Angular on destroy of the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/OnDestroy-class.html
     */
    public ngOnDestroy(): void {
        this.removeFrom((this as any)._map);
    }

    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-layer-group [(display)]="someValue">` or `<yaga-layer-group [display]="someValue">`
     */
    @Input() public set display(val: boolean) {
        if (val) {
            this.addTo(this.parentLayerGroupProvider.ref!);
            return;
        }
        // TODO: proof and maybe enhance typedefinition
        (this.parentLayerGroupProvider.ref! as Map).removeLayer(this);
    }
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-layer-group [(display)]="someValue">` or `<yaga-layer-group [display]="someValue">`
     */
    public get display(): boolean {
        return !!((this as any)._map);
    }

    /**
     * Input for the attribution.
     * Use it with `<yaga-layer-group [attribution]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-attribution Original Leaflet documentation
     */
    @Input() public set attribution(val: string) {
        if ((this as any)._map && (this as any)._map.attributionControl) {
            const oldAttribution = this.getAttribution!();
            if (oldAttribution) {
                ((this as any)._map.attributionControl as Control.Attribution).removeAttribution(oldAttribution);
            }
            ((this as any)._map.attributionControl as Control.Attribution).addAttribution(val);
        }
        // TODO: add options to the official type definition
        (this as any).options.attribution = val;
    }
    public get attribution(): string {
        return this.getAttribution!() || "";
    }
}
