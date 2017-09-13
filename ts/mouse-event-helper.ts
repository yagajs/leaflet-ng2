import { LeafletMouseEvent, Map} from 'leaflet';

export function enhanceMouseEvent(originalEvent: MouseEvent, map: Map): LeafletMouseEvent {
    return {
        containerPoint: map.mouseEventToContainerPoint(originalEvent),
        latlng: map.mouseEventToLatLng(originalEvent),
        layerPoint: map.mouseEventToLayerPoint(originalEvent),
        ...originalEvent,
        originalEvent,
    };
}
