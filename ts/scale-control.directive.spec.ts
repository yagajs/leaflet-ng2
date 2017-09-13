import { expect } from 'chai';
import { point } from 'leaflet';
import {
    ControlPosition,
    MapComponent,
    ScaleControlDirective,
} from './index';

describe('Scale-Control Directive', () => {
    let map: MapComponent;
    let control: ScaleControlDirective;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        control = new ScaleControlDirective(map);
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
            expect(control.position).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: ControlPosition = 'topleft';
            control.positionChange.subscribe((eventVal: ControlPosition) => {
                expect(eventVal).to.equal(val);
                return done();

            });

            control.position = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: ControlPosition = 'topleft';
            control.positionChange.subscribe((eventVal: ControlPosition) => {
                expect(eventVal).to.equal(val);
                return done();

            });

            control.setPosition(val);
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
            control.getContainer().dispatchEvent(new MouseEvent('click', {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe('(dbclick)', () => {
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.dbclickEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new MouseEvent('dbclick', {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe('(mousedown)', () => {
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.mousedownEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new MouseEvent('mousedown', {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe('(mouseover)', () => {
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.mouseoverEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new MouseEvent('mouseover', {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe('(mouseout)', () => {
        it('should fire an event when firing event from DOM', (done: MochaDone) => {
            control.mouseoutEvent.subscribe(() => {
                done();
            });
            control.getContainer().dispatchEvent(new MouseEvent('mouseout', {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
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

    describe('[metric]', () => {
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            control.metric = false;
            expect(control.options.metric).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            control.options.metric = false;
            control.metric = true;
            expect(control.options.metric).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            control.metric = false;
            expect(control.metric).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            control.metric = true;
            expect(control.metric).to.equal(true);
        });
    });
    describe('[imperial]', () => {
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            control.imperial = false;
            expect(control.options.imperial).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            control.options.imperial = false;
            control.imperial = true;
            expect(control.options.imperial).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            control.imperial = false;
            expect(control.imperial).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            control.imperial = true;
            expect(control.imperial).to.equal(true);
        });
    });

    describe('Destroying a Scale Control Directive', () => {
        it('should remove Tile-Layer Directive from map on destroy', () => {
            /* istanbul ignore if */
            if (control.getContainer().parentElement.parentElement.parentElement !== map.getContainer()) {
                throw new Error('The control is not part of the map before destroying');
            }
            control.ngOnDestroy();
            /* istanbul ignore if */
            if (control.getContainer() &&
                control.getContainer().parentElement &&
                control.getContainer().parentElement.parentElement &&
                control.getContainer().parentElement.parentElement.parentElement &&
                control.getContainer().parentElement.parentElement.parentElement === map.getContainer()) {
                throw new Error('The layer is still part of the map after destroying');
            }
        });
    });

});
