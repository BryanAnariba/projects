import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemList, ProductItemCart } from '../../interfaces/cart.interfaces';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../users/services/user.service';

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
    private userService: UserService,
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
    if (!this.userService.currentUser) {
      this.showMessage('Please Select An User!!!', 'error')  
    } else {
      const products = this.cartService.products.map(p => ({productId: p.id, quantityProduct: p.quantity, productValue: p.price}));
      const newOrder = {
        userId: this.userService.currentUser.id,
        products: products,
      } as CartItemList ;
      //console.log('Products: ', this.cartService.products, ', User', newOrder);
      this.cartService.createOrder(newOrder)
      .subscribe({
        next: (order) => {
          console.log(order);
        }
      })
      this.showMessage('Order Created!', 'success')
    }
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
