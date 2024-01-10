import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'category-add-edit-category-page',
  templateUrl: './add-edit-category-page.component.html',
  styleUrl: './add-edit-category-page.component.scss'
})
export class AddEditCategoryPageComponent implements OnInit {

  constructor (
    private fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private matSnackbar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get currentCategory(): Category {
    const cat = this.categoryForm.value as Category;
    return cat;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap(
        ({categoryId}) => this.categoryService.getCategory(+categoryId)
      )
    )
    .subscribe(category => {
      //console.log(category);
      if (!category) {
        this.router.navigate(['/categories/category-list']);
      }
      this.categoryForm.reset(category);
    });
  }

  public categoryForm: FormGroup = this.fb.group({
    id: [0, [], []],
    name: ['', [Validators.required, Validators.minLength(3)], []],
    description: ['', [Validators.required, Validators.minLength(3)], []],
    isActive: [true, [], []]
  });

  public isValidField (field: string) {
    return this.categoryForm.controls[field].errors && this.categoryForm.controls[field].touched;
  }

  public getFieldError (field:string): string | null {
    if (!this.categoryForm.controls[field]) return null;

    const errors = this.categoryForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This Field is required';
        case 'minlength':
          return `Min ${errors['minlength'].requiredLength } characters`;
        default:
          return '';
      }
    }
    return '';
  }

  public onSave() {
    if (!this.categoryForm.valid) return;

    if (this.currentCategory.id !== 0) {
      this.categoryService.updateCategory(this.currentCategory)
      .subscribe({
        next: (category) => {
          this.openSnackBar(`${category.name} updated!`, 'Close');
          this.router.navigate(['/categories/category-list']);
          this.categoryForm.reset();
        },
        error: ({error}) => {
          this.openSnackBar(error.error, 'Close');
        }
      });
      return;
    }
      this.categoryService.createCategory(this.categoryForm.value)
      .subscribe({
        next: (category) => {
          this.openSnackBar('Category ' + category?.name + ' Saved', 'Close');
          this.router.navigate(['/categories/category-list']);
          this.categoryForm.reset({id: 0, name: '', description: '', isActive: true});
        },
        error: ({error}) => {
          this.openSnackBar(`${error.error}`, 'Close');
        },
      });
  }

  openSnackBar(message: string, action: string) {
    this.matSnackbar.open(message, action);
  }
}
