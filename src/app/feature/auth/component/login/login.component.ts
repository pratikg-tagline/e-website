import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormArray, NgForm, Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TostererrorService } from 'src/app/shared/tostererror.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginform!: FormGroup;
  doaccount: string = 'Do not have an account?';
  register: string = 'Register';
  emailerror: string = 'Please fill Email';
  passworderror: string = 'Please fill Password';
  submitted: boolean = false;
  email: string = 'Email';
  password: string = 'Password';
  forgotpassword: string = 'Forgot password?';
  emailshare: string = "We'll never share your email with anyone else.";
  passwordshare: string = "We'll never share your password with anyone else.";
  constructor(
    private fb: FormBuilder,
    public afAuth: AngularFireAuth,
    private router: Router,
    private tosterrorService: TostererrorService
  ) {}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });
  }
  get errorshow() {
    return this.loginform.controls;
  }
  loginData(email: string, password: string) {
    if (this.loginform.invalid) {
      this.submitted = true;
      return;
    } else {
      this.submitted = false;
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.tosterrorService.showSuccess(
            'You have been successfully registered!'
          );
        })
        .catch((error) => {
          this.tosterrorService.error(
            'The email address is already in use by another account. '
          );
        });
    }
  }
}
