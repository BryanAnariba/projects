import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  public label: string = 'Search by Category Name:';
  public categories: Category[] = [];
  private limit: number = 10;
  private page: number = 1;
  public previusPage: string | null = null;
  public currentPage?: string;
  public nextPage?: string = '';
  private totalCategories: number = 0;

  constructor (
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories () {
    this.categoryService.getCategories(this.page, this.limit)
      .subscribe(
        categoryResponse => {
          this.limit = categoryResponse.limit;
          this.page = categoryResponse.page;
          this.totalCategories = categoryResponse.totalCategories;
          this.categories = categoryResponse.categories;
          this.previusPage = categoryResponse.previusPage;
          console.log({
            previusPage: this.previusPage,
            limit: this.limit,
            page: this.page,
            totalCategories: this.totalCategories,
            categories: this.categories,
          });
        }
      )
  }

  public getNextCategories () {
    this.page += 1;
    this.getCategories();
  }

  public getPreviusCategories () {
    if (this.previusPage !== null) {
      this.page -= 1;
      this.getCategories();
    }
  }
}
