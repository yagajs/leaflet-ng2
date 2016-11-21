import { Directive, Input, Output, EventEmitter, Inject, forwardRef, OnDestroy } from '@angular/core';
import { TileLayer, TileLayerOptions, Map } from 'leaflet';
import { MapComponent } from './map.component';

@Directive({
    selector: 'yaga-tile-layer'
})
export class TileLayerDirective extends TileLayer implements OnDestroy  {
    @Output() public urlChange: EventEmitter<string> = new EventEmitter();
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public opacityChange: EventEmitter<number> = new EventEmitter();
    @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();

    constructor(
        @Inject(forwardRef(() => MapComponent)) mapComponent: MapComponent
    ) {
        // Transparent 1px image:
        super('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');

        this.on('remove', () => {
            this.displayChange.emit(false);
        });
        this.on('add', () => {
            this.displayChange.emit(true);
        });

        this.addTo(mapComponent);
    }

    ngOnDestroy(): void {
        console.log('Destroy');
        this.removeFrom((<any>this)._map);
    }

    setUrl(url: string, noRedraw?: boolean): this {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return super.setUrl(url, noRedraw);
    }

    @Input() set url(val: string) {
        this.setUrl(val);
    }

    get url(): string {
        return (<any>this)._url;
    }


    setOpacity(val: number): this {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return super.setOpacity(val);
    }

    @Input() set opacity(val: number) {
        this.setOpacity(val);
    }

    get opacity(): number {
        return (<TileLayerOptions>(<any>this).options).opacity;
    }

    @Input() set display(val: boolean) {
        var isDisplayed: boolean = this.display;
        if (isDisplayed === val) {
            return;
        }

        var pane: HTMLElement,
            container: HTMLElement,
            map: Map,
            events: any, // Dictionary of functions
            eventKeys: string[];
        try {
            pane = this.getPane();
            container = this.getContainer();
            map = (<any>this)._map;
            events = this.getEvents();
            eventKeys = Object.keys(events);

        } catch (err) {
            /* istanbul ignore next */
            return;
        }

        if (val) {
            // show layer
            pane.appendChild(container);
            for (let i: number = 0; i < eventKeys.length; i += 1) {
                map.on(eventKeys[i], events[eventKeys[i]], this);
            }
            this.redraw();
        } else {
            // hide layer
            pane.removeChild(container);
            for (let i: number = 0; i < eventKeys.length; i += 1) {
                map.off(eventKeys[i], events[eventKeys[i]], this);
            }
        }
    }

    get display(): boolean {
        var pane: HTMLElement,
            container: HTMLElement;
        try {
            pane = this.getPane();
            container = this.getContainer();
        } catch (err) {
            /* istanbul ignore next */
            return false;
        }

        for (let i: number = 0; i < pane.children.length; i += 1) {
            /* istanbul ignore else */
            if (pane.children[i] === container) {
                return true;
            }
        }
        return false;
    }

    setZIndex(val: number): this {
        super.setZIndex(val);
        this.zIndexChange.emit(val);
        return this;
    }

    @Input() set zIndex(val: number) {
        this.setZIndex(val);
    }

    get zIndex(): number {
        return (<TileLayerOptions>(<any>this).options).zIndex;
    }
}
