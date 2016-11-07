/// <reference path="../typings/index.d.ts" />

import { MapComponent } from './map.component';

describe('Map Component', () => {
    describe('[(lat)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lat = val;
            if (map.getCenter().lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getCenter().lat }`);
            }
        });
    });
    /* tslint:disable */
    describe('[(lng)]', () => {});
    describe('[(zoom)]', () => {});
    describe('[(minZoom)]', () => {});
    describe('[(maxZoom)]', () => {});
    describe('[(maxBounds)]', () => {});
});
