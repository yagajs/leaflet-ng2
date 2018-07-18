import { expect } from "chai";
import { point } from "leaflet";
import {
    AttributionControlDirective,
    ControlPosition,
    LayerGroupProvider,
    MapComponent,
    MapProvider,
} from "./index";
import { randomNumber } from "./spec";

describe("Attribution-Control Directive", () => {
    let map: MapComponent;
    let control: AttributionControlDirective;
    beforeEach(() => {
        map = new MapComponent(
            {nativeElement: document.createElement("div")},
            new LayerGroupProvider(),
            new MapProvider(),
        );
        (map as any)._size = point(100, 100);
        (map as any)._pixelOrigin = point(50, 50);
        control = new AttributionControlDirective({ ref: map });
    });

    describe("[(display)]", () => {
        it("should set DOM container style to display:none when not displaying", () => {
            control.display = false;
            expect(control.getContainer()!.style.display).to.equal("none");
        });
        it("should reset DOM container style when display is true again", () => {
            control.display = false;
            control.display = true;
            expect(control.getContainer()!.style.display).to.not.equal("none");
        });
        it("should set to false by removing from map", (done: Mocha.Done) => {

            control.displayChange.subscribe((val: boolean) => {
                expect(val).to.equal(false);
                expect(control.display).to.equal(false);
                done();
            });

            map.removeControl(control);
        });
        // it.skip("should set to true when adding to map again", (done: Mocha.Done) => {
        //     /* tslint:disable */
        //     control.displayChange.subscribe((x) => { console.log("aslkdnasnldknaskldnlkd ", x); });
        //     map.removeControl(control);
        //     setTimeout(() => {
        //         control.displayChange.subscribe((val: boolean) => {
        //             expect(val).to.equal(true);
        //             expect(control.display).to.equal(true);
        //             done();
        //         });
        //         map.addControl(control);
        //     }, 0);
        // });
    });
    describe("[(position)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: ControlPosition = "topright";
            control.position = val;
            expect(control.getPosition()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: ControlPosition = "topright";
            control.position = val;
            expect(control.position).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: ControlPosition = "topright";
            control.setPosition(val);
            expect(control.position ).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: ControlPosition = "topleft";
            control.positionChange.subscribe((eventVal: ControlPosition) => {
                expect(eventVal).to.equal(val);
                done();
            });

            control.position = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: ControlPosition = "topleft";
            control.positionChange.subscribe((eventVal: ControlPosition) => {
                expect(eventVal).to.equal(val);
                done();
            });

            control.setPosition(val);
        });
    });

    describe("[(prefix)]", () => {
        it("should be set to YAGA | leaflet-ng2 by default", () => {
            const html: string = control.getContainer()!.innerHTML;
            expect(html.indexOf(">YAGA<" + "> | <" + ">leaflet-ng2<")).to.not.equal(-3);
        });
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string = "Attribution-Prefix";
            control.prefix = val;
            expect(control.options.prefix).to.equal(val);
            const html: string = control.getContainer()!.innerHTML;
            expect(html.indexOf(val)).to.not.equal(-1);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string = "Attribution-Prefix";
            control.prefix = val;
            expect(control.prefix).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            const val: string = "Attribution-Prefix";
            control.setPrefix(val);
            expect(control.prefix).to.equal(val);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: string = "Attribution-Prefix";
            control.prefixChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(val);
                done();
            });

            control.prefix = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: string = "Attribution-Prefix";
            control.prefixChange.subscribe((eventVal: string) => {
                expect(eventVal).to.equal(val);
                done();
            });

            control.setPrefix(val);
        });
    });
    describe("[(attributions)]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: string[] = ["first", "second"];
            control.attributions = val;
            expect(Object.keys((control as any)._attributions)).to.deep.equal(val);
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: string[] = ["first", "second"];
            control.attributions = val;
            expect(control.attributions).to.deep.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", () => {
            control.addAttribution("first");
            expect(control.attributions).to.deep.equal(["first"]);
        });
        it("should fire an event when changing in Angular", (done: Mocha.Done) => {
            const val: string[] = ["first", "second"];
            control.attributionsChange.subscribe((eventVal: string[]) => {
                expect(eventVal).to.deep.equal(val);
                done();
            });
            control.attributions = val;
        });
        it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
            const val: string[] = ["first"];
            control.attributionsChange.subscribe((eventVal: ControlPosition) => {
                expect(eventVal).to.deep.equal(val);
                done();
            });

            control.addAttribution("first");
        });
        it("should be changed to a new value", () => {
            control.attributions = ["first"];
            control.attributions = ["second"];
            expect(control.attributions).to.deep.equal(["second"]);
        });
    });
    describe(".removeAllAttributions()", () => {
        it("should emit a event emitter when it is not in silent mode", (done: Mocha.Done) => {
            control.attributionsChange.subscribe((eventVal: string[]) => {
                expect(eventVal).to.deep.equal([]);
                done();
            });
            control.removeAllAttributions();
        });
    });

    describe("[opacity]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber();
            control.opacity = val;
            expect(control.getContainer()!.style.opacity).to.equal(val.toString());
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber();
            control.opacity = val;
            expect(control.opacity).to.equal(val);
        });
    });
    describe("[zIndex]", () => {
        it("should be changed in Leaflet when changing in Angular", () => {
            const val: number = randomNumber(255, 1, 0);
            control.zIndex = val;
            expect(control.getContainer()!.style.zIndex).to.equal(val.toString());
        });
        it("should be changed in Angular when changing in Angular", () => {
            const val: number = randomNumber(255, 1, 0);
            control.zIndex = val;
            expect(control.zIndex).to.equal(val);
        });
    });

    // Events
    describe("(add)", () => {
        it("should fire an event when adding to map", (done: Mocha.Done) => {
            map.removeControl(control);

            control.addEvent.subscribe(() => {
                done();
            });
            map.addControl(control);
        });
    });
    describe("(remove)", () => {
        it("should fire an event when removing from map", (done: Mocha.Done) => {
            control.removeEvent.subscribe(() => {
                done();
            });
            map.removeControl(control);
        });
    });

    describe("(click)", () => {
        it("should fire an event when firing event from DOM", (done: Mocha.Done) => {
            control.clickEvent.subscribe(() => {
                done();
            });
            control.getContainer()!.dispatchEvent(new MouseEvent("click", {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe("(dblclick)", () => {
        it("should fire an event when firing event from DOM", (done: Mocha.Done) => {
            control.dblclickEvent.subscribe(() => {
                done();
            });
            control.getContainer()!.dispatchEvent(new MouseEvent("dblclick", {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe("(mousedown)", () => {
        it("should fire an event when firing event from DOM", (done: Mocha.Done) => {
            control.mousedownEvent.subscribe(() => {
                done();
            });
            control.getContainer()!.dispatchEvent(new MouseEvent("mousedown", {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe("(mouseover)", () => {
        it("should fire an event when firing event from DOM", (done: Mocha.Done) => {
            control.mouseoverEvent.subscribe(() => {
                done();
            });
            control.getContainer()!.dispatchEvent(new MouseEvent("mouseover", {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe("(mouseout)", () => {
        it("should fire an event when firing event from DOM", (done: Mocha.Done) => {
            control.mouseoutEvent.subscribe(() => {
                done();
            });
            control.getContainer()!.dispatchEvent(new MouseEvent("mouseout", {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });

    describe("Destroying a Attribution Control Directive", () => {
        it("should remove Tile-Layer Directive from map on destroy", () => {
            expect(
                control.getContainer()!.parentElement!.parentElement!.parentElement,
            ).to.equal(map.getContainer());

            control.ngOnDestroy();

            expect(
                control.getContainer() &&
                control.getContainer()!.parentElement &&
                control.getContainer()!.parentElement!.parentElement &&
                control.getContainer()!.parentElement!.parentElement!.parentElement,
            ).to.not.equal(map.getContainer());
        });
    });
});
