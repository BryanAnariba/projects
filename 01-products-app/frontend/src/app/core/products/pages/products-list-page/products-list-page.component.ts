
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/products.interface';
import { delay } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'products-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrl: './products-list-page.component.scss'
})
export class ProductsListPageComponent implements OnInit {
  public isLoading: boolean = false;
  public products: Product[] = [];
  constructor(
    private productService: ProductService,
    private matSnackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts () {
    this.isLoading = true;
    this.productService.getAllProducts()
      .pipe(
        delay(200)
      )
      .subscribe({
        next: (products) => {
          this.isLoading = false;
          this.products = products.products;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  public onDeleteProduct(productId: number) {
    this.productService.deleteProduct(productId)
      .subscribe({
        next: (product => {
          this.matSnackbar.open(`${product.name} Deleted!`, 'Close');
          this.getProducts();
        }),
        error: (error) => {
          this.matSnackbar.open(`${error.error}`, 'Close');
        },
      })
  }
}
