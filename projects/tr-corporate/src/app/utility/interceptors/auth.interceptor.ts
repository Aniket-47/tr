import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';
import { LSkeys } from '../configs/app.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private lsServ: LstorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.lsServ.getItem(LSkeys.BEARER_TOKEN);
    let authReq

    if (accessToken) {
      authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    } else {
      authReq = request.clone();
    }

    // Pass on the cloned request instead of the original request.
    return next.handle(authReq) //.pipe((source) => this.handleAuthErrors(source));
  }



  // handleAuthErrors(
  //   source: Observable<HttpEvent<any>>,
  // ): Observable<HttpEvent<any>> {
  //   return source.pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 401) {
  //         this.router.navigate(['/auth/login']);
  //         return EMPTY;
  //       } else {
  //         return throwError(error);
  //       }
  //     }),
  //   )
  // }
}
