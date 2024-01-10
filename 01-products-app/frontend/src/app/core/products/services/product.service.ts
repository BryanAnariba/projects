import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Product, Products } from '../interfaces/products.interface';

const apiUrl: string = 'http://localhost:3500/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public getAllProducts (): Observable<Products> {
    return this.httpClient.get<Products>(`${apiUrl}/products`, {})
    .pipe(
      tap(
        products => {
          console.log(products);
        }
      )
    )
  }

  public createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${apiUrl}/products`, product);
  }

  public getProduct(productId: number): Observable<Product | null> {
    return this.httpClient.get<Product | null>(`${apiUrl}/products/${productId}`, {})
    .pipe(
      catchError(
        (error) => {
          console.log(error);
          return of(null)
        }
      )
    );
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${apiUrl}/products/${product.id}`, product);
  }

  public deleteProduct(productId: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${apiUrl}/products/${productId}`, {});
  }
}
