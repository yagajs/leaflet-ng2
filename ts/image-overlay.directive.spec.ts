/// <reference path="../typings/index.d.ts" />

import { ImageOverlayDirective,
    MapComponent,
    LatLngBounds } from './index';
import { point, latLngBounds } from 'leaflet';

const TILE_LAYER_URL: string = 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png';

function hasAsChild(root: HTMLElement, child: HTMLElement): boolean {
    'use strict';
    const length: number = root.children.length;
    for (let i: number = 0; i < length; i += 1) {
        /* istanbul ignore else */
        if (root.children.item(i) === child) {
            return true;
        }
    }
    return false;
}

describe('Image-Overlay Directive', () => {
    describe('[(display)]', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should remove DOM container when not displaying', () => {
            layer.display = false;
            /* istanbul ignore if */
            if (hasAsChild(layer.getPane(), layer.getElement())) {
                throw new Error('Map is still parent element of the tile layer');
            }
        });
        it('should re-add DOM container when display is true again', () => {
            layer.display = false;
            layer.display = true;

            /* istanbul ignore if */
            if (!hasAsChild(layer.getPane(), layer.getElement())) {
                throw new Error('Map is not parent element of the tile layer');
            }
        });
        it('should remove EventListeners when not displaying', (done: MochaDone) => {
            const zoomEvents: {fn: Function}[] = (<any>map)._events.zoom,
                length: number = zoomEvents.length,
                originalEventListener: Function = layer.getEvents()['zoom'];

            layer.display = false;

            for (let i: number = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done(new Error('There is still an event on listener'));
                }
                return done();
            }
        });
        it('should re-add EventListeners when display is true again', (done: MochaDone) => {
            const zoomEvents: {fn: Function}[] = (<any>map)._events.zoom,
                length: number = zoomEvents.length,
                originalEventListener: Function = layer.getEvents()['zoom'];

            layer.display = false;
            layer.display = true;

            for (let i: number = 0; i < length; i += 1) {
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done();
                }
            }
            /* istanbul ignore next */
            return done(new Error('There is no event on listener'));
        });
        it('should set to false by removing from map', (done: MochaDone) => {

            layer.displayChange.subscribe((val: boolean) => {
                /* istanbul ignore if */
                if (val !== false) {
                    return new Error('Wrong value emitted');
                }
                /* istanbul ignore if */
                if (layer.display) {
                    return new Error('Wrong value from variable call');
                }
                done();
            });

            map.removeLayer(layer);
        });
        it('should set to true when adding to map again', (done: MochaDone) => {
            map.removeLayer(layer);
            layer.displayChange.subscribe((val: boolean) => {
                /* istanbul ignore if */
                if (val !== true) {
                    return done(new Error('Wrong value emitted'));
                }
                /* istanbul ignore if */
                if (!layer.display) {
                    return done(new Error('Wrong value from variable call'));
                }
                done();
            });

            map.addLayer(layer);
        });
    });
    describe('[(url)]', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            layer.url = TILE_LAYER_URL;
            /* istanbul ignore if */
            if ((<string>(<any>layer)._url) !== TILE_LAYER_URL) {
                throw new Error(`Wrong value setted: ${ TILE_LAYER_URL } != ${ (<string>(<any>layer)._url) }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.url = TILE_LAYER_URL;
            /* istanbul ignore if */
            if (layer.url !== TILE_LAYER_URL) {
                throw new Error(`Wrong value setted: ${ TILE_LAYER_URL } != ${ layer.url }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            layer.setUrl(TILE_LAYER_URL);
            /* istanbul ignore if */
            if (layer.url !== TILE_LAYER_URL) {
                throw new Error(`Wrong value setted: ${ TILE_LAYER_URL } != ${ layer.url }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            layer.urlChange.subscribe((eventVal: string) => {
                /* istanbul ignore if */
                if (eventVal !== TILE_LAYER_URL) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.url = TILE_LAYER_URL;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {   layer.url = TILE_LAYER_URL;
            layer.urlChange.subscribe((eventVal: string) => {
                /* istanbul ignore if */
                if (eventVal !== TILE_LAYER_URL + '?test') {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setUrl(TILE_LAYER_URL + '?test');
        });
        it('should not emit anything when changing into same url', (done: MochaDone) => {
            layer.setUrl(TILE_LAYER_URL);
            setTimeout(() => {
                /* istanbul ignore next */
                layer.urlChange.subscribe(() => {
                    return done(new Error('Event fired'));
                });
                layer.setUrl(TILE_LAYER_URL);
                return done();
            }, 0);
        });
    });
    describe('[(opacity)]', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.opacity = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.options.opacity !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.options.opacity }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.opacity = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.opacity !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.opacity }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();
            layer.setOpacity(val);
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.opacity !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.opacity }`));
                }
                return done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.opacityChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.opacity = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.opacityChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setOpacity(val);
        });
    });
    describe('[(bounds)]', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.bounds = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.getBounds() !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.getBounds() }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Angular', (done: MochaDone) => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.bounds = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.bounds !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.bounds }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Leaflet', (done: MochaDone) => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.setBounds(val);
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.bounds !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.bounds }`));
                }
                return done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);

            layer.boundsChange.subscribe((eventVal: LatLngBounds) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.bounds = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);

            layer.boundsChange.subscribe((eventVal: LatLngBounds) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setBounds(val);
        });
    });

    describe('[(north)]', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.north = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.getBounds().getNorth() !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.getBounds().getNorth() }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.north = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.north !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.north }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();
            layer.setBounds([
                [0, 0],
                [val, 0]
            ]);
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.north !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.north }`));
                }
                return done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.northChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.north = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.northChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setBounds([
                [0, 0],
                [val, 0]
            ]);
        });
    });
    describe('[(east)]', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.east = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.getBounds().getEast() !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.getBounds().getEast() }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.east = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.east !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.east }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();
            layer.setBounds([
                [0, val],
                [0, 0]
            ]);
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.east !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.east }`));
                }
                return done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.eastChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.east = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.eastChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setBounds([
                [0, val],
                [0, 0]
            ]);
        });
    });
    describe('[(south)]', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
            layer.setBounds(latLngBounds([
                [0, 0],
                [1, 1]
            ]));
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.south = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.getBounds().getSouth() !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.getBounds().getSouth() }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.south = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.south !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.south }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();
            layer.setBounds([
                [val, 0],
                [1, 1]
            ]);
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.south !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.south }`));
                }
                return done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.southChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.south = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.southChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setBounds([
                [val, 0],
                [1, 1]
            ]);
        });
    });
    describe('[(west)]', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
            layer.setBounds(latLngBounds([
                [0, 0],
                [1, 1]
            ]));
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.west = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.getBounds().getWest() !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.getBounds().getWest() }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.west = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.west !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.west }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();
            layer.setBounds(latLngBounds([
                [0, val],
                [1, 1]
            ]));
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.west !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.west }`));
                }
                return done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.westChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.west = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.westChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setBounds([
                [0, val],
                [1, 1]
            ]);
        });
    });

    // Events
    describe('(add)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.addEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('add', testEvent);
        });
    });
    describe('(remove)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.removeEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('remove', testEvent);
        });
    });
    describe('(popupopen)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.popupopenEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('popupopen', testEvent);
        });
    });
    describe('(popupclose)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.popupcloseEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('popupclose', testEvent);
        });
    });
    describe('(tooltipopen)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.tooltipopenEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('tooltipopen', testEvent);
        });
    });
    describe('(tooltipclose)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.tooltipcloseEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('tooltipclose', testEvent);
        });
    });
    describe('(click)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.clickEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('click', testEvent);
        });
    });
    describe('(dbclick)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.dbclickEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('dbclick', testEvent);
        });
    });
    describe('(mousedown)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.mousedownEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('mousedown', testEvent);
        });
    });
    describe('(mouseover)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.mouseoverEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('mouseover', testEvent);
        });
    });
    describe('(mouseout)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.mouseoutEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('mouseout', testEvent);
        });
    });
    describe('(contextmenu)', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.contextmenuEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('contextmenu', testEvent);
        });
    });



    describe('[crossOrigin]', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.crossOrigin = false;
            /* istanbul ignore if */
            if (layer.options.crossOrigin) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.options.crossOrigin = false;
            layer.crossOrigin = true;
            /* istanbul ignore if */
            if (!layer.options.crossOrigin) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.crossOrigin = false;
            /* istanbul ignore if */
            if (layer.crossOrigin) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.crossOrigin = true;
            /* istanbul ignore if */
            if (!layer.crossOrigin) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[interactive]', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.interactive = false;
            /* istanbul ignore if */
            if (layer.options.interactive) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.options.interactive = false;
            layer.interactive = true;
            /* istanbul ignore if */
            if (!layer.options.interactive) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.interactive = false;
            /* istanbul ignore if */
            if (layer.interactive) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.interactive = true;
            /* istanbul ignore if */
            if (!layer.interactive) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[alt]', () => {
        var map: MapComponent,
            layer: ImageOverlayDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new ImageOverlayDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'Test alt';
            layer.alt = val;
            /* istanbul ignore if */
            if (layer.options.alt !== val || layer.getElement().getAttribute('alt') !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.alt }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'Test alt';
            layer.alt = val;
            /* istanbul ignore if */
            if (layer.alt !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.alt }`);
            }
        });
    });
});

describe('Destroying a Image-Overlay Directive', () => {
    var map: MapComponent,
        layer: ImageOverlayDirective;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        layer = new ImageOverlayDirective(map);
    });
    it('should remove Image-Overlay Directive from map on destroy', () => {
        /* istanbul ignore if */
        if (!map.hasLayer(layer)) {
            throw new Error('The layer is not part of the map before destroying');
        }
        layer.ngOnDestroy();
        /* istanbul ignore if */
        if (map.hasLayer(layer)) {
            throw new Error('The layer is still part of the map after destroying');
        }
    });
});
