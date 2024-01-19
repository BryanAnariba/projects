import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { devEnvironments } from '../../../environments/environments.dev';
import { Observable, catchError, map, of } from 'rxjs';
import { Product, ProductResponse } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl: string = devEnvironments.apiUrl;
  private limit: number = 3;
  private page: number = 1;
  private totalProducts: number = 0;

  constructor(private httpClient: HttpClient) { }

  get currentPage() {
    return this.page;
  }

  get currentLimit () {
    return this.limit;
  }

  get currentProducts () {
    return this.totalProducts;
  }

  private resetNavigation (): void {
    this.limit = 3;
    this.page = 1;
  }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<ProductResponse>(`${this.apiUrl}/products?page=${this.currentPage}&limit=${this.currentLimit}`, {})
      .pipe(
        map(
          productResponse => {
            this.limit = productResponse.limit;
            this.page = productResponse.page + 1;
            this.totalProducts = productResponse.totalProducts;
            console.log({currentPage: this.currentPage, currentLimit: this.currentLimit});
            return productResponse.products;
          }
        ),
        catchError(
          error => {
            console.error(error);
            return of([]);
          },
        )
      );
  }
}
