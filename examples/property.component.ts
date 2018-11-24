import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    Output,
    ViewChild,
} from '@angular/core';
import {
    FormsModule,
} from '@angular/forms';
import { CRS, latLng, LatLngBounds, Point } from 'leaflet';
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

/* tslint:disable:max-line-length */
@Component({
    selector: 'example-property',
    template: `
<div *ngIf="type === 'text'"  class="input-group btn-group-sm">
  <div class="input-group-prepend">
    <span class="input-group-text fixed-space">{{ name }}</span>
  </div>
  <input type="text" class="form-control" [ngModel]="value" (ngModelChange)="valueChange.emit($event)" />
</div>

<div *ngIf="type === 'number'"  class="input-group btn-group-sm">
  <div class="input-group-prepend">
    <span class="input-group-text fixed-space">{{ name }}</span>
  </div>
  <input type="number" class="form-control" [ngModel]="value" (ngModelChange)="valueChange.emit($event)" />
</div>

<div *ngIf="type === 'event'"  class="btn-group btn-group-sm">
  <button disabled class="btn" [ngClass]="value ? 'btn-primary': ''">{{ name }}</button>
</div>

<div *ngIf="type === 'checkbox'"  class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text fixed-space">{{ name }}</span>
  </div>
  <input type="checkbox" class="form-control" [ngModel]="value" (ngModelChange)="valueChange.emit($event)" />
</div>

<div *ngIf="type === 'select'" class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text fixed-space">{{ name }}</span>
  </div>
  <select  class="form-control" [ngModel]="value" (ngModelChange)="valueChange.emit($event)">
    <option *ngFor="let state of additional.states" [ngValue]="state">
    {{ state }}
    </option>
  </select>
</div>
<div *ngIf="type === 'relative'"  class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text fixed-space">{{ name }}</span>
  </div>
  <input type="range" min="0" max="1" step="0.05" class="form-control" [ngModel]="value" (ngModelChange)="valueChange.emit($event)" />
</div>

<div *ngIf="type === 'latlng'">
  <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text fixed-space">{{ name }}</span>
    </div>
    <input type="number" class="form-control" [ngModel]="value.lat" (ngModelChange)="valueChange.emit(updateLat($event))" />
    <input type="number" class="form-control" [ngModel]="value.lng" (ngModelChange)="valueChange.emit(updateLng($event))" />
  </div>
</div>

<div *ngIf="type === 'latlngBounds'">
  <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text fixed-space">{{ name }} (SWNE)</span>
    </div>
    <input type="number" class="form-control" [ngModel]="value.getSouth()" (ngModelChange)="valueChange.emit(updateLatLngBoundsSouth($event))" />
    <input type="number" class="form-control" [ngModel]="value.getWest()" (ngModelChange)="valueChange.emit(updateLatLngBoundsWest($event))" />
    <input type="number" class="form-control" [ngModel]="value.getNorth()" (ngModelChange)="valueChange.emit(updateLatLngBoundsNorth($event))" />
    <input type="number" class="form-control" [ngModel]="value.getEast()" (ngModelChange)="valueChange.emit(updateLatLngBoundsEast($event))" />
  </div>
</div>

<div *ngIf="type === 'point'">
  <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text fixed-space">{{ name }}</span>
    </div>
    <input type="number" class="form-control" [ngModel]="value.x" (ngModelChange)="valueChange.emit(updatePointX($event))" />
    <input type="number" class="form-control" [ngModel]="value.y" (ngModelChange)="valueChange.emit(updatePointY($event))" />
  </div>
</div>

<div *ngIf="type === 'crs'">
  <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text fixed-space">{{ name }}</span>
    </div>
    <select [ngModel]="getCRS(value)" (ngModelChange)="valueChange.emit(setCRS($event))">
      <option value="Simple">Simple</option>
      <option value="EPSG3395">EPSG:3395</option>
      <option value="EPSG3857">EPSG:3857</option>
      <option value="EPSG4326">EPSG:4326</option>
    </select>
  </div>
</div>

<div *ngIf="type === 'text[]'">
  <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text fixed-space">{{ name }}</span>
    </div>
  </div>
  <div *ngFor="let entry of value" class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text fixed-space">{{ value.indexOf(entry) + 1 }}</span>
    </div>
    <input type="text" class="form-control" [ngModel]="entry" (ngModelChange)="updateInArray($event, entry)" />
    <span class="input-group-btn"><button class="btn btn-danger" (click)="spliceArray(entry)"><span class="fa fa-minus"></span></button></span>
  </div>
  
  <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text fixed-space">{{ name }}</span>
    </div>
    <input type="text" class="form-control" placeholder="Add an element to array" [(ngModel)]="addToArrayValue">
    <span class="input-group-btn"><button class="btn btn-success" (click)="addToArray(addToArrayValue)"><span class="fa fa-plus"></span></button></span>
  </div>
</div>`,
})
/* tslint:enable */
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
        this.value[(<any[]> this.value).indexOf(element)] = value;
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

    public updateLatLngBoundsSouth(value: number): LatLngBounds {
        this.value = new LatLngBounds(
            latLng(value, (this.value as LatLngBounds).getWest()),
            latLng((this.value as LatLngBounds).getNorth(), (this.value as LatLngBounds).getEast()),
        );
        return this.value;
    }
    public updateLatLngBoundsWest(value: number): LatLngBounds {
        this.value = new LatLngBounds(
            latLng((this.value as LatLngBounds).getSouth(), value),
            latLng((this.value as LatLngBounds).getNorth(), (this.value as LatLngBounds).getEast()),
        );
        return this.value;
    }
    public updateLatLngBoundsNorth(value: number): LatLngBounds {
        this.value = new LatLngBounds(
            latLng((this.value as LatLngBounds).getSouth(), (this.value as LatLngBounds).getWest()),
            latLng(value, (this.value as LatLngBounds).getEast()),
        );
        return this.value;
    }
    public updateLatLngBoundsEast(value: number): LatLngBounds {
        this.value = new LatLngBounds(
            latLng((this.value as LatLngBounds).getSouth(), (this.value as LatLngBounds).getWest()),
            latLng((this.value as LatLngBounds).getNorth(), value),
        );
        return this.value;
    }
    public getCRS(value: CRS): string {
        switch (value) {
            case CRS.EPSG3857:
                return 'EPSG3857';
            case CRS.EPSG3395:
                return 'EPSG3395';
            case CRS.EPSG4326:
                return 'EPSG4326';
            case CRS.Simple:
                return 'Simple';
        }
    }
    public setCRS(value: string): CRS {
        return CRS[value];
    }
}

