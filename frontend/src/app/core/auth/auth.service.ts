import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { User } from '../../shared/models/user.model';
import { appConfig } from '../../app-config';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  logIn(user: User): Observable<any> {
    return this.http.post(appConfig.endpoints.login, user)
      .pipe(
        map((res: User) => {
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          return of(error);
        })
      )
  }

  isLoggedIn(): boolean {
    // @TODO change this to token?
    return !!localStorage.getItem('userId');
  }
}
