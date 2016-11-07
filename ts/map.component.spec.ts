/// <reference path="../typings/index.d.ts" />

import { MapComponent } from './map.component';
import { LatLngBounds, point } from 'leaflet';

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
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lat = val;
            if (map.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lat }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            map.setView([val, 0], 0);
            if (map.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lat }`);
            }
        });
        it('should threshold rapid changes in Angular when changing in Leaflet', (done: MochaDone) => {
            var alreadyFired: boolean = false;

            map.latChange.subscribe(() => {
                if (alreadyFired) {
                    return done(new Error('Already fired event'));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([Math.random() * 100, 0], 0);
            setTimeout(() => {
                map.setView([Math.random() * 100, 0], 0);
            }, 10);
        });
    });
    describe('[(lng)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lng = val;
            if (map.getCenter().lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getCenter().lng }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lng = val;
            if (map.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lng }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            map.setView([0, val], 0);
            if (map.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lng }`);
            }
        });
        it('should threshold rapid changes in Angular when changing in Leaflet', (done: MochaDone) => {
            var alreadyFired: boolean = false;

            map.latChange.subscribe(() => {
                if (alreadyFired) {
                    return done(new Error('Already fired event'));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([0, Math.random() * 100], 0);
            setTimeout(() => {
                map.setView([0, Math.random() * 100], 0);
            }, 10);
        });
    });
    describe('[(zoom)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.zoom = val;
            if (map.getZoom() !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getZoom() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.zoom = val;
            if (map.zoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.zoom }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.setView([0, 0], val);
            if (map.zoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.zoom }`);
            }
        });
        it('should threshold rapid changes in Angular when changing in Leaflet', (done: MochaDone) => {
            var alreadyFired: boolean = false;

            map.latChange.subscribe(() => {
                if (alreadyFired) {
                    return done(new Error('Already fired event'));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([0, 0], Math.random() * 15);
            setTimeout(() => {
                map.setView([0, 0], Math.random() * 15);
            }, 10);
        });
    });
    describe('[(minZoom)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.minZoom = val;
            if (map.getMinZoom() !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getMinZoom() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.minZoom = val;
            if (map.minZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.minZoom }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.setMinZoom(val);
            if (map.zoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.minZoom }`);
            }
        });
    });
    describe('[(maxZoom)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.maxZoom = val;
            if (map.getMaxZoom() !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getMaxZoom() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.maxZoom = val;
            if (map.maxZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxZoom }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.setMaxZoom(val);
            if (map.maxZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxZoom }`);
            }
        });
    });
    describe('[(maxBounds)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});

            // Fix for no browser-test
            (<any>map)._size = point(100, 100);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: LatLngBounds = new LatLngBounds([
                [Math.random() * 100, Math.random() * 100],
                [Math.random() * 100, Math.random() * 100]
            ]);
            map.setMaxBounds(val);
            if ((<any>map).options.maxBounds !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxBounds }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: LatLngBounds = new LatLngBounds([
                [Math.random() * 100, Math.random() * 100],
                [Math.random() * 100, Math.random() * 100]
            ]);
            map.maxBounds = val;
            if (map.maxBounds !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxBounds }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: LatLngBounds = new LatLngBounds([
                [Math.random() * 100, Math.random() * 100],
                [Math.random() * 100, Math.random() * 100]
            ]);
            map.setMaxBounds(val);
            if (map.maxBounds !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxBounds }`);
            }
        });
    });
});
