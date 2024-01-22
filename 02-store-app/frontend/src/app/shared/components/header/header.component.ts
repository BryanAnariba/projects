import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/cart/services/cart.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public totalProductsInCart: number = 0;

  constructor (
    private cartService: CartService
  ) {}

  ngOnInit(): void {
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
