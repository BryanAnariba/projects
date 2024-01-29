import { Injectable } from '@angular/core';
import { devEnvironments } from '../../../environments/environments.dev';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Category, CategoryResponse } from '../interfaces/category.interface';

export enum NextOrPrevius {
  NEXT,
  PREVIUS,
  CURRENT,
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = devEnvironments.apiUrl;
  public categories: Category[] = [];
  private limit: number = 10;
  private page: number = 1;
  public previusPage: string | null = null;
  private totalCategories: number = 0;

  constructor(private httpClient: HttpClient) { }

  get currentCategoryList() {
    return this.categories;
  }

  get currentPreviusPage (): string | null {
    return this.previusPage;
  }

  get currentLimit (): number {
    return this.limit;
  }

  get currentPage (): number {
    return this.page;
  }

  get currentTotalCategories (): number {
    return this.totalCategories;
  }

  public getCategories (page: number,limit: number): Observable<CategoryResponse> {
    this.page = page;
    this.limit = limit;
    return this.httpClient.get<CategoryResponse>(`${this.apiUrl}/categories?page=${this.page}&limit=${this.limit}`, {})
      .pipe(
        tap(
          categoryResponse => {
            this.totalCategories = categoryResponse.totalCategories,
            this.limit = categoryResponse.limit,
            this.previusPage = categoryResponse.previusPage;
            this.categories = categoryResponse.categories;
          }
        ),
        map(
          categoryResponse => {
            return categoryResponse;
          }
        )
      );
  }

  public getAllCategories (page: number = 1,limit: number = 100): Observable<Category[]> {
    this.page = page;
    this.limit = limit;
    return this.httpClient.get<CategoryResponse>(`${this.apiUrl}/categories?page=${this.page}&limit=${this.limit}`, {})
      .pipe(
        map(
          categoryResponse => {
            return categoryResponse.categories;
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

  public getCategoryByName (query: string, page: number = 1, limit: number = 10): Observable<Category[]> {
    this.page = page;
    this.limit = limit;
    return this.httpClient.get<CategoryResponse>(`${this.apiUrl}/categories/search/by?page=${page}&limit=${limit}&name=${query}`, {})
    .pipe(
      tap(
        categoryResponse => {
          this.totalCategories = categoryResponse.totalCategories,
          this.limit = categoryResponse.limit,
          this.previusPage = categoryResponse.previusPage;
          this.categories = categoryResponse.categories;
        }
      ),
      map(
        categoryResponse => {
          return categoryResponse.categories;
        }
      )
    );
  }

  public deleteCategory (categoryId: string): Observable<Category> {
    return this.httpClient.delete<Category>(`${this.apiUrl}/categories/${categoryId}`, {});
  }
}
