import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'spy-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem('adminId');
    this.router.navigate([ '/login' ]);
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
}
