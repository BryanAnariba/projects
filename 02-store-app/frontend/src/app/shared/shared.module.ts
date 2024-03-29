import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LazyImageLoadingComponent } from './components/lazy-image-loading/lazy-image-loading.component';
import { RouterModule } from '@angular/router';
import { SearchByComponent } from './components/search-by/search-by.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    LoadingComponent,
    LazyImageLoadingComponent,
    SearchByComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    LoadingComponent,
    LazyImageLoadingComponent,
    SearchByComponent,
  ]
})
export class SharedModule { }
