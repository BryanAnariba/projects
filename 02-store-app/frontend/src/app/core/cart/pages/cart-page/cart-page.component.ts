import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductItemCart } from '../../interfaces/cart.interfaces';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  public productsItemCart: ProductItemCart[] = []

  constructor (
    private cartService: CartService
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
    console.log('Soon!');
  }

  public deleteItemFronCart(product: ProductItemCart) {
    this.cartService.removeProductFromCartProductsItem(product);
  }
}
