import { ZoomControlDirective,
    MapComponent,
    ControlPosition } from './index';
import { point } from 'leaflet';
import { expect } from 'chai';

describe('Zoom-Control Directive', () => {
    let map: MapComponent,
        control: ZoomControlDirective;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        control = new ZoomControlDirective(map);
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

    describe('[zoomInText]', () => {
        const TEST_VALUE: string = 'test-caption';
        it('should be changed in Leaflet when changing in Angular', () => {
            control.zoomInText = TEST_VALUE;
            expect(control.options.zoomInText).to.equal(TEST_VALUE);
            expect((<HTMLElement>(<any>control)._zoomInButton).textContent).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', () => {
            control.zoomInText = TEST_VALUE;
            expect(control.zoomInText).to.equal(TEST_VALUE);
        });
    });
    describe('[zoomOutText]', () => {
        const TEST_VALUE: string = 'test-caption';
        it('should be changed in Leaflet when changing in Angular', () => {
            control.zoomOutText = TEST_VALUE;
            expect(control.options.zoomOutText).to.equal(TEST_VALUE);
            expect((<HTMLElement>(<any>control)._zoomOutButton).textContent).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', () => {
            control.zoomOutText = TEST_VALUE;
            expect(control.zoomOutText).to.equal(TEST_VALUE);
        });
    });

    describe('[zoomInTitle]', () => {
        const TEST_VALUE: string = 'test-caption';
        it('should be changed in Leaflet when changing in Angular', () => {
            control.zoomInTitle = TEST_VALUE;
            expect(control.options.zoomInTitle).to.equal(TEST_VALUE);
            expect((<HTMLElement>(<any>control)._zoomInButton).getAttribute('title')).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', () => {
            control.zoomInTitle = TEST_VALUE;
            expect(control.zoomInTitle).to.equal(TEST_VALUE);
        });
    });
    describe('[zoomOutTitle]', () => {
        const TEST_VALUE: string = 'test-caption';
        it('should be changed in Leaflet when changing in Angular', () => {
            control.zoomOutTitle = TEST_VALUE;
            expect(control.options.zoomOutTitle).to.equal(TEST_VALUE);
            expect((<HTMLElement>(<any>control)._zoomOutButton).getAttribute('title')).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', () => {
            control.zoomOutTitle = TEST_VALUE;
            expect(control.zoomOutTitle).to.equal(TEST_VALUE);
        });
    });

    describe('Destroying a Zoom Control Directive', () => {
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
