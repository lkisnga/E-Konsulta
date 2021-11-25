import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser: any;

  authState: any = null;
  constructor(public fireb : FirebaseApp, private afu : AngularFireAuth, private router: Router, private db: AngularFirestore, public store: AngularFireStorage) { 
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
      address : this.newUser.address,
      contact_number: this.newUser.contact_number,
      member_ID: this.newUser.member_ID,
      health_insurance : this.newUser.health_insurance,
      role: 'patient',
      status:'active',
      createdAt: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      updatedAt: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      isVerified: "pending",
      disabled: "false"
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
      role: 'laboratory_partner',
      status: "active"
    })
  }
  insertUserData_Lab(userCredential: firebase.auth.UserCredential) {
    return this.db.collection('Laboratory_Partner').doc(userCredential.user.uid).set({
      email: this.newUser.email,
      password: this.newUser.password,
      name: this.newUser.name,
      address: this.newUser.address,
      contact_number: this.newUser.contact_number,
      createdAt: formatDate(new Date(),"MM/dd/yyyy",'en'),
      role: 'laboratory_partner',
      disabled: "false"
    })
  }

  registerWithEmail_HealthInsurance(user) {
    return this.afu.createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;
        console.log(this.newUser);
        userCredential.user.updateProfile( {
          displayName: user.fullName
        });
          this.insertUserData_HealthInsurance(userCredential)
          this.insertUserData_UserHealth(userCredential);

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

  insertUserData_UserHealth(userCredential: firebase.auth.UserCredential) {
    return this.db.collection('Users').doc(userCredential.user.uid).set({
      email: this.newUser.email,
      role: 'Health_Insurance',
      status: "active",
    })
  }
  insertUserData_HealthInsurance(userCredential: firebase.auth.UserCredential) {
    return this.db.collection('Health_Insurance').doc(userCredential.user.uid).set({
      email: this.newUser.email,
      password: this.newUser.password,
      name: this.newUser.name,
      address: this.newUser.address,
      contact_number: this.newUser.contact_number,
      branchname: this.newUser.branchname,
      createdAt: formatDate(new Date(),"MM/dd/yyyy",'en'),
      role: 'Health_Insurance',
      disabled: "false"
    })
  }

  registerWithEmail_Doctor(user) {
    return this.afu.createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;
        console.log(this.newUser);
        userCredential.user.updateProfile( {
          displayName: user.fullname
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
    return this.db.collection('Users').doc(userCredential.user.uid).set({
      email: this.newUser.email,
      password: this.newUser.password,
      fullname: this.newUser.fullname,
      address: this.newUser.address,
      contact_number: this.newUser.contact_number,
      license_number: this.newUser.license_number,
      specialization: this.newUser.specialization,
      dob: this.newUser.dob,
      consultation_fee : 0,
      createdAt: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      updatedAt: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      status: 'active',
      role: 'doctor',
      disabled: "false",
      isVerified: "pending"
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
      if(role=="doctor")
        this.router.navigate(['/doctor-profile']);
      if(role=="Health_Insurance")
        this.router.navigate(['/health-insurance-profile']);
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

  delete_user()
  {
    return this.fireb.auth().currentUser.delete().catch(error=>{
      throw error;
    })
  }

  reset_password(email)
  {
   return this.afu.sendPasswordResetEmail(email);
  }
  signout() : void
  {
    this.afu.signOut();
    localStorage.removeItem('Users');
    localStorage.removeItem('data');
    this.router.navigate(['/landing']);
  }
}
