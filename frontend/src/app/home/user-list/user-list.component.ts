import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeDataService } from '../home-data.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { appConfig } from '../../app-config';
import { takeUntil } from 'rxjs/operators';
import { TaskType } from '../../shared/enums/task-type.enum';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'spy-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [ './user-list.component.css' ]
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[] = [];
  dataSource = new MatTableDataSource<User>();
  displayedColumns = [ 'id', 'name', 'status', 'actions' ];
  menuUser: User;
  taskType = TaskType;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private homeDataService: HomeDataService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    TimerObservable.create(0, appConfig.constValues.refreshingFrequency)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => this.loadData());
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  details(user: User): void {
    this.router.navigate([ '/home/users', user.id.toString() ]);
  }

  dispatchTask(taskType: TaskType): void {
    this.homeDataService.dispatchTask(taskType, this.menuUser)
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

  onMenuClosed(): void {
    this.menuUser = null;
  }

  onMenuOpened(user: User): void {
    this.menuUser = user;
  }

  private loadData(): void {
    this.homeDataService.loadAllUsers()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        this.users = data;
        this.dataSource.data = data;
      });
  }
}
