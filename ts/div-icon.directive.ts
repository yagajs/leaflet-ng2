import {
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    Output,
} from "@angular/core";
import {
    DivIcon,
    LeafletEvent,
    Point,
} from "leaflet";
import { MarkerProvider } from "./marker.provider";
/**
 * Angular2 directive for Leaflet div-icons.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-marker>
 *         <yaga-div-icon
 *             [iconAnchor]="..."
 *             [iconSize]="..."
 *             [popupAnchor]="...">
 *             You can paste your HTML content for the icon here!
 *         </yaga-div-icon>
 *     </yaga-marker>
 * </yaga-map>
 * ```
 *
 * Notes:
 *
 * * All div-icon-directives have the css-class `yaga-div-icon`.
 * * The `contentHtml` property is not the child-node in the leaflet div-icon, it is the clone of it and gets cloned
 * again on every change.
 *
 * @link http://leafletjs.com/reference-1.2.0.html#divicon Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=DivIcon%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/div-icon.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/divicondirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/div-icon-directive/
 */
@Directive({
    selector: "yaga-div-icon",
})
export class DivIconDirective extends DivIcon  {
    /**
     * This is an EventEmitter used to notify on any change in this object. It is mainly created to provide reactions
     * of the marker directive on changes.
     */
    @Output("update") public updateEvent: EventEmitter<LeafletEvent> = new EventEmitter();

    /**
     * The native element from angulars element-ref and blueprint for the icon content.
     */
    public contentHtml: HTMLElement;

    constructor(
        @Inject(ElementRef) elementRef: ElementRef,
        public markerProvider: MarkerProvider,
    ) {
        super({});
        this.contentHtml = elementRef.nativeElement;

        if (typeof MutationObserver === "function") {
            const mutationObserver = new MutationObserver(() => {
                this.markerProvider.ref!.setIcon(this);
                this.updateEvent.emit({
                    target: this,
                    type: "update",
                });
            });
            mutationObserver.observe(
                this.contentHtml,
                {
                    attributes: true,
                    characterData: true,
                    childList: true,
                    subtree: true,
                },
            );
        } else {
            this.contentHtml.addEventListener("DOMSubtreeModified", () => {
                this.markerProvider.ref!.setIcon(this);
                this.updateEvent.emit({
                    target: this,
                    type: "update",
                });
            });
        }
        markerProvider.ref!.setIcon(this);
    }

    /**
     * Input for the iconSize.
     * Use it with `<yaga-div-icon [iconSize]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#divicon-iconsize Original Leaflet documentation
     */
    @Input() public set iconSize(val: Point) {
        this.options.iconSize = val;
        this.markerProvider.ref!.setIcon(this);
        this.updateEvent.emit({
            target: this,
            type: "update",
        });
    }
    public get iconSize(): Point {
        return (this.options.iconSize as Point);
    }

    /**
     * Input for the iconAnchor.
     * Use it with `<yaga-div-icon [iconAnchor]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#divicon-iconanchor Original Leaflet documentation
     */
    @Input() public set iconAnchor(val: Point) {
        this.options.iconAnchor = val;
        this.markerProvider.ref!.setIcon(this);
        this.updateEvent.emit({
            target: this,
            type: "update",
        });
    }
    public get iconAnchor(): Point {
        return (this.options.iconAnchor as Point);
    }

    /**
     * Input for the popupAnchor.
     * Use it with `<yaga-div-icon [popupAnchor]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#divicon-popupanchor Original Leaflet documentation
     */
    @Input() public set popupAnchor(val: Point) {
        this.options.popupAnchor = val;
        this.markerProvider.ref!.setIcon(this);
        this.updateEvent.emit({
            target: this,
            type: "update",
        });
    }
    public get popupAnchor(): Point {
        return (this.options.popupAnchor as Point);
    }

    /**
     * This inherited function enhances the directive with an own css-class and clones the its html content into the
     * leaflet div icon.
     */
    public createIcon(oldDivIcon: HTMLElement): HTMLElement {
        oldDivIcon = super.createIcon(oldDivIcon);
        if (
            oldDivIcon.getAttribute("class") &&
            oldDivIcon.getAttribute("class")!.split(" ").indexOf("yaga-div-icon") === -1
        ) {
            oldDivIcon.setAttribute("class", oldDivIcon.getAttribute("class") + " yaga-div-icon");
        }
        oldDivIcon.appendChild(this.contentHtml.cloneNode(true));
        return oldDivIcon;
    }
}
