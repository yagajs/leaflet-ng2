/// <reference path="../typings/index.d.ts" />

import { AttributionControlDirective,
    MapComponent,
    ControlPosition } from './index';
import { point } from 'leaflet';
import { expect } from 'chai';

describe('Attribution-Control Directive', () => {
    var map: MapComponent,
        control: AttributionControlDirective;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        control = new AttributionControlDirective(map);
    });

    describe('[(position)]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: ControlPosition = 'topright';
            control.position = val;
            expect(control.getPosition()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: ControlPosition = 'topright';
            control.position = val;
            expect(control.position).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: ControlPosition = 'topright';
            control.setPosition(val);
            expect(control.position ).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: ControlPosition = 'topleft';
            control.positionChange.subscribe((eventVal: ControlPosition) => {
                expect(eventVal).to.equal(val);
                done();
            });

            control.position = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: ControlPosition = 'topleft';
            control.positionChange.subscribe((eventVal: ControlPosition) => {
                expect(eventVal).to.equal(val);
                done();
            });

            control.setPosition(val);
        });
    });

    describe('[(prefix)]', () => {
        it('should be set to YAGA by default', () => {
            const html: string = control.getContainer().innerHTML;
            expect(html.indexOf('>YAGA<')).to.not.equal(-1);
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'Attribution-Prefix';
            control.prefix = val;
            expect(control.options.prefix).to.equal(val);
            const html: string = control.getContainer().innerHTML;
            expect(html.indexOf(val)).to.not.equal(-1);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'Attribution-Prefix';
            control.prefix = val;
            expect(control.prefix).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: string = 'Attribution-Prefix';
            control.setPrefix(val);
            expect(control.prefix).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: string = 'Attribution-Prefix';
            control.prefixChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(val);
                done();
            });

            control.prefix = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: string = 'Attribution-Prefix';
            control.prefixChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(val);
                done();
            });

            control.setPrefix(val);
        });
    });

    describe('[opacity]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            control.opacity = val;
            expect(control.getContainer().style.opacity).to.equal(val.toString());
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            control.opacity = val;
            expect(control.opacity).to.equal(val);
        });
    });

    // Events
    describe('(add)', () => {
        it('should fire an event when adding to map', (done: MochaDone) => {
            map.removeControl(control);

            control.addEvent.subscribe(() => {
                done();
            });
            map.addControl(control);
        });
    });
    describe('(remove)', () => {
        it('should fire an event when removing from map', (done: MochaDone) => {
            control.removeEvent.subscribe(() => {
                done();
            });
            map.removeControl(control);
        });
    });

    describe('(click)', () => {
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.clickEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('click'));
        });
    });
    describe('(dbclick)', () => {
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.dbclickEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('dbclick'));
        });
    });
    describe('(mousedown)', () => {
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.mousedownEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('mousedown'));
        });
    });
    describe('(mouseover)', () => {
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.mouseoverEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('mouseover'));
        });
    });
    describe('(mouseout)', () => {
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.mouseoutEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new CustomEvent('mouseout'));
        });
    });

    describe('Destroying a Attribution Control Directive', () => {
        it('should remove Tile-Layer Directive from map on destroy', () => {
            expect(
                control.getContainer().parentElement.parentElement.parentElement
            ).to.equal(map.getContainer());

            control.ngOnDestroy();

            expect(
                control.getContainer() &&
                control.getContainer().parentElement &&
                control.getContainer().parentElement.parentElement &&
                control.getContainer().parentElement.parentElement.parentElement &&
                control.getContainer().parentElement.parentElement.parentElement
            ).to.not.equal(map.getContainer());
        });
    });
});
