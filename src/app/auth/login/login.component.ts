import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {TokenStorageService} from '../token-storage.service';
import {AuthLoginInfo} from '../login-info';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  token: any;
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = true;
  flagsCheck = false;
  message = '';
  roles: string[] = [];
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private tokenStorage: TokenStorageService
  ) {


  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const {username, password} = this.loginForm.value;
    const authLoginInfor = new AuthLoginInfo(username, password);
    this.authService.attemptAuth(authLoginInfor).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.roles);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.flagsCheck = true;
        this.message = 'Success';
      },
      error => {
        console.log(error);
        this.isLoginFailed = true;
        this.flagsCheck = true;
        this.message = 'Fail';
      }
    );
  }
  get f() { return this.loginForm.controls; }

  onReset(): void {
    this.submitted = false;
    this.flagsCheck = false;
    this.loginForm.reset();
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    }, );
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    this.flagsCheck = false;

  }


}
