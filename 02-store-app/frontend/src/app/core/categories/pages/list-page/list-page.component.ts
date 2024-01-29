import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  public label: string = 'Search by Category Name:';
  private limit: number = 10;
  private page: number = 1;

  get previusPage () {
    return this.categoryService.currentPreviusPage;
  } 

  get categories () {
    return this.categoryService.currentCategoryList;
  }

  constructor (
    private categoryService: CategoryService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories () {
    //console.log({page: this.categoryService.currentPage, limit: this.categoryService.currentLimit, nextOrPrev: this.nextOrPrevius})
    this.categoryService.getCategories(this.page, this.limit)
      .subscribe({
        next: (categoriesResponse) => {
          console.log(categoriesResponse);
        }
      })
  }

  public getNextCategories () {
    this.page += 1;
    this.getCategories();
  }

  public getPreviusCategories () {
    if (this.categoryService.currentPreviusPage !== null) {
      this.page -= 1;
      this.getCategories();
    }
  }

  public onDelete(categoryId: string): void {
    this.categoryService.deleteCategory(categoryId)
      .subscribe({
        next: (category) => {
          this.showMessage((category.name + ' Deleted'), 'success')
          this.getCategories();
        }
      });
  }

  showMessage(message: string, type: string) {
    switch (type) {
      case 'success':
        return this.toastService.success('Success!', message);
      case 'error':
        return this.toastService.error('Error!', message);
      default:
        return;
    }
  }
}
