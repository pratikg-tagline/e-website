import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormArray, NgForm, Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { TostererrorService } from 'src/app/shared/tostererror.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  today = new Date().toISOString().split('T')[0];
  name: string = 'Name';
  submitted: boolean = false;
  nameerror: string = 'Please fill Name';
  emailerror: string = 'Please fill Email';
  passworderror: string = 'Please fill Password';
  addresserror: string = 'Please fill Address';
  birthdateerror: string = 'Please fill Birthdate';
  phoneerror: string = 'Please fill Phone no';
  nameshare: string = "We'll never share your name with anyone else.";
  address: string = 'Address';
  addressshare: string = "We'll never share your address with anyone else.";
  email: string = 'Email';
  emailshare: string = "We'll never share your email with anyone else.";
  password: string = 'Password';
  passwordshare: string = "We'll never share your password with anyone else.";
  birthdate: string = 'Birth of Date';
  birthdateshare: string = "We'll never share your birthDate with anyone else.";
  phoneno: string = 'Phone No:';
  phonenoshare: string = "We'll never share your phonenumber with anyone else.";
  userdetails:any

  blockCharacter(e: any) {
    var x = e.which || e.keycode;
    if (x >= 42 && x <= 57) return true;
    else return false;
  }

  signupform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public afAuth: AngularFireAuth,
    private router: Router,
    private tosterrorService: TostererrorService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.signupform = this.fb.group({
      email: this.fb.control('', Validators.required),
      name: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      birthdate: this.fb.control('', Validators.required),
      phone: this.fb.control('', Validators.required),
      address: this.fb.control('', Validators.required),
    });
  }
  get errorshow() {
    return this.signupform.controls;
  }
  signupData(email: string, password: string) {
    if (this.signupform.invalid) {
      this.submitted = true;
    
      return;
    } else {
      this.submitted = false;
      this.userdetails =this.db.collection('user-detils');
      this.userdetails.add({
        ...this.signupform.value
      })
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result.user);
          this.router.navigate(['login']);

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
