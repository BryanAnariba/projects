import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'products-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  private products: Product[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  constructor (private productService: ProductsService) {}

  public getProducts () {
    this.productService.getProducts()
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
