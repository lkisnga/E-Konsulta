import { formatDate } from '@angular/common';
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
        console.log(this.newUser);
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

  registerWithEmail_patient(user) {
    return this.afu.createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;
        console.log(this.newUser);
        userCredential.user.updateProfile( {
          displayName: user.fullname
        });
        this.insertUserData_patient(userCredential)

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
  insertUserData_patient(userCredential: firebase.auth.UserCredential) {
    return this.db.collection('Users').doc(userCredential.user.uid).set({
      email: this.newUser.email,
      password: this.newUser.password,
      fullname: this.newUser.fullname,
      dob: this.newUser.dob,
      contact_num: this.newUser.contact_num,
      role: 'patient',
      status:'active',
      createdAt: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      UpdatedAt: formatDate(new Date(), 'MM/dd/yyyy', 'en')
    })
  }
  registerWithEmail_Lab(user) {
    return this.afu.createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;
        console.log(this.newUser);
        userCredential.user.updateProfile( {
          displayName: user.fullName
        });
          this.insertUserData_Lab(userCredential)
          this.insertUserData_UserLab(userCredential);

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
  insertUserData_UserLab(userCredential: firebase.auth.UserCredential) {
    return this.db.collection('Users').doc(userCredential.user.uid).set({
      email: this.newUser.email,
      role: 'laboratory_partner'
    })
  }
  insertUserData_Lab(userCredential: firebase.auth.UserCredential) {
    return this.db.collection('Laboratory_Partner').doc(userCredential.user.uid).set({
      email: this.newUser.email,
      password: this.newUser.password,
      name: this.newUser.name,
      address: this.newUser.address,
      contact_number: this.newUser.contact_number,
      role: 'laboratory_partner'
    })
  }

  registerWithEmail_Doctor(user) {
    return this.afu.createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;
        console.log(this.newUser);
        userCredential.user.updateProfile( {
          displayName: user.fullName
        });
          this.insertUserData_Doctor(userCredential)

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
  insertUserData_Doctor(userCredential: firebase.auth.UserCredential) {
    return this.db.collection('Laboratory_Partner').doc(userCredential.user.uid).set({
      email: this.newUser.email,
      password: this.newUser.password,
      fullname: this.newUser.name,
      address: this.newUser.address,
      contact_number: this.newUser.contact_number,
      role: 'laboratory_partner'
    })
  }
  

  //Get user Data
  get_userData()
  {
    return this.db.firestore.collection('Users').get();
  }
  //admin
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.collection('Users').doc(userCredential.user.uid).set({
      email: this.newUser.emailAddress,
      password: this.newUser.password,
      fullname: this.newUser.fullName,
      dob: this.newUser.dob,
      role: 'admin'
    })
  }

  loginWithEmail(email: string, password: string,role : string)
  {
    return this.afu.signInWithEmailAndPassword(email,password).then(res=>{
      localStorage.setItem('Users',JSON.stringify(res.user));
    }).then(() => {
      if(role == "admin")
        this.router.navigate(['/admin-profile'])
      if(role=="laboratory_partner")
        this.router.navigate(['/lab-partner-profile'])
      if(role=="patient")
        this.router.navigate(['/patient-profile']);
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
