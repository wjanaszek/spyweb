import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Client } from '../shared/models/client.model';
import { HomeDataService } from './home-data.service';
import { Subject } from 'rxjs/Subject';
import { map, takeUntil } from 'rxjs/operators';
import { appConfig } from '../app-config';
import { TaskType } from '../shared/enums/task-type.enum';

@Component({
  selector: 'spy-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit, OnDestroy {

  clients: Client[] = [];
  clientMenu: Client;
  dataSource = new MatTableDataSource<Client>();
  displayedColumns = [ 'id', 'actions' ];
  taskType = TaskType;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private homeDataService: HomeDataService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadAndRefreshData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  dispatchTask(taskType: TaskType): void {
    this.homeDataService.dispatchTask(taskType, this.clientMenu)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((result: any) => {
        if (result.id > 0) {
          this.snackBar.open('Task dispatched', 'OK', {
            duration: appConfig.constValues.notificationDuration
          });
        }
      });
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate([ '/login' ]);
  }

  onMenuClosed(): void {
    this.clientMenu = null;
  }

  onMenuOpened(client: Client): void {
    this.clientMenu = client;
  }

  private loadAndRefreshData(): void {
    this.homeDataService.loadAllClients()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        this.clients = data;
        this.dataSource.data = data;
      });

    setInterval(() => {
      this.homeDataService.loadAllClients()
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(data => {
          this.clients = data;
          this.dataSource.data = data;
        });
    }, appConfig.constValues.refreshingFrequency);
  }
}
