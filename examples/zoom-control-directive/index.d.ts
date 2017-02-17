import 'reflect-metadata';
import 'zone.js';
import { ControlPosition } from '../../lib/index';
import { AfterViewInit } from '@angular/core';
export declare class AppComponent implements AfterViewInit {
    positionStates: ControlPosition[];
    position: ControlPosition;
    zoomInText: string;
    zoomInTitle: string;
    zoomOutText: string;
    zoomOutTitle: string;
    private mapComponent;
    constructor();
    handlePositionEvent(event: Event): void;
    ngAfterViewInit(): void;
}
export declare class AppModule {
}
