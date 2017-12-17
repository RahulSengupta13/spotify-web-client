import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private authService: AuthService;
    constructor(
        private injector: Injector
    ) {}
    
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    this.authService = this.injector.get(AuthService);
    request = request.clone({
      setHeaders: {
        'Authorization': 'Basic ' + this.authService.getEncoded()
      }
    });
    return next.handle(request);
  }
}