import { expect } from 'chai';
import { Position } from 'geojson';
import { lng2lat } from './index';

describe('lng2lat helper', () => {
    it('should convert a Point', () => {
        const lat: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng: number = Math.floor(Math.random() * 1000000) / 10000;
        let geom: Position = [lat, lng];
        geom = <Position> lng2lat(geom);
        expect(geom).to.deep.equal([lng, lat]);
    });
    it('should convert a LineString or Multipoint', () => {
        const lat1: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng1: number = Math.floor(Math.random() * 1000000) / 10000;
        const lat2: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng2: number = Math.floor(Math.random() * 1000000) / 10000;
        let geom: Position[] = [[lat1, lng1], [lat2, lng2]];
        geom = <Position[]> lng2lat(geom);
        expect(geom).to.deep.equal([[lng1, lat1], [lng2, lat2]]);
    });
    it('should convert a MultiLineString or Polygon', () => {
        const lat1: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng1: number = Math.floor(Math.random() * 1000000) / 10000;
        const lat2: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng2: number = Math.floor(Math.random() * 1000000) / 10000;
        const lat3: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng3: number = Math.floor(Math.random() * 1000000) / 10000;
        const lat4: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng4: number = Math.floor(Math.random() * 1000000) / 10000;
        let geom: Position[][] = [[[lat1, lng1], [lat2, lng2]], [[lat3, lng3], [lat4, lng4]]];
        geom = <Position[][]> lng2lat(geom);
        expect(geom).to.deep.equal([[[lng1, lat1], [lng2, lat2]], [[lng3, lat3], [lng4, lat4]]]);
    });
    it('should convert a MultiPolygon', () => {
        const lat1: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng1: number = Math.floor(Math.random() * 1000000) / 10000;
        const lat2: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng2: number = Math.floor(Math.random() * 1000000) / 10000;
        const lat3: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng3: number = Math.floor(Math.random() * 1000000) / 10000;
        const lat4: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng4: number = Math.floor(Math.random() * 1000000) / 10000;
        const lat5: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng5: number = Math.floor(Math.random() * 1000000) / 10000;
        const lat6: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng6: number = Math.floor(Math.random() * 1000000) / 10000;
        const lat7: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng7: number = Math.floor(Math.random() * 1000000) / 10000;
        const lat8: number = Math.floor(Math.random() * 1000000) / 10000;
        const lng8: number = Math.floor(Math.random() * 1000000) / 10000;
        let geom: Position[][][] = [
            [[[lat1, lng1], [lat2, lng2]], [[lat3, lng3], [lat4, lng4]]],
            [[[lat5, lng5], [lat6, lng6]], [[lat7, lng7], [lat8, lng8]]],
        ];
        geom = <Position[][][]> lng2lat(geom);
        expect(geom).to.deep.equal([
            [[[lng1, lat1], [lng2, lat2]], [[lng3, lat3], [lng4, lat4]]],
            [[[lng5, lat5], [lng6, lat6]], [[lng7, lat7], [lng8, lat8]]],
        ]);
    });
});
