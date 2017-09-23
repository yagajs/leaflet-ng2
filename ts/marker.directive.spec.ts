import { expect } from 'chai';
import { point } from 'leaflet';
import {
    IconDirective,
    LatLng,
    MapComponent,
    MarkerDirective,
    PopupDirective,
    TooltipDirective,
    TRANSPARENT_PIXEL,
} from './index';
import { randomLat, randomLatLng, randomLng, randomNumber } from './spec';

function hasAsChild(root: HTMLElement, child: HTMLElement): boolean {
    'use strict';
    const length: number = root.children.length;
    for (let i: number = 0; i < length; i += 1) {
        /* istanbul ignore else */
        if (root.children.item(i) === child) {
            return true;
        }
    }
    return false;
}

describe('Marker Directive', () => {
    let map: MapComponent;
    let layer: MarkerDirective;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        layer = new MarkerDirective(map);
    });
    describe('[(display)]', () => {
        it('should remove DOM container when not displaying', () => {
            layer.display = false;

            expect(hasAsChild(layer.getPane(), layer.getElement())).to.equal(false);
        });
        it('should re-add DOM container when display is true again', () => {
            layer.display = false;
            layer.display = true;

            expect(hasAsChild(layer.getPane(), layer.getElement())).to.equal(true);
        });
        it('should remove EventListeners when not displaying', (done: MochaDone) => {
            const zoomEvents: Array<{fn: () => any}> = (map as any)._events.zoom;
            const length: number = zoomEvents.length;
            /* tslint:disable:no-string-literal */
            const originalEventListener: (event: Event) => void = layer.getEvents()['zoom'];
            /* tslint:enable */

            layer.display = false;

            for (let i: number = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done(new Error('There is still an event on listener'));
                }
            }
            done();
        });
        it('should re-add EventListeners when display is true again', (done: MochaDone) => {
            const zoomEvents: Array<{fn: () => any}> = (map as any)._events.zoom;
            const length: number = zoomEvents.length;
            /* tslint:disable:no-string-literal */
            const originalEventListener: (event: Event) => void = layer.getEvents()['zoom'];
            /* tslint:enable */

            layer.display = false;
            layer.display = true;

            for (let i: number = 0; i < length; i += 1) {
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done();
                }
            }
        });
        it('should set to false by removing from map', (done: MochaDone) => {

            layer.displayChange.subscribe((val: boolean) => {
                expect(val).to.equal(false);
                expect(layer.display).to.equal(false);
                done();
            });

            map.removeLayer(layer);
        });
        it('should set to true when adding to map again', (done: MochaDone) => {
            map.removeLayer(layer);
            layer.displayChange.subscribe((val: boolean) => {
                expect(val).to.equal(true);
                expect(layer.display).to.equal(true);
                done();
            });

            map.addLayer(layer);
        });
    });
    describe('[(opacity)]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = randomNumber();
            layer.opacity = val;
            expect(layer.options.opacity).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = randomNumber();
            layer.opacity = val;
            expect(layer.opacity).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = randomNumber();
            layer.setOpacity(val);
            expect(layer.opacity).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = randomNumber();

            layer.opacityChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.opacity = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = randomNumber();

            layer.opacityChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setOpacity(val);
        });
    });

    describe('[(lat)]', () => {
        beforeEach(() => {
            layer.ngAfterContentInit();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = randomLat();
            layer.lat = val;
            expect(layer.getLatLng().lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = randomLat();
            layer.lat = val;
            expect(layer.lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = randomLat();
            layer.setLatLng([val, 0]);
            expect(layer.lat).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = randomLat();

            layer.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.lat = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = randomLat();

            layer.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setLatLng([val, 0]);
        });
    });
    describe('[(lng)]', () => {
        beforeEach(() => {
            layer.ngAfterContentInit();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = randomLng();
            layer.lng = val;
            expect(layer.getLatLng().lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = randomLng();
            layer.lng = val;
            expect(layer.lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = randomLng();
            layer.setLatLng([0, val]);
            expect(layer.lng).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = randomLng();

            layer.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.lng = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = randomLng();

            layer.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setLatLng([0, val]);
        });
    });
    describe('[(position)]', () => {
        beforeEach(() => {
            layer.ngAfterContentInit();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: LatLng = randomLatLng();
            layer.position = val;
            expect(layer.getLatLng()).to.deep.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: LatLng = randomLatLng();
            layer.position = val;
            expect(layer.position).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: LatLng = randomLatLng();
            layer.setLatLng(val);
            expect(layer.position).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: LatLng = randomLatLng();

            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.deep.equal(val);
                return done();
            });

            layer.position = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: LatLng = randomLatLng();

            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.deep.equal(val);
                return done();
            });

            layer.setLatLng(val);
        });
    });

    // TODO: icon
    describe('[title]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'http://test';
            layer.title = val;
            expect(layer.options.title).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'http://test';
            layer.title = val;
            expect(layer.title).to.equal(val);
        });
    });
    describe('[alt]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'http://test';
            layer.alt = val;
            expect(layer.options.alt).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'http://test';
            layer.alt = val;
            expect(layer.alt).to.equal(val);
        });
    });

    describe('[draggable]', () => {
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.draggable = false;
            expect(layer.dragging.enabled()).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.dragging.disable();
            layer.draggable = true;
            expect(layer.dragging.enabled()).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.draggable = false;
            expect(layer.draggable).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.draggable = true;
            expect(layer.draggable).to.equal(true);
        });
    });

    // Events
    describe('(dragend)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.dragendEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('dragend', testEvent);
        });
    });
    describe('(dragstart)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.dragstartEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('dragstart', testEvent);
        });
    });
    describe('(movestart)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.movestartEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('movestart', testEvent);
        });
    });
    describe('(drag)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.dragEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('drag', testEvent);
        });
    });
    describe('(moveend)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.moveendEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('moveend', testEvent);
        });
    });

    describe('(add)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.addEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('add', testEvent);
        });
    });
    describe('(remove)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.removeEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('remove', testEvent);
        });
    });
    describe('(popupopen)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.popupopenEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('popupopen', testEvent);
        });
    });
    describe('(popupclose)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.popupcloseEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('popupclose', testEvent);
        });
    });
    describe('(tooltipopen)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.tooltipopenEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('tooltipopen', testEvent);
        });
    });
    describe('(tooltipclose)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.tooltipcloseEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('tooltipclose', testEvent);
        });
    });
    describe('(click)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.clickEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('click', testEvent);
        });
    });
    describe('(dbclick)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.dbclickEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('dbclick', testEvent);
        });
    });
    describe('(mousedown)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.mousedownEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mousedown', testEvent);
        });
    });
    describe('(mouseover)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.mouseoverEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mouseover', testEvent);
        });
    });
    describe('(mouseout)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.mouseoutEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mouseout', testEvent);
        });
    });
    describe('(contextmenu)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {};
            const testEvent: any = { testHandle };
            layer.contextmenuEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('contextmenu', testEvent);
        });
    });

    describe('Popup in Marker Directive', () => {
        let layerWithPopup: MarkerDirective;
        let popup: PopupDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            popup = new PopupDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithPopup = Object.create(new MarkerDirective(map), { popupDirective: {value: popup} });
            layerWithPopup.ngAfterContentInit();
        });
        it('should bind popup', () => {
            expect((layerWithPopup as any)._popup).to.equal(popup);
        });
    });

    describe('Tooltip in Marker Directive', () => {
        let layerWithTooltip: MarkerDirective;
        let tooltip: TooltipDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            tooltip = new TooltipDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithTooltip = Object.create(new MarkerDirective(map), { tooltipDirective: {value: tooltip} });
            layerWithTooltip.ngAfterContentInit();
        });
        it('should bind tooltip', () => {
            expect((layerWithTooltip as any)._tooltip).to.equal(tooltip);
        });

    });

    describe('Icon in Marker Directive', () => {
        let layerWithIcon: MarkerDirective;
        let icon: IconDirective;
        let testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            icon = new IconDirective();
            icon.iconUrl = TRANSPARENT_PIXEL;

            // Hack to get write-access to readonly property
            layerWithIcon = Object.create(new MarkerDirective(map), { iconDirective: {value: icon} });

            layerWithIcon.ngAfterContentInit();
        });
        it('should bind icon', () => {
            expect(((layerWithIcon as any)._icon as HTMLElement).getAttribute('src')).to.equal(TRANSPARENT_PIXEL);
        });
        it('should bind icon again on changes in icon directive', () => {
            const TEST_VALUE: string = 'path/to/icon.png';
            icon.iconUrl = TEST_VALUE;
            expect(((layerWithIcon as any)._icon as HTMLElement).getAttribute('src')).to.equal(TEST_VALUE);
        });

    });

    describe('Destroying a Marker Directive', () => {
        it('should remove Marker Directive from map on destroy', () => {
            expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
