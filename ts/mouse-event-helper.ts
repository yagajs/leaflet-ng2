import { LeafletMouseEvent, Map} from "leaflet";

/**
 * Helper function to enhance browser mouse events to Leaflet mouse events
 * @private
 */
export function enhanceMouseEvent(originalEvent: MouseEvent, map: Map): LeafletMouseEvent {
    return {
        ...originalEvent,
        containerPoint: map.mouseEventToContainerPoint(originalEvent),
        latlng: map.mouseEventToLatLng(originalEvent),
        layerPoint: map.mouseEventToLayerPoint(originalEvent),
        originalEvent,
    } as any;
}
