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

  send_insurance(id,record)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('Notification')
    .add(record)
  }
  get_insurance(id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('Notification');
  }

  notif_sound(id,flag)
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

}
