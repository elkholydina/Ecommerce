import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private readonly httpClient = inject( HttpClient )


  addToWishList (id:Object): Observable<any>
  {
    return this.httpClient.post(environment.baseUrl+"wishlist" ,id)
  }
  removeFromWishList (id:string): Observable<any>
  {
    return this.httpClient.delete(environment.baseUrl+`wishlist/${id}`)
  }
  wishList (): Observable<any>
  {
    return this.httpClient.get(environment.baseUrl+`wishlist`)
  }
}
