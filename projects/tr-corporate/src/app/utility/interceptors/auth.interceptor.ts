import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


import { BearerTokenService } from '../services/bearer-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private bearerTokenServ:BearerTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
