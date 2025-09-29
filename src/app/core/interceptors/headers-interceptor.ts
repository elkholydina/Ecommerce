import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = ( req, next ) =>
{
  let token :string = localStorage.getItem( 'token' ) || ""
  if ( localStorage.getItem( 'token' ) )
  {
    req = req.clone({setHeaders:{'token' :token}})
  }

  return next(req);
};
