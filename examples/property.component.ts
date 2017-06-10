import {
    Component,
    AfterViewInit,
    ElementRef,
    Inject,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule
} from '@angular/forms';
import { Point } from 'leaflet';
import { IExampleProperties } from './app-component-blueprint';

/* tslint:disable:max-line-length */
export const PROPERTIES_WRAPPER: string = `<div class="row">
    <div class="col-md-4">
      <h3>Duplex</h3>
      <example-property *ngFor="let property of properties.duplex" [name]="property.name" [type]="property.type" [(value)]="property.value" [additional]="property.additional"></example-property>
    </div>

    <div class="col-md-4">
      <h3>Output</h3>
      <example-property *ngFor="let property of properties.output" [name]="property.name" [type]="property.type" [value]="property.value" [additional]="property.additional"></example-property>
    </div>

    <div class="col-md-4">
      <h3>Input</h3>
      <example-property *ngFor="let property of properties.input" [name]="property.name" [type]="property.type" [(value)]="property.value" [additional]="property.additional"></example-property>
    </div>
  </div>`;
/* tslint:enable */

@Component({
    selector: 'example-property',
    template: `
<div *ngIf="type === 'text'"  class="input-group">
  <span class="input-group-addon fixed-space">{{ name }}</span>
  <input type="text" class="form-control" [ngModel]="value" (ngModelChange)="valueChange.emit($event)" />
</div>

<div *ngIf="type === 'number'"  class="input-group">
  <span class="input-group-addon fixed-space">{{ name }}</span>
  <input type="number" class="form-control" [ngModel]="value" (ngModelChange)="valueChange.emit($event)" />
</div>

<div *ngIf="type === 'event'"  class="btn-group btn-group-sm">
  <button disabled class="btn" [ngClass]="value ? 'btn-primary': ''">{{ name }}</button>
</div>

<div *ngIf="type === 'checkbox'"  class="input-group input-group-sx">
  <span class="input-group-addon fixed-space">{{ name }}</span>
  <input type="checkbox" class="form-control" [ngModel]="value" (ngModelChange)="valueChange.emit($event)" />
</div>


<div *ngIf="type === 'select'" class="input-group">
  <span class="input-group-addon fixed-space">{{ name }}</span>
  <select  class="form-control" [ngModel]="value" (ngModelChange)="valueChange.emit($event)">
    <option *ngFor="let state of additional.states" [ngValue]="state">
    {{ state }}
    </option>
  </select>
</div>
<div *ngIf="type === 'relative'"  class="input-group input-group-sx">
  <span class="input-group-addon fixed-space">{{ name }}</span>
  <input type="range" min="0" max="1" step="0.05" class="form-control" [ngModel]="value" (ngModelChange)="valueChange.emit($event)" />
</div>

<div *ngIf="type === 'latlng'">

    <div class="input-group input-group-sx">
        <span class="input-group-addon fixed-space">{{ name }}</span>
        <input type="number" class="form-control" [ngModel]="value.lat" (ngModelChange)="updateLat($event)" />
        <input type="number" class="form-control" [ngModel]="value.lng" (ngModelChange)="updateLng($event)" />
    </div>

</div>

<div *ngIf="type === 'point'">
    <div class="input-group input-group-sx">
        <span class="input-group-addon fixed-space">{{ name }}</span>
        <input type="number" class="form-control" [ngModel]="value.x" (ngModelChange)="valueChange.emit(updatePointX($event))" />
        <input type="number" class="form-control" [ngModel]="value.y" (ngModelChange)="valueChange.emit(updatePointY($event))" />
    </div>

</div>

<div *ngIf="type === 'text[]'">

  <div class="input-group input-group-sx">
    <span class="input-group-addon">{{ name }}</span>
  </div>
  <div *ngFor="let entry of value" class="input-group input-group-sx">
    <span class="input-group-addon">{{ value.indexOf(entry) + 1 }}</span>
    <input type="text" class="form-control" [ngModel]="entry" (ngModelChange)="updateInArray($event, entry)" />
    <span class="input-group-btn"><button class="btn btn-danger" (click)="spliceArray(entry)"><span class="fa fa-minus"></span></button></span>
  </div>
  
  <div class="input-group input-group-sx">
    <span class="input-group-addon">*</span>
    <input type="text" class="form-control" placeholder="Add an element to array" [(ngModel)]="addToArrayValue">
    <span class="input-group-btn"><button class="btn btn-success" (click)="addToArray(addToArrayValue)"><span class="fa fa-plus"></span></button></span>
  </div>
   
</div>`
})
export class ExamplePropertyComponent {

