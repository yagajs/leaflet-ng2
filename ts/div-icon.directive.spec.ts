/// <reference path="../typings/index.d.ts" />

import { DivIconDirective,
    MapComponent,
    Point,
    Event } from './index';
import { point } from 'leaflet';

describe('DivIcon Directive', () => {
    // Events
    describe('(update)', () => {
        var map: MapComponent,
            icon: DivIconDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new DivIconDirective({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when changing', (done: MochaDone) => {
            icon.updateEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.target !== icon) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            icon.iconAnchor = point(1, 2);
        });
    });

    // Inputs
    describe('[iconSize]', () => {
        var map: MapComponent,
            icon: DivIconDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new DivIconDirective({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconSize = val;
            /* istanbul ignore if */
            if (icon.options.iconSize !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.options.iconSize }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconSize = val;
            /* istanbul ignore if */
            if (icon.iconSize !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.iconSize }`);
            }
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                /* istanbul ignore if */
                if (ev.target !== icon) {
                    return done(new Error('Wrong Event fired...'));
                }
                return done();
            });
            icon.iconSize = val;
        });
    });
    describe('[iconAnchor]', () => {
        var map: MapComponent,
            icon: DivIconDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new DivIconDirective({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconAnchor = val;
            /* istanbul ignore if */
            if (icon.options.iconAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.options.iconAnchor }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconAnchor = val;
            /* istanbul ignore if */
            if (icon.iconAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.iconAnchor }`);
            }
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                /* istanbul ignore if */
                if (ev.target !== icon) {
                    return done(new Error('Wrong Event fired...'));
                }
                return done();
            });
            icon.iconAnchor = val;
        });
    });
    describe('[popupAnchor]', () => {
        var map: MapComponent,
            icon: DivIconDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new DivIconDirective({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.popupAnchor = val;
            /* istanbul ignore if */
            if (icon.options.popupAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.options.popupAnchor }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.popupAnchor = val;
            /* istanbul ignore if */
            if (icon.popupAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.popupAnchor }`);
            }
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                /* istanbul ignore if */
                if (ev.target !== icon) {
                    return done(new Error('Wrong Event fired...'));
                }
                return done();
            });
            icon.popupAnchor = val;
        });
    });
});
