import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable( {
  providedIn: 'root'
} )
export class AuthserviceService
{
  private readonly httpClient = inject( HttpClient )

  signupData (body:object): Observable<any>
  {
    return this.httpClient.post(environment.baseUrl + 'auth/signup' , body)
  }
  loginData (body:object): Observable<any>
  {
    return this.httpClient.post(environment.baseUrl + 'auth/signin' , body)
  }
}
