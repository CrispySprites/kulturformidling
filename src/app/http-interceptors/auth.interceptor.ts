import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      const token : string | null = localStorage.getItem('auth-token');
      if(token) {
        const cloned : HttpRequest<any> = request.clone({
          headers: request.headers.set('Authorization', 'bearer ' + token),
        });
        console.log(cloned)
        return next.handle(cloned);
      }
      else {
        return next.handle(request);
      }
  }
}
