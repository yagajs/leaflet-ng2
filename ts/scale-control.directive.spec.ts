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

            })

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

            })

            control.setPosition(val);
        });
    });
});
