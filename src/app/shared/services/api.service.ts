import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, Subscription, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl=  'http://localhost:3000/productList/'
  productList: any = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  getProduct(): Observable<any>{
    return this.http.get<any>(this.apiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getProductById(id:any): Observable<Product>{
    return this.http.get<Product>(this.apiUrl +id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  postProduct(product:Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl,JSON.stringify(product), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateProduct(id: any, product:Product): Observable<Product>{
    return this.http.put<Product>(this.apiUrl + id, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteProduct(id:any): Observable<Product>{
    return this.http.delete<Product>(this.apiUrl+id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
