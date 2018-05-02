import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeDataService } from '../home-data.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { appConfig } from '../../app-config';
import { takeUntil } from 'rxjs/operators';
import { Client } from '../../shared/models/client.model';
import { TaskType } from '../../shared/enums/task-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'spy-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: [ './client-list.component.css' ]
})
export class ClientListComponent implements OnInit, OnDestroy {

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

  onDoubleClick(client: Client): void {
    this.router.navigate(['/home/clients', client.id.toString()]);
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
