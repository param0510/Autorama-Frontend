import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';
import { Observable, map, startWith } from 'rxjs';


// interface for filter Obj
interface Filter {
  type: string,
  value: string
}

interface FilterModel {
  name: string,
  userInputValues: string[],
  values: string[]
}

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  // filter Array
  filters: Filter[];

  filterModelList!: FilterModel[];

  // static filter properties
  sortByOptions: string[];
  totalProdsShowList: number[];


  // varying filter properties
  // car
  carMakes: string[];
  carModels: string[];
  carYearRangeList: string[];
  carMileageRangeList: string[];
  carBodyTypes: string[];



  // 2-way binding properties
  sortByValue: string | undefined;
  totalProdsShowing: number | undefined;

  constructor() {
    this.sortByOptions = ['Price: (low to high)', 'Price: (high to low)', 'Newest first', 'Oldest first'];
    this.totalProdsShowList = [12, 24, 36, 48];

    // make these dynamic later
    this.carMakes = ['Honda', 'Toyota', 'Hyundai', 'BMW', 'Mercedes'];
    // dependent list
    this.carModels = ['CRV', 'Civic', 'Corolla', 'Elantra', 'i300', 'Benz C-class'];

    this.carYearRangeList = ['2000-2005', '2006-2011', '2012-2017', '2018-2024'];
    this.carMileageRangeList = ['0-50k', '50k-100k', '100k-150k', '150k-200k', '200k or more'];
    this.carBodyTypes = ['Convertible', 'Hatchback', 'Truck', 'Sedan', 'SUV', 'Coupe', 'Other'];

    this.filters = [];


    // attaching an value change eventhandler/subscriber which will be triggered everytime there's a change in value for formControl attribute - 
    // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    // );

  }

  ngOnInit(): void {
      
    // filter population for cars productGrp
    // populating filterModelList
    var carMakesFilterModel: FilterModel = {
      name: 'make',
      userInputValues: [],
      values: this.carMakes
    }
    var carModelsFilterModel: FilterModel = {
      name: 'model',
      userInputValues: [],
      values: this.carModels
    }
    var carYearFilterModel: FilterModel = {
      name: 'year',
      userInputValues: [],
      values: this.carYearRangeList
    }
    var carMileageFilterModel: FilterModel = {
      name: 'mileage',
      userInputValues: [],
      values: this.carMileageRangeList
    }

    this.filterModelList = [carMakesFilterModel, carModelsFilterModel, carYearFilterModel, carMileageFilterModel]
    // this works only if assignment is done once not on optional array
    // this.filterModelList.push(carMakesFilterModel, carMileageFilterModel)
    
  }
  
  matOptionClickEvnt(filterValue: string, selected: boolean, name: string){
    console.log(filterValue)
    console.log(selected)
    console.log(name)

    var filterItem: Filter = {
      type: name,
      value: filterValue
    }
    if(selected){
      this.filters.push(filterItem)
    }
    else{
      this.removeAppFilter(filterItem)
    }
  }

  removeAppFilter(filter: Filter){
    this.filters = this.filters.filter( 
      fltr => (fltr.type !== filter.type || fltr.value !== filter.value)
    );
  }

  removeFilterChip(filter: Filter){
    this.removeAppFilter(filter);
    var testObj = this.filterModelList.filter( fml => fml.name === filter.type)
    testObj[0].userInputValues = testObj[0].userInputValues.filter( inpVl => inpVl !== filter.value)
  }

  labelCapitalizer(labelValue: string): string{
    labelValue = labelValue.trim()
    return labelValue.charAt(0).toUpperCase() + labelValue.slice(1)
  }
  
  
  // chips + dropdown + input
  
  // filter dependency function for input autoComplete - (Filter drop-down)
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  // }

  // fruitCtrl = new FormControl('');
  // filteredFruits: Observable<string[]>;
  // fruits: string[] = ['Lemon'];
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];



  // remove(fruit: string): void {
  //   const index = this.fruits.indexOf(fruit);

  //   if (index >= 0) {
  //     this.fruits.splice(index, 1);
  //   }
  // }

  // selectedAutoComplete(event: MatAutocompleteSelectedEvent): void {
  //   this.fruits.push(event.option.viewValue);
  //   this.fruitCtrl.setValue(null);
  // }
}
