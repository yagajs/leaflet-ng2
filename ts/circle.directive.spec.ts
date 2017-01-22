/// <reference path="../typings/index.d.ts" />

import { CircleDirective,
    MapComponent,
    PopupDirective,
    TooltipDirective,
    LatLngExpression,
    LatLng } from './index';
import { point, SVG, latLng } from 'leaflet';
import { createPathTests } from './path-directives.spec';
import { IGenericGeoJSONFeature } from './d.ts/generic-geojson';

describe('Circle Directive', () => {
    createPathTests(CircleDirective);

    describe('[(position)]', () => {
        var map: MapComponent,
            layer: CircleDirective<any>;
        const TEST_VALUE: LatLng = latLng(0, 1);
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            (<any>map)._renderer = (<any>map)._renderer || new SVG();

            layer = new CircleDirective<any>(map);
            layer.ngAfterViewInit();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            layer.position = TEST_VALUE;
            /* istanbul ignore if */
            if ((<any>layer)._latlng !== TEST_VALUE) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ (<any>layer)._latlng }`);
            }

        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.position = TEST_VALUE;
            /* istanbul ignore if */
            if (layer.position !== TEST_VALUE) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.position }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            layer.setLatLng(TEST_VALUE);
            /* istanbul ignore if */
            if (layer.position !== TEST_VALUE) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.position }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            layer.positionChange.subscribe((eventVal: LatLng) => {
                /* istanbul ignore if */
                if (eventVal !== TEST_VALUE) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.position = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            layer.positionChange.subscribe((eventVal: LatLng) => {
                /* istanbul ignore if */
                if (eventVal !== TEST_VALUE) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setLatLng(TEST_VALUE);
        });
        it('should fire geoJSON-change event when changing in Angular', (done: MochaDone) => {
            layer.geoJSONChange.subscribe(() => {
                return done();
            });
            layer.position = TEST_VALUE;
        });
        it('should fire geoJSON-change event when changing in Leaflet', (done: MochaDone) => {
            layer.geoJSONChange.subscribe(() => {
                return done();
            });
            layer.setLatLng(TEST_VALUE);
        });
    });

    describe('[(lat)]', () => {
        var map: MapComponent,
            layer: CircleDirective<any>;
        const TEST_VALUE: LatLng = latLng(0, 1);
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            (<any>map)._renderer = (<any>map)._renderer || new SVG();

            layer = new CircleDirective<any>(map);
            layer.ngAfterViewInit();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lat = val;
            /* istanbul ignore if */
            if (layer.getLatLng().lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.getLatLng().lat }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lat = val;
            /* istanbul ignore if */
            if (layer.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.lat }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            layer.setLatLng([val, 0]);
            /* istanbul ignore if */
            if (layer.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.lat }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.latChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.lat = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.latChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });


            layer.setLatLng([val, 0]);
        });
    });
    describe('[(lng)]', () => {
        var map: MapComponent,
            layer: CircleDirective<any>;
        const TEST_VALUE: LatLng = latLng(0, 1);
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            (<any>map)._renderer = (<any>map)._renderer || new SVG();

            layer = new CircleDirective<any>(map);
            layer.ngAfterViewInit();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lng = val;
            /* istanbul ignore if */
            if (layer.getLatLng().lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.getLatLng().lng }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lng = val;
            /* istanbul ignore if */
            if (layer.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.lng }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            layer.setLatLng([0, val]);
            /* istanbul ignore if */
            if (layer.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.lng }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.lngChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.lng = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.lngChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });


            layer.setLatLng([0, val]);
        });
    });
    describe('[(radius)]', () => {
        var map: MapComponent,
            layer: CircleDirective<any>;
        const TEST_VALUE: LatLng = latLng(0, 1);
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            (<any>map)._renderer = (<any>map)._renderer || new SVG();

            layer = new CircleDirective<any>(map);
            layer.ngAfterViewInit();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.radius = val;
            /* istanbul ignore if */
            if (layer.getRadius() !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.getRadius() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.radius = val;
            /* istanbul ignore if */
            if (layer.radius !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.radius }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            layer.setRadius(val);
            /* istanbul ignore if */
            if (layer.radius !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.radius }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.radiusChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.radius = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.radiusChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });


            layer.setRadius(val);
        });
    });

    describe('[(geoJSON)]', () => {
        var map: MapComponent,
            layer: CircleDirective<any>;
        const TEST_VALUE: IGenericGeoJSONFeature<GeoJSON.Point, any> = {
            geometry: {
                coordinates: [1, 3],
                type: 'Point'
            },
            properties: {},
            type: 'Feature'
        };
        const TEST_POINT: LatLngExpression = [3, 4];
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            (<any>map)._renderer = (<any>map)._renderer || new SVG();

            layer = new CircleDirective<any>(map);
            layer.ngAfterViewInit();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            layer.geoJSON = TEST_VALUE;
            /* istanbul ignore if */
            if ((<LatLng>layer.position).lng !== TEST_VALUE.geometry.coordinates[0] ||
                (<LatLng>layer.position).lat !== TEST_VALUE.geometry.coordinates[1]) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ layer.position }`);
            }

        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.geoJSON = TEST_VALUE;
            /* istanbul ignore if */
            if (layer.geoJSON.geometry.coordinates[0] !== TEST_VALUE.geometry.coordinates[0] ||
                layer.geoJSON.geometry.coordinates[1] !== TEST_VALUE.geometry.coordinates[1]) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.geoJSON }`);
            }
        });
        it('should be changed geoJSON in Angular when changing in latlngs Leaflet', () => {
            layer.setLatLng(TEST_POINT);
            /* istanbul ignore if */
            if (layer.geoJSON.geometry.coordinates[0] !== TEST_POINT[1] ||
                layer.geoJSON.geometry.coordinates[1] !== TEST_POINT[0]) {
                throw new Error(`Wrong value setted: ${ TEST_POINT } != ${ layer.geoJSON.geometry.coordinates }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            layer.geoJSONChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.Point, any>) => {
                /* istanbul ignore if */
                if (eventVal.geometry.coordinates[0] !== TEST_VALUE.geometry.coordinates[0] ||
                    eventVal.geometry.coordinates[1] !== TEST_VALUE.geometry.coordinates[1]) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.geoJSON = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            layer.geoJSONChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.Point, any>) => {
                const values: [number, number] = (<any>eventVal.geometry.coordinates);
                /* istanbul ignore if */
                if (values[0] !== TEST_POINT[1] ||
                    values[1] !== TEST_POINT[0]) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setLatLng(TEST_POINT);
        });
    });

    describe('[properties]', () => {
        interface ITestProperties {
            test: string;
        }
        var map: MapComponent,
            layer: CircleDirective<ITestProperties>;
        const TEST_OBJECT: ITestProperties = {
            test: 'OK'
        };
        beforeEach(() => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            (<any>map)._renderer = (<any>map)._renderer || new SVG();

            layer = new CircleDirective<any>(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            layer.properties = TEST_OBJECT;
            /* istanbul ignore if */
            if (layer.feature.properties !== TEST_OBJECT) {
                throw new Error(`Wrong value setted: ${ TEST_OBJECT } != ${ layer.feature.properties }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.properties = TEST_OBJECT;
            /* istanbul ignore if */
            if (layer.properties !== TEST_OBJECT) {
                throw new Error(`Wrong value setted: ${ TEST_OBJECT } != ${ layer.properties }`);
            }
        });
        it('should emit an event for GeoJSONChange when changing in Angular', (done: MochaDone) => {
            layer.geoJSONChange.subscribe((val: IGenericGeoJSONFeature<GeoJSON.GeometryObject, ITestProperties>) => {
                /* istanbul ignore if */
                if (val.properties !== TEST_OBJECT) {
                    return done(new Error('Wrong value received'));
                }
                return done();
            });
            layer.properties = TEST_OBJECT;
        });
    });

});

describe('Popup in Circle Directive', () => {
    var map: MapComponent,
        layer: CircleDirective<any>,
        popup: PopupDirective,
        testDiv: HTMLElement;
    before((done) => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        (<any>map)._renderer = (<any>map)._renderer || new SVG();
        testDiv = document.createElement('div');
        popup = new PopupDirective(map, { nativeElement: testDiv });

        // Hack to get write-access to readonly property
        layer = Object.create(new CircleDirective<any>(map), { popupDirective: {value: popup} });
        return done();
    });
    it('should bind popup', () => {
        layer.ngAfterViewInit();
        /* istanbul ignore if */
        if (!(<any>layer)._popup) {
            throw new Error('There is no popup binded');
        }
        /* istanbul ignore if */
        if ((<any>layer)._popup !== popup) {
            throw new Error('There is a wrong popup binded');
        }
    });
});

describe('Tooltip in Circle Directive', () => {
    var map: MapComponent,
        layer: CircleDirective<any>,
        tooltip: TooltipDirective,
        testDiv: HTMLElement;
    before((done) => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        (<any>map)._renderer = (<any>map)._renderer || new SVG();
        testDiv = document.createElement('div');
        tooltip = new TooltipDirective(map, { nativeElement: testDiv });

        // Hack to get write-access to readonly property
        layer = Object.create(new CircleDirective<any>(map), { tooltipDirective: {value: tooltip} });
        return done();
    });
    it('should bind tooltip', () => {
        layer.ngAfterViewInit();
        /* istanbul ignore if */
        if (!(<any>layer)._tooltip) {
            throw new Error('There is no tooltip binded');
        }
        /* istanbul ignore if */
        if ((<any>layer)._tooltip !== tooltip) {
            throw new Error('There is a wrong tooltip binded');
        }
    });
});

describe('Destroying a Circle Directive', () => {
    var map: MapComponent,
        layer: CircleDirective<any>,
        tooltip: TooltipDirective,
        testDiv: HTMLElement;
    before((done) => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        (<any>map)._renderer = (<any>map)._renderer || new SVG();

        // Hack to get write-access to readonly property
        layer = new CircleDirective<any>(map);
        return done();
    });
    it('should remove Circle Directive from map on destroy', () => {
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
