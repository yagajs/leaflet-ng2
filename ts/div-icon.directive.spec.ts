import { DivIconDirective,
    MapComponent,
    Point,
    Event } from './index';
import { point } from 'leaflet';
import { expect } from 'chai';

describe('DivIcon Directive', () => {

    let map: MapComponent,
        icon: DivIconDirective;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        icon = new DivIconDirective({nativeElement: document.createElement('div')});
    });

    // Events
    describe('(update)', () => {
        it('should fire event in Angular when changing', (done: MochaDone) => {
            icon.updateEvent.subscribe((event: any) => {
                expect(event.target).to.equal(icon);
                return done();
            });
            icon.iconAnchor = point(1, 2);
        });
    });

    // Inputs
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
            expect(icon.options.iconAnchor).to.equal(val);
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
            expect(icon.options.popupAnchor).to.equal(val);
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
});
