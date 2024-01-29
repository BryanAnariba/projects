import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../../products/interfaces/product.interface';
import { CartItemList, ProductItemCart } from '../interfaces/cart.interfaces';
import { devEnvironments } from '../../../environments/environments.dev';
import { HttpClient } from '@angular/common/http';
import { Order } from '../interfaces/orders.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public products: ProductItemCart[] = []; // ESTE SOLO MANTIENE LA INFORMACION EN EL CARRITO PERO NO ESTA A LA ESCUCHA ESE ES EL PROBLEMA POR ESO NO PUEDO ACCEDER AL VALOR ACTUAL
  public productList = new BehaviorSubject<ProductItemCart[]>([]); // EN ONINIT ESTE SE SUBSCRIBE CADA VEZ QUE SE ANEXA UN ITEM AL CARRITO MUY UTIL
  private apiUrl: string = devEnvironments.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.getDataFromLocalStorage();
  }

  public getProducts() {
    return this.productList.asObservable();
  }

  public addToCard (product: Product, quantity: number) {
    const existsProduct = this.products.find(p => p.id === product.id);

    if (!existsProduct) {
      const newProduct: ProductItemCart = {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        quantity: quantity,
        total: product.price * quantity,
      };
      this.products = [...this.products, newProduct];
      this.productList.next(this.products);
      this.setDataFromLocalStorage();
    }
  }

  public getTotalPrice (): number {
    let grandTotal = 0;
    this.products.map(p => {
      grandTotal += p.total;
    });
    return grandTotal;
  }

  removeProductFromCartProductsItem (product: ProductItemCart): void {
    const productsFiltered = this.products.filter(p => p.id !== product.id);
    this.products = productsFiltered;
    this.productList.next(this.products);
    this.setDataFromLocalStorage();
  }


  // Save products in local storage
  public cleanCart (): void {
    localStorage.clear();
    this.products = [];
    this.productList.next(this.products);

  }

  private setDataFromLocalStorage (): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  private getDataFromLocalStorage (): void {
    if (!JSON.parse(localStorage.getItem('products')!)) return;
    this.products = JSON.parse(localStorage.getItem('products')!);
    this.productList.next(this.products);
  }

  public createOrder(cartItemList: CartItemList): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/orders`, cartItemList)
      .pipe(
        tap(
          order => {
            this.cleanCart();
          }
        )
      );
  }

  public getOrders(userId: string): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiUrl}/orders/user/${userId}`, {});
  }
}
