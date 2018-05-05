import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { appConfig } from '../../app-config';
import { Admin } from '../../shared/models/admin.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  logIn(admin: Admin): Observable<any> {
    return this.http.post(appConfig.endpoints.login, admin)
      .pipe(
        map((res: Admin) => {
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          return of(error);
        })
      )
  }

  isLoggedIn(): boolean {
    // @TODO change this to token?
    return !!localStorage.getItem('adminId');
  }
}
