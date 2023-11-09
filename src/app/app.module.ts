import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ItemsListComponent } from './Components/inventory/items-list/items-list.component';
// import { ItemComponent } from './Components/inventory/item/item.component';

// My imports
import { AppDataService } from './Services/app-data.service';
import { HttpClientModule } from '@angular/common/http';
// import { ItemFormComponent } from './Components/inventory/item-form/item-form.component';
// import { InventoryComponentOLD } from './Components/inventory/inventory.component';
import { HeaderComponent } from './app_components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Forms Module
// Very important to import 'ReactiveFormsModule' for responsive forms and activate triggers within them (for ex: [formControl] inside <mat-select>)  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// component imports
import { SidenavComponent } from './app_components/sidenav/sidenav.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ProductFilterComponent } from './pages/inventory/product-filter/product-filter.component';
import { ProductCardComponent } from './pages/inventory/product-card/product-card.component';
import { ProductFormComponent } from './pages/inventory/product-form/product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    InventoryComponent,    
    ProductFilterComponent,
    ProductCardComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTreeModule,
    MatListModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatBadgeModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  providers: [AppDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
