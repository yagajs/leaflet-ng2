/// <reference path="../typings/index.d.ts" />

import { AttributionControlDirective,
    MapComponent,
    ControlPosition } from './index';
import { point, Point, latLngBounds } from 'leaflet';

describe('Attribution-Control Directive', () => {
    describe('[(position)]', () => {
        var map: MapComponent,
            control: AttributionControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new AttributionControlDirective(map);
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

    describe('[(prefix)]', () => {
        var map: MapComponent,
            control: AttributionControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new AttributionControlDirective(map);
            return done();
        });
        it('should be set to YAGA by default', () => {
            /* istanbul ignore if */
            if (control.getContainer().innerHTML.indexOf('>YAGA<') === -1) {
                throw new Error(`It has not YAGA as default prefix`);
            }
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'Attribution-Prefix';
            control.prefix = val;
            /* istanbul ignore if */
            if (control.options.prefix !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ control.options.prefix }`);
            }
            /* istanbul ignore if */
            if (control.getContainer().innerHTML.indexOf(val) === -1) {
                throw new Error(`Wrong value written in HTMLElement ${ control.getContainer().innerHTML }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'Attribution-Prefix';
            control.prefix = val;
            /* istanbul ignore if */
            if (control.prefix !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ control.prefix }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: string = 'Attribution-Prefix';
            control.setPrefix(val);
            /* istanbul ignore if */
            if (control.prefix !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ control.prefix }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: string = 'Attribution-Prefix';
            control.prefixChange.subscribe((eventVal: string) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();

            });

            control.prefix = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: string = 'Attribution-Prefix';
            control.prefixChange.subscribe((eventVal: string) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();

            });

            control.setPrefix(val);
        });
    });

    describe('[opacity]', () => {
        var map: MapComponent,
            control: AttributionControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new AttributionControlDirective(map);
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

    // Events
    describe('(add)', () => {
        var map: MapComponent,
            control: AttributionControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new AttributionControlDirective(map);
            return done();
        });
        it('should fire an event when adding to map', (done: MochaDone) => {
            map.removeControl(control);

            control.addEvent.subscribe(() => {
                done();
            });
            map.addControl(control);
        });
    });
    describe('(remove)', () => {
        var map: MapComponent,
            control: AttributionControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new AttributionControlDirective(map);
            return done();
        });
        it('should fire an event when removing from map', (done: MochaDone) => {
            control.removeEvent.subscribe(() => {
                done();
            });
            map.removeControl(control);
        });
    });

    describe('(click)', () => {
        var map: MapComponent,
            control: AttributionControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new AttributionControlDirective(map);
            return done();
        });
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.clickEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('click'));
        });
    });
    describe('(dbclick)', () => {
        var map: MapComponent,
            control: AttributionControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new AttributionControlDirective(map);
            return done();
        });
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.dbclickEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('dbclick'));
        });
    });
    describe('(mousedown)', () => {
        var map: MapComponent,
            control: AttributionControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new AttributionControlDirective(map);
            return done();
        });
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.mousedownEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('mousedown'));
        });
    });
    describe('(mouseover)', () => {
        var map: MapComponent,
            control: AttributionControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new AttributionControlDirective(map);
            return done();
        });
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.mouseoverEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('mouseover'));
        });
    });
    describe('(mouseout)', () => {
        var map: MapComponent,
            control: AttributionControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new AttributionControlDirective(map);
            return done();
        });
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.mouseoutEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('mouseout'));
        });
    });

    /*
    describe('[zoomInText]', () => {
        const TEST_VALUE: string = 'test-caption';
        var map: MapComponent,
            control: AttributionControlDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new AttributionControlDirective(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            control.zoomInText = TEST_VALUE;
            /* istanbul ignore if * /
            if (control.options.zoomInText !== TEST_VALUE) {
                throw new Error(`Wrong value setted in options: ${ TEST_VALUE } != ${ control.options.zoomInText }`);
            }
            /* istanbul ignore if * /
            if ((<HTMLElement>(<any>control)._zoomInButton).textContent !== TEST_VALUE) {
                /* tslint:disable:max-line-length * /
                throw new Error(`Wrong value setted in HTMLElement: ${ TEST_VALUE } != ${ (<HTMLElement>(<any>control).
                        _zoomInButton).textContent }`);
                /* tslint:enable * /
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            control.zoomInText = TEST_VALUE;
            /* istanbul ignore if * /
            if (control.zoomInText !== TEST_VALUE) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ control.zoomInText }`);
            }
        });
    });*/
});

describe('Destroying a Attribution Control Directive', () => {
    var map: MapComponent,
        control: AttributionControlDirective;
    beforeEach((done) => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        control = new AttributionControlDirective(map);
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
