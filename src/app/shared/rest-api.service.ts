import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../shared/product';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // Define API
  apiURL = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch product list
  getProducts(): Observable<Product> 
  {
    return this._http.get<Product>(this.apiURL + '/products')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getProduct(id): Observable<Product>
  {
    return this._http.get<Product>(this.apiURL + '/products/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  createProduct(product): Observable<Product>
  {
    return this._http.post<Product>(this.apiURL + '/products', JSON.stringify(product), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateProduct(id, product): Observable<Product> 
  {
    return this._http.put<Product>(this.apiURL + '/products/' + id, JSON.stringify(product), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteProduct(id){
    return this._http.delete<Product>(this.apiURL + '/products/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) 
  {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}


