import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth,   private db: AngularFirestore,) {}
  userdetails:any
  signupemailandpassword(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginemailandpassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  userdetailcollection(value:any){
  const userdetails = this.db.collection('user-detils');
     return userdetails.add({
      ...value,
    });
  }
 
}
