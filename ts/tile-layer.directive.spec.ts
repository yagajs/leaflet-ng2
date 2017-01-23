/// <reference path="../typings/index.d.ts" />

import { TileLayerDirective,
    MapComponent,
    Point,
    LatLngBoundsExpression,
    OSM_TILE_LAYER_URL } from './index';
import { point, latLngBounds } from 'leaflet';

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

describe('Tile-Layer Directive', () => {
    describe('[(display)]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should remove DOM container when not displaying', () => {
            layer.display = false;
            /* istanbul ignore if */
            if (hasAsChild(layer.getPane(), (<any>layer)._container)) {
                throw new Error('Map is still parent element of the tile layer');
            }
        });
        it('should re-add DOM container when display is true again', () => {
            layer.display = false;
            layer.display = true;

            /* istanbul ignore if */
            if (!hasAsChild(layer.getPane(), (<any>layer)._container)) {
                throw new Error('Map is not parent element of the tile layer');
            }
        });
        it('should remove EventListeners when not displaying', (done: MochaDone) => {
            const moveEvents: {fn: Function}[] = (<any>map)._events.move,
                length: number = moveEvents.length,
                originalEventListener: Function = layer.getEvents()['move'];

            layer.display = false;

            for (let i: number = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (moveEvents[i] && moveEvents[i].fn === originalEventListener) {
                    return done(new Error('There is still an event on listener'));
                }
            }
            done();
        });
        it('should re-add EventListeners when display is true again', (done: MochaDone) => {
            const moveEvents: {fn: Function}[] = (<any>map)._events.move,
                length: number = moveEvents.length,
                originalEventListener: Function = layer.getEvents()['move'];

            layer.display = false;
            layer.display = true;

            for (let i: number = 0; i < length; i += 1) {
                if (moveEvents[i] && moveEvents[i].fn === originalEventListener) {
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            layer.url = OSM_TILE_LAYER_URL;
            /* istanbul ignore if */
            if ((<string>(<any>layer)._url) !== OSM_TILE_LAYER_URL) {
                throw new Error(`Wrong value setted: ${ OSM_TILE_LAYER_URL } != ${ (<string>(<any>layer)._url) }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.url = OSM_TILE_LAYER_URL;
            /* istanbul ignore if */
            if (layer.url !== OSM_TILE_LAYER_URL) {
                throw new Error(`Wrong value setted: ${ OSM_TILE_LAYER_URL } != ${ layer.url }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            layer.setUrl(OSM_TILE_LAYER_URL);
            /* istanbul ignore if */
            if (layer.url !== OSM_TILE_LAYER_URL) {
                throw new Error(`Wrong value setted: ${ OSM_TILE_LAYER_URL } != ${ layer.url }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            layer.urlChange.subscribe((eventVal: string) => {
                /* istanbul ignore if */
                if (eventVal !== OSM_TILE_LAYER_URL) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.url = OSM_TILE_LAYER_URL;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {   layer.url = OSM_TILE_LAYER_URL;
            layer.urlChange.subscribe((eventVal: string) => {
                /* istanbul ignore if */
                if (eventVal !== OSM_TILE_LAYER_URL + '?test') {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setUrl(OSM_TILE_LAYER_URL + '?test');
        });
        it('should not emit anything when changing into same url', (done: MochaDone) => {
            layer.setUrl(OSM_TILE_LAYER_URL);
            setTimeout(() => {
                /* istanbul ignore next */
                layer.urlChange.subscribe(() => {
                    return done(new Error('Event fired'));
                });
                layer.setUrl(OSM_TILE_LAYER_URL);
                return done();
            }, 0);
        });
    });
    describe('[(opacity)]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
    describe('[(zIndex)]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.zIndex = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.options.zIndex !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.options.zIndex }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.zIndex = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.zIndex !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.zIndex }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();
            layer.setZIndex(val);
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.zIndex !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.zIndex }`));
                }
                return done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.zIndexChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.zIndex = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.zIndexChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setZIndex(val);
        });
    });

    // Events
    describe('(add)', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
    describe('(loading)', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.loadingEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('loading', testEvent);
        });
    });
    describe('(tileunload)', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
            layer.off('tileunload', (<any>layer)._onTileRemove); // Hack to disable another listener
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.tileunloadEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('tileunload', testEvent);
        });
    });
    describe('(tileloadstart)', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.tileloadstartEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('tileloadstart', testEvent);
        });
    });
    describe('(tileerror)', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.tileerrorEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('tileerror', testEvent);
        });
    });
    describe('(tileload)', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            var called: boolean; // this event is called multiple times in the life-circle of leaflet
            setTimeout(() => {
                layer.tileloadEvent.subscribe((event: any) => {
                    /* istanbul ignore if */
                    if (called) {
                        return;
                    }
                    /* istanbul ignore if */
                    if (event.testHandle !== testEvent.testHandle) {
                        return done(new Error('Wrong event returned'));
                    }
                    called = true;
                    return done();
                });
                layer.fire('tileload', testEvent);
            }, 1);
        });
    });
    describe('(load)', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { target: layer, testHandle, type: 'load' };
            var called: boolean; // this event is called multiple times in the life-circle of leaflet
            setTimeout(() => {
                layer.loadEvent.subscribe((event: any) => {
                    /* istanbul ignore if */
                    if (called) {
                        return;
                    }
                    /* istanbul ignore if */
                    if (event.testHandle !== testEvent.testHandle) {
                        return done(new Error('Wrong event returned'));
                    }
                    called = true;
                    return done();
                });
                layer.fire('load', testEvent);
            }, 1);
        });
    });

    // Inputs
    describe('[tileSize]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const num: number = Math.ceil(Math.random() * 1000),
                val: Point = point(num, num);
            layer.tileSize = val;
            /* istanbul ignore if */
            if (layer.options.tileSize !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.tileSize }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const num: number = Math.ceil(Math.random() * 1000),
                val: Point = point(num, num);
            layer.tileSize = val;
            /* istanbul ignore if */
            if (layer.tileSize !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.tileSize }`);
            }
        });
    });
    describe('[bounds]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const num: number = Math.ceil(Math.random() * 1000),
                val: LatLngBoundsExpression = latLngBounds([num, num], [num, num]);
            layer.bounds = val;
            /* istanbul ignore if */
            if (layer.options.bounds !== val) {
                throw new Error('Wrong value setted: ' +
                    JSON.stringify(val) +
                    ' != ' +
                    JSON.stringify(layer.options.bounds));
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const num: number = Math.ceil(Math.random() * 1000),
                val: LatLngBoundsExpression = latLngBounds([num, num], [num, num]);
            layer.bounds = val;
            /* istanbul ignore if */
            if (layer.bounds !== val) {
                throw new Error(`Wrong value setted: ${ JSON.stringify(val) } != ${ JSON.stringify(layer.bounds) }`);
            }
        });
    });
    describe('[subdomains]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string[] = ['a', 'b', 'c', 'd'];
            layer.subdomains = val;
            /* istanbul ignore if */
            if (layer.options.subdomains !== val) {
                throw new Error('Wrong value setted: ' +
                    JSON.stringify(val) +
                    ' != ' +
                    JSON.stringify(layer.options.subdomains));
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string[] = ['a', 'b', 'c', 'd'];
            layer.subdomains = val;
            /* istanbul ignore if */
            if (layer.subdomains !== val) {
                throw new Error(`Wrong value setted: ${ JSON.stringify(val) } != ${ JSON.stringify(layer.subdomains) }`);
            }
        });
        it('should get an array of strings even if it has a string value', () => {
            const val: string = 'abcdefg';
            layer.options.subdomains = val;
            /* istanbul ignore if */
            if (!Array.prototype.isPrototypeOf(layer.subdomains) && layer.subdomains.length !== val.length) {
                throw new Error(`Wrong value setted: ${ val } != ${ JSON.stringify(layer.subdomains) }`);
            }
        });
    });
    describe('[className]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'test-class';
            layer.className = val;
            /* istanbul ignore if */
            if (layer.options.className !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.className }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'test-class';
            layer.className = val;
            /* istanbul ignore if */
            if (layer.className !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.className }`);
            }
        });
    });
    describe('[errorTileUrl]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'http://test';
            layer.errorTileUrl = val;
            /* istanbul ignore if */
            if (layer.options.errorTileUrl !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.errorTileUrl }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'http://test';
            layer.errorTileUrl = val;
            /* istanbul ignore if */
            if (layer.errorTileUrl !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.errorTileUrl }`);
            }
        });
    });
    describe('[updateInterval]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            layer.updateInterval = val;
            /* istanbul ignore if */
            if (layer.options.updateInterval !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.updateInterval }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            layer.updateInterval = val;
            /* istanbul ignore if */
            if (layer.updateInterval !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.updateInterval }`);
            }
        });
    });
    describe('[keepBuffer]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            layer.keepBuffer = val;
            /* istanbul ignore if */
            if (layer.options.keepBuffer !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.keepBuffer }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            layer.keepBuffer = val;
            /* istanbul ignore if */
            if (layer.keepBuffer !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.keepBuffer }`);
            }
        });
    });
    describe('[maxNativeZoom]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            layer.maxNativeZoom = val;
            /* istanbul ignore if */
            if (layer.options.maxNativeZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.maxNativeZoom }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            layer.maxNativeZoom = val;
            /* istanbul ignore if */
            if (layer.maxNativeZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.maxNativeZoom }`);
            }
        });
    });
    describe('[minNativeZoom]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 5);
            layer.minNativeZoom = val;
            /* istanbul ignore if */
            if (layer.options.minNativeZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.minNativeZoom }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 5);
            layer.minNativeZoom = val;
            /* istanbul ignore if */
            if (layer.minNativeZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.minNativeZoom }`);
            }
        });
    });
    describe('[zoomOffset]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            layer.zoomOffset = val;
            /* istanbul ignore if */
            if (layer.options.zoomOffset !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.zoomOffset }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 1000);
            layer.zoomOffset = val;
            /* istanbul ignore if */
            if (layer.zoomOffset !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.zoomOffset }`);
            }
        });
    });
    describe('[tms]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.tms = false;
            /* istanbul ignore if */
            if (layer.options.tms) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.options.tms = false;
            layer.tms = true;
            /* istanbul ignore if */
            if (!layer.options.tms) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.tms = false;
            /* istanbul ignore if */
            if (layer.tms) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.tms = true;
            /* istanbul ignore if */
            if (!layer.tms) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[zoomReverse]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.zoomReverse = false;
            /* istanbul ignore if */
            if (layer.options.zoomReverse) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.options.zoomReverse = false;
            layer.zoomReverse = true;
            /* istanbul ignore if */
            if (!layer.options.zoomReverse) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.zoomReverse = false;
            /* istanbul ignore if */
            if (layer.zoomReverse) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.zoomReverse = true;
            /* istanbul ignore if */
            if (!layer.zoomReverse) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[detectRetina]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.detectRetina = false;
            /* istanbul ignore if */
            if (layer.options.detectRetina) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.options.detectRetina = false;
            layer.detectRetina = true;
            /* istanbul ignore if */
            if (!layer.options.detectRetina) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.detectRetina = false;
            /* istanbul ignore if */
            if (layer.detectRetina) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.detectRetina = true;
            /* istanbul ignore if */
            if (!layer.detectRetina) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[crossOrigin]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
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
    describe('[updateWhenIdle]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.updateWhenIdle = false;
            /* istanbul ignore if */
            if (layer.options.updateWhenIdle) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.options.updateWhenIdle = false;
            layer.updateWhenIdle = true;
            /* istanbul ignore if */
            if (!layer.options.updateWhenIdle) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.updateWhenIdle = false;
            /* istanbul ignore if */
            if (layer.updateWhenIdle) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.updateWhenIdle = true;
            /* istanbul ignore if */
            if (!layer.updateWhenIdle) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[updateWhenZooming]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.updateWhenZooming = false;
            /* istanbul ignore if */
            if (layer.options.updateWhenZooming) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.options.updateWhenZooming = false;
            layer.updateWhenZooming = true;
            /* istanbul ignore if */
            if (!layer.options.updateWhenZooming) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.updateWhenZooming = false;
            /* istanbul ignore if */
            if (layer.updateWhenZooming) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.updateWhenZooming = true;
            /* istanbul ignore if */
            if (!layer.updateWhenZooming) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[noWrap]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.noWrap = false;
            /* istanbul ignore if */
            if (layer.options.noWrap) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.options.noWrap = false;
            layer.noWrap = true;
            /* istanbul ignore if */
            if (!layer.options.noWrap) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.noWrap = false;
            /* istanbul ignore if */
            if (layer.noWrap) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.noWrap = true;
            /* istanbul ignore if */
            if (!layer.noWrap) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
});

describe('Destroying a Tile-Layer Directive', () => {
    var map: MapComponent,
        layer: TileLayerDirective;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        layer = new TileLayerDirective(map);
    });
    it('should remove Tile-Layer Directive from map on destroy', () => {
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
