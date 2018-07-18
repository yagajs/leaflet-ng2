import { expect } from "chai";
import { point, SVG } from "leaflet";
import {
    FillRule,
    LayerGroupProvider,
    LineCapShape,
    LineJoinShape,
    MapComponent,
    MapProvider,
    PathOptions,
} from "./index";
import { randomNumber } from "./spec";

/**
 * Basic test for all path layers
 * @private
 */
export function createPathTests(Constr: any): void {
    describe("Path compatibility tests", () => {
        let map: MapComponent;
        let layer: any;
        beforeEach(() => {
            map = new MapComponent(
                {nativeElement: document.createElement("div")},
                new LayerGroupProvider(),
                new MapProvider(),
            );
            (map as any)._size = point(100, 100);
            (map as any)._pixelOrigin = point(50, 50);
            (map as any)._renderer = (map as any)._renderer || new SVG();

            layer = new Constr({ ref: map }, {});
        });
        describe("[(display)]", () => {
            it("should remove DOM container when not displaying", () => {
                layer.display = false;
                expect(layer.getElement().style.display).to.equal("none");
            });
            it("should re-add DOM container when display is true again", () => {
                layer.display = false;
                layer.display = true;

                expect(layer.getElement().style.display).not.equal("none");
            });
            it("should set to false by removing from map", (done: Mocha.Done) => {

                layer.displayChange.subscribe((val: boolean) => {
                    expect(val).to.equal(false);
                    expect(layer.display).to.equal(false);
                    done();
                });

                map.removeLayer(layer);
            });
            it("should set to true when adding to map again", (done: Mocha.Done) => {
                map.removeLayer(layer);
                layer.displayChange.subscribe((val: boolean) => {
                    expect(val).to.equal(true);
                    expect(layer.display).to.equal(true);
                    done();
                });

                map.addLayer(layer);
            });
        });
        describe("[(color)]", () => {
            const TEST_VALUE: string = "#123456";
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.color = TEST_VALUE;
                expect(layer.options.color).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.color = TEST_VALUE;
                expect(layer.color).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                layer.setStyle({color: TEST_VALUE});
                expect(layer.color).to.equal(TEST_VALUE);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.colorChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.color = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.colorChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.setStyle({color: TEST_VALUE });
            });
        });
        describe("[(lineCap)]", () => {
            const TEST_VALUE: LineCapShape = "butt";
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.lineCap = TEST_VALUE;
                expect(layer.options.lineCap).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.lineCap = TEST_VALUE;
                expect(layer.lineCap).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                layer.setStyle({lineCap: TEST_VALUE});
                expect(layer.lineCap).to.equal(TEST_VALUE);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.lineCapChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.lineCap = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.lineCap = TEST_VALUE;
                layer.lineCapChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.setStyle({lineCap: TEST_VALUE });
            });
        });
        describe("[(lineJoin)]", () => {
            const TEST_VALUE: LineJoinShape = "bevel";
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.lineJoin = TEST_VALUE;
                expect(layer.options.lineJoin).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.lineJoin = TEST_VALUE;
                expect(layer.lineJoin).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                layer.setStyle({lineJoin: TEST_VALUE});
                expect(layer.lineJoin).to.equal(TEST_VALUE);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.lineJoinChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.lineJoin = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.lineJoin = TEST_VALUE;
                layer.lineJoinChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.setStyle({lineJoin: TEST_VALUE });
            });
        });
        describe("[(dashArray)]", () => {
            const TEST_VALUE: string = "1, 2";
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.dashArray = TEST_VALUE;
                expect(layer.options.dashArray).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.dashArray = TEST_VALUE;
                expect(layer.dashArray).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                layer.setStyle({dashArray: TEST_VALUE});
                expect(layer.dashArray).to.equal(TEST_VALUE);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.dashArrayChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.dashArray = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.dashArray = TEST_VALUE;
                layer.dashArrayChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.setStyle({dashArray: TEST_VALUE });
            });
        });
        describe("[(dashOffset)]", () => {
            const TEST_VALUE: string = "7px";
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.dashOffset = TEST_VALUE;
                expect(layer.options.dashOffset).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.dashOffset = TEST_VALUE;
                expect(layer.dashOffset).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                layer.setStyle({dashOffset: TEST_VALUE});
                expect(layer.dashOffset).to.equal(TEST_VALUE);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.dashOffsetChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.dashOffset = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.dashOffset = TEST_VALUE;
                layer.dashOffsetChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.setStyle({dashOffset: TEST_VALUE });
            });
        });
        describe("[(fillColor)]", () => {
            const TEST_VALUE: string = "#123456";
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.fillColor = TEST_VALUE;
                expect(layer.options.fillColor).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.fillColor = TEST_VALUE;
                expect(layer.fillColor).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                layer.setStyle({fillColor: TEST_VALUE});
                expect(layer.fillColor).to.equal(TEST_VALUE);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.fillColorChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.fillColor = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.fillColor = TEST_VALUE;
                layer.fillColorChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.setStyle({fillColor: TEST_VALUE });
            });
        });
        describe("[(fillRule)]", () => {
            const TEST_VALUE: FillRule = "nonzero";
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.fillRule = TEST_VALUE;
                expect(layer.options.fillRule).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.fillRule = TEST_VALUE;
                expect(layer.fillRule).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                layer.setStyle({fillRule: TEST_VALUE});
                expect(layer.fillRule).to.equal(TEST_VALUE);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.fillRuleChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.fillRule = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.fillRule = TEST_VALUE;
                layer.fillRuleChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.setStyle({fillRule: TEST_VALUE });
            });
        });
        describe("[(className)]", () => {
            const TEST_VALUE: string = "testclass";
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.className = TEST_VALUE;
                expect(layer.options.className).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.className = TEST_VALUE;
                expect(layer.className).to.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                layer.setStyle({className: TEST_VALUE});
                expect(layer.className).to.equal(TEST_VALUE);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                layer.classNameChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.className = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                layer.className = TEST_VALUE;
                layer.classNameChange.subscribe((eventVal: string) => {
                    expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });

                layer.setStyle({className: TEST_VALUE });
            });
        });
        describe("[(opacity)]", () => {
            it("should be changed in Leaflet when changing in Angular", () => {
                const val: number = randomNumber();
                layer.opacity = val;
                expect(layer.options.opacity).to.equal(val);
            });
            it("should be changed in Angular when changing in Angular", () => {
                const val: number = randomNumber();
                layer.opacity = val;
                expect(layer.opacity).to.equal(val);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                const val: number = randomNumber();
                layer.setStyle({opacity: val});
                expect(layer.opacity).to.equal(val);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                const val: number = randomNumber();

                layer.opacityChange.subscribe((eventVal: number) => {
                    expect(eventVal).to.equal(val);
                    return done();
                });

                layer.opacity = val;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                const val: number = randomNumber();

                layer.opacityChange.subscribe((eventVal: number) => {
                    expect(eventVal).to.equal(val);
                    return done();
                });

                layer.setStyle({opacity: val});
            });
        });
        describe("[(weight)]", () => {
            it("should be changed in Leaflet when changing in Angular", () => {
                const val: number = randomNumber(10, 0, 0);
                layer.weight = val;
                expect(layer.options.weight).to.equal(val);
            });
            it("should be changed in Angular when changing in Angular", () => {
                const val: number = randomNumber(10, 0, 0);
                layer.weight = val;
                expect(layer.weight).to.equal(val);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                const val: number = randomNumber(10, 0, 0);
                layer.setStyle({weight: val});
                expect(layer.weight).to.equal(val);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                const val: number = randomNumber(10, 0, 0);

                layer.weightChange.subscribe((eventVal: number) => {
                    expect(eventVal).to.equal(val);
                    return done();
                });

                layer.weight = val;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                const val: number = randomNumber(10, 0, 0);

                layer.weightChange.subscribe((eventVal: number) => {
                    expect(eventVal).to.equal(val);
                    return done();
                });

                layer.setStyle({weight: val});
            });
        });
        describe("[(fillOpacity)]", () => {
            it("should be changed in Leaflet when changing in Angular", () => {
                const val: number = randomNumber();
                layer.fillOpacity = val;
                expect(layer.options.fillOpacity).to.equal(val);
            });
            it("should be changed in Angular when changing in Angular", () => {
                const val: number = randomNumber();
                layer.fillOpacity = val;
                expect(layer.fillOpacity).to.equal(val);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                const val: number = randomNumber();
                layer.setStyle({fillOpacity: val});
                expect(layer.fillOpacity).to.equal(val);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                const val: number = randomNumber();

                layer.fillOpacityChange.subscribe((eventVal: number) => {
                    expect(eventVal).to.equal(val);
                    return done();
                });

                layer.fillOpacity = val;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                const val: number = randomNumber();

                layer.fillOpacityChange.subscribe((eventVal: number) => {
                    expect(eventVal).to.equal(val);
                    return done();
                });

                layer.setStyle({fillOpacity: val});
            });
        });

        describe("[(stroke)]", () => {
            it("should be changed in Leaflet when changing in Angular to false", () => {
                const val: boolean = false;
                layer.stroke = val;
                expect(layer.options.stroke).to.equal(val);
            });
            it("should be changed in Leaflet when changing in Angular to true", () => {
                layer.options.stroke = false;
                const val: boolean = true;
                layer.stroke = val;
                expect(layer.stroke).to.equal(val);
            });
            it("should be changed in Angular when changing in Angular to false", () => {
                const val: boolean = false;
                layer.stroke = val;
                expect(layer.stroke).to.equal(val);
            });
            it("should be changed in Angular when changing in Angular to true", () => {
                layer.options.stroke = false;
                const val: boolean = true;
                layer.stroke = val;
                expect(layer.stroke).to.equal(val);
            });
            it("should be changed in Angular when changing in Leaflet to false", () => {
                const val: boolean = false;
                layer.setStyle({stroke: val});
                expect(layer.stroke).to.equal(val);
            });
            it("should be changed in Angular when changing in Leaflet to true", () => {
                layer.options.stroke = false;
                const val: boolean = true;
                layer.setStyle({stroke: val});
                expect(layer.stroke).to.equal(val);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                const val: boolean = false;

                layer.strokeChange.subscribe((eventVal: boolean) => {
                    expect(eventVal).to.equal(val);
                    return done();
                });

                layer.stroke = val;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                const val: boolean = false;

                layer.strokeChange.subscribe((eventVal: boolean) => {
                    expect(eventVal).to.equal(val);
                    return done();
                });

                layer.setStyle({stroke: val});
            });
        });
        describe("[(fill)]", () => {
            it("should be changed in Leaflet when changing in Angular to false", () => {
                const val: boolean = false;
                layer.fill = val;
                expect(layer.options.fill).to.equal(val);
            });
            it("should be changed in Leaflet when changing in Angular to true", () => {
                layer.options.fill = false;
                const val: boolean = true;
                layer.fill = val;
                expect(layer.fill).to.equal(val);
            });
            it("should be changed in Angular when changing in Angular to false", () => {
                const val: boolean = false;
                layer.fill = val;
                expect(layer.fill).to.equal(val);
            });
            it("should be changed in Angular when changing in Angular to true", () => {
                layer.options.fill = false;
                const val: boolean = true;
                layer.fill = val;
                expect(layer.fill).to.equal(val);
            });
            it("should be changed in Angular when changing in Leaflet to false", () => {
                const val: boolean = false;
                layer.setStyle({fill: val});
                expect(layer.fill).to.equal(val);
            });
            it("should be changed in Angular when changing in Leaflet to true", () => {
                layer.options.fill = false;
                const val: boolean = true;
                layer.setStyle({fill: val});
                expect(layer.fill).to.equal(val);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                const val: boolean = false;

                layer.fillChange.subscribe((eventVal: boolean) => {
                    expect(eventVal).to.equal(val);
                    return done();
                });

                layer.fill = val;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                const val: boolean = false;

                layer.fillChange.subscribe((eventVal: boolean) => {
                    expect(eventVal).to.equal(val);
                    return done();
                });

                layer.setStyle({fill: val});
            });
        });

        describe("[(style)]", () => {
            const TEST_VALUE: PathOptions = {opacity: 0.5, weight: 3, dashArray: "1, 2"};
            it("should be changed in Leaflet when changing in Angular", () => {
                layer.style = TEST_VALUE;
                expect(layer.options.opacity).to.equal(TEST_VALUE.opacity);
            });
            it("should be changed in Angular when changing in Angular", () => {
                layer.style = TEST_VALUE;
                expect(layer.style.opacity).to.equal(TEST_VALUE.opacity);
            });
            it("should be changed in Angular when changing in Leaflet", () => {
                layer.setStyle(TEST_VALUE);
                expect(layer.style.opacity).to.equal(TEST_VALUE.opacity);
            });
            it("should fire an event when changing in Angular", (done: Mocha.Done) => {
                Promise.all([
                    new Promise<void> ((fulfill, reject) => {
                        layer.styleChange.subscribe((eventVal: PathOptions) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE) {
                                return reject(new Error("Received wrong value"));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void> ((fulfill, reject) => {
                        layer.opacityChange.subscribe((eventVal: number) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.opacity) {
                                return reject(new Error("Received wrong value"));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void> ((fulfill, reject) => {
                        layer.weightChange.subscribe((eventVal: number) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.weight) {
                                return reject(new Error("Received wrong value"));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void> ((fulfill, reject) => {
                        layer.dashArrayChange.subscribe((eventVal: string) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.dashArray) {
                                return reject(new Error("Received wrong value"));
                            }
                            return fulfill();
                        });
                    }),
                ]).then(() => { done(); }).catch(done);

                layer.style = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", (done: Mocha.Done) => {
                Promise.all([
                    new Promise<void> ((fulfill, reject) => {
                        layer.styleChange.subscribe((eventVal: PathOptions) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE) {
                                return reject(new Error("Received wrong value"));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void> ((fulfill, reject) => {
                        layer.opacityChange.subscribe((eventVal: number) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.opacity) {
                                return reject(new Error("Received wrong value"));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void> ((fulfill, reject) => {
                        layer.weightChange.subscribe((eventVal: number) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.weight) {
                                return reject(new Error("Received wrong value"));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise<void> ((fulfill, reject) => {
                        layer.dashArrayChange.subscribe((eventVal: string) => {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.dashArray) {
                                return reject(new Error("Received wrong value"));
                            }
                            return fulfill();
                        });
                    }),
                ]).then(() => { done(); }).catch(done);

                layer.setStyle(TEST_VALUE);
            });
        });

        // Events
        describe("(add)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.addEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("add", testEvent);
            });
        });
        describe("(remove)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.removeEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("remove", testEvent);
            });
        });
        describe("(popupopen)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.popupopenEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("popupopen", testEvent);
            });
        });
        describe("(popupclose)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.popupcloseEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("popupclose", testEvent);
            });
        });
        describe("(tooltipopen)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.tooltipopenEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("tooltipopen", testEvent);
            });
        });
        describe("(tooltipclose)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.tooltipcloseEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("tooltipclose", testEvent);
            });
        });
        describe("(click)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.clickEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("click", testEvent);
            });
        });
        describe("(dblclick)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.dblclickEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("dblclick", testEvent);
            });
        });
        describe("(mousedown)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.mousedownEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("mousedown", testEvent);
            });
        });
        describe("(mouseover)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.mouseoverEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("mouseover", testEvent);
            });
        });
        describe("(mouseout)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.mouseoutEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("mouseout", testEvent);
            });
        });
        describe("(contextmenu)", () => {
            it("should fire event in Angular when firing event in Leaflet", (done: Mocha.Done) => {
                const testHandle: any = {};
                const testEvent: any = { testHandle };
                layer.contextmenuEvent.subscribe((event: any) => {
                    expect(event.testHandle).to.equal(testEvent.testHandle);
                    return done();
                });
                layer.fire("contextmenu", testEvent);
            });
        });

        describe("[interactive]", () => {
            it("should be changed to false in Leaflet when changing in Angular to false", () => {
                layer.interactive = false;
                expect(layer.options.interactive).to.equal(false);
            });
            it("should be changed to true in Leaflet when changing in Angular to true", () => {
                layer.options.interactive = false;
                layer.interactive = true;
                expect(layer.options.interactive).to.equal(true);
            });
            it("should be changed in Angular to false when changing in Angular to false", () => {
                layer.interactive = false;
                expect(layer.interactive).to.equal(false);
            });
            it("should be changed in Angular to true when changing in Angular to true", () => {
                layer.interactive = true;
                expect(layer.interactive).to.equal(true);
            });
        });
    });
}
