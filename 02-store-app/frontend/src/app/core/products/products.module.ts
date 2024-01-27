import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { SharedModule } from '../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    ProductPageComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
