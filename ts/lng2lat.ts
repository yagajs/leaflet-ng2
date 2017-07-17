import { Position } from 'geojson';

/**
 * Function to convert from Lng-Lat format from geoJSON to LatLng on Leaflet
 */
/* tslint:disable:max-line-length */
export function lng2lat(position: Position | Position[] | Position[][] | Position[][][]): Position | Position[] | Position[][] | Position[][][] {
    /* tslint:enable */
    if ((position as number[]).length > 0 && typeof position[0] === 'number') {
        return [position[1], position[0]] as Position;
    } else if ((position as Position[]).length && Array.prototype.isPrototypeOf(position)) {
        const arr: Position[] = [];
        for (let i: number = 0; i < (position as Position[][]).length; i += 1) {
            arr.push((lng2lat((position as Position[])[i]) as Position));
        }
        return arr;
    }

}
