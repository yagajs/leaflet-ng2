/// <reference path="../typings/index.d.ts" />

import { PopupDirective,
    MapComponent,
    Point,
    LatLng } from './index';
import { point, latLng } from 'leaflet';

const EXAMPLE_CONTENT: string = 'Vel ipsum odit quia velit omnis illo voluptatem ut. Aperiam porro voluptates maiores.';

describe('Popup Directive', () => {
    describe('[(opened)]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
            (<any>popup)._wrapper = document.createElement('div');
            popup.setLatLng(latLng(0, 0));
            popup.openOn(map);
        });
        it('should remove DOM container when not opened', () => {
            popup.opened = false;
            /* istanbul ignore if */
            if ((<HTMLElement>(<any>popup)._container).parentNode) {
                throw new Error('Map is still parent element of the popup');
            }
        });
        it('should re-add DOM container when opened is true again', () => {
            popup.opened = true;

            /* istanbul ignore if */
            if (!(<HTMLElement>(<any>popup)._container).parentNode) {
                throw new Error('Map is still parent element of the popup');
            }
        });
    });
    describe('[(content)]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            popup.content = EXAMPLE_CONTENT;
            /* istanbul ignore if */
            if ((<string>(<any>popup)._content) !== EXAMPLE_CONTENT) {
                throw new Error(`Wrong value setted: ${ EXAMPLE_CONTENT } != ${ (<string>(<any>popup)._content) }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            popup.content = EXAMPLE_CONTENT;
            /* istanbul ignore if */
            if (popup.content !== EXAMPLE_CONTENT) {
                throw new Error(`Wrong value setted: ${ EXAMPLE_CONTENT } != ${ popup.content }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            popup.setContent(EXAMPLE_CONTENT);
            /* istanbul ignore if */
            if (popup.content !== EXAMPLE_CONTENT) {
                throw new Error(`Wrong value setted: ${ EXAMPLE_CONTENT } != ${ popup.content }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            popup.contentChange.subscribe((eventVal: string) => {
                /* istanbul ignore if */
                if (eventVal !== EXAMPLE_CONTENT) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            popup.content = EXAMPLE_CONTENT;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {   popup.content = EXAMPLE_CONTENT;
            popup.contentChange.subscribe((eventVal: string) => {
                /* istanbul ignore if */
                if (eventVal !== EXAMPLE_CONTENT + '?test') {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            popup.setContent(EXAMPLE_CONTENT + '?test');
        });
    });
    describe('[(lat)]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            popup.setLatLng(latLng(0, 0));
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            popup.lat = val;
            /* istanbul ignore if */
            if (popup.getLatLng().lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.getLatLng().lat }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            popup.lat = val;
            /* istanbul ignore if */
            if (popup.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.lat }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            popup.setLatLng([val, 0]);
            /* istanbul ignore if */
            if (popup.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.lat }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            popup.latChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            popup.lat = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            popup.latChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });


            popup.setLatLng([val, 0]);
        });
    });
    describe('[(lng)]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            popup.setLatLng(latLng(0, 0));
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            popup.lng = val;
            /* istanbul ignore if */
            if (popup.getLatLng().lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.getLatLng().lng }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            popup.lng = val;
            /* istanbul ignore if */
            if (popup.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.lng }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            popup.setLatLng([0, val]);
            /* istanbul ignore if */
            if (popup.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.lng }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            popup.lngChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            popup.lng = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            popup.lngChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });


            popup.setLatLng([0, val]);
        });
    });
    describe('[(position)]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            popup.setLatLng(latLng(0, 0));
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            popup.position = val;
            /* istanbul ignore if */
            if (popup.getLatLng().lat !== val.lat || popup.getLatLng().lng !== val.lng) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.getLatLng() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            popup.position = val;
            /* istanbul ignore if */
            if (popup.position !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.position }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            popup.setLatLng(val);
            /* istanbul ignore if */
            if (popup.position !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.position }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);

            popup.positionChange.subscribe((eventVal: LatLng) => {
                /* istanbul ignore if */
                if (eventVal.lat !== val.lat || eventVal.lng !== val.lng) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            popup.position = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);

            popup.positionChange.subscribe((eventVal: LatLng) => {
                /* istanbul ignore if */
                if (eventVal.lat !== val.lat || eventVal.lng !== val.lng) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            popup.setLatLng(val);
        });
    });

    // Events
    describe('(open)', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            popup.setLatLng(latLng(0, 0));
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            popup.openEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.target !== popup) {
                    return done(new Error('Wrong event returned'));
                }
                done();
            });
            popup.openOn(map);
        });
    });
    describe('(close)', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            popup.setLatLng(latLng(0, 0));
            popup.openOn(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            popup.closeEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.target !== popup) {
                    return done(new Error('Wrong event returned'));
                }
                done();
            });
            (<any>popup)._close();
        });
    });

    // Inputs
    describe('[maxWidth]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            popup.maxWidth = val;
            /* istanbul ignore if */
            if (popup.options.maxWidth !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.options.maxWidth }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            popup.maxWidth = val;
            /* istanbul ignore if */
            if (popup.maxWidth !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.minWidth }`);
            }
        });
    });
    describe('[minWidth]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            popup.minWidth = val;
            /* istanbul ignore if */
            if (popup.options.minWidth !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.options.minWidth }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            popup.minWidth = val;
            /* istanbul ignore if */
            if (popup.minWidth !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.minWidth }`);
            }
        });
    });
    describe('[maxHeight]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            popup.maxHeight = val;
            /* istanbul ignore if */
            if (popup.options.maxHeight !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.options.maxHeight }`);
            }
        });
    });
    describe('[autoPanPaddingTopLeft]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const num: number = Math.ceil(Math.random() * 1000),
                val: Point = point(num, num);
            popup.autoPanPaddingTopLeft = val;
            /* istanbul ignore if */
            if (popup.options.autoPanPaddingTopLeft !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.options.autoPanPaddingTopLeft }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const num: number = Math.ceil(Math.random() * 1000),
                val: Point = point(num, num);
            popup.autoPanPaddingTopLeft = val;
            /* istanbul ignore if */
            if (popup.autoPanPaddingTopLeft !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.autoPanPaddingTopLeft }`);
            }
        });
    });
    describe('[autoPanPaddingBottomRight]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const num: number = Math.ceil(Math.random() * 1000),
                val: Point = point(num, num);
            popup.autoPanPaddingBottomRight = val;
            /* istanbul ignore if */
            if (popup.options.autoPanPaddingBottomRight !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.options.autoPanPaddingBottomRight }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const num: number = Math.ceil(Math.random() * 1000),
                val: Point = point(num, num);
            popup.autoPanPaddingBottomRight = val;
            /* istanbul ignore if */
            if (popup.autoPanPaddingBottomRight !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.autoPanPaddingBottomRight }`);
            }
        });
    });
    describe('[autoPanPadding]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const num: number = Math.ceil(Math.random() * 1000),
                val: Point = point(num, num);
            popup.autoPanPadding = val;
            /* istanbul ignore if */
            if (popup.options.autoPanPadding !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.options.autoPanPadding }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const num: number = Math.ceil(Math.random() * 1000),
                val: Point = point(num, num);
            popup.autoPanPadding = val;
            /* istanbul ignore if */
            if (popup.autoPanPadding !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.autoPanPadding }`);
            }
        });
    });

    describe('[autoPan]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            popup.autoPan = false;
            /* istanbul ignore if */
            if (popup.options.autoPan) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            popup.options.autoPan = false;
            popup.autoPan = true;
            /* istanbul ignore if */
            if (!popup.options.autoPan) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            popup.autoPan = false;
            /* istanbul ignore if */
            if (popup.autoPan) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            popup.autoPan = true;
            /* istanbul ignore if */
            if (!popup.autoPan) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[keepInView]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            popup.keepInView = false;
            /* istanbul ignore if */
            if (popup.options.keepInView) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            popup.options.keepInView = false;
            popup.keepInView = true;
            /* istanbul ignore if */
            if (!popup.options.keepInView) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            popup.keepInView = false;
            /* istanbul ignore if */
            if (popup.keepInView) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            popup.keepInView = true;
            /* istanbul ignore if */
            if (!popup.keepInView) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[closeButton]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            popup.closeButton = false;
            /* istanbul ignore if */
            if (popup.options.closeButton) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            popup.options.closeButton = false;
            popup.closeButton = true;
            /* istanbul ignore if */
            if (!popup.options.closeButton) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            popup.closeButton = false;
            /* istanbul ignore if */
            if (popup.closeButton) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            popup.closeButton = true;
            /* istanbul ignore if */
            if (!popup.closeButton) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[autoClose]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            popup.autoClose = false;
            /* istanbul ignore if */
            if (popup.options.autoClose) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            popup.options.autoClose = false;
            popup.autoClose = true;
            /* istanbul ignore if */
            if (!popup.options.autoClose) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            popup.autoClose = false;
            /* istanbul ignore if */
            if (popup.autoClose) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            popup.autoClose = true;
            /* istanbul ignore if */
            if (!popup.autoClose) {
                throw new Error(`It is not setted to true`);
            }
        });
    });

    describe('[className]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'test-class';
            popup.className = val;
            /* istanbul ignore if */
            if (popup.options.className !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.options.className }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'test-class';
            popup.className = val;
            /* istanbul ignore if */
            if (popup.className !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.className }`);
            }
        });
    });
    describe('[pane]', () => {
        var map: MapComponent,
            popup: PopupDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            popup = new PopupDirective(map, {nativeElement: document.createElement('div')});
            (<any>popup)._contentNode = document.createElement('div');
            (<any>popup)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'test-class';
            popup.pane = val;
            /* istanbul ignore if */
            if (popup.options.pane !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.options.pane }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'test-class';
            popup.pane = val;
            /* istanbul ignore if */
            if (popup.pane !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ popup.pane }`);
            }
        });
    });
});
