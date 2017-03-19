import {
    Directive,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import {
    Control,
    ControlPosition,
    Event,
    Map,
} from 'leaflet';
import { MapComponent } from './map.component';

@Directive({
    selector: 'yaga-zoom-control',
})
export class ZoomControlDirective extends Control.Zoom implements OnDestroy  {
    @Output() public displayChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public positionChange: EventEmitter<string> = new EventEmitter();

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
        super();
        mapComponent.addControl(this);

        const self: this = this;

        /* tslint:disable:only-arrow-functions */
        const originalOnRemove: Function = this.onRemove;
        this.onRemove = function (map: Map): any {
            originalOnRemove.call(this, map);
            self.displayChange.emit(false);
            self.removeEvent.emit({type: 'remove', target: self});
            return self;
        };

        const originalOnAdd: Function = this.onAdd;
        this.onAdd = function (map: Map): HTMLElement {
            const tmp: HTMLElement = originalOnAdd.call(this, map);
            self.displayChange.emit(true);
            self.addEvent.emit({type: 'add', target: self});
            return tmp;
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

    @Input() public set zoomInText(val: string) {
      this.options.zoomInText = val;
      (<HTMLElement> (<any> this)._zoomInButton).textContent = val;
    }
    public get zoomInText(): string {
      return this.options.zoomInText;
    }

    @Input() public set zoomInTitle(val: string) {
        this.options.zoomInTitle = val;
        (<HTMLElement> (<any> this)._zoomInButton).setAttribute('title', val);
    }
    public get zoomInTitle(): string {
        return this.options.zoomInTitle;
    }

    @Input() public set zoomOutText(val: string) {
        this.options.zoomOutText = val;
        (<HTMLElement> (<any> this)._zoomOutButton).textContent = val;
    }
    public get zoomOutText(): string {
        return this.options.zoomOutText;
    }

    @Input() public set zoomOutTitle(val: string) {
        this.options.zoomOutTitle = val;
        (<HTMLElement> (<any> this)._zoomOutButton).setAttribute('title', val);
    }
    public get zoomOutTitle(): string {
        return this.options.zoomOutTitle;
    }

    @Input() public set zIndex(zIndex: number) {
        if ( !zIndex ) {
            zIndex = 0;
        }

        this.getContainer().style.zIndex = zIndex.toString();
    }

     public get zIndex(): number {
        return parseInt(this.getContainer().style.zIndex, 10);
    }
}
