/// <reference path="../typings/index.d.ts" />

import { MapComponent } from './map.component';
import { LatLngBounds, point } from 'leaflet';

describe('Map Component', () => {
    /* istanbul ignore next */
    describe('[(lat)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lat = val;
            if (map.getCenter().lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getCenter().lat }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lat = val;
            if (map.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lat }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            map.setView([val, 0], 0);
            if (map.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lat }`);
            }
        });
        it('should threshold rapid changes in Angular when changing in Leaflet', (done: MochaDone) => {
            var alreadyFired: boolean = false;

            map.latChange.subscribe(() => {
                if (alreadyFired) {
                    return done(new Error('Already fired event'));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([Math.random() * 100, 0], 0);
            setTimeout(() => {
                map.setView([Math.random() * 100, 0], 0);
            }, 10);
        });
    });
    describe('[(lng)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lng = val;
            if (map.getCenter().lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getCenter().lng }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lng = val;
            if (map.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lng }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            map.setView([0, val], 0);
            if (map.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lng }`);
            }
        });
        it('should threshold rapid changes in Angular when changing in Leaflet', (done: MochaDone) => {
            var alreadyFired: boolean = false;

            map.latChange.subscribe(() => {
                if (alreadyFired) {
                    return done(new Error('Already fired event'));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([0, Math.random() * 100], 0);
            setTimeout(() => {
                map.setView([0, Math.random() * 100], 0);
            }, 10);
        });
    });
    describe('[(zoom)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._zoomAnimated = false;
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.ceil(Math.random() * 15);
            map.zoom = val;
            setTimeout(() => {
                if (map.getZoom() !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ map.getZoom() }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Angular', (done: MochaDone) => {
            const val: number = Math.ceil(Math.random() * 15);
            map.zoom = val;
            setTimeout(() => {
                if (map.zoom !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ map.zoom }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.ceil(Math.random() * 15);
            map.setView([0, 0], val);
            setTimeout(() => {
                if (map.zoom !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ map.zoom }`));
                }
                return done();
            }, 0);

        });
        it('should threshold rapid changes in Angular when changing in Leaflet', (done: MochaDone) => {
            var alreadyFired: boolean = false;

            map.latChange.subscribe(() => {
                if (alreadyFired) {
                    return done(new Error('Already fired event'));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([0, 0], Math.random() * 15);
            setTimeout(() => {
                map.setView([0, 0], Math.random() * 15);
            }, 10);
        });
    });
    describe('[(minZoom)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.minZoom = val;
            if (map.getMinZoom() !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getMinZoom() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.minZoom = val;
            if (map.minZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.minZoom }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.setMinZoom(val);
            if (map.zoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.minZoom }`);
            }
        });
    });
    describe('[(maxZoom)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.maxZoom = val;
            if (map.getMaxZoom() !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getMaxZoom() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.maxZoom = val;
            if (map.maxZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxZoom }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.setMaxZoom(val);
            if (map.maxZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxZoom }`);
            }
        });
    });
    describe('[(maxBounds)]', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});

            // Fix for no browser-test
            (<any>map)._size = point(100, 100);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: LatLngBounds = new LatLngBounds([
                [Math.random() * 100, Math.random() * 100],
                [Math.random() * 100, Math.random() * 100]
            ]);
            map.setMaxBounds(val);
            if ((<any>map).options.maxBounds !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxBounds }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: LatLngBounds = new LatLngBounds([
                [Math.random() * 100, Math.random() * 100],
                [Math.random() * 100, Math.random() * 100]
            ]);
            map.maxBounds = val;
            if (map.maxBounds !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxBounds }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: LatLngBounds = new LatLngBounds([
                [Math.random() * 100, Math.random() * 100],
                [Math.random() * 100, Math.random() * 100]
            ]);
            map.setMaxBounds(val);
            if (map.maxBounds !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxBounds }`);
            }
        });
    });

    // Events
    describe('(baselayerchange)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.baselayerchangeEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('baselayerchange', testEvent);
        });
    });
    describe('(overlayadd)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.overlayaddEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('overlayadd', testEvent);
        });
    });
    describe('(overlayremove)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.overlayremoveEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('overlayremove', testEvent);
        });
    });
    describe('(layeradd)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.layeraddEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('layeradd', testEvent);
        });
    });
    describe('(layerremove)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.layerremoveEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('layerremove', testEvent);
        });
    });
    describe('(zoomlevelschange)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.zoomlevelschangeEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('zoomlevelschange', testEvent);
        });
    });
    describe('(resize)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.resizeEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('resize', testEvent);
        });
    });
    describe('(unload)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.unloadEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('unload', testEvent);
        });
    });
    describe('(viewreset)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.viewresetEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('viewreset', testEvent);
        });
    });
    describe('(load)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.loadEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('load', testEvent);
        });
    });
    describe('(zoomstart)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.zoomstartEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('zoomstart', testEvent);
        });
    });
    describe('(movestart)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.movestartEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('movestart', testEvent);
        });
    });
    describe('(zoom)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.zoomEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('zoom', testEvent);
        });
    });
    describe('(move)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.moveEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('move', testEvent);
        });
    });
    describe('(zoomend)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.zoomendEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('zoomend', testEvent);
        });
    });
    describe('(moveend)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.moveendEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('moveend', testEvent);
        });
    });
    describe('(popupopen)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.popupopenEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('popupopen', testEvent);
        });
    });
    describe('(popupclose)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.popupcloseEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('popupclose', testEvent);
        });
    });
    describe('(autopanstart)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.autopanstartEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('autopanstart', testEvent);
        });
    });
    describe('(tooltipopen)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.tooltipopenEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('tooltipopen', testEvent);
        });
    });
    describe('(tooltipclose)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.tooltipcloseEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('tooltipclose', testEvent);
        });
    });
    describe('(click)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.clickEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('click', testEvent);
        });
    });
    describe('(dblclick)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            map.doubleClickZoom.disable();
            // map.removeEventListener('dblclick', map._on);
            (<any>window).map = map;
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle, originalEvent: {shiftKey: false }};
            map.dblclickEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('dblclick', testEvent);
        });
    });
    describe('(mousedown)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.mousedownEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('mousedown', testEvent);
        });
    });
    describe('(mouseup)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.mouseupEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('mouseup', testEvent);
        });
    });
    describe('(mouseover)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.mouseoverEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('mouseover', testEvent);
        });
    });
    describe('(mouseout)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.mouseoutEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('mouseout', testEvent);
        });
    });
    describe('(mousemove)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.mousemoveEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('mousemove', testEvent);
        });
    });
    describe('(contextmenu)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.contextmenuEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('contextmenu', testEvent);
        });
    });
    describe('(keypress)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.keypressEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('keypress', testEvent);
        });
    });
    describe('(preclick)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.preclickEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('preclick', testEvent);
        });
    });
    describe('(zoomanim)', () => {
        var map: MapComponent;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._zoomAnimated = false;
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle, center: {lat: 1, lng: 1}, zoom: 1 };
            map.zoomanimEvent.subscribe((event: any) => {
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('zoomanim', testEvent);
        });
    });
});
