import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../../cart/services/cart.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {
  @Input()
  product!: Product;

  ngOnInit(): void {
    if (!this.product) throw new Error('Product is required');
  }

  constructor (
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastrService
  ) {}

  public cartForm: FormGroup = this.fb.group({
    quantity: new FormControl(1, [Validators.required, Validators.min(1)], []),
  });

  // Form Errors
  public isValidField(field: string): boolean | null {
    return this.cartForm.controls[field].errors && this.cartForm.controls[field].touched;
  }

  public getFieldError(field: string): string | null {
    if (!this.cartForm.controls[field]) return null;

    const errors = this.cartForm.controls[field].errors || {};
    for(const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Quantity is required';
        case 'min':
          return 'Quantity must be greather than zero';
        default:
          return '';
      }
    }
    return '';
  }

  get quantity () {
    return this.cartForm.get('quantity')?.value;
  }

  public addToCart (product: Product): void {
    // console.log('Add To Cart: ',  product, this.quantity);
    this.cartService.addToCard(product, this.quantity);
    this.showMessage('Product Added To Cart', 'success');
    this.router.navigate(['/cart/cart-page']);
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
