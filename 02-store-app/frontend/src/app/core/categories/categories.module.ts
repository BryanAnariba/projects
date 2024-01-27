import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewCategoryPageComponent } from './pages/new-category-page/new-category-page.component';
import { ItemCategoryComponent } from './components/item-category/item-category.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewCategoryPageComponent,
    ItemCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
