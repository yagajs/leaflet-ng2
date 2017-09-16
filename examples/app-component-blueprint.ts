import { AfterViewInit, EventEmitter, ViewChild } from '@angular/core';
import { LeafletEvent, MapComponent } from '../lib/index'; // @yaga/leflet-ng2

export const HIDE_DELAY: number = 500;
export const EVENT_FIRED_TEXT: string = 'Event fired now...';
export const EVENT_FIRED_RESET_TEXT: string = '';

export interface IExampleProperties {
    duplex: IExampleDuplexProperty[];
    input: IExampleInputProperty[];
    output: IExampleOutputProperty[];
}
export interface IExampleProperty {
    name: string;
    type: string;
    value: any;
    additional?: any;
}

export interface IExampleOutputProperty extends IExampleProperty {
}
export interface IExampleInputProperty extends IExampleProperty {
}
export interface IExampleDuplexProperty extends IExampleProperty {
}

export abstract class ExampleAppComponentBlueprint implements AfterViewInit {
    public abstract properties: IExampleProperties;
    public additional: any = {};

    @ViewChild(MapComponent) private mapComponent: MapComponent;

    constructor() {
        (window as any).app = this;
    };

    public ngAfterViewInit(): void {
        (window as any).map = this.mapComponent;
    }

    public getOutputPropertyByName(name: string): IExampleOutputProperty {
        for (let i: number = 0; i < this.properties.output.length; i += 1) {
            if (this.properties.output[i].name === name) {
                return this.properties.output[i];
            }
        }
    }
    public getInputPropertyByName(name: string): IExampleInputProperty {
        for (let i: number = 0; i < this.properties.input.length; i += 1) {
            if (this.properties.input[i].name === name) {
                return this.properties.input[i];
            }
        }
    }
    public getDuplexPropertyByName(name: string): IExampleDuplexProperty {
        for (let i: number = 0; i < this.properties.duplex.length; i += 1) {
            if (this.properties.duplex[i].name === name) {
                return this.properties.duplex[i];
            }
        }
    }

    public handleEvent(name: string, event: LeafletEvent): void {
        const target: IExampleOutputProperty = this.getOutputPropertyByName(name);
        target.value = EVENT_FIRED_TEXT;
        setTimeout(() => {
            target.value = EVENT_FIRED_RESET_TEXT;
        }, HIDE_DELAY);
    };
}
