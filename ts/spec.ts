import { LatLng, LatLngBounds } from 'leaflet';

export function randomNumber(max: number = 1, min: number = 0, after: number = 3) {
    return (
        Math.floor(
            Math.random() * (Math.abs(max) + Math.abs(min)) * Math.pow(10, after),
        ) / Math.pow(10, after)) + min;
}

export function randomLat() {
    return randomNumber(90, -90);
}

export function randomLng() {
    return randomNumber(180, -180);
}

export function randomLatLng(): LatLng {
    return new LatLng(randomLat(), randomLng());
}

export function randomLatLngBounds(): LatLngBounds {
    const lat1: number = randomLat();
    const lat2: number = randomLat();
    const lng1: number = randomLng();
    const lng2: number = randomLng();
    return new LatLngBounds(
        new LatLng(lat1 < lat2 ? lat1 : lat2, lng1 < lng2 ? lng1 : lng2),
        new LatLng(lat1 < lat2 ? lat2 : lat1, lng1 < lng2 ? lng2 : lng1),
    );
}

export function hasAsChild(root: HTMLElement, child: HTMLElement): boolean {
    const length: number = root.children.length;
    for (let i: number = 0; i < length; i += 1) {
        /* istanbul ignore else */
        if (root.children.item(i) === child) {
            return true;
        }
    }
    return false;
}
