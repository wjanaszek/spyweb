import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeDataService } from '../home-data.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'spy-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: [ './client-detail.component.css' ]
})
export class ClientDetailComponent implements OnInit, OnDestroy {

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
        const id = +params['id'];
        this.homeDataService.loadClientById(id)
          .pipe(
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(data => {
            this.tasks = data.taskList;
          });
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
