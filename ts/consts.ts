/* tslint:disable:max-line-length */

import { PathOptions } from "leaflet";

/**
 * Base64 data-url for a transparent 1px png image
 */
export const TRANSPARENT_PIXEL: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
/**
 * Default value for delays caused by animations (in milliseconds)
 */
export const ANIMATION_DELAY: number = 50;
/**
 * Some lorem ipsum test content
 */
export const EXAMPLE_CONTENT: string = "Vel ipsum odit quia velit omnis illo voluptatem ut. Aperiam porro voluptates maiores.";
/**
 * URL-schema of the official osm tile-server
 */
export const OSM_TILE_LAYER_URL: string = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
/**
 * URL for an example image for image-overlays
 */
export const IMAGE_OVERLAY_URL: string = "http://download.osgeo.org/livedvd/10.0/desktop10_osmF32.png";
/**
 * Base URL for a sample WMS service
 */
export const EXAMPLE_WMS_LAYER_URL: string = "http://www.wms.nrw.de/geobasis/wms_nw_dtk?";
/**
 * Layers of the example WMS service
 */
export const EXAMPLE_WMS_LAYER_NAMES: string[] = ["nw_dtk_col"];
/**
 * Default attribution prefix
 */
export const ATTRIBUTION_PREFIX: string = `<a href="https://yagajs.org" title="YAGA">YAGA</a> | <a href="https://leaflet-ng2.yagajs.org" title="Leaflet in Angular2">leaflet-ng2</a>`;
/**
 * Empty default style
 */
export const DEFAULT_STYLE: PathOptions = {};
