import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    LoadingComponent,
  ]
})
export class SharedModule { }
