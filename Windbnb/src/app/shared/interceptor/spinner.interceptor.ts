import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, mergeMap, Observable } from 'rxjs';
import { SpinnerService } from '../service/spinner.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private readonly servSpinner: SpinnerService, private auth: AngularFireAuth) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.servSpinner.show();
    return next.handle(request).pipe(
      finalize(()=> this.servSpinner.hide())
    );
  }

}

