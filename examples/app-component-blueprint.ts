import { AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { MapComponent, Event } from '../lib/index'; // @yaga/leflet-ng2

export const HIDE_DELAY: number = 500;
export const EVENT_FIRED_TEXT: string = 'Event fired now...';
export const EVENT_FIRED_RESET_TEXT: string = '';

export interface IExampleProperties {
    duplex: IExampleProperty[];
    input: IExampleProperty[];
    output: IExampleProperty[];
}
export interface IExampleProperty {
    name: string;
    type: 'text' | 'number' | 'event';
    value: any;
}

export interface IExampleOutputProperty extends IExampleProperty {
    emitter: EventEmitter<Event>;
}
export interface IExampleInputProperty extends IExampleProperty {
}
export interface IExampleDuplexProperty extends IExampleProperty {
}

export abstract class ExampleAppComponentBlueprint implements AfterViewInit {
    public abstract properties: IExampleProperties;

    @ViewChild(MapComponent) private mapComponent: MapComponent;

    constructor() {
        (<any>window).app = this;
    };

    public ngAfterViewInit(): void {
        (<any>window).map = this.mapComponent;
    }

    handleEvent(name: string, event: Event): void {
        this.properties.output[name].value = event;
        this.properties.output[name].
        setTimeout(() => {
            this.properties.output[name].value = EVENT_FIRED_RESET_TEXT;
        }, HIDE_DELAY);
    };
}
