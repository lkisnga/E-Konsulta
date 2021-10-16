import { formatDate } from '@angular/common';
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

  create_Specialization(a)
  {
    this.db.collection('specialization').add({
      name: a.name,
      description: a.description,
      created_at: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      updated_at: formatDate(new Date(), 'MM/dd/yyyy', 'en')
    }).then(function(){
      console.log("Added!");
    })
  }

  create_HealthInsurance(a)
  {
    this.db.collection('Health_Insurance').add({
      name: a.name,
      branchname: a.branchname,
      address: a.address
    }).then(function(){
      console.log("Added!");
    })
  }

  get_patient()
  {
    return this.db.firestore.collection('Users').where("role", "==", "patient").get();
  }
  get_patientInfo(id)
  {
    return this.db.firestore.collection('Patient_Info').doc(id).get()
  }
  get_Speciaalization()
  {
    return this.db.collection('specialization').snapshotChanges();
  }
  get_labPartner()
  {
    return this.db.collection('Laboratory_Partner').get();
  }
  get_labInfo(id)
  {
    return this.db.collection('Laboratory_Partner').doc(id).get();
  }
  get_UserInfo(user_id: string)
  {
     return this.db.firestore.collection('Users').doc(user_id).get();
  }
  get_doctorList()
  {
    return this.db.firestore.collection('Users').where("role", "==", "doctor").get();
  }
  get_HealthInsurance()
  {
    return this.db.firestore.collection('Health_Insurance').get();
  }
  get_review()
  {
    return this.db.firestore.collection('reviews').get();
  }

  //Delete User
  delete_user(id)
  {
    this.db.collection('Users').doc(id).delete();
  }
  delete_lab(id)
  {
    this.db.collection("Laboratory_Partner").doc(id).delete();
    console.log("deleted successfully!");
  }
  delete_Insurance(id)
  {
    this.db.collection('Health_Insurance').doc(id).delete().then(function(){
      console.log("deleted successfully!");
    })
  }
  delete_specialization(id)
  {
    this.db.collection('specialization').doc(id).delete().then(function(){
      console.log("Deleted successfully!");
    })
  }
  update_user(user_id,record)
  {
    this.db.collection('Users').doc(user_id).update(record);
    console.log("Updated!");
  }
  update_insurance(id,record)
  {
    this.db.collection('Health_Insurance').doc(id).update(record);
    console.log("Updated!");
  }

  update_labInfo(id,record)
  {
    this.db.collection("Laboratory_Partner").doc(id).update(record);
    this.db.collection("Users").doc(id).update(record);
    console.log("Updated!");
  }
  update_Specialization(id,record)
  {
    this.db.collection('specialization').doc(id).update(record);
    console.log("updated!");
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
