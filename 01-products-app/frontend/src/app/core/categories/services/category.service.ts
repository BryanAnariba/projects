import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories, Category } from '../interfaces/category.interface';
import { Observable, catchError, of, tap } from 'rxjs';

const apiUrl: string = 'http://localhost:3500/api';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  public getAllCategories (): Observable<Categories> {
    return this.httpClient.get<Categories>(`${apiUrl}/categories`, {});
  }

  public getCategory (categoryId: number): Observable<Category | null> {
    return this.httpClient.get<Category | null>(`${apiUrl}/categories/${categoryId}`, {})
    .pipe(
      tap(category => {
        console.log('Founded: ' + category);
      }),
      catchError(
        error => {
          //console.log(error);
          return of(null);
      }),
    );
  }

  public createCategory (category: Category): Observable<Category | null> {
    return this.httpClient.post<Category | null>(`${apiUrl}/categories`, category);
  }

  public updateCategory (category: Category) {
    return this.httpClient.put<Category>(`${apiUrl}/categories/${category.id}`, category);
  }

  public deleteCategory (categoryId: number) {
    return this.httpClient.delete<Category>(`${apiUrl}/categories/${categoryId}`, {});
  }
}
