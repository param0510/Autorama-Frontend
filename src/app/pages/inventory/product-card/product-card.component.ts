import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppDataService, DataModelType } from 'src/app/Services/app-data.service';
import { CartServiceService, CartUpdateMethodEnum } from 'src/app/Services/cart-service.service';
import { Accessory } from 'src/app/models/accessory.model';
import { Car } from 'src/app/models/car.model';
import { CartItem } from 'src/app/models/cart.model';
import { ProductFormComponent, ProductFormMatData } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  // Input variables
  // @Input() product: any;
  @Input() car?: Car;
  @Input() accessory?: Accessory;

  // Output Decorator for Event Emitter for Inventory.component.ts
  @Output() inventoryDataRefreshEvntEmitter;

  // extending DataModelType Enum to the template
  dataModelTypeEnum = DataModelType;

  // Property to show the active quantity of this product in the cart
  productQtyInCart: number = 0;

  // show Cart +/- buttons on each card depending on the focused state of the container of Add/Remove item buttons
  showCartQtyEditBtns: Boolean = false;

  // enum for cart Qty Update
  cartUpdateMethodEnum = CartUpdateMethodEnum;

  constructor(
    private _cartService: CartServiceService, 
    private _appDataService: AppDataService,
    private _matDialog: MatDialog){
    this.inventoryDataRefreshEvntEmitter = new EventEmitter<null>();
  }
  
  ngOnInit(){
    // this.productQtyInCart = this._cartService.getCartItems().find(item => item.productId === this.product._id)?.cartQty || 0;
    if(this.accessory){
      this.updateProductQtyInCart();
    }
  }

  // Updating the Cart Quanity dispalyed on the UI for Accessory items (Used outside the component as well, by Inventory.component.ts)
  updateProductQtyInCart(){
    this.productQtyInCart = this._cartService.getCartItems().find(item => item.productId === this.accessory?._id)?.cartQty || 0;

  }
  
  // Add to cart method for Accessory objects
  addToCart(product: Accessory){
    
    var cartItem: CartItem = {
      productId: product._id,
      brand: product.brand || '',
      name: product.name,
      category: product.category,
      subCategory: product.subCategory || '',
      price: product.price,
      size: product.size,
      cartQty: 1,
      imageUrl: product.imageUrl,
    }
    this.productQtyInCart++;
    this._cartService.addToCart(cartItem);
  }

  // Updating the accessory product's cart qty by using the +/- buttons for changing the total units of a single item in the cart.
  updateCartItemQty(method: CartUpdateMethodEnum, productId: string){
    console.log(method, productId)
    if(method === CartUpdateMethodEnum.add){
      this.productQtyInCart++;
    }
    else{
      this.productQtyInCart--;
    }
    this._cartService.updateCartItemQty(method, productId);
  }

  // 'Edit' Product - Button Event Handler
  editProduct(dataModel: DataModelType, product: Car | Accessory): void{
    const productFormMatData: ProductFormMatData = {
      modelType: dataModel,
      modelObj: product
    };
    const matDialogRef: MatDialogRef<ProductFormComponent> = this._matDialog.open(ProductFormComponent, {
      panelClass: 'w-2/3',
      data: productFormMatData
    });

    matDialogRef.afterClosed().subscribe(value => {
      if(value){
        this.inventoryDataRefreshEvntEmitter.emit();
      }
    })
  }

  // Move this over to app-utilities.ts in phase 2 + Make this a MatDialog instead of a confirm() function
  // Get delete confirmation from the user
  confirmDelete(): boolean{
    return confirm('Do you want to delete this item?');
  }
  
  // 'Delete' Product - Button Event Handler
  deleteProduct(dataModel: DataModelType, product: Car | Accessory): void{
    // Check for confirmation first and then delete
    if(this.confirmDelete()){
      this._appDataService.deleteItem(dataModel, product).subscribe({
        next: (val) => {
          this.inventoryDataRefreshEvntEmitter.emit();
        },
        error: (err: Error) => {
          console.log(err);
        }
      });
    }
  }

}
