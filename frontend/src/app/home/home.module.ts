import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeDataService } from './home-data.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeDataService
  ]
})
export class HomeModule {
}
