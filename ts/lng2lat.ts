import { Position } from 'geojson';

/**
 * Function to convert from Lng-Lat format from geoJSON to LatLng on Leaflet
 */
/* tslint:disable:max-line-length */
export function lng2lat(position: Position | Position[] | Position[][] | Position[][][]): Position | Position[] | Position[][] | Position[][][] {
    /* tslint:enable */
    if ((<number[]> position).length > 0 && typeof position[0] === 'number') {
        return <Position> [position[1], position[0]];
    } else if ((<Position[]> position).length && Array.prototype.isPrototypeOf(position)) {
        let arr: Position[] = [];
        for (let i: number = 0; i < (<Position[][]> position).length; i += 1) {
            arr.push((<Position> lng2lat((<Position[]> position)[i])));
        }
        return arr;
    }

}
