import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { Accessory } from '../models/accessory.model';
// import { HttpClientModule } from '@angular/common/http';

// Data Model type - (car | accessory)
export enum DataModelType{
  car = "cars",
  accessory = "accessories"
}

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  queryUrl = "http://localhost:3000"

  constructor(private _http: HttpClient) { }

  // get items
  getItems(dataModel: DataModelType): Observable<any>{

    // GET: "http://localhost:3000/cars" (Example)
    return this._http.get(this.queryUrl + `/${dataModel}`);

    // Can do it this way as well change the return type from Observable<any> to Observable<Car | Accessory>
    // if
    // return this._http.get<Car>(this.queryUrl + `/${dataModel}`);
    // else
    // return this._http.get<Accessory>(this.queryUrl + `/${dataModel}`);
    
  }
  
  // update Database 
  // Add items
  addItem(dataModel: DataModelType, newItemObj: Car | Accessory) : Observable<any>{
    // POST: "http://localhost:3000/cars" + carObj (Example)
    return this._http.post(this.queryUrl + `/${dataModel}`, newItemObj);
  }
  
  // Edit item
  updateItem(dataModel: DataModelType, selectedItemObj: Car | Accessory): Observable<any>{
    // PUT: "http://localhost:3000/cars" + carObj (Example)
    return this._http.put(this.queryUrl + `/${dataModel}`, selectedItemObj);
  }
  
  // delete item - WRONG
  deleteItem(dataModel: DataModelType, selectedItemObj: Car | Accessory): Observable<any>{
    // DELETE: "http://localhost:3000/cars/{carObj._id}" (Example)
    return this._http.delete(this.queryUrl + `/${dataModel}/` + selectedItemObj._id);
  }
}

