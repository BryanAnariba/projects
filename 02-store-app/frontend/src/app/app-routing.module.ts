import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () => import('./core/users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./core/categories/categories.module').then(m => m.CategoriesModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./core/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'orders',
    loadChildren: () => import('./core/orders/orders.module').then(m => m.OrdersModule),
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
