/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistingInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      for (const item of this.cartItems) {
        if (item.id === theCartItem.id) {
          existingCartItem = item;
          break;
        }
      }
      // check if we found it
      alreadyExistingInCart = (existingCartItem != undefined);
    }

    if (alreadyExistingInCart) {
      existingCartItem.quantity++;
    } else {
      // add the item to the array is not found in cart:
      this.cartItems.push(theCartItem);
    }

    // Compute cart price and quantity total:
    this.computeCartTotals();

  }

  computeCartTotals() {
    throw new Error('Method not implemented.');
  }
}
