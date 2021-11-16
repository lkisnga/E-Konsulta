import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  userList2$ : Observable<any>;
  userId : string = "";

  constructor(
    public userservice : UserService,
    public router : Router,
    public afu : AuthService,
    public chats : ChatService
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
            data.upcoming_status = e.doc.data().status;
            data.schedule = e.doc.data().schedule;
            data.image = im.data().image;
            //this.userList2$ = data;
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
}
