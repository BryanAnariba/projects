import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'products-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  public products: Product[] = [];
  public isLoading: boolean = false;
  public showButton: boolean = false;
  private scrollHeight: number = 500;

  ngOnInit(): void {
    this.getProducts();
  }

  constructor (
    private productService: ProductsService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  public getProducts () {
    this.isLoading = true;
    this.productService.getProducts()
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  public resetScroll(): void {
    this.document.documentElement.scrollTop = 0;
  }

  @HostListener('window:scroll')
  public onWindowsScroll(): void {
    //console.log('Hey! I am scrolling!');
    const scrollInY = window.scrollY;
    const scrollTop = this.document.documentElement.scrollTop;

    this.showButton = (scrollInY || scrollTop) > this.scrollHeight;
  }
}
