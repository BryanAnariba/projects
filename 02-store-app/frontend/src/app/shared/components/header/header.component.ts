import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/cart/services/cart.service';
import { UserService } from '../../../core/users/services/user.service';
import { User } from '../../../core/users/interfaces/user.interfaces';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public totalProductsInCart: number = 0;
  public users: User[] = [];

  constructor (
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe({
        next: (users) => {
          this.users = users;
        }
      });

    this.cartService.getProducts()
      .subscribe({
        next: (products) => {
          //console.log(products);
          this.totalProductsInCart = products.length;
        }
      });
  }

  public onSearch(value: string): void {
    console.log({value});
  }
}
