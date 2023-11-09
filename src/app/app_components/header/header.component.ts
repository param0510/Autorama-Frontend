import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartServiceService, CartUpdateMethodEnum } from 'src/app/Services/cart-service.service';
import { Cart, CartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Event Emitter for sideNav toggle effect
  @Output() sideNavToggleEvntEmitter;
  
  // class properties
  // sideNav Button changing variable
  sideNavTglBtnIcon : string;

  // Enum required for cart update
  cartUpdateMethodEnum = CartUpdateMethodEnum;

  // Element

  // cart variables
  cart: Cart = {items: []};
  totalCartItems: number = 0;

  constructor(private _cartService: CartServiceService){
    this.sideNavToggleEvntEmitter = new EventEmitter<null>();
    this.sideNavTglBtnIcon = 'menu'
  }

  sideNavToggleBtnClick() : void {
    this.sideNavToggleEvntEmitter.emit();
    this.sideNavTglBtnIcon = this.sideNavTglBtnIcon === 'menu' ? 'close' : 'menu';
  }

  ngOnInit(): void{
    this._cartService.cart.subscribe(value => {
        this.cart = value;
        this.totalCartItems = this.cart.items.map(item => item.cartQty).reduce((prevVal, currVal) => (prevVal + currVal), 0);
    });
  }
  
  removeItemFromCart(cartItem: CartItem): void{
    this._cartService.removeFromCart(cartItem);
  }

  updateCartItemQty(method: CartUpdateMethodEnum, productId: string): void{
      this._cartService.updateCartItemQty(method, productId);
  }

  clearCartBtnPressed(){
    this._cartService.clearCart();
  }
}
