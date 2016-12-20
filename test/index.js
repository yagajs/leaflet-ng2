if (typeof window === 'undefined') {
    // load jsdom in tests running on node.js
    require('jsdom-global')();
}

require('reflect-metadata');

require('../lib/map.component.spec');
require('../lib/tile-layer.directive.spec');
require('../lib/wms-layer.directive.spec');
require('../lib/image-overlay.directive.spec');
require('../lib/popup.directive.spec');
