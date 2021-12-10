import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public db: AngularFirestore,
    public fireb : FirebaseApp
  ) { }
  

  //Insurance Notification
  send_insurance(id,record)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('Notification')
    .add(record).then(()=>{
      console.log('added notification!');
    })
  }
  get_insurance(id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('Notification')
    .orderBy('id','desc');
  }

  notif_sound(id,flag) // insurance
  {
    this.db.firestore.collection('Health_Insurance').doc(id).collection('Notification')
    .onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      console.log(flag);
      changes.forEach(e=>{
        if(flag==true && e.type=='added')
        {
          const audio = new Audio('assets/sounds/notification.mp3');
          audio.play();
        }
      })
      flag=true;
    })
  }
  //End of Insurance Notification
  //Laboratory Notification
  send_lab(id,record)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('Notification')
    .add(record)
    .then(()=>{
      console.log('added notification!');
    })
  }
  get_lab(id)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('Notification')
    .orderBy('id','desc');
  }
  notif_soundLab(id,flag)
  {
    this.db.firestore.collection('Laboratory_Partner').doc(id).collection('Notification')
    .onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      console.log(flag);
      changes.forEach(e=>{
        if(flag==true && e.type=='added')
        {
          const audio = new Audio('assets/sounds/notification.mp3');
          audio.play();
        }
      })
      flag=true;
    })
  }
  //End of Laboratory Notification
  //Patient Notification
  send_patient(id,record)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Notification')
    .add(record)
    .then(()=>{
      console.log('added notification!');
    })
  }
  get_patient(id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Notification')
    .orderBy('id','desc');
  }
  notif_soundPatient(id,flag)
  {
    this.db.firestore.collection('Users').doc(id).collection('Notification')
    .onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      console.log(flag);
      changes.forEach(e=>{
        if(flag==true && e.type=='added')
        {
          const audio = new Audio('assets/sounds/notification.mp3');
          audio.play();
        }
      })
      flag=true;
    })
  }
  //End of Patient Notification

  //Doctor Notification
  send_doctor(id,record)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Notification')
    .add(record)
    .then(()=>{
      console.log('added notification!');
    })
  }
  get_doctor(id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Notification')
    .orderBy('id','desc');
  }
  notif_soundDoctor(id,flag)
  {
    this.db.firestore.collection('Users').doc(id).collection('Notification')
    .onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      console.log(flag);
      changes.forEach(e=>{
        if(flag==true && e.type=='added')
        {
          const audio = new Audio('assets/sounds/notification.mp3');
          audio.play();
        }
      })
      flag=true;
    })
  }
  //End of Doctor Notification
  //Admin Notification
  send_admin(id,record)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Notification')
    .add(record)
    .then(()=>{
      console.log('added notification!');
    })
  }
  get_admin(id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Notification')
    .orderBy('id','desc');
  }
  notif_soundAdmin(id,flag)
  {
    this.db.firestore.collection('Users').doc(id).collection('Notification')
    .onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      console.log(flag);
      changes.forEach(e=>{
        if(flag==true && e.type=='added')
        {
          const audio = new Audio('assets/sounds/notification.mp3');
          audio.play();
        }
      })
      flag=true;
    })
  }
  //End of Doctor Notification
  

}
