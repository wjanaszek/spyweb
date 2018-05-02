import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Client } from '../shared/models/client.model';
import { HomeDataService } from './home-data.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { appConfig } from '../app-config';

@Component({
  selector: 'spy-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit, OnDestroy {

  clients: Client[] = [];
  dataSource = new MatTableDataSource<Client>();
  displayedColumns = ['id', 'actions'];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private homeDataService: HomeDataService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadAndRefreshData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate([ '/login' ]);
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
