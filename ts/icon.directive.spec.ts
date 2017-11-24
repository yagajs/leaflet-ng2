import { expect } from 'chai';
import { point } from 'leaflet';
import {
    IconDirective,
    LeafletEvent,
    MapComponent,
    Point,
    TRANSPARENT_PIXEL,
    YagaLayerGroup,
} from './index';
import { randomNumber } from './spec';

describe('Icon Directive', () => {
    let map: MapComponent;
    let icon: IconDirective;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')}, new YagaLayerGroup());
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
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
    describe('[className]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'any-class';
            icon.className = val;
            expect(icon.options.className).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'any-class';
            icon.className = val;
            expect(icon.className).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: string = 'any-class';
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.className = val;
        });
    });
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
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.iconUrl = val;
        });
    });
    describe('[iconRetinaUrl]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.iconRetinaUrl = val;
            expect(icon.options.iconRetinaUrl).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.iconRetinaUrl = val;
            expect(icon.iconRetinaUrl).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: string = TRANSPARENT_PIXEL;
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.iconRetinaUrl = val;
        });
    });
    describe('[iconSize]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(randomNumber(10, 1, 0), randomNumber(10, 1, 0));
            icon.iconSize = val;
            expect(icon.options.iconSize).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(randomNumber(10, 1, 0), randomNumber(10, 1, 0));
            icon.iconSize = val;
            expect(icon.iconSize).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(randomNumber(10, 1, 0), randomNumber(10, 1, 0));
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.iconSize = val;
        });
    });
    describe('[iconAnchor]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.iconAnchor = val;
            expect(icon.iconAnchor).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.iconAnchor = val;
            expect(icon.iconAnchor).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.iconAnchor = val;
        });
    });
    describe('[popupAnchor]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.popupAnchor = val;
            /* istanbul ignore if */
            if (icon.options.popupAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.options.popupAnchor }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.popupAnchor = val;
            expect(icon.popupAnchor).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.popupAnchor = val;
        });
    });
    // We have to wait for adding the definition for tooltipAnchor
    // see: https://github.com/yagajs/leaflet-ng2/issues/220#issuecomment-307634276
    //
    // describe('[tooltipAnchor]', () => {
    //     it('should be changed in Leaflet when changing in Angular', () => {
    //         const val: Point = point(randomNumber(010, 1, 0), randomNumber(100, 1, 0));
    //         icon.tooltipAnchor = val;
    //         /* istanbul ignore if */
    //         if (icon.options.tooltipAnchor !== val) {
    //             throw new Error(`Wrong value setted: ${ val } != ${ icon.options.tooltipAnchor }`);
    //         }
    //     });
    //     it('should be changed in Angular when changing in Angular', () => {
    //         const val: Point = point(randomNumber(010, 1, 0), randomNumber(100, 1, 0));
    //         icon.tooltipAnchor = val;
    //         expect(icon.tooltipAnchor).to.equal(val);
    //     });
    //     it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
    //         const val: Point = point(randomNumber(010, 1, 0), randomNumber(100, 1, 0));
    //         icon.updateEvent.subscribe((ev: LeafletEvent) => {
    //             expect(ev.target).to.equal(icon);
    //             return done();
    //         });
    //         icon.tooltipAnchor = val;
    //     });
    // });
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
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.shadowUrl = val;
        });
    });
    describe('[shadowRetinaUrl]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.shadowRetinaUrl = val;
            expect(icon.options.shadowRetinaUrl).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.shadowRetinaUrl = val;
            expect(icon.shadowRetinaUrl).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: string = TRANSPARENT_PIXEL;
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.shadowRetinaUrl = val;
        });
    });
    describe('[shadowSize]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.shadowSize = val;
            expect(icon.options.shadowSize).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.shadowSize = val;
            expect(icon.shadowSize).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.shadowSize = val;
        });
    });
    describe('[shadowAnchor]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.shadowAnchor = val;
            expect(icon.options.shadowAnchor).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.shadowAnchor = val;
            expect(icon.shadowAnchor).to.equal(val);
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(randomNumber(100, 1, 0), randomNumber(100, 1, 0));
            icon.updateEvent.subscribe((ev: LeafletEvent) => {
                expect(ev.target).to.equal(icon);
                return done();
            });
            icon.shadowAnchor = val;
        });
    });
});
