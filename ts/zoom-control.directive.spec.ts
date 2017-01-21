/// <reference path="../typings/index.d.ts" />

import { ZoomControlDirective,
    MapComponent,
    ControlPosition } from './index';
import { point } from 'leaflet';

describe('Zoom-Control Directive', () => {
    describe('[(position)]', () => {
        var map: MapComponent,
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
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

    // Events
    describe('(add)', () => {
         var map: MapComponent,
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
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
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
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
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
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
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
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
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
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
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
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
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
        });
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.mouseoutEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('mouseout'));
        });
    });

    describe('[opacity]', () => {
        var map: MapComponent,
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
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

    describe('[zoomInText]', () => {
        const TEST_VALUE: string = 'test-caption';
        var map: MapComponent,
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            control.zoomInText = TEST_VALUE;
            /* istanbul ignore if */
            if (control.options.zoomInText !== TEST_VALUE) {
                throw new Error(`Wrong value setted in options: ${ TEST_VALUE } != ${ control.options.zoomInText }`);
            }
            /* istanbul ignore if */
            if ((<HTMLElement>(<any>control)._zoomInButton).textContent !== TEST_VALUE) {
                /* tslint:disable:max-line-length */
                throw new Error(`Wrong value setted in HTMLElement: ${ TEST_VALUE } != ${ (<HTMLElement>(<any>control)._zoomInButton).textContent }`);
                /* tslint:enable */
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            control.zoomInText = TEST_VALUE;
            /* istanbul ignore if */
            if (control.zoomInText !== TEST_VALUE) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ control.zoomInText }`);
            }
        });
    });
    describe('[zoomOutText]', () => {
        const TEST_VALUE: string = 'test-caption';
        var map: MapComponent,
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            control.zoomOutText = TEST_VALUE;
            /* istanbul ignore if */
            if (control.options.zoomOutText !== TEST_VALUE) {
                throw new Error(`Wrong value setted in options: ${ TEST_VALUE } != ${ control.options.zoomOutText }`);
            }
            /* istanbul ignore if */
            if ((<HTMLElement>(<any>control)._zoomOutButton).textContent !== TEST_VALUE) {
                /* tslint:disable:max-line-length */
                throw new Error(`Wrong value setted in HTMLElement: ${ TEST_VALUE } != ${ (<HTMLElement>(<any>control)._zoomOutButton).textContent }`);
                /* tslint:enable */
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            control.zoomOutText = TEST_VALUE;
            /* istanbul ignore if */
            if (control.zoomOutText !== TEST_VALUE) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ control.zoomOutText }`);
            }
        });
    });

    describe('[zoomInTitle]', () => {
        const TEST_VALUE: string = 'test-caption';
        var map: MapComponent,
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            control.zoomInTitle = TEST_VALUE;
            /* istanbul ignore if */
            if (control.options.zoomInTitle !== TEST_VALUE) {
                throw new Error(`Wrong value setted in options: ${ TEST_VALUE } != ${ control.options.zoomInTitle }`);
            }
            /* istanbul ignore if */
            if ((<HTMLElement>(<any>control)._zoomInButton).getAttribute('title') !== TEST_VALUE) {
                /* tslint:disable:max-line-length */
                throw new Error(`Wrong value setted in HTMLElement: ${ TEST_VALUE } != ${ (<HTMLElement>(<any>control)._zoomInButton).getAttribute('title') }`);
                /* tslint:enable */
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            control.zoomInTitle = TEST_VALUE;
            /* istanbul ignore if */
            if (control.zoomInTitle !== TEST_VALUE) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ control.zoomInTitle }`);
            }
        });
    });
    describe('[zoomOutTitle]', () => {
        const TEST_VALUE: string = 'test-caption';
        var map: MapComponent,
            control: ZoomControlDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            control = new ZoomControlDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            control.zoomOutTitle = TEST_VALUE;
            /* istanbul ignore if */
            if (control.options.zoomOutTitle !== TEST_VALUE) {
                throw new Error(`Wrong value setted in options: ${ TEST_VALUE } != ${ control.options.zoomOutTitle }`);
            }
            /* istanbul ignore if */
            if ((<HTMLElement>(<any>control)._zoomOutButton).getAttribute('title') !== TEST_VALUE) {
                /* tslint:disable:max-line-length */
                throw new Error(`Wrong value setted in HTMLElement: ${ TEST_VALUE } != ${ (<HTMLElement>(<any>control)._zoomOutButton).getAttribute('title') }`);
                /* tslint:enable */
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            control.zoomOutTitle = TEST_VALUE;
            /* istanbul ignore if */
            if (control.zoomOutTitle !== TEST_VALUE) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ control.zoomOutTitle }`);
            }
        });
    });

});

describe('Destroying a Zoom Control Directive', () => {
    var map: MapComponent,
        control: ZoomControlDirective;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        control = new ZoomControlDirective(map);
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
