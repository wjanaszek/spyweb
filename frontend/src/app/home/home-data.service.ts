import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { appConfig } from '../app-config';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { TaskType } from '../shared/enums/task-type.enum';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { User } from '../shared/models/user.model';

@Injectable()
export class HomeDataService {

  constructor(private http: HttpClient) {
  }

  // @TODO add task type when another task than taking photo available
  dispatchTask(taskType: TaskType, user: User): Observable<any> {
    return this.http.post(appConfig.endpoints.dispatchTaskToUser.replace(':id', user.id.toString()), { taskType: taskType })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return new ErrorObservable(error);
        })
      );
  }

  loadAllUsers(): Observable<any> {
    return this.http.get(appConfig.endpoints.loadAllUsers)
      .pipe(
        map((res: any[]) => {
          return res.map(c => {
            return User.deserialize<User>(c);
          });
        }),
        catchError((error: HttpErrorResponse) => of(error))
      );
  }

  loadUserById(id: number): Observable<any> {
    return this.http.get(appConfig.endpoints.loadUserById.replace(':id', id.toString()))
      .pipe(
        map((res) => {
          // @TODO make this Client object, not JS object
          return User.deserialize<User>(res);
        }),
        catchError((error: HttpErrorResponse) => of(error))
      );
  }

}
