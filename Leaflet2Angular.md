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

*For all Layers*

* `[(display)]: boolean`
* `[(opacity)]: number`
* `[(zIndex)]: number`
* `[minZoom]: number` in some cases 2-way-binded
* `[maxZoom]: number` in some cases 2-way-binded

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
* `[minNativeZoom]: number`
* `[subdomains]: string[]` 
* `[errorTileUrl]: string`
* `[zoomOffset]: number`
* `[tms]: boolean`
* `[zoomReverse]: boolean`
* `[detectRetina]: boolean`
* `[crossOrigin]: boolean`

#### WMS

Directive name in Angular2: `yaga-wms-layer`.

Extends TileLayer

* `[(layers)]: string[]`
* `[(styles)]: string[]`
* `[(format)]: string`
* `[(transparent)]: boolean`
* `[(version)]: string`
* `[uppercase]: boolean`

*No used:*
* `[crs]: CRS` (crs support pnly in MapComponent)

#### ImageOverlay

Directive name in Angular2: `yaga-image-overlay`.

* ??? ng-content(Tooltip, Popup)

* `[(url)]: string`
* `[crossOrigin]: boolean`
* `[alt]: string`
* `[(north)]: number`
* `[(south)]: number`
* `[(east)]: number`
* `[(west)]: number`
* `[(bounds)]: L.LatLngBounds`

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

* `[interactive]: boolean`

#### Polyline

Directive name in Angular2: `yaga-polyline`.

Extends Path

* ng-content(Tooltip, Popup)

* `[(latlngs)]: LatLng[]`
* `[(geojson)]: GeoJSONFeature` *Note: any layer has to have a feature property to handle properties*
* `[properties]: any | T` *maybe implement something like: `type OptionalGenericFeature<T> = Feature | GenericFeature<T>`*
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

* `[(position)]: LatLng`
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

* `[(position)]: LatLng`
* `[(lat)]: number`
* `[(lng)]: number`
* `[(opacity)]: number`
* `[(zindex)]: number`
* `[(draggable)]: boolean` *maybe observe dragging.enable and dragging.disable*
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

* `(close): Event`
* `(open): Event`

#### Tooltip

Directive name in Angular2: `yaga-tooltip`.

* ng-content(HTML)
* `[(opened)]: boolean`
* `[(opacity)]: number`
* `[(lat)]: number`
* `[(lng)]: number`
* `[(position)]: LatLng`
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

* `[(prefix)]: string = 'Yaga'`
* `[(attributions)]: string[]`

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
* `(update): Event`

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
