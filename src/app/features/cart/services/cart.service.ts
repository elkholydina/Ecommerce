import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService
{

  private readonly httpClient = inject( HttpClient )


  addToCart ( id: string ): Observable<any>
  {

     return this.httpClient.post( environment.baseUrl + "cart", { productId: id })
  }
  getCart (): Observable<any>
  {
     return this.httpClient.get( environment.baseUrl + "cart")
  }
  removeSpecificProduct (id:string): Observable<any>
  {
     return this.httpClient.delete( environment.baseUrl + `cart/${id}`)
  }
  updateProduct (count:number , id:string): Observable<any>
  {
     return this.httpClient.put( environment.baseUrl + `cart/${id}`,{count : count})
  }
  checkOutPayment (id:string , data:object): Observable<any>
  {
     return this.httpClient.post( environment.baseUrl + `orders/checkout-session/${id}?url=http://localhost:4200`,data)
  }
  cashPayment (id:string , data:object): Observable<any>
  {
     return this.httpClient.post( environment.baseUrl + `orders/checkout-session/${id}?url=http://localhost:4200`,data)
  }
}
