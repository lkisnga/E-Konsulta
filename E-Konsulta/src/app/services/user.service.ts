import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public db: AngularFirestore, public afau: AngularFireAuth, public router: Router,public store: AngularFireStorage) { }

  get_UserInfo(user_id: string)
  {
     return this.db.firestore.collection('Users').doc(user_id).get();
  }
  get_doctorList()
  {
    return this.db.firestore.collection('Users').where("role", "==", "doctor").get();
  }

  update_user(user_id,record)
  {
    this.db.collection('Users').doc(user_id).update(record);
    //console.log(record);
  }
  get_avatar(user_id)
  {
    return this.db.firestore.collection('avatar').doc(user_id).get();
  }
  upload_avatar(a, user_id)
  {
    //Uploading image into fireStorage
    this.store.ref('Users/' + user_id + '/profile.jpg').put(a).then(res =>{
      console.log('successfully uploaded!');

      //getting image URL and pass it into fireStore avatar
      this.afau.onAuthStateChanged(user => {
        if(user)
        this.store.storage.ref('Users/' + user_id + '/profile.jpg').getDownloadURL().then(e =>{
          this.db.collection('avatar').doc(user_id).set({
            image : e
          })
          console.log("Profile Changed!");
        })
      })
    }).catch(error => {
      console.log(error.message);
    })
  }
}
