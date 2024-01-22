import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { DOCUMENT } from '@angular/common';
import { take } from 'rxjs';

type RequestInfo = {
  next: string;
}

@Component({
  selector: 'products-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  public products: Product[] = [];
  public isLoading: boolean = false;
  public notFoundProducts: boolean = false;

  // PARA LA PAGINACION
  public showButton: boolean = false;
  private scrollInY: number = 0;
  private scrollTop: number = 0;
  private scrollHeight: number = 500;
  private heighScrollHeight: number = 200;
  private page: number = 1;
  private limit: number = 8;


  constructor (
    private productService: ProductsService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }


  // Services
  public getProducts () {
    this.isLoading = true;
    this.productService.getProducts(this.limit, this.page)
      .pipe(
        //take(1),
      )
      .subscribe({
        next: (products) => {
          if (products.length) {
            this.products = [...this.products, ...products];
          } else {
            this.notFoundProducts = true;
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  // Parte del scroll
  @HostListener('window:scroll')
  public onScroll(): void {
    //console.log('Hey! I am scrolling!');
    this.scrollInY = window.scrollY;
    this.scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (this.scrollInY || this.scrollTop) > this.scrollHeight;
  }

  public resetScroll(): void {
    this.document.body.scrollTop = 0; // Safari
    this.document.documentElement.scrollTop = 0; // All web browsers
  }

  public onScrollDown(): void {
    this.page += 1;
    this.getProducts();
  }
}
