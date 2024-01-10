import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditCategoryPageComponent } from './pages/add-edit-category-page/add-edit-category-page.component';
import { CategoriesListPageComponent } from './pages/categories-list-page/categories-list-page.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutPageComponent,
    AddEditCategoryPageComponent,
    CategoriesListPageComponent,
    CategoryPageComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CategoriesModule { }
