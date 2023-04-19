import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../shared/models/product.model';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  checked:boolean = false;
  private unsubscribe$ : Subject<void>;
  constructor(public apiService: ApiService) {this.unsubscribe$ = new Subject(); }

  checkboxArray: any= [
    {
      id: 1,
      type: 'checkbox',
      price:1400
    },
    {
      id: 2,
      type: 'checkbox',
      price:2000
    },
    {
      id: 3,
      type: 'checkbox',
      price:35000
    },
    {
      id: 4,
      type: 'checkbox',
      price:4000
    }
  ]

  ngOnInit() {
    this.getProduct();
  }
  allProducts:Product[] = [];
  productArr: Product[] = [];
  getProduct(){
    this.apiService.getProduct()
    .pipe(takeUntil(this.unsubscribe$)).
    subscribe({
      next: (res)=>{
        this.allProducts = res;
        this.productArr = res;
        console.log(this.allProducts);
      },
      error:error =>{
        console.log(error);
      }
      
    })
  } 

   tempArr:any =  [];
   newArr:any = [];
  onChangePrice(e:any){
    let unitprice = e.source.value;
    if(e.source.checked){
      this.tempArr = this.productArr.filter((x:any)=>x.unitPrice==unitprice);
      this.allProducts = [];
      this.newArr.push(this.tempArr);
      for(let i=0;i<this.newArr.length;i++){
        var firstArr = this.newArr[i];
        for(let i=0;i<firstArr.length;i++){
          var obj = firstArr[i];
          this.allProducts.push(obj);
        }
      }
    }
    else{
      this.tempArr = this.allProducts.filter((x:any)=>x.unitPrice!=unitprice);
      this.newArr = [];
      this.allProducts = [];
      this.newArr.push(this.tempArr);
      for(let i=0;i<this.newArr.length;i++){
        var firstArr = this.newArr[i];
        for(let i=0;i<firstArr.length;i++){
          var obj = firstArr[i];
          this.allProducts.push(obj);
        }
      }
    }
  }
}
