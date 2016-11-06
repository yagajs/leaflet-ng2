# Data-bindings in Yaga

*Note: This document uses the default syntax of Angular2 for Inputs and
Outputs of a directive or component...*

*This list is written with the help of the
[Leaflet Documentation](http://leafletjs.com/reference-1.0.0.html)*

## Map

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
* `[layers]: Laye`
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
* `[scrollWheelZoom]: boolean`
* `[wheelDebounceTime]: number`
* `[wheelPxPerZoomLevel]: number`

Touch interaction options
* `[tap]: boolean`
* `[tapTolerance]: number`
* `[touchZoom]: Boolea`
* `[bounceAtZoomLimits]: boolean`

**Events**

Layer events
* `(baselayerchange): LayersControlEvent`
* `(overlayadd): LayersControlEvent`
* `(overlayremove): LayersControlEvent`
* `(layeradd): LayerEvent`
* `(layerremove): LayerEvent`

Map state change events
* `(zoomlevelschang): Event`
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
* `(contextmen): MouseEvent`
* `(keypress): KeyboardEvent`
* `(preclick): MouseEvent`

Animation Options
* `(zoomanim): ZoomAnimEvent`

* `attributionControl` over `yaga-attribution-control`
* `zoomControl` over `yaga-zoom-control`


----
*The following text should be proofed again...*
----


## Layers

For all Layers

* `[(opacity)]: string`

* `[interactive]: boolean`
* `[attribution]: string`

* `(click): MouseEvent`
* `(dbclick): MouseEvent`
* `(mousedown): MouseEvent`
* `(mouseover): MouseEvent`
* `(mouseout): MouseEvent`
* `(contextmenu): MouseEvent`
* `(popupopen): PopupEvent`
* `(popupclose): PopupEvent`
* `(tooltipopen): TooltipEvent`
* `(tooltipclose): TooltipEvent`
* `(addLayer): Layer??? | Event???`
* `(removeLayer): Layer??? | Event???`

* `[display]: boolean` //maybe as: `[(display)]`

### Raster

#### Tile-Layer

* ng-content(Tooltip, Popup)

* `[(url)]: string` 
* `[(zIndex)]: number`
* `[minZoom]: number`, oder: `[(minZoom)]: number`
* `[maxZoom]: number`, oder: `[(maxZoom)]: number`
* `[maxNativeZoom]: number`  ""
* `[subdomains]: string[]`  ""
* `[errorTileUrl]: string`  ""
* `[tms]: boolean`
* `[zoomReverse]: boolean`
* `[detectRetina]: boolean`
* `[crossOrigin]: boolean`

* `(loading): Event` 
* `(tileunload): TileEvent` 
* `(tileloadstart): TileEvent` 
* `(tileerror): TileErrorEvent` 
* `(tileload): TileEvent` 
* `(load): Event`  
* `(popupopen): Event`  
* `(popupclose): Event` 


#### WMS

siehe TileLayer

* `[layers]: string[]`
* `[styles]: string[]`
* `[format]: string`
* `[transparent]: boolean`
* `[version]: string`
* ??? `[crs]: CRS`
* `[uppercase]: boolean`

#### ImageOverlay

* ??? ng-content(Tooltip, Popup)

* `[(url)]: string`
* `[alt]: string`
* `[largeLat]: number`
* `[largeLng]: number`
* `[smallLat]: number`
* `[smallLng]: number`

### Vector

#### GeoJSON

* `[data]: FeatureCollection`
* `[defaultStyle]: Style`
* `[styler]: (defaultStyle: Style) => Style`
* `[defaultIcon]: Icon`
* `[iconizer]: (defaultIcon: Icon) => Icon`
* `[data]: FeatureCollection`

#### Polyline

* ng-content(Tooltip, Popup)

* `[(style)]: Style`
* `[(latlngs)]: LatLng[]`
* `[(tooltipOpened)]: boolean`
* `[(popupOpened)]: boolean`

#### Polygon
siehe Polyline

#### Rectangle

* ng-content(Tooltip, Popup)

* `[(style)]: Style`
* `[(bounds)]: LatLngBounds`
* `[(tooltipOpened)]: boolean`
* `[(popupOpened)]: boolean`


#### Circle

* ng-content(Tooltip, Popup)

* `[(lat)]: number` 
* `[(lng)]: number`
* `[(radius)]: number` // in meters
* `[(tooltipOpened)]: boolean`
* `[(popupOpened)]: boolean`

#### CircleMarker

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

* ng-content(HTML)
* `[(opened)]: boolean` // keine Information in der Klasse selbst!

#### Tooltip

* ng-content(HTML)
* `[(opened)]: boolean`

### Structure

#### LayerGroup

* ng-content(Layer(s...))

## Controls

For all controls

* `[position]: string`

### Zoom
* `[zoomInText]: string`
* `[zoomInTitle]: string`
* `[zoomOutText]: string`
* `[zoomOutTitle]: string`

### Attribution

* `[prefix]: string = 'Yaga'`

### Layers???

### Scale

* `[maxWith]: number`
* `[metric]: boolean`
* `[imperial]: boolean`
* `[updateWhenIdle]: boolean`

## Basic Types

### Icon

* `[iconUrl]: string`
* `[iconSize]: number[]`
* `[iconAnchor]: number[]`
* `[popupAnchor]: number[]`
* `[shadowUrl]: string`
* `[shadowSize]: number[]`
* `[shadowAnchor]: number[]`

### DivIcon

* ng-content
* `[bgPos]: number[]`


## Sensor
### GPS

* `(lat): number`
* `(lng): number`
* `(accuracy): number`
* `(position): GPSPosition`
