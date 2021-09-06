import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";


@NgModule({
  declarations: [],
  imports: [
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatTableModule,
    Material.MatSortModule,
    Material.MatPaginatorModule,
    Material.MatDialogModule,
    Material.MatIconModule
  ],
  exports:[
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatTableModule,
    Material.MatSortModule,
    Material.MatPaginatorModule,
    Material.MatDialogModule,
    Material.MatIconModule
  ]
})
export class MaterialModule { }
