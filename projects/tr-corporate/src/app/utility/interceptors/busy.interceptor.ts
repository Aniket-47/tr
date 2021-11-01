import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { State } from '../store/reducers';
import { Store } from '@ngrx/store';
import { setAppLoader } from '../store/actions/app.action';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {

  constructor(private store: Store<State>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const msg = request.method === 'GET' ? 'Loading ...' : 'Saving ...';
    this.store.dispatch(setAppLoader({data: true}));

    return next.handle(request).pipe(
      finalize(() => {
        this.store.dispatch(setAppLoader({data: false}));
      }),
    );
  }
}
