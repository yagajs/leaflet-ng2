# Data-bindings in Yaga

*Note: This document uses the default syntax of Angular2 for Inputs and
Outputs of a directive or component...*

*This list is written with the help of the
[Leaflet Documentation](http://leafletjs.com/reference-1.0.2.html)*

## Map

Component name in Angular2: `yaga-map`.

**Children**

* ng-content(Layer(s...), Control(s...), Sensor(s...))

**Two-Way**

* (ok) `[(lat)]: number`
* (ok) `[(lng)]: number`
* (ok) `[(zoom)]: number`
* (ok) `[(minZoom)]: number`
* (ok) `[(maxZoom)]: number`
* (ok) `[(maxBounds)]: Bounds`

**Options**

Interaction Options
* (ok) `[closePopupOnClick]: boolean`
* (ok) `[zoomSnap]: number`
* (ok) `[zoomDelta]: number`
* (ok) `[trackResize]: boolean`
* (rename) `[boxZoom]: boolean`
* (rename) `[doubleClickZoom]: boolean`
* (rename) `[dragging]: boolean`

Map State Options
* (missing text) `[crs]: CRS`
* `[center]: LatLng`
* (see twoway) `[zoom]: number`
* (see twoway) `[minZoom]: number`
* (see twoway) `[maxZoom]: number`
* (not implemented)`[layers]: Layer[]`
* (see twoway) `[maxBounds]: LatLngBounds`
* (not implemented) `[renderer]: Renderer`

Animation Options
* (ok) `[fadeAnimation]: boolean`
* (ok) `[markerZoomAnimation]: boolean`
* (ok) `[transform3DLimit]: number`
* (ok) `[zoomAnimation]: boolean`
* (ok) `[zoomAnimationThreshold]: number`

Panning Inertia Options
* (ok) `[inertia]: boolean`
* (ok) `[inertiaDeceleration]: number`
* (ok) `[inertiaMaxSpeed]: number`
* (ok) `[easeLinearity]: number`	
* (ok) `[worldCopyJump]: boolean`
* (ok) `[maxBoundsViscosity]: number`

Keyboard Navigation Options
* (rename) `[keyboard]: boolean`
* (ok) `[keyboardPanDelta]: number`

Mousewheel options
* (rename) `[scrollWheelZoom]: boolean` //leaflet also supports `string` with the value `center`
* (ok) `[wheelDebounceTime]: number`
* (ok) `[wheelPxPerZoomLevel]: number`

Touch interaction options
* (rename) `[tap]: boolean`
* (ok) `[tapTolerance]: number`
* (rename) `[touchZoom]: boolean`
* (ok) `[bounceAtZoomLimits]: boolean`

**Events**

Layer events
* (ok) `(baselayerchange): LayersControlEvent`
* (ok) `(overlayadd): LayersControlEvent`
* (ok) `(overlayremove): LayersControlEvent`
* (ok) `(layeradd): LayerEvent`
* (ok) `(layerremove): LayerEvent`

Map state change events
* (ok) `(zoomlevelschange): Event`
* (ok) `(resize): ResizeEvent`
* (ok) `(unload): Event`
* (ok) `(viewreset): Event`
* (ok) `(load): Event`
* (ok) `(zoomstart): Event`
* (ok) `(movestart): Event`
* (ok) `(zoom): Event`
* (ok) `(move): Event`
* (ok) `(zoomend): Event`
* (ok) `(moveend): Event`


Popup events
* (ok) `(popupopen): PopupEvent`
* (ok) `(popupclose): PopupEvent`
* (ok) `(autopanstart): Event`

Tooltip events
* (ok) `(tooltipopen): TooltipEvent`
* (ok) `(tooltipclose): TooltipEvent`

Interaction events
* (ok) `(click): MouseEvent`
* (ok) `(dblclick): MouseEvent`
* (ok) `(mousedown): MouseEvent`
* (ok) `(mouseup): MouseEvent`
* (ok) `(mouseover): MouseEvent`
* (ok) `(mouseout): MouseEvent`
* (ok) `(mousemove): MouseEvent`
* (ok) `(contextmenu): MouseEvent`
* (ok) `(keypress): KeyboardEvent`
* (ok) `(preclick): MouseEvent`

Animation Options
* (ok) `(zoomanim): ZoomAnimEvent`

* `attributionControl` over `yaga-attribution-control`
* `zoomControl` over `yaga-zoom-control`

## Layers

### Abstract Classes

#### Layer Base

*For all Layers*

* (tilelayer, image-overlay) `[(display)]: boolean`
* (tilelayer, image-overlay) `[(opacity)]: number`
* (tilelayer) `[(zIndex)]: number`
* `[minZoom]: number` in some cases 2-way-binded
* `[maxZoom]: number` in some cases 2-way-binded

* (image-overlay) `[interactive]: boolean`
* `[attribution]: string`
* `[pane]: string` 

Layer Events
* (tilelayer, image-overlay) `(add): Event`
* (tilelayer, image-overlay) `(remove): Event`

Popup events
* (tilelayer, image-overlay) `(popupopen): PopupEvent`
* (tilelayer, image-overlay) `(popupclose): PopupEvent`

Tooltip events
* (tilelayer, image-overlay) `(tooltipopen): TooltipEvent`
* (tilelayer, image-overlay) `(tooltipclose): TooltipEvent`

Mouse Events
* (tilelayer, image-overlay) `(click): MouseEvent`
* (tilelayer, image-overlay) `(dbclick): MouseEvent`
* (tilelayer, image-overlay) `(mousedown): MouseEvent`
* (tilelayer, image-overlay)  `(mouseover): MouseEvent`
* (tilelayer, image-overlay)  `(mouseout): MouseEvent`
* (tilelayer, image-overlay)  `(contextmenu): MouseEvent`

#### GridLayer

**Extends Layer**

* (tileLayer) `[tileSize] Number: Point`
* (tileLayer) `[updateWhenIdle]: boolean`
* (tileLayer) `[updateWhenZooming]: boolean`
* (tileLayer) `[updateInterval]: number`
* (tileLayer) `[bounds]: LatLngBounds`
* (tileLayer) `[noWrap]: boolean`
* (tileLayer) `[className]: string`
* (tileLayer) `[keepBuffer]: number`


Event
* (tileLayer) `(loading): Event`
* (tileLayer) `(tileunload): TileEvent`
* (tileLayer) `(tileloadstart): TileEvent`
* (tileLayer) `(tileerror): TileErrorEvent`
* (tileLayer) `(tileload): TileEvent`
* (tileLayer) `(load): Event`

### Raster

#### Tile-Layer

**Extends GridLayer**

Directive name in Angular2: `yaga-tile-layer`.

* ng-content(Tooltip, Popup)

* (ok) `[(url)]: string` 
* (ok) `[maxNativeZoom]: number`
* `[minNativeZoom]: number`
* (ok) `[subdomains]: string[]` 
* (ok) `[errorTileUrl]: string`
* (ok) `[zoomOffset]: number`
* (ok) `[tms]: boolean`
* (ok) `[zoomReverse]: boolean`
* (ok) `[detectRetina]: boolean`
* (ok) `[crossOrigin]: boolean`

#### WMS

Directive name in Angular2: `yaga-wms-layer`.

Extends TileLayer

* `[layers]: string[]`
* `[styles]: string[]`
* `[format]: string`
* `[transparent]: boolean`
* `[version]: string`
* `[uppercase]: boolean`

*No used:*
* `[crs]: CRS` (crs support pnly in MapComponent)

#### ImageOverlay

Directive name in Angular2: `yaga-image-overlay`.

* ??? ng-content(Tooltip, Popup)

* (ok) `[(url)]: string`
* (ok) `[crossOrigin]: boolean`
* (ok) `[alt]: string`
* (ok) `[(north)]: number`
* (ok) `[(south)]: number`
* (ok) `[(east)]: number`
* (ok) `[(west)]: number`
* (ok) `[(bounds)]: L.LatLngBounds`

### Vector

#### Path

*Abstract class!*

* `[(display)]: boolean`
* `[(stroke)]: boolean`
* `[(color)]: string`
* `[(weight)]: number`
* `[(opacity)]: number`
* `[(lineCap)]: string`
* `[(lineJoin)]: string`
* `[(dashArray)]: string`
* `[(dashOffset)]: string`
* `[(fill)]: boolean`
* `[(fillColor)]: string`
* `[(fillOpacity)]: number`
* `[(fillRule)]: string`
* `[(renderer)]: Renderer`	
* `[(className)]: string`
* `[(style)]: Style`

#### Polyline

Directive name in Angular2: `yaga-polyline`.

Extends Path

* ng-content(Tooltip, Popup)

* `[(latlngs)]: LatLng[]`
* `[(geojson)]: GeoJSONFeature` *Note: any layer has to have a feature property to handle properties*
* `[(properties)]: any | T` *maybe implement something like: `type OptionalGenericFeature<T> = Feature | GenericFeature<T>`*
* `[(tooltipOpened)]: boolean`
* `[(popupOpened)]: boolean`
* `[smoothFactor]: number`
* `[noClip]: boolean`

#### Polygon

Directive name in Angular2: `yaga-polygon`.

Extends Polyline


#### Rectangle

Directive name in Angular2: `yaga-rectangle`.

Extends Polygon

* `[(bounds)]: LatLngBounds`
* `[(north)]: number`
* `[(east)]: number`
* `[(south)]: number`
* `[(west)]: number`


#### Circle

Directive name in Angular2: `yaga-circle`.


Extends Path

* `[(center)]: LatLng`
* `[(lat)]: number`
* `[(lng)]: number`
* `[(radius)]: number` in meters
* `[(tooltipOpened)]: boolean`
* `[(popupOpened)]: boolean`
* `[(geojson)]: GeoJSONFeature` *Note: save radius in properties*
* `[(properties)]: any`


#### GeoJSON

Directive name in Angular2: `yaga-geojson-layer`.

* `[(data)]: GeoJSONFeatureCollection`
* `[defaultStyle]: Style`
* `[styler]: (defaultStyle: Style) => Style`
* `[defaultIcon]: Icon`
* `[iconizer]: (defaultIcon: Icon) => Icon`

#### CircleMarker

Directive name in Angular2: `yaga-circle-marker`.

Extends Path

* `[(lat)]: number` 
* `[(lng)]: number`
* `[(radius)]: number` in pixel
* `[(tooltipOpened)]: boolean`
* `[(popupOpened)]: boolean`


### UI

#### Marker

Directive name in Angular2: `yaga-marker`.

* ng-content (Icon(s...), Tooltip, Popup)

Extends Layer-Base

* `[(lat)]: number`
* `[(opacity)]: number`
* `[(lng)]: number`
* `[(zindex)]: number`
* `[(draggable)]: boolean` *maybe observe dragging.enable and dragging.disable*
* `[(opacity)]: number`
* `[(icon)]: Icon`
* `[(tooltipOpened)]: boolean`
* `[(popupOpened)]: boolean`

* `[minZoom]: number`
* `[maxZoom]: number`
* `[keyboard]: boolean`
* `[title]: string`
* `[alt]: string`
* `[zIndexOffset]: number`
* `[riseOnHover]: boolean`
* `[riseOffset]: number`
* `[pane]: string`

Events:

* `(dragend): DragEvent`
* `(dragstart): Event`
* `(movestart): Event`
* `(drag): Event`
* `(moveend): Event`

#### Popup

Directive name in Angular2: `yaga-popup`.

* ng-content(HTML)

* `[(content)]: HTMLElement`
* `[(opened)]: boolean`
* `[(lat)]: number`
* `[(lng)]: number`
* `[(position)]: LatLng`
* `[maxWidth]: number`
* `[minWidth]: number`
* `[maxHeight]: number`
* `[autoPan]: boolean`
* `[autoPanPaddingTopLeft]: Point`
* `[autoPanPaddingBottomRight]: Point`
* `[autoPanPadding]: Point`
* `[keepInView]: boolean`
* `[closeButton]: boolean`
* `[autoClose]: boolean`
* `[className]: string`
* `[pane]: string`

#### Tooltip

Directive name in Angular2: `yaga-tooltip`.

* ng-content(HTML)
* `[(opened)]: boolean`
* `[(opacity)]: number`
* `[offset]: Point`
* `[direction]: string`
* `[permanent]: boolean`
* `[sticky]: boolean`
* `[interactive]: boolean`
* `[pane]: string`

### Structure

#### LayerGroup

*Actual not planed to support*

Directive name in Angular2: `yaga-layer-group`.

* ng-content(Layer(s...))

#### FeatureGroup

*Actual not planed to support*

Directive name in Angular2: `yaga-feature-group`.

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

## Others

*We will not implement SVG and Canvas at the moment*

*LayerGroup is difficult to implement because every layer wants to add itself to the map-component.
Maybe we do not implement LayerGroup to Yaga*
