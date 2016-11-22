# Data-bindings in Yaga

*Note: This document uses the default syntax of Angular2 for Inputs and
Outputs of a directive or component...*

*This list is written with the help of the
[Leaflet Documentation](http://leafletjs.com/reference-1.0.0.html)*

## Map

Component name in Angular2: `yaga-map`.

**Children**

* ng-content(Layer(s...), Control(s...), Sensor(s...))

**Two-Way**

* `[(lat)]: number`
* `[(lng)]: number`
* `[(zoom)]: number`
* `[(minZoom)]: number`
* `[(maxZoom)]: number`
* `[(maxBounds)]: Bounds`

**Options**

Interaction Options
* `[closePopupOnClick]: boolean`
* `[zoomSnap]: number`
* `[zoomDelta]: number`
* `[trackResize]: boolean`
* `[boxZoom]: boolean`
* `[doubleClickZoom]: boolean`
* `[dragging]: boolean`

Map State Options
* `[crs]: CRS`
* `[center]: LatLng`
* `[zoom]: number`
* `[minZoom]: number`
* `[maxZoom]: number`
* `[layers]: Layer[]`
* `[maxBounds]: LatLngBounds`
* `[renderer]: Renderer`

Animation Options
* `[fadeAnimation]: boolean`
* `[markerZoomAnimation]: boolean`
* `[transform3DLimit]: number`
* `[zoomAnimation]: boolean`
* `[zoomAnimationThreshold]: number`

Panning Inertia Options
* `[inertia]: boolean`
* `[inertiaDeceleration]: number`
* `[inertiaMaxSpeed]: number`
* `[easeLinearity]: number`	
* `[worldCopyJump]: boolean`
* `[maxBoundsViscosity]: number`

Keyboard Navigation Options
* `[keyboard]: boolean`
* `[keyboardPanDelta]: number`

Mousewheel options
* `[scrollWheelZoom]: boolean` //leaflet also supports `string` with the value `center`
* `[wheelDebounceTime]: number`
* `[wheelPxPerZoomLevel]: number`

Touch interaction options
* `[tap]: boolean`
* `[tapTolerance]: number`
* `[touchZoom]: boolean`
* `[bounceAtZoomLimits]: boolean`

**Events**

Layer events
* `(baselayerchange): LayersControlEvent`
* `(overlayadd): LayersControlEvent`
* `(overlayremove): LayersControlEvent`
* `(layeradd): LayerEvent`
* `(layerremove): LayerEvent`

Map state change events
* `(zoomlevelschange): Event`
* `(resize): ResizeEvent`
* `(unload): Event`
* `(viewreset): Event`
* `(load): Event`
* `(zoomstart): Event`
* `(movestart): Event`
* `(zoom): Event`
* `(move): Event`
* `(zoomend): Event`
* `(moveend): Event`


Popup events
* `(popupopen): PopupEvent`
* `(popupclose): PopupEvent`
* `(autopanstart): Event`

Tooltip events
* `(tooltipopen): TooltipEvent`
* `(tooltipclose): TooltipEvent`

Interaction events
* `(click): MouseEvent`
* `(dblclick): MouseEvent`
* `(mousedown): MouseEvent`
* `(mouseup): MouseEvent`
* `(mouseover): MouseEvent`
* `(mouseout): MouseEvent`
* `(mousemove): MouseEvent`
* `(contextmenu): MouseEvent`
* `(keypress): KeyboardEvent`
* `(preclick): MouseEvent`

Animation Options
* `(zoomanim): ZoomAnimEvent`

* `attributionControl` over `yaga-attribution-control`
* `zoomControl` over `yaga-zoom-control`

## Layers

### Abstract Classes

#### Layer Base
For all Layers
* `[(display)]: boolean`
* `[(opacity)]: number`
* `[(zIndex)]: number`
* `[(minZoom)]: number`
* `[(maxZoom)]: number`

* `[interactive]: boolean`
* `[attribution]: string`
* `[pane]: string` 

Layer Events
* `(add): Event`
* `(remove): Event`

Popup events
* `(popupopen): PopupEvent`
* `(popupclose): PopupEvent`

Tooltip events
* `(tooltipopen): TooltipEvent`
* `(tooltipclose): TooltipEvent`

Mouse Events
* `(click): MouseEvent`
* `(dbclick): MouseEvent`
* `(mousedown): MouseEvent`
* `(mouseover): MouseEvent`
* `(mouseout): MouseEvent`
* `(contextmenu): MouseEvent`

#### GridLayer

**Extends Layer**

* `[tileSize] Number: Point`
* `[updateWhenIdle]: boolean`
* `[updateWhenZooming]: boolean`
* `[updateInterval]: number`
* `[bounds]: LatLngBounds`
* `[noWrap]: boolean`
* `[className]: string`
* `[keepBuffer]: number`


Event
* `(loading): Event`
* `(tileunload): TileEvent`
* `(tileloadstart): TileEvent`
* `(tileerror): TileErrorEvent`
* `(tileload): TileEvent`
* `(load): Event`

### Raster

#### Tile-Layer

**Extends GridLayer**

Directive name in Angular2: `yaga-tile-layer`.

* ng-content(Tooltip, Popup)

* `[(url)]: string` 
* `[maxNativeZoom]: number`
* `[subdomains]: string[]` 
* `[errorTileUrl]: string`
* `[zoomOffset]: number`
* `[tms]: boolean`
* `[zoomReverse]: boolean`
* `[detectRetina]: boolean`
* `[crossOrigin]: boolean`

----

*The following text should be proofed again...*

----

#### WMS

Directive name in Angular2: `yaga-wms-layer`.

look at TileLayer

* `[layers]: string[]`
* `[styles]: string[]`
* `[format]: string`
* `[transparent]: boolean`
* `[version]: string`
* ??? `[crs]: CRS`
* `[uppercase]: boolean`

#### ImageOverlay

Directive name in Angular2: `yaga-image-overlay`.

* ??? ng-content(Tooltip, Popup)

* `[(url)]: string`
* `[crossOrigin]: boolean`
* `[alt]: string`
* `[largeLat]: number`
* `[largeLng]: number`
* `[smallLat]: number`
* `[smallLng]: number`

### Vector

#### GeoJSON

Directive name in Angular2: `yaga-geojson-layer`.

* `[(data)]: FeatureCollection`
* `[defaultStyle]: Style`
* `[styler]: (defaultStyle: Style) => Style`
* `[defaultIcon]: Icon`
* `[iconizer]: (defaultIcon: Icon) => Icon`

#### Polyline

Directive name in Angular2: `yaga-polyline`.

* ng-content(Tooltip, Popup)

* `[(style)]: Style`
* `[(latlngs)]: LatLng[]`
* `[(tooltipOpened)]: boolean`
* `[(popupOpened)]: boolean`

#### Polygon

Directive name in Angular2: `yaga-polygon`.

look at Polyline


#### Rectangle

Directive name in Angular2: `yaga-rectangle`.

* ng-content(Tooltip, Popup)

* `[(style)]: Style`
* `[(bounds)]: LatLngBounds`
* `[(tooltipOpened)]: boolean`
* `[(popupOpened)]: boolean`


#### Circle

Directive name in Angular2: `yaga-circle`.

* ng-content(Tooltip, Popup)

* `[(lat)]: number` 
* `[(lng)]: number`
* `[(radius)]: number` // in meters
* `[(tooltipOpened)]: boolean`
* `[(popupOpened)]: boolean`

#### CircleMarker

Directive name in Angular2: `yaga-circle-marker`.

* ng-content(Tooltip, Popup)

* `[(lat)]: number` 
* `[(lng)]: number`
* `[(radius)]: number` // in pixel
* `[(tooltipOpened)]: boolean`
* `[(popupOpened)]: boolean`


#### // SVG
#### // Canvas

### UI

#### Marker

Directive name in Angular2: `yaga-marker`.

* ng-content (Icon(s...), Tooltip, Popup)

* `[(lat)]: number`
* `[(lng)]: number`
* `[(zindex)]: number`
* `[(draggable)]: boolean` dragging.enable und .disable überwachen
* `[(opacity)]: number`

* `[minZoom]: number`
* `[maxZoom]: number`

Events:

* `(dragend): DragEvent`
* `(dragstart): Event`
* `(movestart): Event`
* `(drag): Event`
* `(moveend): Event`

* `(click): MouseEvent` 
* `(dbclick): MouseEvent`
* `(mousedown): MouseEvent`
* `(mouseover): MouseEvent`
* `(mouseout): MouseEvent` 
* `(contextmenu): MouseEvent` 

#### Popup

Directive name in Angular2: `yaga-popup`.

* ng-content(HTML)
* `[(opened)]: boolean` // keine Information in der Klasse selbst!

#### Tooltip

Directive name in Angular2: `yaga-tooltip`.

* ng-content(HTML)
* `[(opened)]: boolean`

### Structure

#### LayerGroup

Directive name in Angular2: `yaga-layer-group`.

* ng-content(Layer(s...))

## Controls

For all controls

* `[position]: string`

### Zoom

Directive name in Angular2: `yaga-zoom-control`.

* `[zoomInText]: string`
* `[zoomInTitle]: string`
* `[zoomOutText]: string`
* `[zoomOutTitle]: string`

### Attribution

Directive name in Angular2: `yaga-attribution-control`.

* `[prefix]: string = 'Yaga'`

### Layers???

### Scale

Directive name in Angular2: `yaga-scale-control`.

* `[maxWith]: number`
* `[metric]: boolean`
* `[imperial]: boolean`
* `[updateWhenIdle]: boolean`

## Basic Types

### Icon

Directive name in Angular2: `yaga-icon`.

* `[iconUrl]: string`
* `[iconSize]: number[]`
* `[iconAnchor]: number[]`
* `[popupAnchor]: number[]`
* `[shadowUrl]: string`
* `[shadowSize]: number[]`
* `[shadowAnchor]: number[]`

### DivIcon

Directive name in Angular2: `yaga-div-icon`.

* ng-content
* `[bgPos]: number[]`


## Sensor
### GPS

Directive name in Angular2: `yaga-gps-sensor`.

* `(lat): number`
* `(lng): number`
* `(accuracy): number`
* `(altitude): number | null`
* `(heading): number | null`
* `(speed): number | null`
* `(position): GPSPosition`
* `(timestamp): number`

### Compass

Directive name in Angular2: `yaga-compass-sensor`.

* `(magneticHeading): number`
* `(trueHeading): number`
* `(headingAccuracy): number`
* `(timestamp): number`
