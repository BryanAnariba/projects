import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/cart/services/cart.service';
import { UserService } from '../../../core/users/services/user.service';
import { User } from '../../../core/users/interfaces/user.interfaces';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private userService: UserService,
    private router: Router,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.userService.getUsers()
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

  onChange(event: any): void {
    //console.log(event.target.value);
    this.userService.getUser(event.target.value)
      .subscribe({
        next: (userSelected) => {
          console.log('User Selected: ' + userSelected);
        }
      })
  }

  public onSearch(value: string): void {
    console.log({value});
  }

  public onViewUserOrders(): void {
    if (!this.userService.currentUser) {
      this.toastService.error('Error!', 'Please Select an user');
    } else {
      this.router.navigate(['/orders/list']);
    }
  }
}
