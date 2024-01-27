import { Injectable, Query } from '@angular/core';
import { devEnvironments } from '../../../environments/environments.dev';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Category, CategoryResponse } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = devEnvironments.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getCategories (page: number = 1, limit: number = 10): Observable<CategoryResponse> {
    return this.httpClient.get<CategoryResponse>(`${this.apiUrl}/categories?page=${page}&limit=${limit}`, {})
      .pipe(
        map(
          categoryResponse => {
            return categoryResponse;
          }
        )
      );
  }

  public getCategory (categoryId: string): Observable<Category | null> {
    return this.httpClient.get<Category | null>(`${this.apiUrl}/categories/${categoryId}`, {})
      .pipe(
        catchError(
          error => {
            console.log(error);
            return of(null);
          }
        )
      )
  }

  public getCategoryByName (query: string): Observable<CategoryResponse> {
    return this.httpClient.get<CategoryResponse>(`${this.apiUrl}/categories/search-by?${query}`, {});
  }
}
