import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './pages/inventory/inventory.component';

const routes: Routes = [
  { path: '', redirectTo: 'inventory/cars', pathMatch: "full"},
  { path: 'inventory/:id', component: InventoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
