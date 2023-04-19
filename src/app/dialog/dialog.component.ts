import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take, takeUntil } from 'rxjs';
import { Product } from '../shared/models/product.model';
import { Category } from '../shared/models/catergory.model';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  productForm!:FormGroup;
  isLoading:boolean = false;
  actionBtnName:string = 'Save';
  
  category: Category[] = [
    {value: 1, viewValue: 'Electronics'},
    {value: 2, viewValue: 'Food/Vegetables'},
    {value: 3, viewValue: 'Furniture'},
    {value: 4, viewValue: 'Clothing'},
  ];



  constructor(private apiService: ApiService,
              private toastrService: ToastrService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private matDialogRef: MatDialogRef<DialogComponent>) {
   }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      categoryId: new FormControl('',{validators:[Validators.required]}),
      productName: new FormControl('',{validators:[Validators.required]}),
      unitPrice: new FormControl('',{validators:[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]}),
      quantity: new FormControl('',{validators:[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]}),
    });

    //to edit product
    if(this.editData){
      this.actionBtnName = 'Update'; 
      this.productForm.controls['categoryId'].setValue(this.editData.categoryId);
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['unitPrice'].setValue(this.editData.unitPrice);
      this.productForm.controls['quantity'].setValue(this.editData.quantity);
    }
  }

  onSubmit() {
    this.isLoading = true;
   if(!this.editData){
     if(this.productForm.valid){
      this.saveProduct();
     }
     return;
   }else{
     this.updateProduct();
   }
  }
  private saveProduct(){
    this.isLoading=true;
    const newProduct: Product = {
      categoryId: this.productForm.get('categoryId')?.value,
      productName: this.productForm.get('productName')?.value,
      unitPrice: this.productForm.get('unitPrice')?.value,
      quantity: this.productForm.get('quantity')?.value,
      createdOn: new Date().toDateString(),
      createdBy: 'Admin'
    }
    this.apiService.postProduct(newProduct)
      .pipe(take(1))
        .subscribe({
          next:(res)=>{
            this.isLoading = false;
            this.productForm.reset();
            this.toastrService.success('Saved Successfully','Success');
            this.matDialogRef.close('Save');
          },
          error: error =>{
            this.isLoading = false;
            this.toastrService.warning('Failed to Save Data','Warning')
          }
        });
  }

    private updateProduct(){
      if(this.productForm.valid){
        const updateDate: Product = {
          categoryId: this.productForm.get('categoryId')?.value,
          productName: this.productForm.get('productName')?.value,
          unitPrice: this.productForm.get('unitPrice')?.value,
          quantity: this.productForm.get('quantity')?.value,
          createdOn: new Date().toDateString(),
          createdBy: 'Admin'
        };
        this.apiService.updateProduct(this.editData.id, updateDate)
        .pipe(take(1))
        .subscribe({
          next: (res)=>{
            this.isLoading = false;
            this.productForm.reset();
            this.toastrService.success('Updated Successfully','Success');
            this.matDialogRef.close('Update');
          },
          error: error =>{
            this.isLoading = false;
            this.toastrService.warning('Failed to Update Data','Warning')
          }
        })
      }else{
        return;
      }
    }
  onReset(): void {
    this.isLoading = false;
    this.productForm.reset();
    this.matDialogRef.close();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
}
