import { Directive, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { TileLayer } from 'leaflet';

@Directive({
    selector: 'yaga-tile-layer'
})
export class TileLayerDirective extends TileLayer implements AfterViewInit  {
    @Output() protected urlChange: EventEmitter<string> = new EventEmitter();
    @Output() protected opacityChange: EventEmitter<number> = new EventEmitter();

    constructor() {
        // Transparent 1px image:
        super('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
    }

    ngAfterViewInit(): void {
        console.log('todo: get ContentChildren');
    }

    setUrl(url: string, noRedraw?: boolean): this {
        if (this.url === url) {
            console.log('same url');
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
        return (<any>this).options.opacity;
    }
}
