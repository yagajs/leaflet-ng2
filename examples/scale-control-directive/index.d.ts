import 'reflect-metadata';
import 'zone.js';
import { ControlPosition } from '../../lib/index';
import { AfterViewInit } from '@angular/core';
export declare class AppComponent implements AfterViewInit {
    metric: boolean;
    imperial: boolean;
    maxWidth: number;
    states: ControlPosition[];
    position: ControlPosition;
    private mapComponent;
    constructor();
    handlePositionEvent(event: Event): void;
    ngAfterViewInit(): void;
}
export declare class AppModule {
}
