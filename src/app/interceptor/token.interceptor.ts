import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private authService: AuthService;
    constructor(
        private injector: Injector
    ) {}
    
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    this.authService = this.injector.get(AuthService);
    if(request.url=='https://accounts.spotify.com/api/token'){
        request = request.clone({
            setHeaders: {
                'Authorization': 'Basic ' + this.authService.getEncoded()
            }
        });
    } else {
        request = request.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + this.authService.getAccessToken()
            }
        });
    }
    
    return next.handle(request).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            console.log(err.error);
          }
        }
      });
  }
}