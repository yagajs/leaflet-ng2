/// <reference path="../typings/index.d.ts" />

import { TooltipDirective,
    MapComponent,
    Direction,
    Point,
    LatLng,
    EXAMPLE_CONTENT } from './index';
import { point, latLng } from 'leaflet';

describe('Tooltip Directive', () => {
    describe('[(opened)]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            (<any>tooltip)._contentNode = document.createElement('div');
            (<any>tooltip)._container = document.createElement('div');
            (<any>tooltip)._wrapper = document.createElement('div');
            tooltip.setLatLng(latLng(0, 0));
            map.openTooltip(tooltip);
        });
        it('should remove DOM container when not opened', () => {
            tooltip.opened = false;
            /* istanbul ignore if */
            if ((<HTMLElement>(<any>tooltip)._container).parentNode) {
                throw new Error('Map is still parent element of the tooltip');
            }
        });
        it('should re-add DOM container when opened is true again', () => {
            tooltip.opened = true;

            /* istanbul ignore if */
            if (!(<HTMLElement>(<any>tooltip)._container).parentNode) {
                throw new Error('Map is still parent element of the tooltip');
            }
        });
    });
    describe('[(content)]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            (<any>tooltip)._contentNode = document.createElement('div');
            (<any>tooltip)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            tooltip.content = EXAMPLE_CONTENT;
            /* istanbul ignore if */
            if ((<string>(<any>tooltip)._content) !== EXAMPLE_CONTENT) {
                throw new Error(`Wrong value setted: ${ EXAMPLE_CONTENT } != ${ (<string>(<any>tooltip)._content) }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            tooltip.content = EXAMPLE_CONTENT;
            /* istanbul ignore if */
            if (tooltip.content !== EXAMPLE_CONTENT) {
                throw new Error(`Wrong value setted: ${ EXAMPLE_CONTENT } != ${ tooltip.content }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            tooltip.setContent(EXAMPLE_CONTENT);
            /* istanbul ignore if */
            if (tooltip.content !== EXAMPLE_CONTENT) {
                throw new Error(`Wrong value setted: ${ EXAMPLE_CONTENT } != ${ tooltip.content }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            tooltip.contentChange.subscribe((eventVal: string) => {
                /* istanbul ignore if */
                if (eventVal !== EXAMPLE_CONTENT) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            tooltip.content = EXAMPLE_CONTENT;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {   tooltip.content = EXAMPLE_CONTENT;
            tooltip.contentChange.subscribe((eventVal: string) => {
                /* istanbul ignore if */
                if (eventVal !== EXAMPLE_CONTENT + '?test') {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            tooltip.setContent(EXAMPLE_CONTENT + '?test');
        });
    });

    describe('[(opacity)]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            (<any>tooltip)._contentNode = document.createElement('div');
            (<any>tooltip)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            tooltip.opacity = 0.123;
            /* istanbul ignore if */
            if (tooltip.options.opacity !== 0.123) {
                throw new Error(`Wrong value setted: ${ 0.123 } != ${ tooltip.options.opacity }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            tooltip.opacity = 0.123;
            /* istanbul ignore if */
            if (tooltip.opacity !== 0.123) {
                throw new Error(`Wrong value setted: ${ 0.123 } != ${ tooltip.opacity }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            tooltip.setOpacity(0.123);
            /* istanbul ignore if */
            if (tooltip.opacity !== 0.123) {
                throw new Error(`Wrong value setted: ${ 0.123 } != ${ tooltip.opacity }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            tooltip.opacityChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== 0.123) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            tooltip.opacity = 0.123;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            tooltip.opacityChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== 0.246) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            tooltip.setOpacity(0.246);
        });
    });
    describe('[(lat)]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            tooltip.setLatLng(latLng(0, 0));
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            tooltip.lat = val;
            /* istanbul ignore if */
            if (tooltip.getLatLng().lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.getLatLng().lat }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            tooltip.lat = val;
            /* istanbul ignore if */
            if (tooltip.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.lat }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            tooltip.setLatLng([val, 0]);
            /* istanbul ignore if */
            if (tooltip.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.lat }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            tooltip.latChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            tooltip.lat = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            tooltip.latChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });


            tooltip.setLatLng([val, 0]);
        });
    });
    describe('[(lng)]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            tooltip.setLatLng(latLng(0, 0));
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            tooltip.lng = val;
            /* istanbul ignore if */
            if (tooltip.getLatLng().lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.getLatLng().lng }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            tooltip.lng = val;
            /* istanbul ignore if */
            if (tooltip.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.lng }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            tooltip.setLatLng([0, val]);
            /* istanbul ignore if */
            if (tooltip.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.lng }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            tooltip.lngChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            tooltip.lng = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            tooltip.lngChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });


            tooltip.setLatLng([0, val]);
        });
    });
    describe('[(position)]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            tooltip.setLatLng(latLng(0, 0));
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            tooltip.position = val;
            /* istanbul ignore if */
            if (tooltip.getLatLng().lat !== val.lat || tooltip.getLatLng().lng !== val.lng) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.getLatLng() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            tooltip.position = val;
            /* istanbul ignore if */
            if (tooltip.position !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.position }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            tooltip.setLatLng(val);
            /* istanbul ignore if */
            if (tooltip.position !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.position }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);

            tooltip.positionChange.subscribe((eventVal: LatLng) => {
                /* istanbul ignore if */
                if (eventVal.lat !== val.lat || eventVal.lng !== val.lng) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            tooltip.position = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);

            tooltip.positionChange.subscribe((eventVal: LatLng) => {
                /* istanbul ignore if */
                if (eventVal.lat !== val.lat || eventVal.lng !== val.lng) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            tooltip.setLatLng(val);
        });
    });

    // Events
    describe('(open)', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            tooltip.setLatLng(latLng(0, 0));
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            tooltip.openEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.target !== tooltip) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.openTooltip(tooltip);
        });
    });
    describe('(close)', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            tooltip.setLatLng(latLng(0, 0));
            map.openTooltip(tooltip);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            tooltip.closeEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.target !== tooltip) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            (<any>tooltip)._close();
        });
    });

    // Inputs
    describe('[className]', () => {
        var map: MapComponent,
        tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            (<any>tooltip)._contentNode = document.createElement('div');
            (<any>tooltip)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'test-class';
            tooltip.className = val;
            /* istanbul ignore if */
            if (tooltip.options.className !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.options.className }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'test-class';
            tooltip.className = val;
            /* istanbul ignore if */
            if (tooltip.className !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.className }`);
            }
        });
    });
    describe('[pane]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            (<any>tooltip)._contentNode = document.createElement('div');
            (<any>tooltip)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'test-class';
            tooltip.pane = val;
            /* istanbul ignore if */
            if (tooltip.options.pane !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.options.pane }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'test-class';
            tooltip.pane = val;
            /* istanbul ignore if */
            if (tooltip.pane !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.pane }`);
            }
        });
    });
    describe('[direction]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            (<any>tooltip)._contentNode = document.createElement('div');
            (<any>tooltip)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Direction = 'top';
            tooltip.direction = val;
            /* istanbul ignore if */
            if (tooltip.options.direction !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.options.direction }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Direction = 'right';
            tooltip.direction = val;
            /* istanbul ignore if */
            if (tooltip.direction !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.direction }`);
            }
        });
    });
    describe('[offset]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            (<any>tooltip)._contentNode = document.createElement('div');
            (<any>tooltip)._container = document.createElement('div');
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(12, 34);
            tooltip.offset = val;
            /* istanbul ignore if */
            if (tooltip.options.offset !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.options.offset }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(12, 34);
            tooltip.offset = val;
            /* istanbul ignore if */
            if (tooltip.offset !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ tooltip.offset }`);
            }
        });
    });


    describe('[interactive]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            (<any>tooltip)._contentNode = document.createElement('div');
            (<any>tooltip)._container = document.createElement('div');
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            tooltip.interactive = false;
            /* istanbul ignore if */
            if (tooltip.options.interactive) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            tooltip.options.interactive = false;
            tooltip.interactive = true;
            /* istanbul ignore if */
            if (!tooltip.options.interactive) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            tooltip.interactive = false;
            /* istanbul ignore if */
            if (tooltip.interactive) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            tooltip.interactive = true;
            /* istanbul ignore if */
            if (!tooltip.interactive) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[sticky]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            (<any>tooltip)._contentNode = document.createElement('div');
            (<any>tooltip)._container = document.createElement('div');
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            tooltip.sticky = false;
            /* istanbul ignore if */
            if (tooltip.options.sticky) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            tooltip.options.sticky = false;
            tooltip.sticky = true;
            /* istanbul ignore if */
            if (!tooltip.options.sticky) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            tooltip.sticky = false;
            /* istanbul ignore if */
            if (tooltip.sticky) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            tooltip.sticky = true;
            /* istanbul ignore if */
            if (!tooltip.sticky) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[permanent]', () => {
        var map: MapComponent,
            tooltip: TooltipDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            tooltip = new TooltipDirective(map, {nativeElement: document.createElement('div')});
            (<any>tooltip)._contentNode = document.createElement('div');
            (<any>tooltip)._container = document.createElement('div');
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            tooltip.permanent = false;
            /* istanbul ignore if */
            if (tooltip.options.permanent) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            tooltip.options.permanent = false;
            tooltip.permanent = true;
            /* istanbul ignore if */
            if (!tooltip.options.permanent) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            tooltip.permanent = false;
            /* istanbul ignore if */
            if (tooltip.permanent) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            tooltip.permanent = true;
            /* istanbul ignore if */
            if (!tooltip.permanent) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
});
