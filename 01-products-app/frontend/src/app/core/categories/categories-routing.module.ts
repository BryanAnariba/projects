import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CategoriesListPageComponent } from './pages/categories-list-page/categories-list-page.component';
import { AddEditCategoryPageComponent } from './pages/add-edit-category-page/add-edit-category-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'category-list', component: CategoriesListPageComponent },
      { path: 'new-category', component: AddEditCategoryPageComponent },
      { path: 'edit/:categoryId', component: AddEditCategoryPageComponent },
      { path: 'view/:categoryId', component: CategoryPageComponent },
      { path: '**', redirectTo: 'list' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
