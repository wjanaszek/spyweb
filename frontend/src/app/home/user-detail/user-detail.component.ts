import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeDataService } from '../home-data.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../shared/models/task.model';
import { MatTableDataSource } from '@angular/material';
import { appConfig } from '../../app-config';

@Component({
  selector: 'spy-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource<Task[]>();
  displayedColumns = [ 'id', 'name', 'status', 'result' ];
  tasks: Task[] = [];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private homeDataService: HomeDataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(params => {
        const id = +params[ 'id' ];
        this.loadAndRefreshData(id);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private loadAndRefreshData(id: number): void {
    this.homeDataService.loadUserById(id)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        this.dataSource.data = data.taskList;
        this.tasks = data.taskList;
      });

    setInterval(() => {
      this.homeDataService.loadUserById(id)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(data => {
          this.dataSource.data = data.taskList;
          this.tasks = data.taskList;
        });
    }, appConfig.constValues.refreshingFrequency);
  }
}
