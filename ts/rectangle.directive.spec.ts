/// <reference path="../typings/index.d.ts" />

import { RectangleDirective,
    MapComponent,
    PopupDirective,
    TooltipDirective,
    LatLngExpression,
    LatLngBounds,
    LatLng,
    IGenericGeoJSONFeature } from './index';
import { point, SVG, latLng, latLngBounds } from 'leaflet';
import { createPathTests } from './path-directives.spec';

describe('Rectangle Directive', () => {
    createPathTests(RectangleDirective);

    let map: MapComponent,
        layer: RectangleDirective<any>;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        (<any>map)._renderer = (<any>map)._renderer || new SVG();

        layer = new RectangleDirective<any>(map);
    });

    describe('[(latlngs)]', () => {
        describe('for Polygons', () => {
            const TEST_VALUE: LatLng[][] = [[latLng(0, 1), latLng(1, 1), latLng(1, 0)]];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.latLngs = TEST_VALUE;
                /* istanbul ignore if */
                if ((<any>layer)._latlngs[0][0] !== TEST_VALUE[0][0] ||
                    (<any>layer)._latlngs[0][1] !== TEST_VALUE[0][1] ||
                    (<any>layer)._latlngs[0][2] !== TEST_VALUE[0][2]) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ (<any>layer)._latlngs }`);
                }

            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.latLngs = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.latLngs[0][0] !== TEST_VALUE[0][0] ||
                    layer.latLngs[0][1] !== TEST_VALUE[0][1] ||
                    layer.latLngs[0][2] !== TEST_VALUE[0][2]) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.latLngs }`);
                }
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setLatLngs(TEST_VALUE);
                /* istanbul ignore if */
                if (layer.latLngs[0][0] !== TEST_VALUE[0][0] ||
                    layer.latLngs[0][1] !== TEST_VALUE[0][1] ||
                    layer.latLngs[0][2] !== TEST_VALUE[0][2]) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.latLngs }`);
                }
            });
            it('should be changed in Angular when adding in Leaflet', () => {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if ((<LatLng[][]>layer.latLngs)[0][3].lat !== 3 ||
                    (<LatLng[][]>layer.latLngs)[0][3].lng !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.latLngs }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][]) => {
                    /* istanbul ignore if */
                    if (eventVal[0][0] !== TEST_VALUE[0][0] ||
                        eventVal[0][1] !== TEST_VALUE[0][1] ||
                        eventVal[0][2] !== TEST_VALUE[0][2]) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.latLngs = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][]) => {
                    /* istanbul ignore if */
                    if (eventVal[0][0] !== TEST_VALUE[0][0] ||
                        eventVal[0][1] !== TEST_VALUE[0][1] ||
                        eventVal[0][2] !== TEST_VALUE[0][2]) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire geoJSON-change event when changing in Angular', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire geoJSON-change event when changing in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire an change event when adding in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe('for MultiPolygons', () => {
            const TEST_VALUE: LatLng[][][] = [
                [[latLng(1, 0), latLng(1, 1), latLng(0, 1)]],
                [[latLng(0, 1), latLng(1, 1), latLng(1, 0)]]
            ];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.latLngs = TEST_VALUE;
                /* istanbul ignore if */
                if ((<any>layer)._latlngs[0][0][0] !== TEST_VALUE[0][0][0] ||
                    (<any>layer)._latlngs[0][0][1] !== TEST_VALUE[0][0][1] ||
                    (<any>layer)._latlngs[0][0][2] !== TEST_VALUE[0][0][2] ||

                    (<any>layer)._latlngs[1][0][0] !== TEST_VALUE[1][0][0] ||
                    (<any>layer)._latlngs[1][0][1] !== TEST_VALUE[1][0][1] ||
                    (<any>layer)._latlngs[1][0][2] !== TEST_VALUE[1][0][2]) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ (<any>layer)._latlngs }`);
                }

            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.latLngs = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.latLngs[0][0][0] !== TEST_VALUE[0][0][0] ||
                    layer.latLngs[0][0][1] !== TEST_VALUE[0][0][1] ||
                    layer.latLngs[0][0][2] !== TEST_VALUE[0][0][2] ||

                    layer.latLngs[1][0][0] !== TEST_VALUE[1][0][0] ||
                    layer.latLngs[1][0][1] !== TEST_VALUE[1][0][1] ||
                    layer.latLngs[1][0][2] !== TEST_VALUE[1][0][2]) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.latLngs }`);
                }
            });
            it('should be changed in Angular when changing in Leaflet', () => {
                layer.setLatLngs(TEST_VALUE);
                /* istanbul ignore if */
                if (layer.latLngs[0][0][0] !== TEST_VALUE[0][0][0] ||
                    layer.latLngs[0][0][1] !== TEST_VALUE[0][0][1] ||
                    layer.latLngs[0][0][2] !== TEST_VALUE[0][0][2] ||

                    layer.latLngs[1][0][0] !== TEST_VALUE[1][0][0] ||
                    layer.latLngs[1][0][1] !== TEST_VALUE[1][0][1] ||
                    layer.latLngs[1][0][2] !== TEST_VALUE[1][0][2]) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.latLngs }`);
                }
            });
            it('should be changed in Angular when adding in Leaflet', () => {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.latLngs[0][0][3].lat !== 3 ||
                    layer.latLngs[0][0][3].lng !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.latLngs[0][0] }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][][]) => {
                    /* istanbul ignore if */
                    if (eventVal[0][0][0] !== TEST_VALUE[0][0][0] ||
                        eventVal[0][0][1] !== TEST_VALUE[0][0][1] ||
                        eventVal[0][0][2] !== TEST_VALUE[0][0][2] ||

                        eventVal[1][0][0] !== TEST_VALUE[1][0][0] ||
                        eventVal[1][0][1] !== TEST_VALUE[1][0][1] ||
                        eventVal[1][0][2] !== TEST_VALUE[1][0][2]) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.latLngs = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.latLngsChange.subscribe((eventVal: LatLng[][][]) => {
                    /* istanbul ignore if */
                    if (eventVal[0][0][0] !== TEST_VALUE[0][0][0] ||
                        eventVal[0][0][1] !== TEST_VALUE[0][0][1] ||
                        eventVal[0][0][2] !== TEST_VALUE[0][0][2] ||

                        eventVal[1][0][0] !== TEST_VALUE[1][0][0] ||
                        eventVal[1][0][1] !== TEST_VALUE[1][0][1] ||
                        eventVal[1][0][2] !== TEST_VALUE[1][0][2]) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire geoJSON-change event when changing in Angular', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire geoJSON-change event when changing in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire an change event when adding in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe(() => {
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });

    describe('[(geoJSON)]', () => {
        describe('for Polygon', () => {
            const TEST_VALUE: IGenericGeoJSONFeature<GeoJSON.Polygon, any> = {
                geometry: {
                    coordinates: [[[0, 1], [1, 1], [0, 0]]],
                    type: 'Polygon'
                },
                properties: {},
                type: 'Feature'
            };
            const TEST_POLYGON: LatLngExpression[][] = [[[0, 0], [1, 0], [1, 1]]];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if ((<LatLng[][]>layer.latLngs)[0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0] ||
                    (<LatLng[][]>layer.latLngs)[0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][1] ||
                    (<LatLng[][]>layer.latLngs)[0][1].lng !== TEST_VALUE.geometry.coordinates[0][1][0] ||
                    (<LatLng[][]>layer.latLngs)[0][1].lat !== TEST_VALUE.geometry.coordinates[0][1][1] ||
                    (<LatLng[][]>layer.latLngs)[0][2].lng !== TEST_VALUE.geometry.coordinates[0][2][0] ||
                    (<LatLng[][]>layer.latLngs)[0][2].lat !== TEST_VALUE.geometry.coordinates[0][2][1]) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ (<any>layer)._latlngs }`);
                }

            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.geoJSON[0] !== TEST_VALUE[0] ||
                    layer.geoJSON[1] !== TEST_VALUE[1] ||
                    layer.geoJSON[2] !== TEST_VALUE[2]) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.geoJSON }`);
                }
            });
            it('should be changed geoJSON in Angular when changing in latlngs Leaflet', () => {
                layer.setLatLngs(TEST_POLYGON);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][0][0] !== TEST_POLYGON[0][0][1] ||
                    layer.geoJSON.geometry.coordinates[0][0][1] !== TEST_POLYGON[0][0][0] ||
                    layer.geoJSON.geometry.coordinates[0][1][0] !== TEST_POLYGON[0][1][1] ||
                    layer.geoJSON.geometry.coordinates[0][1][1] !== TEST_POLYGON[0][1][0] ||
                    layer.geoJSON.geometry.coordinates[0][2][0] !== TEST_POLYGON[0][2][1] ||
                    layer.geoJSON.geometry.coordinates[0][2][1] !== TEST_POLYGON[0][2][0]) {
                    throw new Error(`Wrong value setted: ${ TEST_POLYGON } != ${ layer.geoJSON.geometry.coordinates }`);
                }
            });
            it('should be changed geoJSON in Angular when adding in latlngs Leaflet', () => {
                layer.setLatLngs(TEST_POLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][3][1] !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.geoJSON.geometry.coordinates }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.geoJSONChange.subscribe((eventVal: LatLng[]) => {
                    /* istanbul ignore if */
                    if (eventVal[0] !== TEST_VALUE[0] ||
                        eventVal[1] !== TEST_VALUE[1] ||
                        eventVal[2] !== TEST_VALUE[2]) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.geoJSON = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.Polygon, any>) => {
                    const values: [number, number][][][] = (<any>eventVal.geometry.coordinates);
                    /* istanbul ignore if */
                    if (values[0][0][0] !== TEST_POLYGON[0][0][1] ||
                        values[0][0][1] !== TEST_POLYGON[0][0][0] ||
                        values[0][1][0] !== TEST_POLYGON[0][1][1] ||
                        values[0][1][1] !== TEST_POLYGON[0][1][0] ||
                        values[0][2][0] !== TEST_POLYGON[0][2][1] ||
                        values[0][2][1] !== TEST_POLYGON[0][2][0]) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setLatLngs(TEST_POLYGON);
            });
            it('should fire an event when adding in Leaflet', (done: MochaDone) => {
                layer.setLatLngs(TEST_POLYGON);
                layer.geoJSONChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.Polygon, any>) => {
                    const values: [number, number][][] = (<any>eventVal.geometry.coordinates);
                    /* istanbul ignore if */
                    if (values[0][3][0] !== 3 ||
                        values[0][3][1] !== 3) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe('for MultiPolygon', () => {
            const TEST_VALUE: IGenericGeoJSONFeature<GeoJSON.MultiPolygon, any> = {
                geometry: {
                    coordinates: [
                        [[[1, 0], [1, 1], [0, 1]]],
                        [[[0, 1], [1, 1], [0, 0]]],
                    ],
                    type: 'MultiPolygon'
                },
                properties: {},
                type: 'Feature'
            };
            const TEST_MULTIPOLYGON: LatLngExpression[][][] = [
                [[[0, 0], [1, 0], [1, 1]]],
                [[[0, 0], [0, 1], [1, 1]]]
            ];
            it('should be changed in Leaflet when changing in Angular', () => {
                layer.geoJSON = TEST_VALUE;

                /* istanbul ignore if */
                if ((<LatLng[][]>layer.latLngs)[0][0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0][0] ||
                    (<LatLng[][]>layer.latLngs)[0][0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][0][1] ||
                    (<LatLng[][]>layer.latLngs)[0][0][1].lng !== TEST_VALUE.geometry.coordinates[0][0][1][0] ||
                    (<LatLng[][]>layer.latLngs)[0][0][1].lat !== TEST_VALUE.geometry.coordinates[0][0][1][1] ||
                    (<LatLng[][]>layer.latLngs)[0][0][2].lng !== TEST_VALUE.geometry.coordinates[0][0][2][0] ||
                    (<LatLng[][]>layer.latLngs)[0][0][2].lat !== TEST_VALUE.geometry.coordinates[0][0][2][1] ||

                    (<LatLng[][]>layer.latLngs)[1][0][0].lng !== TEST_VALUE.geometry.coordinates[1][0][0][0] ||
                    (<LatLng[][]>layer.latLngs)[1][0][0].lat !== TEST_VALUE.geometry.coordinates[1][0][0][1] ||
                    (<LatLng[][]>layer.latLngs)[1][0][1].lng !== TEST_VALUE.geometry.coordinates[1][0][1][0] ||
                    (<LatLng[][]>layer.latLngs)[1][0][1].lat !== TEST_VALUE.geometry.coordinates[1][0][1][1] ||
                    (<LatLng[][]>layer.latLngs)[1][0][2].lng !== TEST_VALUE.geometry.coordinates[1][0][2][0] ||
                    (<LatLng[][]>layer.latLngs)[1][0][2].lat !== TEST_VALUE.geometry.coordinates[1][0][2][1] ) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ (<any>layer)._latlngs }`);
                }

            });
            it('should be changed in Angular when changing in Angular', () => {
                layer.geoJSON = TEST_VALUE;

                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== 'MultiPolygon') {
                    throw new Error('Received wrong geometry type: ' + layer.geoJSON.geometry.type);
                }

                const values: [number, number][][][] = (<any>layer.geoJSON.geometry.coordinates);
                /* istanbul ignore if */
                if (values[0][0][0][0] !== TEST_VALUE.geometry.coordinates[0][0][0][0] ||
                    values[0][0][0][1] !== TEST_VALUE.geometry.coordinates[0][0][0][1] ||
                    values[0][0][1][0] !== TEST_VALUE.geometry.coordinates[0][0][1][0] ||
                    values[0][0][1][1] !== TEST_VALUE.geometry.coordinates[0][0][1][1] ||
                    values[0][0][2][0] !== TEST_VALUE.geometry.coordinates[0][0][2][0] ||
                    values[0][0][2][1] !== TEST_VALUE.geometry.coordinates[0][0][2][1] ||

                    values[1][0][0][0] !== TEST_VALUE.geometry.coordinates[1][0][0][0] ||
                    values[1][0][0][1] !== TEST_VALUE.geometry.coordinates[1][0][0][1] ||
                    values[1][0][1][0] !== TEST_VALUE.geometry.coordinates[1][0][1][0] ||
                    values[1][0][1][1] !== TEST_VALUE.geometry.coordinates[1][0][1][1] ||
                    values[1][0][2][0] !== TEST_VALUE.geometry.coordinates[1][0][2][0] ||
                    values[1][0][2][1] !== TEST_VALUE.geometry.coordinates[1][0][2][1]) {
                    throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.geoJSON }`);
                }
            });
            it('should be changed geoJSON in Angular when changing in latlngs Leaflet', () => {
                layer.setLatLngs(TEST_MULTIPOLYGON);

                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== 'MultiPolygon') {
                    throw new Error('Received wrong geometry type: ' + layer.geoJSON.geometry.type);
                }

                const values: [number, number][][][] = (<any>layer.geoJSON.geometry.coordinates);
                /* istanbul ignore if */
                if (values[0][0][0][0] !== TEST_MULTIPOLYGON[0][0][0][1] ||
                    values[0][0][0][1] !== TEST_MULTIPOLYGON[0][0][0][0] ||
                    values[0][0][1][0] !== TEST_MULTIPOLYGON[0][0][1][1] ||
                    values[0][0][1][1] !== TEST_MULTIPOLYGON[0][0][1][0] ||
                    values[0][0][2][0] !== TEST_MULTIPOLYGON[0][0][2][1] ||
                    values[0][0][2][1] !== TEST_MULTIPOLYGON[0][0][2][0] ||

                    values[1][0][0][0] !== TEST_MULTIPOLYGON[1][0][0][1] ||
                    values[1][0][0][1] !== TEST_MULTIPOLYGON[1][0][0][0] ||
                    values[1][0][1][0] !== TEST_MULTIPOLYGON[1][0][1][1] ||
                    values[1][0][1][1] !== TEST_MULTIPOLYGON[1][0][1][0] ||
                    values[1][0][2][0] !== TEST_MULTIPOLYGON[1][0][2][1] ||
                    values[1][0][2][1] !== TEST_MULTIPOLYGON[1][0][2][0]) {
                    throw new Error(`Wrong value setted: ${ TEST_MULTIPOLYGON } != ${ layer.geoJSON.geometry.coordinates }`);
                }
            });
            it('should be changed geoJSON in Angular when adding in latlngs Leaflet', () => {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== 'MultiPolygon') {
                    throw new Error('Received wrong geometry type: ' + layer.geoJSON.geometry.type);
                }
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][0][3][1] !== 3) {
                    throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.geoJSON.geometry.coordinates }`);
                }
            });
            it('should fire an event when changing in Angular', (done: MochaDone) => {
                layer.geoJSONChange.subscribe((eventVal: GeoJSON.Feature<GeoJSON.MultiPolygon>) => {
                    /* istanbul ignore if */
                    if (eventVal.geometry.type !== 'MultiPolygon') {
                        return done(new Error('Received wrong geometry type: ' + eventVal.geometry.type));
                    }
                    const values: [number, number][][][] = (<any>eventVal.geometry.coordinates);

                    /* istanbul ignore if */
                    if (values[0][0][0][0] !== TEST_VALUE.geometry.coordinates[0][0][0][0] ||
                        values[0][0][0][1] !== TEST_VALUE.geometry.coordinates[0][0][0][1] ||
                        values[0][0][1][0] !== TEST_VALUE.geometry.coordinates[0][0][1][0] ||
                        values[0][0][1][1] !== TEST_VALUE.geometry.coordinates[0][0][1][1] ||
                        values[0][0][2][0] !== TEST_VALUE.geometry.coordinates[0][0][2][0] ||
                        values[0][0][2][1] !== TEST_VALUE.geometry.coordinates[0][0][2][1] ||

                        values[1][0][0][0] !== TEST_VALUE.geometry.coordinates[1][0][0][0] ||
                        values[1][0][0][1] !== TEST_VALUE.geometry.coordinates[1][0][0][1] ||
                        values[1][0][1][0] !== TEST_VALUE.geometry.coordinates[1][0][1][0] ||
                        values[1][0][1][1] !== TEST_VALUE.geometry.coordinates[1][0][1][1] ||
                        values[1][0][2][0] !== TEST_VALUE.geometry.coordinates[1][0][2][0] ||
                        values[1][0][2][1] !== TEST_VALUE.geometry.coordinates[1][0][2][1]) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.geoJSON = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', (done: MochaDone) => {
                layer.geoJSONChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.MultiPolygon, any>) => {
                    const values: [number, number][][][] = (<any>eventVal.geometry.coordinates);
                    /* istanbul ignore if */
                    if (values[0][0][0][0] !== TEST_MULTIPOLYGON[0][0][0][1] ||
                        values[0][0][0][1] !== TEST_MULTIPOLYGON[0][0][0][0] ||
                        values[0][0][1][0] !== TEST_MULTIPOLYGON[0][0][1][1] ||
                        values[0][0][1][1] !== TEST_MULTIPOLYGON[0][0][1][0] ||
                        values[0][0][2][0] !== TEST_MULTIPOLYGON[0][0][2][1] ||
                        values[0][0][2][1] !== TEST_MULTIPOLYGON[0][0][2][0] ||

                        values[1][0][0][0] !== TEST_MULTIPOLYGON[1][0][0][1] ||
                        values[1][0][0][1] !== TEST_MULTIPOLYGON[1][0][0][0] ||
                        values[1][0][1][0] !== TEST_MULTIPOLYGON[1][0][1][1] ||
                        values[1][0][1][1] !== TEST_MULTIPOLYGON[1][0][1][0] ||
                        values[1][0][2][0] !== TEST_MULTIPOLYGON[1][0][2][1] ||
                        values[1][0][2][1] !== TEST_MULTIPOLYGON[1][0][2][0]) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });

                layer.setLatLngs(TEST_MULTIPOLYGON);
            });
            it('should fire an event when adding in Leaflet', (done: MochaDone) => {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.geoJSONChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.MultiPolygon, any>) => {
                    const values: [number, number][][][] = (<any>eventVal.geometry.coordinates);
                    /* istanbul ignore if */
                    if (values[0][0][3][0] !== 3 ||
                        values[0][0][3][1] !== 3) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });

    describe('[(bounds)]', () => {
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);
            layer.bounds = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.getBounds().getNorth() !== val.getNorth() ||
                    layer.getBounds().getEast() !== val.getEast() ||
                    layer.getBounds().getSouth() !== val.getSouth() ||
                    layer.getBounds().getWest() !== val.getWest()) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.getBounds() }`));
                }
                done();
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
                if (layer.bounds.getNorth() !== val.getNorth() ||
                    layer.bounds.getEast() !== val.getEast() ||
                    layer.bounds.getSouth() !== val.getSouth() ||
                    layer.bounds.getWest() !== val.getWest()) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.bounds }`));
                }
                done();
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
                if (layer.bounds.getNorth() !== val.getNorth() ||
                    layer.bounds.getEast() !== val.getEast() ||
                    layer.bounds.getSouth() !== val.getSouth() ||
                    layer.bounds.getWest() !== val.getWest()) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.bounds }`));
                }
                done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);

            layer.boundsChange.subscribe((eventVal: LatLngBounds) => {
                /* istanbul ignore if */
                if (eventVal.getNorth() !== val.getNorth() ||
                    eventVal.getEast() !== val.getEast() ||
                    eventVal.getSouth() !== val.getSouth() ||
                    eventVal.getWest() !== val.getWest()) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });
            layer.ngAfterViewInit();
            layer.bounds = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: LatLngBounds = latLngBounds([
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50],
                [(Math.random() * 100) - 50, (Math.random() * 100) - 50]
            ]);

            layer.boundsChange.subscribe((eventVal: LatLngBounds) => {
                /* istanbul ignore if */
                if (eventVal.getNorth() !== val.getNorth() ||
                    eventVal.getEast() !== val.getEast() ||
                    eventVal.getSouth() !== val.getSouth() ||
                    eventVal.getWest() !== val.getWest()) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            layer.ngAfterViewInit();
            layer.setBounds(val);
        });
    });

    describe('[(north)]', () => {
        beforeEach(() => {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.north = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.getBounds().getNorth() !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.getBounds().getNorth() }`));
                }
                done();
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
                done();
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
                done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.northChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            layer.ngAfterViewInit();
            layer.north = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.northChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            layer.ngAfterViewInit();
            layer.setBounds([
                [0, 0],
                [val, 0]
            ]);
        });
    });
    describe('[(east)]', () => {
        beforeEach(() => {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.east = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.getBounds().getEast() !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.getBounds().getEast() }`));
                }
                done();
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
                done();
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
                done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.eastChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            layer.ngAfterViewInit();
            layer.east = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.eastChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            layer.ngAfterViewInit();
            layer.setBounds([
                [0, val],
                [0, 0]
            ]);
        });
    });
    describe('[(south)]', () => {
            beforeEach(() => {
                layer.setBounds([[0, 0], [1, 1]]);
            });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.south = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.getBounds().getSouth() !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.getBounds().getSouth() }`));
                }
                done();
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
                done();
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
                done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.southChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            layer.ngAfterViewInit();
            layer.south = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.southChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            layer.ngAfterViewInit();
            layer.setBounds([
                [val, 0],
                [1, 1]
            ]);
        });
    });
    describe('[(west)]', () => {
        beforeEach(() => {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.west = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.getBounds().getWest() !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.getBounds().getWest() }`));
                }
                done();
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
                done();
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
                done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.westChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            layer.ngAfterViewInit();
            layer.west = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.westChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                done();
            });

            layer.ngAfterViewInit();
            layer.setBounds([
                [0, val],
                [1, 1]
            ]);
        });
    });

    describe('[smoothFactor]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            layer.smoothFactor = val;
            /* istanbul ignore if */
            if (layer.options.smoothFactor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.smoothFactor }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            layer.smoothFactor = val;
            /* istanbul ignore if */
            if (layer.smoothFactor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.smoothFactor }`);
            }
        });
    });

    describe('[properties]', () => {
        interface ITestProperties {
            test: string;
        }
        let layerWithProperties: RectangleDirective<ITestProperties>;
        const TEST_OBJECT: ITestProperties = {
            test: 'OK'
        };
        beforeEach(() => {
            layerWithProperties = new RectangleDirective<ITestProperties>(map);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            layerWithProperties.properties = TEST_OBJECT;
            /* istanbul ignore if */
            if (layerWithProperties.feature.properties !== TEST_OBJECT) {
                throw new Error(`Wrong value setted: ${ TEST_OBJECT } != ${ layerWithProperties.feature.properties }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            layerWithProperties.properties = TEST_OBJECT;
            /* istanbul ignore if */
            if (layerWithProperties.properties !== TEST_OBJECT) {
                throw new Error(`Wrong value setted: ${ TEST_OBJECT } != ${ layerWithProperties.properties }`);
            }
        });
        it('should emit an event for GeoJSONChange when changing in Angular', (done: MochaDone) => {
            layerWithProperties.geoJSONChange.subscribe((val: IGenericGeoJSONFeature<GeoJSON.GeometryObject, ITestProperties>) => {
                /* istanbul ignore if */
                if (val.properties !== TEST_OBJECT) {
                    return done(new Error('Wrong value received'));
                }
                done();
            });
            layerWithProperties.properties = TEST_OBJECT;
        });
    });

    describe('[noClip]', () => {
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.noClip = false;
            /* istanbul ignore if */
            if (layer.options.noClip) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.options.noClip = false;
            layer.noClip = true;
            /* istanbul ignore if */
            if (!layer.options.noClip) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.noClip = false;
            /* istanbul ignore if */
            if (layer.noClip) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.noClip = true;
            /* istanbul ignore if */
            if (!layer.noClip) {
                throw new Error(`It is not setted to true`);
            }
        });
    });

    describe('Popup in Rectangle Directive', () => {
        let layerWithPopup: RectangleDirective<any>,
            popup: PopupDirective,
            testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            popup = new PopupDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithPopup = Object.create(new RectangleDirective<any>(map), { popupDirective: {value: popup} });
            layerWithPopup.ngAfterViewInit();
        });
        it('should bind popup', () => {
            /* istanbul ignore if */
            if (!(<any>layerWithPopup)._popup) {
                throw new Error('There is no popup binded');
            }
            /* istanbul ignore if */
            if ((<any>layerWithPopup)._popup !== popup) {
                throw new Error('There is a wrong popup binded');
            }
        });
    });

    describe('Tooltip in Rectangle Directive', () => {
        let layerWithTooltip: RectangleDirective<any>,
            tooltip: TooltipDirective,
            testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            tooltip = new TooltipDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithTooltip = Object.create(new RectangleDirective<any>(map), { tooltipDirective: {value: tooltip} });
            layerWithTooltip.ngAfterViewInit();
        });
        it('should bind tooltip', () => {
            /* istanbul ignore if */
            if (!(<any>layerWithTooltip)._tooltip) {
                throw new Error('There is no tooltip binded');
            }
            /* istanbul ignore if */
            if ((<any>layerWithTooltip)._tooltip !== tooltip) {
                throw new Error('There is a wrong tooltip binded');
            }
        });
    });

    describe('Destroying a Rectangle Directive', () => {
        it('should remove Rectangle Directive from map on destroy', () => {
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
});
