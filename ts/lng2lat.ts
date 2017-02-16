import { Position } from 'geojson';

export function lng2lat(position: Position | Position[] | Position[][]):  Position | Position[] | Position[][] {
    if ((<number[]>position).length > 0 && typeof position[0] === 'number') {
        return [position[1], position[0]];
    } else if ((<Position[]>position).length && Array.prototype.isPrototypeOf(position)) {
        let arr: Position[] = [];
        for (let i: number = 0; i < (<Position[][]>position).length; i += 1) {
            arr.push((<Position>lng2lat((<Position[]>position)[i])));
        }
    }

}