import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';


export enum CartUpdateMethodEnum {
  remove,
  add
}

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartInit: Cart;
  
  cart: BehaviorSubject<Cart>;

  constructor() { 
    this.cartInit = localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')!) : { items: [] };
    this.cart =  new BehaviorSubject<Cart>(this.cartInit);
  }

  getCartItems(): CartItem[]{
    return this.cart.getValue().items;
  }

  // Add Item to Cart
  addToCart(cartItem: CartItem){

    var itemIsPresentFlag: Boolean = false;
    var localCartItems = this.getCartItems();

    // If item is already present
    localCartItems.forEach(crtItm => {
      if(crtItm.productId === cartItem.productId)
      {
        crtItm.cartQty++;
        itemIsPresentFlag = true
        return;
      }
    });
    if(!itemIsPresentFlag){
      // if cart item is newly added
      localCartItems.push(cartItem);
    }

    this.broadcastCartUpdate({items: localCartItems});
  }
  
  // Updates Each Cart Item Qty
  updateCartItemQty(method: CartUpdateMethodEnum, productId: string){
    var localCartItems = this.getCartItems();
    localCartItems.forEach(item => {
      if(item.productId === productId){
        if(method === CartUpdateMethodEnum.add){
          item.cartQty++;
          this.broadcastCartUpdate({items: localCartItems});
        }
        else{
          if(item.cartQty === 1){
            this.removeFromCart(item);
          }
          else{
            item.cartQty--;
            this.broadcastCartUpdate({items: localCartItems});
          }
        }
        return;
      }
    });

  }

  // remove item from cart
  removeFromCart(cartItem: CartItem){
    var localCartItems = this.getCartItems();
    var updatedCartItems = localCartItems.filter(item => item.productId !== cartItem.productId);
    this.broadcastCartUpdate({items: updatedCartItems})
  }

  clearCart(){
    this.broadcastCartUpdate({items: []});
  }

  broadcastCartUpdate(updatedCart: Cart){
    this.cart.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }
}