/* tslint:disable:max-classes-per-file */
@Component({
    selector: 'example-properties',
    template: PROPERTIES_WRAPPER,
})
export class ExamplePropertiesComponent {

    @Output() public propertiesChange: EventEmitter<IExampleProperties> = new EventEmitter();
    @Input() public properties: IExampleProperties;
}

/* tslint:disable:max-line-length max-classes-per-file */
@Component({
    selector: 'example-header',
    template: `

<header role="navigation" class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container">
        <a class="navbar-brand" href="https://yagajs.org">YAGA</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="nav navbar-nav">
                <li class="nav-item nav-link"><a href="https://leaflet-ng2.yagajs.org" title="leaflet-ng2" class="nav-link"><span class="fa fa-cube" aria-hidden="true"></span>  leaflet-ng2</a></li>
                <li class="nav-item nav-link"><a href="../../" title="Last release" class="nav-link"><span class="fa fa-flag" aria-hidden="true"></span>  Release</a></li>
                <li class="nav-item nav-link active"><a href="../" title="YAGA Examples" class="nav-link"><span class="fa fa-tv" aria-hidden="true"></span> Examples</a></li>
                <li class="nav-item nav-link active"><a href="#" class="nav-link"><span class="fa fa-stethoscope" aria-hidden="true"></span> {{ title }}</a></li>
            </ul>
        </div>
    </div>
</header>`,
})
export class ExampleHeaderComponent {

    @Input() public title: string;
}
/* tslint:enable */

/* tslint:disable:max-line-length max-classes-per-file */
@Component({
    selector: 'example-footer',
    template: `
<footer class="footer">
  <div class="container">
    <p class="text-muted">&copy; <a href="https://yagajs.org">YAGA</a> 2018. Links:
      <span>
        <a href="https://github.com/yagajs/">GitHub</a>
      </span>
      <span>
        <a href="https://npmjs.org/org/yaga/">NPM</a>
      </span>
    </p>
  </div>
</footer>`,
})
export class ExampleFooterComponent {}

@NgModule({
    declarations: [
        ExamplePropertyComponent,
        ExamplePropertiesComponent,
        ExampleHeaderComponent,
        ExampleFooterComponent,
    ],
    exports: [
        ExamplePropertyComponent,
        ExamplePropertiesComponent,
        ExampleHeaderComponent,
        ExampleFooterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class ExamplePropertiesModule { }