    @Output() public valueChange: EventEmitter<any> = new EventEmitter();

    @Input() public name: string;
    @Input() public type: string;
    @Input() public value: any;
    @Input() public additional: any;

    public addToArrayValue: any;

    public addToArray(value: any): void {
        this.value.push(value);
        this.valueChange.emit(this.value);
    }
    public updateInArray(value: any, element: any): void {
        this.value[(<any[]>this.value).indexOf(element)] = value;
        this.valueChange.emit(this.value);
    }
    public spliceArray(element: any): void {
        this.value.splice(this.value.indexOf(element), 1);
        this.valueChange.emit(this.value);
    }

    public updateLat(value: number) {
        this.value.lat = value;
        this.value = this.value.clone();
        this.valueChange.emit(this.value);
    }
    public updateLng(value: number) {
        this.value.lng = value;
        this.value = this.value.clone();
        this.valueChange.emit(this.value);
    }

    public updatePointX(value: number): Point {
        this.value.x = value;
        this.value = this.value.clone();
        return this.value;
    }
    public updatePointY(value: number): Point {
        this.value.y = value;
        this.value = this.value.clone();
        return this.value;
    }

}

@Component({
    selector: 'example-properties',
    template: PROPERTIES_WRAPPER,
})

export class ExamplePropertiesComponent {

    @Output() propertiesChange: EventEmitter<IExampleProperties> = new EventEmitter();
    @Input() properties: IExampleProperties;
}

@Component({
    selector: 'example-header',
    template: `
<header id="top" class="navbar navbar-default navbar-static-top navbar-inverse">
    <div class="container">
        <ul class="nav navbar-nav">
            <a class="navbar-brand" href="https://yagajs.org" data-placement="bottom" title="YAGA">YAGA</a>
            <li class="nav-item nav-link"><a href="https://leaflet-ng2.yagajs.org" title="leaflet-ng2"><span class="fa fa-cube" aria-hidden="true"></span>  leaflet-ng2</a></li>
            <li class="nav-item nav-link"><a href="../../" title="Last release"><span class="fa fa-flag" aria-hidden="true"></span>  Release</a></li>
            <li class="nav-item nav-link"><a href="../" title="YAGA Examples"><span class="fa fa-tv" aria-hidden="true"></span>  Examples</a></li>
            <li class="nav-item nav-link active"><a href="#"><span class="fa fa-stethoscope" aria-hidden="true"></span> {{ title }}</a></li>
        </ul>
    </div>
</header>`
})
export class ExampleHeaderComponent {

    @Input() title: string;
}

@Component({
    selector: 'example-footer',
    template: `
<footer class="footer">
  <div class="container">
    <p class="text-muted">&copy; <a href="https://yagajs.org">YAGA</a> 2017
      <span>
        <a href="https://github.com/yagajs/">GitHub</a>
      </span>
      <span>
        <a href="https://npmjs.org/org/yaga/">NPM</a>
      </span>
    </p>
  </div>
</footer>`
})
export class ExampleFooterComponent {}

@NgModule({
    declarations: [
        ExamplePropertyComponent,
        ExamplePropertiesComponent,
        ExampleHeaderComponent,
        ExampleFooterComponent
    ],
    exports: [
        ExamplePropertyComponent,
        ExamplePropertiesComponent,
        ExampleHeaderComponent,
        ExampleFooterComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class ExamplePropertiesModule { }
