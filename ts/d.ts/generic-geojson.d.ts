/// <reference path="../../typings/index.d.ts" />

import Feature = GeoJSON.Feature;
import FeatureCollection = GeoJSON.FeatureCollection;
import GeometryObject = GeoJSON.GeometryObject;

export interface IGenericGeoJSONFeature<G extends GeometryObject, T> extends Feature<G> {
    properties: T;
}

export interface IGenericGeoJSONFeatureCollection<G extends GeometryObject, T> extends FeatureCollection<G> {
    features: IGenericGeoJSONFeature<G, T>[];
}
