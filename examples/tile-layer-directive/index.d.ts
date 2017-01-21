import 'reflect-metadata';
import 'zone.js';
import { AfterViewInit } from '@angular/core';
export interface ITileLayerOptions {
    url: string;
    opacity?: number;
}
export declare class AppComponent implements AfterViewInit {
    zoom: number;
    lat: number;
    lng: number;
    newLayerUrl: string;
    newLayerOpacity: number;
    tileLayers: ITileLayerOptions[];
    private mapComponent;
    constructor();
    removeLayer(layer: ITileLayerOptions): void;
    addLayer(): void;
    ngAfterViewInit(): void;
}
export declare class AppModule {
}
