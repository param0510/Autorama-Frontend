import { Component, AfterViewInit, ViewChildren, QueryList, OnInit, OnDestroy } from '@angular/core';
import { CartServiceService } from 'src/app/Services/cart-service.service';
import { CartItem } from 'src/app/models/cart.model';
import { ProductCardComponent } from './product-card/product-card.component';
import { AppDataService, DataModelType } from 'src/app/Services/app-data.service';
import { Car } from 'src/app/models/car.model';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Accessory } from 'src/app/models/accessory.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductFormComponent, ProductFormMatData } from './product-form/product-form.component';

// interface Accessory{

// }

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements AfterViewInit, OnInit, OnDestroy {

  matTabLabelList: string[];
  activeMatTabLink: string;
  cartItems: CartItem[];

  // Cars Array
  cars: Car[] = [];
  accessories: Accessory[] = [];

  // extending the enum for use in the html template
  dataModelTypeEnum = DataModelType;

  // Used for unsubscribing from all the subscription once the component is destroyed
  destroySubs$: Subject<void> = new Subject<void>();
  // variable to store the active refreshDataSubscription and unsubscribe from the previous one.
  getDataSubscription?: Subscription;

  @ViewChildren(ProductCardComponent) productCardComponents!: QueryList<ProductCardComponent>;
  
  constructor(private _cartService: CartServiceService, private _appDataService: AppDataService, private _matDialog: MatDialog){
    this.matTabLabelList = Object.values(DataModelType); // Automating and getting all the values in the enum which will be displayed as tabs
    this.activeMatTabLink = '';
    this.cartItems = _cartService.getCartItems();
  }

  ngOnInit(): void {
    this.activeMatTabLink = this.matTabLabelList.length ? this.matTabLabelList[0] : 'Oops! nothing found here.';

    this.refreshData(DataModelType.car);

  }

  refreshData(dataModel: DataModelType): void{
    if(this.getDataSubscription){
      this.getDataSubscription.unsubscribe();
    }
    this.getDataSubscription = this._appDataService.getItems(dataModel)
                                                  .pipe(takeUntil(this.destroySubs$)) // this helps unsubscribe when the component is destroyed 
                                                  .subscribe(value => 
                                                    {
                                                      if(dataModel === DataModelType.car){
                                                        this.cars = value;
                                                      }
                                                      else{
                                                        this.accessories = value;
                                                      }
                                                    });
  }

  matTabChange(matTabLabel: string): void{
    // this.activeMatTabLink = 'socks'
    this.activeMatTabLink = matTabLabel;
    if(this.activeMatTabLink === DataModelType.car){
      this.refreshData(DataModelType.car);
    }
    else{
      this.refreshData(DataModelType.accessory);
    }
  }
  

  showProductForm(dataModelType: DataModelType){
    const productFormMatData: ProductFormMatData = {
      modelType: dataModelType,
      modelObj: null
    };
    const matDialogRef: MatDialogRef<ProductFormComponent> = this._matDialog.open(ProductFormComponent, {
      // backdropClass: 'w-2/3',
      panelClass: 'w-2/3',
      data: productFormMatData
    });
    matDialogRef.afterClosed().pipe(takeUntil(this.destroySubs$)).subscribe(value => {
      if(value){
        this.refreshData(dataModelType);
      }
    })
  }


  ngAfterViewInit(): void{
    // This subscribtion is used to spontaneously update the UI to reflect which items are in the cart and their quantity in cart
    this._cartService.cart.pipe(takeUntil(this.destroySubs$)).subscribe(value => {
      this.productCardComponents.forEach(prodComp => {
        if(prodComp.accessory){
          prodComp.updateProductQtyInCart();
        }
      });
    })
  }

  // destroys all subscriptions when the component is destroyed
  ngOnDestroy(): void {
    this.destroySubs$.next();
    this.destroySubs$.complete();
  }

}
