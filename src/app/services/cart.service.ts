/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // For computing final information for checkout:
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  // For storing session data so that it will not be removed on refresh:
  storage: Storage = sessionStorage;

  constructor() {

    // read data from storage
    const data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null) {
      this.cartItems = data;

      // compute totals based on the data that is read from storage
      this.computeCartTotals();
    }
  }

  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistingInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      existingCartItem = this.cartItems.find(cartItem => cartItem.id === theCartItem.id)!
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

  decreaseCartItem(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.removeItemFromCart(theCartItem);
    }

    this.computeCartTotals();
  }

  removeItemFromCart(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.id === theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (const currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values for all subscribers to receive updated data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // for debugging:
    this.logCartData(totalPriceValue, totalQuantityValue)

    // Persist cart data so that refresh is not going to remove it:
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // For cross checking on data accuracy:
  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart:')
    for (const cartItem of this.cartItems) {
      const subtotalPrice = cartItem.quantity * cartItem.unitPrice;
      console.log(`name: ${cartItem.name}, unitPrice: ${cartItem.unitPrice}, Total price: ${subtotalPrice}, Total item quantity: ${cartItem.quantity}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('--------');
  }

}
