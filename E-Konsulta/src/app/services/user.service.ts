import { formatDate } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  task : any;
  uploadProgress : any;
  constructor(public db: AngularFirestore, public afau: AngularFireAuth, public router: Router,public store: AngularFireStorage,
    public fireb : FirebaseApp) { }

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

  create_feedback_review(record)
  {
    return this.db.collection('reviews').add({
      from: record.email,
      content: record.content,
      feature: record.feature,
      type: "feedback",
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en')
    })
  }

  check_email(e)
  {
    return this.db.firestore.collection('Users').where("email","==",e.email).get();
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
  create_healthInsurance_feedback(ins_id,user_id,feedback,name)
  {
    return this.db.firestore.collection('Health_Insurance').doc(ins_id)
    .collection('reviews').add({
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      feedback : feedback,
      from: user_id,
      fullname: name
    })
  }
  userReply_exist(id,user_id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('reviews')
    .where('from','==',user_id).get();
  }
  create_labPartner_feedback(lab_id,user_id,feedback,name)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(lab_id)
    .collection('reviews').add({
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      feedback : feedback,
      from: user_id,
      fullname: name
    })
  }
  userReply_existLab(id,user_id)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('reviews')
    .where('from','==',user_id).get();
  }
  //not yet done
  lab_fileUpload(e,lab_id,pnt_id,filename)
  {
    //storing file into Storage
  
   this.store.ref('Lab-results/' + lab_id + '/patients/'+ pnt_id +'/'+filename).put(e).then(()=>{
    //updating Lab Results
        this.afau.onAuthStateChanged(user => {
          if(user)
          {
            this.store.storage.ref('Lab-results/' + lab_id + '/patients/'+ pnt_id +'/'+filename).getDownloadURL().then(e=>{
                this.db.collection('Laboratory_Results').doc(pnt_id).update({
                filename : filename,
                file : e,
                status : 'sent'
              }).then(()=>{
                console.log('Successfully Stored!');
              })
            })
          }
      })
    })
  }
  lab_request(e,role,id)
  {
    console.log(role);
    this.db.collection('Laboratory_Results').add({
      email: e.email,
      filename: '',
      file:'',
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      status: 'pending',
      role: role,
      diagnostic_center: id
    }).then(()=>{
      console.log("Added!");
    })
  }

  lab_reply(id,feedback,name,review_id,sent_to)
  {
    return this.db.collection('Laboratory_Partner').doc(id).collection('reviews').doc(review_id)
    .collection('reply').add({
      createdAt: formatDate(new Date(),"MM/dd/yyyy","en"),
      feedback: feedback,
      from : id,
      name : name,
      sent_to : sent_to,
    })
  }
  
  get_labreply(id,review_id)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('reviews').doc(review_id)
    .collection('reply').get();
  }

  get_Lab_Reviews(id)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('reviews')
    .orderBy('createdAt','desc').get();
  }
  get_doctorReply(id,review_id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('reviews').doc(review_id)
    .collection('reply').get();
  }
  get_Doctor_Reviews(id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('reviews')
    .orderBy('createdAt','desc').get();
  }

  get_Lab_Result()
  {
    return this.db.firestore.collection('Laboratory_Results').get();
  }
  get_Lab_Results_Patient(email)
  {
    return this.db.firestore.collection('Laboratory_Results').where('email','==',email).get();
  }

  get_patient()
  {
    return this.db.firestore.collection('Users').where("role", "==", "patient").get();
  }
  get_patientInfo(id)
  {
    return this.db.firestore.collection('Users').doc(id).get()
  }
  get_Speciaalization()
  {
    return this.db.firestore.collection('specialization').get();
  }
  get_specializationInfo(id)
  {
    return this.db.firestore.collection('specialization').doc(id).get();
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
  get_user()
  {
    return this.db.firestore.collection('Users').get();
  }
  get_admin()
  {
    return this.db.firestore.collection('Users').where('role','==','admin').get();
  }
  get_doctorList()
  {
    return this.db.firestore.collection('Users').where("role", "==", "doctor").get();
  }
  get_HealthInsurance()
  {
    return this.db.firestore.collection('Health_Insurance').get();
  }
  get_HealthInsurance_Info(id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).get();
  }
  get_insurance_reply(id,review_id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('reviews').doc(review_id)
    .collection('reply').get();
  }
  get_insurance_verification(id)
  {
    return this.db.firestore.collection('Users').where('health_insurance','==',id).get();
  }

  Insurance_reply(id,feedback,name,review_id,sent_to)
  {
    return this.db.collection('Health_Insurance').doc(id).collection('reviews').doc(review_id)
    .collection('reply').add({
      createdAt: formatDate(new Date(),"MM/dd/yyyy","en"),
      feedback: feedback,
      from : id,
      name : name,
      sent_to : sent_to,
    })
  }
  get_Insurance_LOA(id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('Insurance_LOA').get();
  }
  approve_LOA(id,loa_id,status)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('Insurance_LOA').doc(loa_id)
    .update({
      approval_status: status,
      createdAt: formatDate(new Date(),"MM/dd/yyyy",'en')
    })
  }
  verify_userInsurance(id)
  {
    return this.db.firestore.collection('Users').doc(id).update({
      isVerified: "verified"
    })
  }
  //not yet done
  create_Insurance_LOA(id,record)
  {/*
    this.store.ref('Insurance-LOA/' + id + '/patients/'+ record.id +'/'+ record.filename).put(record.file).then(()=>{
      

      this.db.firestore.collection('Health_Insurance').doc(id).collection('Insurance_LOA').add({
        fullname: record.fullname,
        filename: record.filename,
        file: record.file,
        from: record.from,
        createdAt: formatDate(new Date(),"MM/dd/yyyy", 'en'),
        approval_status: "pending"
      })
    })*/
  }
  get_health_review(id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('reviews')
    .orderBy('createdAt','desc').get();
  }
  get_review_feedback()
  {
    return this.db.firestore.collection('reviews').where('type','==',"feedback").get();
  }
  get_review_problem()
  {
    return this.db.firestore.collection('reviews').where('role','==','admin').where('type','==','problem').get();
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
    const user = this.fireb.auth().currentUser;
    const newPassword = record.password;
   return user.updatePassword(newPassword).then(()=>{
      console.log("Password Changed!");
      this.db.collection('Users').doc(user_id).update(record);
    }).catch((error)=>{
      console.log(error);
    })
  }
  //Update Current User Health Insurance Info
  update_userInsurance(id,record)
  {
    const user = this.fireb.auth().currentUser;
    const newPassword = record.password;
    return user.updatePassword(newPassword).then(()=>{
      console.log("Password Changed!");
      this.db.collection('Health_Insurance').doc(id).update(record);
    }).catch((error)=>{
      console.log(error);
    })
  }

  update_doctorInfo(user_id,record)
  {
    this.db.collection('Users').doc(user_id).update(record);
    console.log("Updated Doctor Info!");
  }
  update_patientInfo(id,record)
  {
    return this.db.collection('Users').doc(id).update(record);
  }
  // Admin Update User Insurance
  update_insurance(id,record)
  {
    this.db.collection('Health_Insurance').doc(id).update(record);
    console.log("Updated!");
  }

  update_labInfo(id,record)
  {
    const user = this.fireb.auth().currentUser;
    const newPassword = record.password;
    return user.updatePassword(newPassword).then(()=>{
      console.log("Password Changed!");
      this.db.collection("Laboratory_Partner").doc(id).update(record);
      this.db.collection("Users").doc(id).update(record);
    }).catch((error)=>{
      console.log(error);
    })
  }
  //for admin side admin-lab
  update_lab(id,record)
  {
    return this.db.collection('Laboratory_Partner').doc(id).update(record);
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
