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
    FeatureGroup,
    LeafletEvent,
    Map,
    PathOptions,
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
 *     <yaga-feature-group
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
 *     </yaga-feature-group>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#featuregroup Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Feature-Group%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/feature-group.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/featuregroupdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/feature-group-directive
 */
@Directive({
    providers: [ LayerGroupProvider, LayerProvider ],
    selector: "yaga-feature-group",
})
export class FeatureGroupDirective extends FeatureGroup implements OnDestroy  {
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-feature-group [(display)]="someValue">`
     * or `<yaga-feature-group (displayChange)="processEvent($event)">`
     */
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-feature-group (layeradd)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-add Original Leaflet documentation
     */
    @Output("layeradd") public layeraddEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-feature-group (layerremove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-remove Original Leaflet documentation
     */
    @Output("layerremove") public layerremoveEvent: EventEmitter<LeafletEvent> = new EventEmitter();

    /**
     * From leaflet fired add event.
     * Use it with `<yaga-feature-group (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-add Original Leaflet documentation
     */
    @Output("add") public addEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-feature-group (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-remove Original Leaflet documentation
     */
    @Output("remove") public removeEvent: EventEmitter<LeafletEvent> = new EventEmitter();
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-feature-group (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-popupopen Original Leaflet documentation
     */
    @Output("popupopen") public popupopenEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-feature-group (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-popupclose Original Leaflet documentation
     */
    @Output("popupclose") public popupcloseEvent: EventEmitter<PopupEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-feature-group (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-tooltipopen Original Leaflet documentation
     */
    @Output("tooltipopen") public tooltipopenEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-feature-group (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-tooltipclose Original Leaflet documentation
     */
    @Output("tooltipclose") public tooltipcloseEvent: EventEmitter<TooltipEvent> = new EventEmitter();
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-feature-group (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-click Original Leaflet documentation
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
        this.on("layeradd", (event: LeafletEvent) => {
            this.layeraddEvent.emit(event);
        });
        this.on("layerremove", (event: LeafletEvent) => {
            this.layerremoveEvent.emit(event);
        });
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
        this.removeFrom(this.parentLayerGroupProvider.ref as Map);
    }

    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-feature-group [(display)]="someValue">` or `<yaga-feature-group [display]="someValue">`
     */
    @Input() public set display(val: boolean) {
        if (val) {
            this.addTo(this.parentLayerGroupProvider.ref!);
            return;
        }
        // TODO: proof and maybe enhance typedefinition
        (this.parentLayerGroupProvider.ref as Map).removeLayer(this);
    }
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-feature-group [(display)]="someValue">` or `<yaga-feature-group [display]="someValue">`
     */
    public get display(): boolean {
        return !!((this as any)._map);
    }

    /**
     * Input for the attribution.
     * Use it with `<yaga-feature-group [attribution]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-attribution Original Leaflet documentation
     */
    @Input() public set attribution(val: string) {
        if ((this as any)._map && (this as any)._map.attributionControl) {
            if ((this as any).getAttribution()) {
                ((this as any)._map.attributionControl as Control.Attribution)
                    .removeAttribution((this as any).getAttribution());
            }
            ((this as any)._map.attributionControl as Control.Attribution).addAttribution(val);
        }
        // TODO: add options to the official type definition
        (this as any).options.attribution = val;
    }
    public get attribution(): string {
        return (this as any).getAttribution() || "";
    }

    public removeFrom(map: Map) {
        this.displayChange.emit(false);
        return super.removeFrom(map);
    }

    /**
     * Input for the style.
     * Use it with `<yaga-feature-group [style]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-setstyle Original Leaflet documentation
     */
    @Input() public set style(val: PathOptions) {
        this.setStyle(val);
    }
    public get style(): PathOptions {
        return {};
    }
}
