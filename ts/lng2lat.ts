import { Position } from "geojson";

/**
 * Function to convert from Lng-Lat format from geoJSON to LatLng on Leaflet
 */
/* tslint:disable:max-line-length */
export function lng2lat(
    position: Position | Position[] | Position[][] | Position[][][],
): Position | Position[] | Position[][] | Position[][][] {
    /* tslint:enable */
    if ((position as number[]).length > 0 && typeof position[0] === "number") {
        return [position[1], position[0]] as Position;
    } else if ((position as Position[]).length && Array.isArray(position)) {
        return (position as any).map((elem: Position) => lng2lat(elem));
    }
    throw new Error("Can not convert the given coordinates");
}
