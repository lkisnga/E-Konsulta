import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-patients',
  templateUrl: './doctor-patients.component.html',
  styleUrls: ['./doctor-patients.component.css']
})
export class DoctorPatientsComponent implements OnInit {

  userList : any = [];
  userId : string = "";

  constructor(
    public userservice : UserService,
    public router : Router,
    public afu : AuthService,
    public chats : ChatService
  ) { }
   /** set to false so that when loading the patient's page, content of that function is not displayed */
   upcoming = false;
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
  }

  chat(info)
  {
    this.router.navigate(['/doctor-patient-chat']);
    if(localStorage.getItem('data')==null)
    {
      localStorage.setItem('data',JSON.stringify(info))
    }
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
            data.image = im.data().image;
            tempArray.push(data);
          })
        })
      })
    })  
    this.userList = tempArray;
    console.log(this.userList);
  }
}
