import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';
import { AddEditProductPageComponent } from './pages/add-edit-product-page/add-edit-product-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'product-list', component: ProductsListPageComponent },
      { path: 'new-product', component: AddEditProductPageComponent },
      { path: 'edit/:productId', component: AddEditProductPageComponent },
      { path: 'view/:productId', component: ProductPageComponent },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
