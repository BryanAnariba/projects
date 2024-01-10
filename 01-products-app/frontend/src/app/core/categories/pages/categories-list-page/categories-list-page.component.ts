import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs';

@Component({
  selector: 'category-categories-list-page',
  templateUrl: './categories-list-page.component.html',
  styleUrl: './categories-list-page.component.scss'
})
export class CategoriesListPageComponent implements OnInit {
  public isLoading: boolean = false;
  public categories: Category[] = [];

  constructor (
    private categoryService: CategoryService,
    private matSnackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
   this.getCategories();
  }

  public onDelete(categoryId: number) {
    this.categoryService.deleteCategory(categoryId)
    .subscribe({
      next: (category) => {
        this.openSnackBar(`Category ${category.name} deleted`, 'Close');
        this.getCategories();
      },
      error: (error) => {
        this.openSnackBar(`Category ${error.error} deleted`, 'Close');
      }
    })
  }

  public getCategories () {
    this.isLoading = true;
    this.categoryService.getAllCategories()
    .pipe(
      delay(200)
    )
    .subscribe({
      next: (categories) => {
        console.log(categories)
        this.categories = categories.categories;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this.matSnackbar.open(message, action);
  }
}
