import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = ( req, next ) =>
{
  let toastr = inject(ToastrService)
  return next( req ).pipe( catchError( (e) =>
  {

    toastr.error(e.error.message);
    console.log(e.error.message)
    return throwError(e)
  } )
  )
};
