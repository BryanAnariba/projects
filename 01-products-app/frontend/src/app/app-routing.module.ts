import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';


const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./core/categories/categories.module').then(m => m.CategoriesModule),
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () => import('./core/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'not-found',
    component: NotfoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
