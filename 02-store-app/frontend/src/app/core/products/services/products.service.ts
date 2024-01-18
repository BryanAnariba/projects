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
  protected limit: number = 10;
  protected page: number = 1;
  protected totalProducts: number = 0;

  
  constructor(private httpClient: HttpClient) { }

  public getProducts(page: number = 1, limit: number = 10): Observable<Product[]> {
    return this.httpClient.get<ProductResponse>(`${this.apiUrl}/products`, {})
      .pipe(
        map(
          productResponse => {
            this.limit = productResponse.limit;
            this.page = productResponse.page;
            this.totalProducts = productResponse.totalProducts;
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
