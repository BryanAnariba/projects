import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../cart/services/cart.service';
import { UserService } from '../../../users/services/user.service';
import { Router } from '@angular/router';
import { Order, ProductsByOrder } from '../../../cart/interfaces/orders.interface';

@Component({
  selector: 'orders-app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  public orders?: Order;

  ngOnInit(): void {
    if (!this.userService.currentUser?.id) {
      this.router.navigate(['/products']);
    } else {
      this.getOrders();
    }
  }

  constructor (
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
  ) {}

  public getOrders() {
    this.cartService.getOrders(`${this.userService.currentUser?.id}`)
      .subscribe({
        next: (orders) => {
          console.log(orders);
          this.orders = orders;
        }
      })
  }

  public onViewProducts(productsByOrder: ProductsByOrder[]): void {

  }
}
