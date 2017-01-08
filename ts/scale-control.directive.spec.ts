/// <reference path="../typings/index.d.ts" />

import { ScaleControlDirective,
    MapComponent,
    ControlPosition } from './index';
import { point, Point, latLngBounds } from 'leaflet';

describe('Scale-Control Directive', () => {
    describe('[(position)]', () => {
        var map: MapComponent,
            control: ScaleControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ScaleControlDirective(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: ControlPosition = 'topright';
            control.position = val;
            /* istanbul ignore if */
            if (control.getPosition() !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ control.getPosition() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: ControlPosition = 'topright';
            control.position = val;
            /* istanbul ignore if */
            if (control.position !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ control.position }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: ControlPosition = 'topright';
            control.setPosition(val);
            /* istanbul ignore if */
            if (control.position !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ control.position }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: ControlPosition = 'topleft';
            control.positionChange.subscribe((eventVal: ControlPosition) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();

            });

            control.position = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: ControlPosition = 'topleft';
            control.positionChange.subscribe((eventVal: ControlPosition) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();

            });

            control.setPosition(val);
        });
    });

    describe('[opacity]', () => {
        var map: MapComponent,
            control: ScaleControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ScaleControlDirective(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            control.opacity = val;
            /* istanbul ignore if */
            if (control.getContainer().style.opacity !== val.toString()) {
                throw new Error(`Wrong value setted: ${ val } != ${ control.getContainer().style.opacity }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            control.opacity = val;
            /* istanbul ignore if */
            if (control.opacity !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ control.opacity }`);
            }
        });
    });

    describe('[metric]', () => {
        var map: MapComponent,
            control: ScaleControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ScaleControlDirective(map);
            return done();
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            control.metric = false;
            /* istanbul ignore if */
            if (control.options.metric) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            control.options.metric = false;
            control.metric = true;
            /* istanbul ignore if */
            if (!control.options.metric) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            control.metric = false;
            /* istanbul ignore if */
            if (control.metric) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            control.metric = true;
            /* istanbul ignore if */
            if (!control.metric) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[imperial]', () => {
        var map: MapComponent,
            control: ScaleControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ScaleControlDirective(map);
            return done();
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            control.imperial = false;
            /* istanbul ignore if */
            if (control.options.imperial) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            control.options.imperial = false;
            control.imperial = true;
            /* istanbul ignore if */
            if (!control.options.imperial) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            control.imperial = false;
            /* istanbul ignore if */
            if (control.imperial) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            control.imperial = true;
            /* istanbul ignore if */
            if (!control.imperial) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
});

describe('Destroying a Scale Control Directive', () => {
    var map: MapComponent,
        control: ScaleControlDirective;
    beforeEach((done) => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        control = new ScaleControlDirective(map);
        return done();
    });
    it('should remove Tile-Layer Directive from map on destroy', () => {
        /* istanbul ignore if */
        if (control.getContainer().parentElement.parentElement.parentElement !== map.getContainer()) {
            throw new Error('The control is not part of the map before destroying');
        }
        control.ngOnDestroy();
        /* istanbul ignore if */
        if (control.getContainer() &&
            control.getContainer().parentElement &&
            control.getContainer().parentElement.parentElement &&
            control.getContainer().parentElement.parentElement.parentElement &&
            control.getContainer().parentElement.parentElement.parentElement === map.getContainer()) {
            throw new Error('The layer is still part of the map after destroying');
        }
    });
});
