import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppDataService, DataModelType } from 'src/app/Services/app-data.service';


// Imports for matChipInput
import { ENTER } from "@angular/cdk/keycodes";
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Car, OfferTag } from 'src/app/models/car.model';
import { Accessory } from 'src/app/models/accessory.model';

// Enum required to prevent FormArrayName errors
// Edit this every time you declare any other FormGroup properties to be a FormArray
enum FormArrayNameEnum{
  featureTags = 'featureTags',
  offerTags = 'offerTags'
}

// Declared an interface for better Data transfer between MatDialog and ParentComponent 
export interface ProductFormMatData{
  modelType: DataModelType,
  modelObj: Car | Accessory | null
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  carFormGroup?: FormGroup;
  accessoryFormGroup?: FormGroup;

  // To notify the form whether it is in (edit_item or add_new_item) mode
  formInEditMode: boolean;

  // Extending it to the angular html template
  formArrayNameEnum = FormArrayNameEnum;
  dataModelTypeEnum = DataModelType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: ProductFormMatData,
    private _fb: FormBuilder,
    private _appDataService: AppDataService,
    private _matDialogRef: MatDialogRef<ProductFormComponent>
  ) {
    // If Data (Car | Accessory) is provided by the parent/caller component 
    if(_data.modelObj){
      // switch on edit Mode. As Data is sent from the parent component
      this.formInEditMode = true;
      switch(_data.modelType){
        case DataModelType.car: {
          // implicitly converting given _data.modelObj into FormGroup for (Car | Accessory) type
          const carObj: Car = (_data.modelObj as Car);
          this.carFormGroup = this._fb.group(
            {
              _id: carObj._id,
              make: [carObj.make, Validators.required],
              model: carObj.model,
              year: carObj.year,
              mileage: carObj.mileage,
              transmission: carObj.mileage,
              fuelEconomy: carObj.fuelEconomy,
              desc: carObj.desc,
              price: carObj.price,
              bodyType: carObj.bodyType,
              drivetrain: carObj.drivetrain,
              accidentHistory: this._fb.group({
                count: carObj.accidentHistory.count,
                desc: carObj.accidentHistory.desc
              }),
              rating: carObj.rating,
              location: carObj.location,
              featureTags: this._fb.array(carObj.featureTags, Validators.required),
              imageUrl: carObj.imageUrl,
              offerTags: this._fb.array(
                ( carObj.offerTags?.map( (ofrTag) => { 
                    return this._fb.group({
                      name: ofrTag.name,
                      color: ofrTag.color
                    });
                  }) || [] ) 
                  // Note: '|| []' is required above as the map object might not return any value as the offerTags property is optional 'carObj.offerTags?.map'
              ),
              visible: carObj.visible
            }
          );
          break;
        }
        case DataModelType.accessory: {
          const accessoryObj: Accessory = (_data.modelObj as Accessory);
          this.accessoryFormGroup = this._fb.group({
            _id: accessoryObj._id,
            brand: accessoryObj.brand,
            name: accessoryObj.name,
            category: accessoryObj.category,
            subCategory: accessoryObj.subCategory,
            price: accessoryObj.price,
            size: accessoryObj.size,
            modelNumber: accessoryObj.modelNumber,
            stockQty: [accessoryObj.stockQty, Validators.required],
            imageUrl: accessoryObj.imageUrl,
            rating: accessoryObj.rating,
            ratingUserCount: accessoryObj.ratingUserCount,
            offerTags: this._fb.array(
              (accessoryObj.offerTags?.map((ofrTag) => {
                return this._fb.group({
                  name: ofrTag.name,
                  color: ofrTag.color
                });
              }) || [])
            ),
            features: accessoryObj.features, // Make this an array for phase 2
            visible: true
          });
          break;
        }
        default:{
          console.log('Wrong _data.modelType Provided for Edit');
        }
      }
    }
    // Instantiating blank Form Group.
    else{
      // No data recieved. so it is add_new_item mode
      this.formInEditMode = false;
      switch (_data.modelType) {
        // Case for Car ModelType
        case DataModelType.car: {
          this.carFormGroup = this._fb.group({
            _id: null,
            make: '',
            model: '',
            year: null,
            mileage: null,
            transmission: '',
            fuelEconomy: null,
            desc: '',
            price: null,
            bodyType: '',
            drivetrain: '',
            accidentHistory: this._fb.group({
                count: null,
                desc: ''
              }),
            rating: null,
            location: '',
            featureTags: this._fb.array([], Validators.required),
            imageUrl: '',
            offerTags: this._fb.array([]),
            visible: true
          });
          break;
        }
        case DataModelType.accessory: {
          this.accessoryFormGroup = this._fb.group({
            _id: null,
            brand: '',
            name: '',
            category: '',
            subCategory: '',
            price: null,
            size: '',
            modelNumber: '',
            stockQty: [null, Validators.required],
            imageUrl: '',
            rating: null,
            ratingUserCount: null,
            offerTags: this._fb.array([]),
            features: '', // Make this an array for phase 2
            visible: true
          });
          break;
        }
        default: {
          console.log('Wrong _data.modelType Provided for Add');
        }
      }
    }
  }

  ngOnInit() {
    // console.log(this.carFormGroup?.value.visible);
    // console.log(this.carFormGroup?.get('visible')?.value);
    // console.log(this.carFormGroup?.get('visible'));
    // console.log(this.carFormGroup?.value);
    // console.log(this.carFormGroup?.controls['visible'].value);

  }

  // Function fired on form submit
  formSubmitted(dataModel: DataModelType){
    // change this.carFormGroup to value gained from _data.modelType
    if(dataModel === DataModelType.car){
      if(this.carFormGroup?.valid){
        // converting the carFormGroup: FormGroup object to 'Car' object
        const carObj: Car = (this.carFormGroup.value as Car);

        // If data of car to be edited is present. Then edit the car
        if(this._data.modelObj){
          // Subscribing to updateItem function inside app-data.service.ts and sending Car data
          // Add takeUntil(destroy$) to unsubscribe like in Inventory.component.ts
          this._appDataService.updateItem(DataModelType.car, carObj).subscribe({
            next: (response) => {
              this._matDialogRef.close(true);
            },
            error: (err: Error) => {
              console.log(err);
            }
          });
        }
        // Else add a new car to the database
        else{
          // Subscribing to addItem function inside app-data.service.ts and sending Car data
          this._appDataService.addItem(DataModelType.car, carObj).subscribe({
            next: (response) => {
              // sending a positive signal to parent component for it to reload/refresh data based on successful data entry/update in the database
              this._matDialogRef.close(true);
            },
            error: (err: Error) => {
              console.log(err);
            }
          });
        }
      }
    }
    else if(dataModel === DataModelType.accessory){
      if(this.accessoryFormGroup?.valid){
        // type casting FormGroup.value (which is of type 'any') object to 'Accessory' type
        const accessoryObj: Accessory = (this.accessoryFormGroup.value as Accessory);
        // Update Accessory Item
        if(this._data.modelObj){
          this._appDataService.updateItem(dataModel, accessoryObj).subscribe({
            next: (response) => {
              this._matDialogRef.close(true);
            },
            error: (err: Error) => {
              console.log(err);
            }
          });
        }
        // Add new Accessory item
        else{
          this._appDataService.addItem(dataModel, accessoryObj).subscribe({
            next: (response) => {
              this._matDialogRef.close(true);
            },
            error: (err: Error) => {
              console.log(err);
            }
          });
        }
        // Subscribing to addItem function inside app-data.service.ts and sending Accessory data
        
        
      }
      
    }
  }


  
  // REFRACTOR
  readonly separatorKeysCodes = [ENTER] as const;
  fruits: Fruit[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];

  // Make it getter for phase 2
  // get getFormArray(): FormArray{
  getFormArray(formArrayName: FormArrayNameEnum): FormArray{
    // Explained .get('FormGroup_property_name') vs .controls['FormGroup_property_name']
    // So basically .controls['featureTags'] gives us direct access to the controls property of carFormGroup object
    // And .get('featureTags') - gets us the single requested control from the control property of the carFormGroup object

    if(this.carFormGroup){
      return (this.carFormGroup.controls[formArrayName] as FormArray);
    }
    else {
      return (this.accessoryFormGroup?.controls[formArrayName] as FormArray);
    }
    
  }

  // Use this later to generalize the add to FormArray function 
  addToFormArray(formCtrl: FormControl): void {
    
  }

  // Functions for Adding/Editing/Removing FormGroup object in a FormArray

  // ADD FormGroup object in a FormArray
  addChildFormGroupBox(formArrayName: FormArrayNameEnum): void{
    var newOfferTag: OfferTag = {
      name: '',
      color: ''
    }

    this.getFormArray(formArrayName).push(this._fb.group(newOfferTag));
  }

  // Remove FormGroup from FormArray function
  removeFormGrpInFormArray(formGrpIndex: number, formArrayName: FormArrayNameEnum): void{
    this.getFormArray(formArrayName).removeAt(formGrpIndex);
  }


  // Functions for MatChip/MatChipInput/MatChipGrid Material Component's - User Defined (Custom) Events

  // MatChipInput - 'Add' Event Handler
  addMatChipInput(formArrayName: FormArrayNameEnum, event: MatChipInputEvent): void {
    // storing the value sent by the MatChipInputEvent after trimming
    const value = (event.value || '').trim();

    // If the value is not '' or null
    if (value) {
      // Step by step break down for simplification
      // const newFormControl = new FormControl(value); // Instantiating a new FormControl Object with the given value (Step 1)
      // this.getFormArray().push(newFormControl); // Adding the new FormControl object to the FormArray (Step 2)

      // (Step 1) + (Step 2) in one line
      this.getFormArray(formArrayName).push(this._fb.control(value));

      // Note: Validating the newly added form Control in the FormArray
      // No need for this here as it gets triggered automatically. But can be needed where the validation checks don't fire automatically
      // this.getFormArray().updateValueAndValidity;
    }

    // Clearing the input value
    event.chipInput!.clear();
  }

  // MatChip - 'Remove' Event Handler
  removeMatChip(formCtrl: AbstractControl, formArrayName: FormArrayNameEnum): void {
    // Storing the index value for the given FormControl Object in the FormArray
    const index = this.getFormArray(formArrayName).controls.indexOf(formCtrl);
    
    // If the FormControl is found, i.e (index != -1)
    if (index >= 0) {
      this.getFormArray(formArrayName).removeAt(index);
    }
  }

  // MatChip - 'Edit' Event Handler
  editMatChip(formCtrl: AbstractControl, formArrayName: FormArrayNameEnum, event: MatChipEditedEvent): void {
    // Storing the new edited value in a variable
    const value = event.value.trim();

    // Remove FormControl from the FormArray if it is '' or null
    if (!value) {
      this.removeMatChip(formCtrl, formArrayName);
      return;
    }

    // Finding the index of edited/selected FormControl in the FormArray
    const index = this.getFormArray(formArrayName).controls.indexOf(formCtrl);
    // if the FormControl is found, edit its value property by using setValue() 
    if(index >= 0){
      // [Note: patchValue() can also be used here. But it is mostly used for setting partial values. For example in an object where you don't want to set values of all its properties
      this.getFormArray(formArrayName).at(index).setValue(value);
    }
  }

}

// REMOVE
interface Fruit {
  name: string
}