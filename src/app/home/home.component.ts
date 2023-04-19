import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { DialogComponent } from '../dialog/dialog.component';
import { FooterComponent } from '../footer/footer.component';
import { Category } from '../shared/models/catergory.model';
import { Product } from '../shared/models/product.model';
import { ApiService } from '../shared/services/api.service';
import { PromptDialogService } from '../shared/services/promptDialog/promptdialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['s.n','categoryId','productName','unitPrice','quantity','createdOn','actions'];
  dataSource!: MatTableDataSource<any>;
  productList: Product[]= [];
  isLoading: boolean = false;
  private unsubscribe$ : Subject<void>;
  cName!:'';
  isConfirm: boolean = false;

  @ViewChild(DialogComponent) child!: DialogComponent;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( public dialog: MatDialog, 
    private apiService: ApiService,
    private dialogService: PromptDialogService,
    private toastr: ToastrService
    ) {
    this.unsubscribe$ = new Subject();
   }
  ngOnInit() {
    
    this.getAllProduct();
  }

  ngAfterViewInit() {
    console.log(this.child);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30%';
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true; //disable esc key to close dialog
    this.dialog.open(DialogComponent, dialogConfig).afterClosed().subscribe(val=>{
      if(val==='Save'){
        this.getAllProduct();
      }
    });
  }

  getAllProduct(){
    this.isLoading = true;
    this.apiService.getProduct()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (res)=>{
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      error:(error)=>{
        this.isLoading=false;
        this.toastr.warning(error, 'Error')
      }
    });
  }

  getCategoryName(cId:any){
    this.child.category.forEach((item:any)=>{
      if(item.value == cId){
        this.cName = item.viewValue;
        return this.cName;
      }
      return 0;
    })
  }

  editProduct(row:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30%';
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = row;
    this.dialog.open(DialogComponent,dialogConfig)
    .afterClosed().subscribe(val=>{
      if(val === 'Update'){
        this.getAllProduct();
      }
    });
  }

  deleteProduct(id:any){
   this.dialogService.openDialog().subscribe((res)=>{
     if(res===true){
       this.apiService.deleteProduct(id).subscribe({
         next: ()=>{
           this.isLoading = false;
           this.toastr.success("Deleted Successfully.");
           this.getAllProduct();
         },
         error:error =>{
                this.isLoading = false;
                this.toastr.warning(error,'Warning');
              }
       })
     }
     return;
   });
    
    // const ans = confirm('Do you want to delete this'+id+ 'record');
    // if(ans){
    //   this.apiService.deleteProduct(id).subscribe({
    //     next:()=>{
    //       this.isLoading = false;
    //       this.toastr.success("Deleted Successfully", 'Success');
    //       this.getAllProduct();
    //     }, 
    //     
    //   })
    // }
    // return;
  }

}

