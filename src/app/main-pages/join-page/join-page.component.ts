import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.css']
})
export class JoinPageComponent implements OnInit {

  constructor(
    private readonly registerService: RegisterService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  signUpGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required)
  })

  login(): void {
    if(this.signUpGroup.valid) {
      const firstName = this.signUpGroup.value.firstName;
      const lastName = this.signUpGroup.value.lastName;
      const email = this.signUpGroup.value.email;
      const password = this.signUpGroup.value.password;
      const repeatPassword = this.signUpGroup.value.repeatPassword;
        
      if(password == repeatPassword){
        const finalPassword = password;

          this.registerService.register(firstName, lastName, email, finalPassword)
        .subscribe(() => this.router.navigateByUrl('/login'));
      }
    } 
  }
}

export const enum PasswordCheckStrength{
  Short,
  Common,
  Weak,
  Ok,
  Strong,
}

export class PasswordCheckService{

  public static get MinimumLength(): number {
    return 5;
  }

  private commonPasswordsPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|ahoj1.*|zxcvb.*/; //commonpasswords

  public isPasswordCommon(password: string): boolean {
    return this.commonPasswordsPatterns.test(password);
  }

  public checkPasswordStragth(password: string): PasswordCheckStrength{
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
    numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
    numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
    numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters

    let currentPasswordStrength = PasswordCheckStrength.Short;

    if (password === null || password.length < PasswordCheckService.MinimumLength) {
      currentPasswordStrength = PasswordCheckStrength.Short;
  } else if (this.isPasswordCommon(password) === true) {
      currentPasswordStrength = PasswordCheckStrength.Common;
  } else if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
      currentPasswordStrength = PasswordCheckStrength.Weak;
  } else if (numberOfElements === 3) {
      currentPasswordStrength = PasswordCheckStrength.Ok;
  } else {
      currentPasswordStrength = PasswordCheckStrength.Strong;
  }
  return currentPasswordStrength;
  }
}

