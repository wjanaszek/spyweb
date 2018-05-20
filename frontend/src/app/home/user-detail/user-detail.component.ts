import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HomeDataService } from '../home-data.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../shared/models/task.model';
import { MatTableDataSource } from '@angular/material';
import { appConfig } from '../../app-config';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'spy-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit, OnDestroy {

  @ViewChild(NgxImageGalleryComponent)
  gallery: NgxImageGalleryComponent;

  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: true,
  };
  dataSource = new MatTableDataSource<Task[]>();
  dateFormat = 'dd/MM/yyyy HH:mm:ss';
  displayedColumns = [ 'id', 'name', 'status', 'creationTime', 'updateTime', 'result' ];
  images: GALLERY_IMAGE[] = [];
  tasks: Task[] = [];
  userName: string;

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
        TimerObservable.create(0, appConfig.constValues.refreshingFrequency)
          .pipe(
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(() => {
            this.loadData(id);
          });
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openPreview(task: Task): void {
    const index = this.images.findIndex(t => t.url === task.fileUrl);
    if (index > -1) {
      this.gallery.open(index);
    }
  }

  private loadData(id: number): void {
    this.homeDataService.loadUserById(id)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        this.dataSource.data = data.taskList;
        this.tasks = data.taskList;
        this.userName = data.name;
        this.images = this.tasks
          .filter(t => t.fileUrl)
          .map(t => {
            return {
              url: t.fileUrl,
              title: t.name + '(' + t.id + ') result'
            };
          });
      });
  }
}
