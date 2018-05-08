import { expect } from "chai";
import { Position } from "geojson";
import { lng2lat } from "./index";
import { randomLat, randomLng } from "./spec";

describe("lng2lat helper", () => {
    it("should convert a Point", () => {
        const lat: number = randomLat();
        const lng: number = randomLng();
        let geom: Position = [lat, lng];
        geom = lng2lat(geom) as Position;
        expect(geom).to.deep.equal([lng, lat]);
    });
    it("should convert a LineString or Multipoint", () => {
        const lat1: number = randomLat();
        const lng1: number = randomLng();
        const lat2: number = randomLat();
        const lng2: number = randomLng();
        let geom: Position[] = [[lat1, lng1], [lat2, lng2]];
        geom = lng2lat(geom) as Position[];
        expect(geom).to.deep.equal([[lng1, lat1], [lng2, lat2]]);
    });
    it("should convert a MultiLineString or Polygon", () => {
        const lat1: number = randomLat();
        const lng1: number = randomLng();
        const lat2: number = randomLat();
        const lng2: number = randomLng();
        const lat3: number = randomLat();
        const lng3: number = randomLng();
        const lat4: number = randomLat();
        const lng4: number = randomLng();
        let geom: Position[][] = [[[lat1, lng1], [lat2, lng2]], [[lat3, lng3], [lat4, lng4]]];
        geom = lng2lat(geom) as Position[][];
        expect(geom).to.deep.equal([[[lng1, lat1], [lng2, lat2]], [[lng3, lat3], [lng4, lat4]]]);
    });
    it("should convert a MultiPolygon", () => {
        const lat1: number = randomLat();
        const lng1: number = randomLng();
        const lat2: number = randomLat();
        const lng2: number = randomLng();
        const lat3: number = randomLat();
        const lng3: number = randomLng();
        const lat4: number = randomLat();
        const lng4: number = randomLng();
        const lat5: number = randomLat();
        const lng5: number = randomLng();
        const lat6: number = randomLat();
        const lng6: number = randomLng();
        const lat7: number = randomLat();
        const lng7: number = randomLng();
        const lat8: number = randomLat();
        const lng8: number = randomLng();
        let geom: Position[][][] = [
            [[[lat1, lng1], [lat2, lng2]], [[lat3, lng3], [lat4, lng4]]],
            [[[lat5, lng5], [lat6, lng6]], [[lat7, lng7], [lat8, lng8]]],
        ];
        geom = lng2lat(geom) as Position[][][];
        expect(geom).to.deep.equal([
            [[[lng1, lat1], [lng2, lat2]], [[lng3, lat3], [lng4, lat4]]],
            [[[lng5, lat5], [lng6, lat6]], [[lng7, lat7], [lng8, lat8]]],
        ]);
    });
});
