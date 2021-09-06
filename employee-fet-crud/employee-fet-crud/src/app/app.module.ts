import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddemployeeComponent } from './employee/addemployee/addemployee.component';
import { ListemployeeComponent } from './employee/listemployee/listemployee.component';
import {MaterialModule} from "./material/material.module";
import {EmployeeService} from "./shared/employee.service";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import 'hammerjs';
import { EditemployeeComponent } from './employee/editemployee/editemployee.component';

@NgModule({
  declarations: [
    AppComponent,
    AddemployeeComponent,
    ListemployeeComponent,
    EditemployeeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents:[AddemployeeComponent,EditemployeeComponent],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
