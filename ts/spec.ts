import { LatLng, LatLngBounds } from "leaflet";

/**
 * Helper function to create random numbers within a range
 * @private
 */
export function randomNumber(max: number = 1, min: number = 0, after: number = 3) {
    return (
        Math.floor(
            Math.random() * (Math.abs(max) + Math.abs(min)) * Math.pow(10, after),
        ) / Math.pow(10, after)) + min;
}

/**
 * Helper function to create random latitude values
 * @private
 */
export function randomLat() {
    return randomNumber(90, -90);
}

/**
 * Helper function to create random longitude values
 * @private
 */
export function randomLng() {
    return randomNumber(180, -180);
}

/**
 * Helper function to create random latitude-longitude values pairs
 * @private
 */
export function randomLatLng(): LatLng {
    return new LatLng(randomLat(), randomLng());
}

/**
 * Helper function to create random spatial bounds
 * @private
 */
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

/**
 * Helper function to detect if an element is a child of another
 * @private
 */
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
