import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormArray, NgForm, Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TostererrorService } from 'src/app/shared/tostererror.service';
import { AuthService } from '../../services/auth.service';
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
    private tosterrorService: TostererrorService,
    private authService:AuthService
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
  loginData() {
    if (this.loginform.invalid) {
      this.submitted = true;
      return;
    } else {
      this.submitted = false;
     this.authService.loginemailandpassword(this.loginform.value.email,this.loginform.value.password)
        .then((result:any) => {
          this.tosterrorService.showSuccess(
            'You have been successfully registered!'
          );
          localStorage.setItem('access-token', result.user._delegate.accessToken);
          this.router.navigate(['/admin'])
          if (result.user._delegate.accessToken === 'admin') {
          //  this.router.navigate(['../admindesk'])
          } else {
            // this.router.navigate(['']);
          }
        })
        .catch((error) => {
          this.tosterrorService.error(
            'The email address is already in use by another account. '
          );
        });
    }
  }
}
