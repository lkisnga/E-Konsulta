import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public db: AngularFirestore, public afau: AngularFireAuth, public router: Router) { }

  get_UserInfo(userID: string)
  {
     return this.db.firestore.collection('Users').doc(userID).get();
  }
}
