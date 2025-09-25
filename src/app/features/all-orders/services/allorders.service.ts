import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable( {
  providedIn: 'root'
} )
export class AllordersService
{

  private readonly HttpClient = inject( HttpClient )

  getAllUserOrders ( id: string ): Observable<any>
  {
    return this.HttpClient.get( environment.baseUrl + `orders/user/${ id }` )

  }
}
