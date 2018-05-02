import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { appConfig } from '../app-config';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Client } from '../shared/models/client.model';

@Injectable()
export class HomeDataService {

  constructor(private http: HttpClient) {
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

}
