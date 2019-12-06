import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MustMatch} from './helpers/must-match.validator';
import {SignUpInfo} from '../signup-info';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
              private authService: AuthService) { }
  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue]
    },
      {
        validators: MustMatch('password', 'confirmPassword')
      });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    const{name, email, username, password} = this.registerForm.value;
    const signUpInforForm = new SignUpInfo(name, email, username, password);
    this.authService.signUp(signUpInforForm).subscribe(
      data => {
        console.log(data);
        alert('Thanh cong');
      },
      error => {
        console.log('That bai');
      }
    );
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('Success');

  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
