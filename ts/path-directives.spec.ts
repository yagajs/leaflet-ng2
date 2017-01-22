/// <reference path="../typings/index.d.ts" />

import { MapComponent,
    LineCapShape,
    LineJoinShape,
    FillRule,
    PathOptions } from './index';
import { point, SVG } from 'leaflet';

export function createPathTests(Constr: any): void {
    describe('Path compatibility tests', () => {
        describe('[(display)]', () => {
            var map: MapComponent,
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should remove DOM container when not displaying', () => {
                layer.display = false;
                /* istanbul ignore if */
                if (layer.getElement().style.display !== 'none') {
                    throw new Error('Path is still displayed');
                }
            });
            it('should re-add DOM container when display is true again', () => {
                layer.display = false;
                layer.display = true;

                /* istanbul ignore if */
                if (layer.getElement().style.display === 'none') {
                    throw new Error('Path is not displayed again');
                }
            });
            it('should set to false by removing from map', (done: MochaDone) => {

                layer.displayChange.subscribe((val: boolean) => {
                    /* istanbul ignore if */
                    if (val !== false) {
                        return done(new Error('Wrong value emitted'));
                    }
                    /* istanbul ignore if */
                    if (layer.display) {
                        return done(new Error('Wrong value from variable call'));
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
        describe('[(color)]', () => {
            var map: MapComponent,
                layer: any;
            const TEST_VALUE: string = '#123456';
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.color = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.options.color !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.options.color }`);
                }
            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.color = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.color !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.color }`);
                }
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setStyle({color: TEST_VALUE});
                /* istanbul ignore if */
                if (layer.color !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.color }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.colorChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.color = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.colorChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({color: TEST_VALUE });
            });
        });
        describe('[(lineCap)]', () => {
            var map: MapComponent,
                layer: any;
            const TEST_VALUE: LineCapShape = 'butt';
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.lineCap = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.options.lineCap !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.options.lineCap }`);
                }
            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.lineCap = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.lineCap !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.lineCap }`);
                }
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setStyle({lineCap: TEST_VALUE});
                /* istanbul ignore if */
                if (layer.lineCap !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.lineCap }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.lineCapChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.lineCap = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.lineCap = TEST_VALUE;
                layer.lineCapChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({lineCap: TEST_VALUE });
            });
        });
        describe('[(lineJoin)]', () => {
            var map: MapComponent,
                layer: any;
            const TEST_VALUE: LineJoinShape = 'bevel';
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.lineJoin = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.options.lineJoin !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.options.lineJoin }`);
                }
            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.lineJoin = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.lineJoin !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.lineJoin }`);
                }
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setStyle({lineJoin: TEST_VALUE});
                /* istanbul ignore if */
                if (layer.lineJoin !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.lineJoin }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.lineJoinChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.lineJoin = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.lineJoin = TEST_VALUE;
                layer.lineJoinChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({lineJoin: TEST_VALUE });
            });
        });
        describe('[(dashArray)]', () => {
            var map: MapComponent,
                layer: any;
            const TEST_VALUE: string = '1, 2';
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.dashArray = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.options.dashArray !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.options.dashArray }`);
                }
            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.dashArray = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.dashArray !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.dashArray }`);
                }
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setStyle({dashArray: TEST_VALUE});
                /* istanbul ignore if */
                if (layer.dashArray !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.dashArray }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.dashArrayChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.dashArray = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.dashArray = TEST_VALUE;
                layer.dashArrayChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({dashArray: TEST_VALUE });
            });
        });
        describe('[(dashOffset)]', () => {
            var map: MapComponent,
                layer: any;
            const TEST_VALUE: string = '7px';
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.dashOffset = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.options.dashOffset !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.options.dashOffset }`);
                }
            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.dashOffset = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.dashOffset !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.dashOffset }`);
                }
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setStyle({dashOffset: TEST_VALUE});
                /* istanbul ignore if */
                if (layer.dashOffset !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.dashOffset }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.dashOffsetChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.dashOffset = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.dashOffset = TEST_VALUE;
                layer.dashOffsetChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({dashOffset: TEST_VALUE });
            });
        });
        describe('[(fillColor)]', () => {
            var map: MapComponent,
                layer: any;
            const TEST_VALUE: string = '#123456';
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.fillColor = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.options.fillColor !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.options.fillColor }`);
                }
            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.fillColor = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.fillColor !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.fillColor }`);
                }
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setStyle({fillColor: TEST_VALUE});
                /* istanbul ignore if */
                if (layer.fillColor !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.fillColor }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.fillColorChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.fillColor = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.fillColor = TEST_VALUE;
                layer.fillColorChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({fillColor: TEST_VALUE });
            });
        });
        describe('[(fillRule)]', () => {
            var map: MapComponent,
                layer: any;
            const TEST_VALUE: FillRule = 'nonzero';
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.fillRule = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.options.fillRule !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.options.fillRule }`);
                }
            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.fillRule = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.fillRule !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.fillRule }`);
                }
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setStyle({fillRule: TEST_VALUE});
                /* istanbul ignore if */
                if (layer.fillRule !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.fillRule }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.fillRuleChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.fillRule = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.fillRule = TEST_VALUE;
                layer.fillRuleChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({fillRule: TEST_VALUE });
            });
        });
        describe('[(className)]', () => {
            var map: MapComponent,
                layer: any;
            const TEST_VALUE: string = 'testclass';
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.className = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.options.className !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.options.className }`);
                }
            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.className = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.className !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.className }`);
                }
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setStyle({className: TEST_VALUE});
                /* istanbul ignore if */
                if (layer.className !== TEST_VALUE) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.className }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.classNameChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.className = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.className = TEST_VALUE;
                layer.classNameChange.subscribe((eventVal: string) => {
                    /* istanbul ignore if */
                    if (eventVal !== TEST_VALUE) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({className: TEST_VALUE });
            });
        });
        describe('[(opacity)]', () => {
            var map: MapComponent,
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer.setStyle({opacity: val});
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

                layer.setStyle({opacity: val});
            });
        });
        describe('[(weight)]', () => {
            var map: MapComponent,
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
                const val: number = Math.ceil(Math.random() * 10);
                layer.weight = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.options.weight !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.options.weight }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Angular', (done: MochaDone) => {
                const val: number = Math.ceil(Math.random() * 10);
                layer.weight = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.weight !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.weight }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Leaflet', (done: MochaDone) => {
                const val: number = Math.ceil(Math.random() * 10);
                layer.setStyle({weight: val});
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.weight !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.weight }`));
                    }
                    return done();
                }, 0);

            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                const val: number = Math.ceil(Math.random() * 10);

                layer.weightChange.subscribe((eventVal: number) => {
                    /* istanbul ignore if */
                    if (eventVal !== val) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.weight = val;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                const val: number = Math.ceil(Math.random() * 10);

                layer.weightChange.subscribe((eventVal: number) => {
                    /* istanbul ignore if */
                    if (eventVal !== val) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({weight: val});
            });
        });
        describe('[(fillOpacity)]', () => {
            var map: MapComponent,
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
                const val: number = Math.random();
                layer.fillOpacity = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.options.fillOpacity !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.options.fillOpacity }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Angular', (done: MochaDone) => {
                const val: number = Math.random();
                layer.fillOpacity = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.fillOpacity !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.fillOpacity }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Leaflet', (done: MochaDone) => {
                const val: number = Math.random();
                layer.setStyle({fillOpacity: val});
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.fillOpacity !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.fillOpacity }`));
                    }
                    return done();
                }, 0);

            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                const val: number = Math.random();

                layer.fillOpacityChange.subscribe((eventVal: number) => {
                    /* istanbul ignore if */
                    if (eventVal !== val) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.fillOpacity = val;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                const val: number = Math.random();

                layer.fillOpacityChange.subscribe((eventVal: number) => {
                    /* istanbul ignore if */
                    if (eventVal !== val) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({fillOpacity: val});
            });
        });

        describe('[(stroke)]', () => {
            var map: MapComponent,
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular to false', (done: MochaDone) => {
                const val: boolean = false;
                layer.stroke = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.options.stroke !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.options.stroke }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Leaflet when changing in Angular to true', (done: MochaDone) => {
                layer.options.stroke = false;
                const val: boolean = true;
                layer.stroke = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.options.stroke !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.options.stroke }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Angular to false', (done: MochaDone) => {
                const val: boolean = false;
                layer.stroke = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.stroke !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.stroke }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Angular to true', (done: MochaDone) => {
                layer.options.stroke = false;
                const val: boolean = true;
                layer.stroke = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.stroke !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.stroke }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Leaflet to false', (done: MochaDone) => {
                const val: boolean = false;
                layer.setStyle({stroke: val});
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.stroke !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.stroke }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Leaflet to true', (done: MochaDone) => {
                layer.options.stroke = false;
                const val: boolean = true;
                layer.setStyle({stroke: val});
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.stroke !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.stroke }`));
                    }
                    return done();
                }, 0);

            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                const val: boolean = false;

                layer.strokeChange.subscribe((eventVal: boolean) => {
                    /* istanbul ignore if */
                    if (eventVal !== val) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.stroke = val;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                const val: boolean = false;

                layer.strokeChange.subscribe((eventVal: boolean) => {
                    /* istanbul ignore if */
                    if (eventVal !== val) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({stroke: val});
            });
        });
        describe('[(fill)]', () => {
            var map: MapComponent,
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular to false', (done: MochaDone) => {
                const val: boolean = false;
                layer.fill = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.options.fill !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.options.fill }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Leaflet when changing in Angular to true', (done: MochaDone) => {
                layer.options.fill = false;
                const val: boolean = true;
                layer.fill = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.options.fill !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.options.fill }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Angular to false', (done: MochaDone) => {
                const val: boolean = false;
                layer.fill = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.fill !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.fill }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Angular to true', (done: MochaDone) => {
                layer.options.fill = false;
                const val: boolean = true;
                layer.fill = val;
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.fill !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.fill }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Leaflet to false', (done: MochaDone) => {
                const val: boolean = false;
                layer.setStyle({fill: val});
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.fill !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.fill }`));
                    }
                    return done();
                }, 0);

            });
            it('should be changed in Angular when changing in Leaflet to true', (done: MochaDone) => {
                layer.options.fill = false;
                const val: boolean = true;
                layer.setStyle({fill: val});
                setTimeout(() => {
                    /* istanbul ignore if */
                    if (layer.fill !== val) {
                        return done(new Error(`Wrong value setted: ${ val } != ${ layer.fill }`));
                    }
                    return done();
                }, 0);

            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                const val: boolean = false;

                layer.fillChange.subscribe((eventVal: boolean) => {
                    /* istanbul ignore if */
                    if (eventVal !== val) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.fill = val;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                const val: boolean = false;

                layer.fillChange.subscribe((eventVal: boolean) => {
                    /* istanbul ignore if */
                    if (eventVal !== val) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setStyle({fill: val});
            });
        });

        describe('[(style)]', () => {
            var map: MapComponent,
                layer: any;
            const TEST_VALUE: PathOptions = {opacity: 0.5, weight: 3, dashArray: '1, 2'};
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
            });
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.style = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.options.opacity !== TEST_VALUE.opacity ||
                    layer.options.weight !== TEST_VALUE.weight ||
                    layer.options.dashArray !== TEST_VALUE.dashArray) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.options }`);
                }
            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.style = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.style.opacity !== TEST_VALUE.opacity ||
                    layer.style.weight !== TEST_VALUE.weight ||
                    layer.style.dashArray !== TEST_VALUE.dashArray) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.style }`);
                }
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setStyle(TEST_VALUE);
                /* istanbul ignore if */
                if (layer.style.opacity !== TEST_VALUE.opacity ||
                    layer.style.weight !== TEST_VALUE.weight ||
                    layer.style.dashArray !== TEST_VALUE.dashArray) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.options }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                Promise.all([
                    new Promise<void>((fulfill, reject) => {
                        layer.styleChange.subscribe((eventVal: PathOptions) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void>((fulfill, reject) => {
                        layer.opacityChange.subscribe((eventVal: number) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.opacity) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void>((fulfill, reject) => {
                        layer.weightChange.subscribe((eventVal: number) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.weight) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void>((fulfill, reject) => {
                        layer.dashArrayChange.subscribe((eventVal: string) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.dashArray) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                ]).then(() => { done(); }).catch(done);


                layer.style = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                Promise.all([
                    new Promise<void>((fulfill, reject) => {
                        layer.styleChange.subscribe((eventVal: PathOptions) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void>((fulfill, reject) => {
                        layer.opacityChange.subscribe((eventVal: number) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.opacity) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void>((fulfill, reject) => {
                        layer.weightChange.subscribe((eventVal: number) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.weight) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void>((fulfill, reject) => {
                        layer.dashArrayChange.subscribe((eventVal: string) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.dashArray) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                ]).then(() => { done(); }).catch(done);

                layer.setStyle(TEST_VALUE);
            });
        });

        // Events
        describe('(add)', () => {
            var map: MapComponent,
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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

        describe('[interactive]', () => {
            var map: MapComponent,
                layer: any;
            beforeEach(() => {
                map = new MapComponent({nativeElement: document.createElement('div')});
                (<any>map)._size = point(100, 100);
                (<any>map)._pixelOrigin = point(50, 50);
                (<any>map)._renderer = (<any>map)._renderer || new SVG();

                layer = new Constr(map);
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
    });
}
