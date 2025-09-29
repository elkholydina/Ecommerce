import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private readonly httpClient = inject( HttpClient )

  verifyMail (data:Object): Observable<any>
  {
    return this.httpClient.post(environment.baseUrl+'auth/forgotPasswords' , data)
  }


   verifyCode (data:Object): Observable<any>
  {
    return this.httpClient.post(environment.baseUrl+'auth/verifyResetCode' , data)
  }

  resetPassword ( data: Object ): Observable<any>
  {
    return this.httpClient.put(environment.baseUrl+'auth/resetPassword' , data)
  }
}
