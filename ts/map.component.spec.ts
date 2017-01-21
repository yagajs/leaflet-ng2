/// <reference path="../typings/index.d.ts" />

import { MapComponent, LatLngBounds } from './index';
import { point } from 'leaflet';

describe('Map Component', () => {
    describe('[(lat)]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lat = val;
            /* istanbul ignore if */
            if (map.getCenter().lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getCenter().lat }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lat = val;
            /* istanbul ignore if */
            if (map.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lat }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            map.setView([val, 0], 0);
            /* istanbul ignore if */
            if (map.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lat }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            map.latChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.lat = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            map.latChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.setView([val, 0], 0);
        });
        it('should threshold rapid changes in Angular when changing in Leaflet', (done: MochaDone) => {
            var alreadyFired: boolean = false;

            map.latChange.subscribe(() => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lng = val;
            /* istanbul ignore if */
            if (map.getCenter().lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getCenter().lng }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            map.lng = val;
            /* istanbul ignore if */
            if (map.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lng }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            map.setView([0, val], 0);
            /* istanbul ignore if */
            if (map.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.lng }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            map.lngChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.lng = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            map.lngChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.setView([0, val], 0);
        });
        it('should threshold rapid changes in Angular when changing in Leaflet', (done: MochaDone) => {
            var alreadyFired: boolean = false;

            map.lngChange.subscribe(() => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._zoomAnimated = false;
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.ceil(Math.random() * 15);
            map.zoom = val;
            setTimeout(() => {
                /* istanbul ignore if */
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
                /* istanbul ignore if */
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
                /* istanbul ignore if */
                if (map.zoom !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ map.zoom }`));
                }
                return done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.ceil(Math.random() * 15);

            map.zoomChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.zoom = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.ceil(Math.random() * 15);

            map.zoomChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.setView([0, 0], val);
        });
        it('should threshold rapid changes in Angular when changing in Leaflet', (done: MochaDone) => {
            var alreadyFired: boolean = false;

            map.zoomChange.subscribe(() => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.minZoom = val;
            /* istanbul ignore if */
            if (map.getMinZoom() !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getMinZoom() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.minZoom = val;
            /* istanbul ignore if */
            if (map.minZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.minZoom }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.setMinZoom(val);
            /* istanbul ignore if */
            if (map.zoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.minZoom }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.ceil(Math.random() * 15);

            map.minZoomChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.minZoom = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.ceil(Math.random() * 15);

            map.minZoomChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.setMinZoom(val);
        });
    });
    describe('[(maxZoom)]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.maxZoom = val;
            /* istanbul ignore if */
            if (map.getMaxZoom() !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.getMaxZoom() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.maxZoom = val;
            /* istanbul ignore if */
            if (map.maxZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxZoom }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.ceil(Math.random() * 15);
            map.setMaxZoom(val);
            /* istanbul ignore if */
            if (map.maxZoom !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxZoom }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.ceil(Math.random() * 15);

            map.maxZoomChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.maxZoom = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.ceil(Math.random() * 15);

            map.maxZoomChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.setMaxZoom(val);
        });
    });
    describe('[(maxBounds)]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});

            // Fix for no browser-test
            (<any>map)._size = point(100, 100);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: LatLngBounds = new LatLngBounds([
                [Math.random() * 100, Math.random() * 100],
                [Math.random() * 100, Math.random() * 100]
            ]);
            map.setMaxBounds(val);
            /* istanbul ignore if */
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
            /* istanbul ignore if */
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
            /* istanbul ignore if */
            if (map.maxBounds !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxBounds }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: LatLngBounds = new LatLngBounds([
                [Math.random() * 100, Math.random() * 100],
                [Math.random() * 100, Math.random() * 100]
            ]);

            map.maxBoundsChange.subscribe((eventVal: LatLngBounds) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.maxBounds = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: LatLngBounds = new LatLngBounds([
                [Math.random() * 100, Math.random() * 100],
                [Math.random() * 100, Math.random() * 100]
            ]);

            map.maxBoundsChange.subscribe((eventVal: LatLngBounds) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            map.setMaxBounds(val);
        });
    });

    // Events
    describe('(baselayerchange)', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.baselayerchangeEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.overlayaddEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.overlayremoveEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.layeraddEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.layerremoveEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.zoomlevelschangeEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.resizeEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.unloadEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.viewresetEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.loadEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.zoomstartEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.movestartEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.zoomEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.moveEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.zoomendEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.moveendEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.popupopenEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.popupcloseEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.autopanstartEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.tooltipopenEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.tooltipcloseEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.clickEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            map.doubleClickZoom.disable();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle, originalEvent: {shiftKey: false }};
            map.dblclickEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.mousedownEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.mouseupEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.mouseoverEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.mouseoutEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.mousemoveEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.contextmenuEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.keypressEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            map.preclickEvent.subscribe((event: any) => {
                /* istanbul ignore if */
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
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._zoomAnimated = false;
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle, center: {lat: 1, lng: 1}, zoom: 1 };
            map.zoomanimEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            map.fire('zoomanim', testEvent);
        });
    });

    describe('[closePopupOnClick]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.closePopupOnClick = false;
            /* istanbul ignore if */
            if (map.options.closePopupOnClick) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.options.closePopupOnClick = false;
            map.closePopupOnClick = true;
            /* istanbul ignore if */
            if (!map.options.closePopupOnClick) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.closePopupOnClick = false;
            /* istanbul ignore if */
            if (map.closePopupOnClick) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.closePopupOnClick = true;
            /* istanbul ignore if */
            if (!map.closePopupOnClick) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[zoomSnap]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10) / 10;
            map.zoomSnap = val;
            /* istanbul ignore if */
            if (map.options.zoomSnap !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.zoomSnap }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10) / 10;
            map.zoomSnap = val;
            /* istanbul ignore if */
            if (map.zoomSnap !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.zoomSnap }`);
            }
        });
    });
    describe('[zoomDelta]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10) / 10;
            map.zoomDelta = val;
            /* istanbul ignore if */
            if (map.options.zoomDelta !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.zoomDelta }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10) / 10;
            map.zoomDelta = val;
            /* istanbul ignore if */
            if (map.zoomDelta !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.zoomDelta }`);
            }
        });
    });
    describe('[trackResize]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.trackResize = false;
            /* istanbul ignore if */
            if (map.options.trackResize) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.options.trackResize = false;
            map.trackResize = true;
            /* istanbul ignore if */
            if (!map.options.trackResize) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.trackResize = false;
            /* istanbul ignore if */
            if (map.trackResize) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.trackResize = true;
            /* istanbul ignore if */
            if (!map.trackResize) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[boxZoomEnabled]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.boxZoomEnabled = false;
            /* istanbul ignore if */
            if (map.boxZoom.enabled()) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.boxZoom.disable();
            map.boxZoomEnabled = true;
            /* istanbul ignore if */
            if (!map.boxZoom.enabled()) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.boxZoomEnabled = false;
            /* istanbul ignore if */
            if (map.boxZoomEnabled) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.boxZoomEnabled = true;
            /* istanbul ignore if */
            if (!map.boxZoomEnabled) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[doubleClickZoomEnabled]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.doubleClickZoomEnabled = false;
            /* istanbul ignore if */
            if (map.doubleClickZoom.enabled()) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.doubleClickZoom.disable();
            map.doubleClickZoomEnabled = true;
            /* istanbul ignore if */
            if (!map.doubleClickZoom.enabled()) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.doubleClickZoomEnabled = false;
            /* istanbul ignore if */
            if (map.doubleClickZoomEnabled) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.doubleClickZoomEnabled = true;
            /* istanbul ignore if */
            if (!map.doubleClickZoomEnabled) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[draggingEnabled]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.draggingEnabled = false;
            /* istanbul ignore if */
            if (map.dragging.enabled()) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.dragging.disable();
            map.draggingEnabled = true;
            /* istanbul ignore if */
            if (!map.dragging.enabled()) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.draggingEnabled = false;
            /* istanbul ignore if */
            if (map.draggingEnabled) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.draggingEnabled = true;
            /* istanbul ignore if */
            if (!map.draggingEnabled) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[fadeAnimation]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.fadeAnimation = false;
            /* istanbul ignore if */
            if (map.options.fadeAnimation) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.options.fadeAnimation = false;
            map.fadeAnimation = true;
            /* istanbul ignore if */
            if (!map.options.fadeAnimation) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.fadeAnimation = false;
            /* istanbul ignore if */
            if (map.fadeAnimation) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.fadeAnimation = true;
            /* istanbul ignore if */
            if (!map.fadeAnimation) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[markerZoomAnimation]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.markerZoomAnimation = false;
            /* istanbul ignore if */
            if (map.options.markerZoomAnimation) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.options.markerZoomAnimation = false;
            map.markerZoomAnimation = true;
            /* istanbul ignore if */
            if (!map.options.markerZoomAnimation) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.markerZoomAnimation = false;
            /* istanbul ignore if */
            if (map.markerZoomAnimation) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.markerZoomAnimation = true;
            /* istanbul ignore if */
            if (!map.fadeAnimation) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[transform3DLimit]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.transform3DLimit = val;
            /* istanbul ignore if */
            if (map.options.transform3DLimit !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.transform3DLimit }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.transform3DLimit = val;
            /* istanbul ignore if */
            if (map.transform3DLimit !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.transform3DLimit }`);
            }
        });
    });
    describe('[zoomAnimation]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.zoomAnimation = false;
            /* istanbul ignore if */
            if (map.options.zoomAnimation) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.options.zoomAnimation = false;
            map.zoomAnimation = true;
            /* istanbul ignore if */
            if (!map.options.zoomAnimation) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.zoomAnimation = false;
            /* istanbul ignore if */
            if (map.zoomAnimation) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.zoomAnimation = true;
            /* istanbul ignore if */
            if (!map.zoomAnimation) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[zoomAnimationThreshold]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.zoomAnimationThreshold = val;
            /* istanbul ignore if */
            if (map.options.zoomAnimationThreshold !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.zoomAnimationThreshold }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.zoomAnimationThreshold = val;
            /* istanbul ignore if */
            if (map.zoomAnimationThreshold !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.zoomAnimationThreshold }`);
            }
        });
    });
    describe('[inertia]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.inertia = false;
            /* istanbul ignore if */
            if (map.options.inertia) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.options.inertia = false;
            map.inertia = true;
            /* istanbul ignore if */
            if (!map.options.inertia) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.inertia = false;
            /* istanbul ignore if */
            if (map.inertia) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.inertia = true;
            /* istanbul ignore if */
            if (!map.inertia) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[inertiaDeceleration]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.inertiaDeceleration = val;
            /* istanbul ignore if */
            if (map.options.inertiaDeceleration !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.inertiaDeceleration }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.inertiaDeceleration = val;
            /* istanbul ignore if */
            if (map.inertiaDeceleration !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.inertiaDeceleration }`);
            }
        });
    });
    describe('[inertiaMaxSpeed]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.inertiaMaxSpeed = val;
            /* istanbul ignore if */
            if (map.options.inertiaMaxSpeed !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.inertiaMaxSpeed }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.inertiaMaxSpeed = val;
            /* istanbul ignore if */
            if (map.inertiaMaxSpeed !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.inertiaMaxSpeed }`);
            }
        });
    });
    describe('[easeLinearity]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.easeLinearity = val;
            /* istanbul ignore if */
            if (map.options.easeLinearity !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.easeLinearity }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.easeLinearity = val;
            /* istanbul ignore if */
            if (map.easeLinearity !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.easeLinearity }`);
            }
        });
    });
    describe('[worldCopyJump]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.worldCopyJump = false;
            /* istanbul ignore if */
            if (map.options.worldCopyJump) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.options.worldCopyJump = false;
            map.worldCopyJump = true;
            /* istanbul ignore if */
            if (!map.options.worldCopyJump) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.worldCopyJump = false;
            /* istanbul ignore if */
            if (map.worldCopyJump) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.worldCopyJump = true;
            /* istanbul ignore if */
            if (!map.worldCopyJump) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[maxBoundsViscosity]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.maxBoundsViscosity = val;
            /* istanbul ignore if */
            if (map.options.maxBoundsViscosity !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.maxBoundsViscosity }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.maxBoundsViscosity = val;
            /* istanbul ignore if */
            if (map.maxBoundsViscosity !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.maxBoundsViscosity }`);
            }
        });
    });
    describe('[keyboardEnabled]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.keyboardEnabled = false;
            /* istanbul ignore if */
            if (map.keyboard.enabled()) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.keyboard.disable();
            map.keyboardEnabled = true;
            /* istanbul ignore if */
            if (!map.keyboard.enabled()) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.keyboardEnabled = false;
            /* istanbul ignore if */
            if (map.keyboardEnabled) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.keyboardEnabled = true;
            /* istanbul ignore if */
            if (!map.keyboardEnabled) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[keyboardPanDelta]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.keyboardPanDelta = val;
            /* istanbul ignore if */
            if (map.options.keyboardPanDelta !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.keyboardPanDelta }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.keyboardPanDelta = val;
            /* istanbul ignore if */
            if (map.keyboardPanDelta !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.keyboardPanDelta }`);
            }
        });
    });
    describe('[scrollWheelZoomEnabled]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.scrollWheelZoomEnabled = false;
            /* istanbul ignore if */
            if (map.scrollWheelZoom.enabled()) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.scrollWheelZoom.disable();
            map.scrollWheelZoomEnabled = true;
            /* istanbul ignore if */
            if (!map.scrollWheelZoom.enabled()) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.scrollWheelZoomEnabled = false;
            /* istanbul ignore if */
            if (map.scrollWheelZoomEnabled) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.scrollWheelZoomEnabled = true;
            /* istanbul ignore if */
            if (!map.scrollWheelZoomEnabled) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[wheelDebounceTime]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.wheelDebounceTime = val;
            /* istanbul ignore if */
            if (map.options.wheelDebounceTime !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.wheelDebounceTime }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.wheelDebounceTime = val;
            /* istanbul ignore if */
            if (map.wheelDebounceTime !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.wheelDebounceTime }`);
            }
        });
    });
    describe('[wheelPxPerZoomLevel]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.wheelPxPerZoomLevel = val;
            /* istanbul ignore if */
            if (map.options.wheelPxPerZoomLevel !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.wheelPxPerZoomLevel }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.wheelPxPerZoomLevel = val;
            /* istanbul ignore if */
            if (map.wheelPxPerZoomLevel !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.wheelPxPerZoomLevel }`);
            }
        });
    });
    describe('[tapTolerance]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.tapTolerance = val;
            /* istanbul ignore if */
            if (map.options.tapTolerance !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.options.tapTolerance }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            map.tapTolerance = val;
            /* istanbul ignore if */
            if (map.tapTolerance !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ map.tapTolerance }`);
            }
        });
    });
    describe('[tapEnabled]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.tapEnabled = false;
            /* istanbul ignore if */
            if (map.options.tap) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.options.tap = false;
            map.tapEnabled = true;
            /* istanbul ignore if */
            if (!map.options.tap) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.tapEnabled = false;
            /* istanbul ignore if */
            if (map.tapEnabled) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.tapEnabled = true;
            /* istanbul ignore if */
            if (!map.tapEnabled) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[bounceAtZoomLimits]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.bounceAtZoomLimits = false;
            /* istanbul ignore if */
            if (map.options.bounceAtZoomLimits) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.options.bounceAtZoomLimits = false;
            map.bounceAtZoomLimits = true;
            /* istanbul ignore if */
            if (!map.options.bounceAtZoomLimits) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.bounceAtZoomLimits = false;
            /* istanbul ignore if */
            if (map.bounceAtZoomLimits) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.bounceAtZoomLimits = true;
            /* istanbul ignore if */
            if (!map.bounceAtZoomLimits) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
    describe('[touchZoomEnabled]', () => {
        var map: MapComponent;
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            map.touchZoomEnabled = false;
            /* istanbul ignore if */
            if (map.touchZoom.enabled()) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            map.touchZoom.disable();
            map.touchZoomEnabled = true;
            /* istanbul ignore if */
            if (!map.touchZoom.enabled()) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            map.touchZoomEnabled = false;
            /* istanbul ignore if */
            if (map.touchZoomEnabled) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            map.touchZoomEnabled = true;
            /* istanbul ignore if */
            if (!map.touchZoomEnabled) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
});
