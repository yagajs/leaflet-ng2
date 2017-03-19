import { expect } from 'chai';
import { point } from 'leaflet';
import {
    Event,
    IconDirective,
    MapComponent,
    Point,
    TRANSPARENT_PIXEL,
} from './index';

describe('Icon Directive', () => {
    let map: MapComponent;
    let icon: IconDirective;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any> map)._size = point(100, 100);
        (<any> map)._pixelOrigin = point(50, 50);
        icon = new IconDirective();
    });

    // Events
    describe('(update)', () => {
        it('should fire event in Angular when changing', (done: MochaDone) => {
            icon.updateEvent.subscribe((event: any) => {
                expect(event.target).to.equal(icon);
                /* istanbul ignore if */
                if (event.target !== icon) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            icon.iconUrl = TRANSPARENT_PIXEL;
        });
    });

    // Inputs
    describe('[iconUrl]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.iconUrl = val;
            expect(icon.options.iconUrl).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.iconUrl = val;
            expect(icon.iconUrl).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: string = TRANSPARENT_PIXEL;
            icon.updateEvent.subscribe((ev: Event) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.iconUrl = val;
        });
    });
    describe('[iconSize]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconSize = val;
            expect(icon.options.iconSize).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconSize = val;
            expect(icon.iconSize).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.iconSize = val;
        });
    });
    describe('[iconAnchor]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconAnchor = val;
            expect(icon.iconAnchor).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconAnchor = val;
            expect(icon.iconAnchor).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.iconAnchor = val;
        });
    });
    describe('[popupAnchor]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.popupAnchor = val;
            /* istanbul ignore if */
            if (icon.options.popupAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.options.popupAnchor }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.popupAnchor = val;
            expect(icon.popupAnchor).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.popupAnchor = val;
        });
    });
    describe('[shadowUrl]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.shadowUrl = val;
            expect(icon.options.shadowUrl).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.shadowUrl = val;
            expect(icon.shadowUrl).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: string = TRANSPARENT_PIXEL;
            icon.updateEvent.subscribe((ev: Event) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.shadowUrl = val;
        });
    });
    describe('[shadowSize]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.shadowSize = val;
            expect(icon.options.shadowSize).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.shadowSize = val;
            expect(icon.shadowSize).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.shadowSize = val;
        });
    });
    describe('[shadowAnchor]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.shadowAnchor = val;
            expect(icon.options.shadowAnchor).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.shadowAnchor = val;
            expect(icon.shadowAnchor).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.shadowAnchor = val;
        });
    });
});
