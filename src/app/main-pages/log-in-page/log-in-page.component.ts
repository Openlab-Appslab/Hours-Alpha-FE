import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})
export class LogInPageComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private cookies: CookieService,
  ) { }

  ngOnInit(): void {
  }

  loginGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  stateEmployer = this.cookies.get('stateEmployer');

  login(): void {
    if(this.loginGroup.valid) {
      const email = this.loginGroup.value.email;
      const password = this.loginGroup.value.password;

      this.authService.login(email, password)
      .subscribe(response => {
        if (response.employer) {
          this.router.navigateByUrl('/emp_dashboard');
        } else {
          this.router.navigateByUrl('/dashboard');
        }
      })
    }
  }
}
