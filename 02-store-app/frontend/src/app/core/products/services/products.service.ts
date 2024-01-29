import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { devEnvironments } from '../../../environments/environments.dev';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Category, Product, ProductResponse } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl: string = devEnvironments.apiUrl;
  private limit: number = 4;
  private page: number = 1;
  private totalProducts: number = 0;
  
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getProducts(limit: number = 3, page: number = 1): Observable<Product[]> {
    return this.httpClient.get<ProductResponse>(`${this.apiUrl}/products?page=${page}&limit=${limit}`, {})
      .pipe(
        map(
          productResponse => {
            this.totalProducts = productResponse.totalProducts;
            this.limit = limit;
            this.page += 1;
            return productResponse.products;
          }
        ),
        catchError(
          error => {
            console.log({error});
            return of([]);
          }
        )
      )
  }

  public createProduct(product: Product): Observable<Category> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('stock', product.stock.toString());
    formData.append('image', product.image);
    formData.append('isAvaliable', 'true');
    formData.append('categoryId', product.categoryId);
    return this.httpClient.post<Category>(`${this.apiUrl}/products`, formData);
  }
}