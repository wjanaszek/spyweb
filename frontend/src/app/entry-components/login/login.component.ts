import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Admin } from '../../shared/models/admin.model';

@Component({
  selector: 'spy-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loginError: boolean;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      login: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  submit(): void {
    this.loginError = false;
    const admin = new Admin();
    admin.login = this.form.get('login').value;
    admin.password = this.form.get('password').value;
    this.authService.logIn(admin)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((result: any) => {
        if (result.id > 0) {
          localStorage.setItem('adminId', result.id.toString());
          this.router.navigate([ '/home' ]);
        } else {
          this.loginError = true;
          console.log('error while logging in');
        }
      });
  }

}
