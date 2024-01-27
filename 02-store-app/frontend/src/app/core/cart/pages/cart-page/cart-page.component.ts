import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductItemCart } from '../../interfaces/cart.interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  public productsItemCart: ProductItemCart[] = []

  constructor (
    private cartService: CartService,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getCartData();
  }

  public getCartData () {
    this.cartService.getProducts()
      .subscribe({
        next: (productsItemCart) => {
          // console.log(productsItemCart)
          this.productsItemCart = productsItemCart;
        }
      })
  }

  public get totalAllProducts (): number {
    return this.cartService.getTotalPrice();
  }

  public onResetCart(): void {
    this.cartService.cleanCart();
  }

  public onPayNow(): void {
    //console.log('Soon!');
    this.showMessage('Order Created!', 'success')
  }

  public deleteItemFronCart(product: ProductItemCart) {
    this.cartService.removeProductFromCartProductsItem(product);
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
