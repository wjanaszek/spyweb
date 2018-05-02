import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@NgModule({
  providers: [
    AuthGuard,
    AuthService,
  ]
})
export class CoreModule {
}
