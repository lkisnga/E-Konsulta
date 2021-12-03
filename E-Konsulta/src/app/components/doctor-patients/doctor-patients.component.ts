import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-patients',
  templateUrl: './doctor-patients.component.html',
  styleUrls: ['./doctor-patients.component.css']
})
export class DoctorPatientsComponent implements OnInit {

  userList : any = [];
  userList2$ : Observable<any>;
  userId : string = "";

  doneList : any = [];

  constructor(
    public userservice : UserService,
    public router : Router,
    public afu : AuthService,
    public chats : ChatService,
    public notif : NotificationService
  ) { }
   /** set to false so that when loading the patient's page, content of that function is not displayed */
   upcoming = true;
   done = false;

   upcomingFunction(){
     this.upcoming = true;
     this.done = false;
   }
   doneFunction(){
    this.upcoming = false;
    this.done = true;
   }
  ngOnInit(): void {

    this.userId = this.afu.get_UID();
    localStorage.removeItem('data');
    this.get_userInfo();
    this.get_userDoneInfo();
  }

  chat(info)
  {
    console.log(info);
    this.userservice.check_upcoming(this.userId,info.uid).then(e=>{
      e.forEach(res=>{
        if(res.data().status=="pending")
        {
          //notification
          let record = {};
          record['title'] = "Consultation accepted!";
          record['description'] = "Your consultation has been accepted Join Now!";
          record['createdAt'] = formatDate(new Date(),'short','en');
          this.notif.send_patient(info.uid,record)
        }
        this.userservice.update_upcoming(res.id).then(()=>{
          this.router.navigate(['/doctor-patient-chat']);
          if(localStorage.getItem('data')==null)
          {
            localStorage.setItem('data',JSON.stringify(info))
          }
        })
      })
    })
  }
  get_userInfo()
  {
    var data;
    var tempArray = [];
    this.userservice.get_doctor_upcoming(this.userId).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        this.userservice.get_patientInfo(e.doc.data().patient_id).then(a=>{
          this.userservice.get_avatar(e.doc.data().patient_id).then(im=>{
            data = a.data();
            data.uid = a.id;
            data.upcoming_status = e.doc.data().status;
            data.upcoming_id = e.doc.id;
            data.schedule = e.doc.data().schedule;
            data.schedtime = e.doc.data().time;
            data.consultation_schedule = e.doc.data().consultation_schedule;
            data.image = im.data().image;
            if(e.type == 'added')
             tempArray.push(data);
            else if(e.type == 'modified')
            {
              var index = tempArray.findIndex( x => x.fullname === data.fullname);
              tempArray.splice(index,1,data);
            }
          })
        })
      })
    })
    this.userList = tempArray;
  }

  get_userDoneInfo()
  {
    var data;
    var tempArray = [];
    this.userservice.get_consultation(this.userId).then(e=>{
      e.forEach(item=>{
        console.log(item.data());
        this.userservice.get_UserInfo(item.data().patient_id).then(a=>{
          data = a.data();
          data.schedule = item.data().schedule;
          data.consultation_schedule = item.data().consultation_schedule;
          data.schedtime = item.data().time;
          tempArray.push(data);
        })
      })
    })
    this.doneList = tempArray;
    console.log(this.doneList);
  }
}
