import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { appConfig } from '../app-config';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Client } from '../shared/models/client.model';
import { TaskType } from '../shared/enums/task-type.enum';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class HomeDataService {

  constructor(private http: HttpClient) {
  }

  // @TODO add task type when another task than taking photo available
  dispatchTask(taskType: TaskType, client: Client): Observable<any> {
    return this.http.post(appConfig.endpoints.dispatchTaskToClient.replace(':id', client.id.toString()), { taskType: taskType })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return new ErrorObservable(error);
        })
      );
  }

  loadAllClients(): Observable<any> {
    return this.http.get(appConfig.endpoints.loadAllClients)
      .pipe(
        map((res: any[]) => {
          return res.map(c => {
            const client = new Client();
            client.id = c.id;
            client.ip = c.ip;
            client.status = c.status;
            return client;
          });
        }),
        catchError((error: HttpErrorResponse) => of(error))
      );
  }

  loadClientById(id: number): Observable<any> {
    return this.http.get(appConfig.endpoints.loadClientById.replace(':id', id.toString()))
      .pipe(
        map((res) => {
          // @TODO make this Client object, not JS object
         return Client.deserialize<Client>(res);
        }),
        catchError((error: HttpErrorResponse) => of(error))
      );
  }

}
