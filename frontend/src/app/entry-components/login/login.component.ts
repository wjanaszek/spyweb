import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'spy-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  submit(): void {
    const user = new User();
    user.login = this.form.get('login').value;
    user.password = this.form.get('password').value;
    this.authService.logIn(user)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(result => {
        if (result) {
          console.log(result);
          localStorage.setItem('userId', result);
          this.router.navigate([ '/home' ]);
        } else {
          console.log('error while logging in');
        }
      });
  }

}
