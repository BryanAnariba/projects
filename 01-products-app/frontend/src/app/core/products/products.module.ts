import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';
import { AddEditProductPageComponent } from './pages/add-edit-product-page/add-edit-product-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ProductsListPageComponent,
    AddEditProductPageComponent,
    ProductPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
