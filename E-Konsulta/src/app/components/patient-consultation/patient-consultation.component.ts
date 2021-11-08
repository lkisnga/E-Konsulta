import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-consultation',
  templateUrl: './patient-consultation.component.html',
  styleUrls: ['./patient-consultation.component.css']
})
export class PatientConsultationComponent implements OnInit {

  userid : any;

  docList: any = [];

  constructor(
    public userservice : UserService,
    public afu : AuthService,
    public router : Router
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

    localStorage.removeItem('data');

    this.userid = this.afu.get_UID();
    this.get_upcoming();
  }

  chat(info)
  {
    if(info.upcoming_status != 'pending')
    {
      this.router.navigate(['/patient-doctor-chat']);
      if(localStorage.getItem('data')==null)
      {
        localStorage.setItem('data',JSON.stringify(info))
      }
    }
    else
    {
      console.log('Please wait for the doctor to accept.');
    }
  }

  get_upcoming()
  {
    var data;
    var tempArray= [];
    this.userservice.get_patient_upcoming(this.userid).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        this.userservice.get_UserInfo(e.doc.data().doctor_id).then(a=>{
          this.userservice.get_avatar(e.doc.data().doctor_id).then(img=>{
            data = a.data();
            data.upcoming_status = e.doc.data().status;
            data.schedule = e.doc.data().schedule;
            data.image = img.data().image;
            data.uid = a.id;
            tempArray.push(data);
          })  
        })
      })
    })
    this.docList = tempArray;
     console.log(this.docList);
  }

}

