import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeDataService } from './home-data.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    UserDetailComponent,
    UserListComponent
  ],
  providers: [
    HomeDataService
  ]
})
export class HomeModule {
}
