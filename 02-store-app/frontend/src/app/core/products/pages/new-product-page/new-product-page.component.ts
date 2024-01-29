import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../../interfaces/product.interface';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product-page',
  templateUrl: './new-product-page.component.html',
  styleUrl: './new-product-page.component.scss'
})
export class NewProductPageComponent implements OnInit {
  public categories: Category[] = [];

  constructor (
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastService: ToastrService,
    private productService: ProductsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        }
      })
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

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0] as File;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.productForm.patchValue({
          image: file,
          imageUrl: reader.result
        });
      };
    }
  }

  public productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    description: ['', [Validators.required, Validators.minLength(3)], []],
    categoryId: ['', [Validators.required], []],
    price: [0, [Validators.required,], []],
    stock: [0, [Validators.required, Validators.min(1)], []],
    imageUrl: ['assets/img/upload.png'],
    image: ['assets/img/upload.png'],
  });

  public onSave(): void {
    if (this.productForm.valid) {
      //console.log(this.productForm.value);
      this.productService.createProduct(this.productForm.value)
        .subscribe({
          next: (product) => {
            this.showMessage(`${product.name} Saved`, 'success');
            this.productForm.reset();
            this.router.navigate(['products/list']);
          }
        });
    }
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
