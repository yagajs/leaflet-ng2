/// <reference path="../typings/index.d.ts" />

import { TileLayerDirective } from './tile-layer.directive';
import { MapComponent } from './map.component';
import { point, TileLayerOptions } from 'leaflet';

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

describe('Tile-Layer Directive', () => {
    describe('[(display)]', () => {
        var map: MapComponent,
            layer: TileLayerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
            return done();
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
            return done();
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
            return done(new Error('There is still an event on listener'));
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
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
            return done();
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
            layer: TileLayerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.opacity = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if ((<TileLayerOptions>(<any>layer).options).opacity !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ (<TileLayerOptions>(<any>map).options).opacity }`));
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
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new TileLayerDirective(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.zIndex = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if ((<TileLayerOptions>(<any>layer).options).zIndex !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ (<TileLayerOptions>(<any>map).options).zIndex }`));
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
});
