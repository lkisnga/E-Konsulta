import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser: any;

  authState: any = null;
  constructor(private afu : AngularFireAuth, private router: Router, private db: AngularFirestore, public store: AngularFireStorage) { 
    this.afu.authState.subscribe((auth =>{
      this.authState = auth;
    }))
  }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }
  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  registerWithEmail(user) {
    return this.afu.createUserWithEmailAndPassword(user.emailAddress, user.password)
      .then((userCredential) => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.fullName
        });
        this.insertUserData(userCredential)

        this.afu.onAuthStateChanged(user => {
          if(user)
        this.store.storage.ref('Users/' + 'default' + '/profile.jpg').getDownloadURL().then(e =>{
          this.db.collection('avatar').doc(userCredential.user.uid).set({
            image : e
          })
        })
      }) 

      })
      .catch(error => {
        console.log(error)
        throw error
      });

  }
  //Get user Data
  get_userData()
  {
    return this.db.firestore.collection('Users');
  }

  
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.collection('Users').doc(userCredential.user.uid).set({
      emailAddress: this.newUser.emailAddress,
      password: this.newUser.password,
      fullName: this.newUser.fullName,
      age: this.newUser.age,
      role: 'admin'
    })
  }
  /*loginWithEmail(email: string, password: string)
  {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error) 
        throw error
      });
  }*/
  loginWithEmail(email: string, password: string)
  {
    return this.afu.signInWithEmailAndPassword(email,password).then(res=>{
      localStorage.setItem('Users',JSON.stringify(res.user));
      
    }).then(() => {
      this.router.navigate(['/admin-profile'])
      console.log('works!');
     })
  }
  get_UID()
  {
    var data= JSON.parse(localStorage.getItem('Users'));
    if(data!=null)
      return data.uid
    else
      this.router.navigate(['/login']);
  }
  signout() : void
  {
    this.afu.signOut();
    localStorage.removeItem('Users');
    this.router.navigate(['/landing']);
  }
}
