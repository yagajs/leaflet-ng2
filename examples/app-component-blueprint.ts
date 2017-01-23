
import { MapComponent } from '../lib/index'; // @yaga/leflet-ng2

import { AfterViewInit, ViewChild } from '@angular/core';

export const HIDE_DELAY: number = 500;
export const EVENT_FIRED_TEXT: string = 'Event fired now...';
export const EVENT_FIRED_RESET_TEXT: string = '';

export class ExampleAppComponentBlueprint implements AfterViewInit {
    @ViewChild(MapComponent) private mapComponent: MapComponent;
    constructor() {
        (<any>window).app = this;
    }
    public handleEvent(name: string): void {
        this[name + 'EventValue'] = EVENT_FIRED_TEXT;
        setTimeout(() => {
            this[name + 'EventValue'] = EVENT_FIRED_RESET_TEXT;
        }, HIDE_DELAY);
    }
    public ngAfterViewInit(): void {
        (<any>window).map = this.mapComponent;
    }
}