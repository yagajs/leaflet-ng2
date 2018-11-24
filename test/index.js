if (typeof window === 'undefined') {
    // load jsdom in tests running on node.js
    require('jsdom-global')();
}

require('reflect-metadata');

require('../lib/lng2lat.spec');

require('../lib/map.component.spec');
require('../lib/tile-layer.directive.spec');
require('../lib/wms-layer.directive.spec');
require('../lib/image-overlay.directive.spec');
require('../lib/popup.directive.spec');
require('../lib/tooltip.directive.spec');
require('../lib/icon.directive.spec');
require('../lib/div-icon.directive.spec');
require('../lib/marker.directive.spec');
require('../lib/polyline.directive.spec');
require('../lib/polygon.directive.spec');
require('../lib/rectangle.directive.spec');
require('../lib/geojson.directive.spec');
require('../lib/circle.directive.spec');
require('../lib/circle-marker.directive.spec');
require('../lib/layer-group.directive.spec');
require('../lib/feature-group.directive.spec');
require('../lib/zoom-control.directive.spec');
require('../lib/attribution-control.directive.spec');
require('../lib/scale-control.directive.spec');
require('../lib/layers-control.directive.spec');
require('../lib/base-layer.directive.spec');
require('../lib/overlay-layer.directive.spec');
