import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../../../categories/interfaces/category.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { Product } from '../../interfaces/products.interface';

@Component({
  selector: 'products-add-edit-product-page',
  templateUrl: './add-edit-product-page.component.html',
  styleUrl: './add-edit-product-page.component.scss'
})
export class AddEditProductPageComponent implements OnInit {
  public categories: Category[] = [];
  constructor (
    private fb: FormBuilder,
    private categoryServices: CategoryService,
    private router: Router,
    private productService: ProductService,
    public matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryServices.getAllCategories()
    .subscribe(
      categories => {
        this.categories = categories.categories;
      }
    );

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap(({productId}) => this.productService.getProduct(Number(productId)))
    )
    .subscribe({
      next: (product) => {
        console.log(product)
        if (!product) return this.router.navigate(['/products/product-list']);
        return this.productForm.reset({id: product.id, name: product.name, description: product.description, categoryId: product.category?.id, isAvaliable: product.isAvaliable});
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  public productForm: FormGroup = this.fb.group({
    id: [0, [], []],
    name: ['', [Validators.required, Validators.minLength(3)], []],
    description: ['', [Validators.required, Validators.minLength(3)], []],
    categoryId: [null, [Validators.required], []],
    isAvaliable: [true, [], []],
  });

  get currentProduct(): Product {
    const product = this.productForm.value as Product;
    return product;
  }

  public isValidField(field: string) {
    return this.productForm.controls[field].errors && this.productForm.controls[field].touched;
  }

  public getFieldError(field: string): string | null {
    if (!this.productForm.controls[field]) return null;
    const errors = this.productForm.controls[field].errors || {};
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
    if (!this.productForm.valid) return;
    console.log(this.currentProduct);
    if (!this.currentProduct.id) {
      this.productService.createProduct(this.productForm.value)
      .subscribe({
        next: (product) => {
          this.openSnackBar(`Product ${product.name} saved`, 'Close');
          this.productForm.reset();
          this.router.navigate(['/products/product-list']);
        },
        error: (error) => {
          this.openSnackBar(`${error.error}`, 'Close');
        }
      });
      return;
    }

    this.productService.updateProduct(this.currentProduct)
    .subscribe({
      next: (product) => {
        this.openSnackBar(`Product ${product.name} updated`, 'Close');
          this.productForm.reset();
          this.router.navigate(['/products/product-list']);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action);
  }
}
