import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
declare var paypal;
@Component({
  selector: 'app-patient-consultation',
  templateUrl: './patient-consultation.component.html',
  styleUrls: ['./patient-consultation.component.css']
})

export class PatientConsultationComponent implements OnInit {

  @ViewChild('paypal', {static: true}) paypalElement: ElementRef
  userid : any;

  docList: any = [];
  doneList : any = [];

  error_message: string = ""

  info: any = [];

  constructor(
    public userservice : UserService,
    public afu : AuthService,
    public router : Router,
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

    localStorage.removeItem('data');
    this.userid = this.afu.get_UID();
    this.get_upcoming();
    this.get_done();
    this.paypalButton();
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
      this.error_message = "Please wait for the doctor to accept.";
      setTimeout(() => {
        this.error_message="";
      }, 3000);
    }
  }

  paypalButton()
  {
  
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
            data.schedtime = e.doc.data().time;
            data.upcoming_id = e.doc.id;
            data.consultation_schedule = e.doc.data().consultation_schedule;
            data.paymentType = e.doc.data().paymentType;
            data.transaction_id = e.doc.data().transaction_id;
            data.image = img.data().image;
            data.uid = a.id;
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
    this.docList = tempArray;
     console.log(this.docList);
  }
  editCancel(info)
  {
    this.info = info;
  }
  
  cancel()
  {
    console.log(this.info);
    let record = {};
    record['patient_id'] = this.userid;
    record['upcoming_id'] = this.info.upcoming_id;
    record['transaction_id'] = this.info.transaction_id;
    this.userservice.cancel_consultation(record)
    .then(()=>{
      //send notification for cancellation
      let record = {};
      record['title'] = "Cancelled Consultaion";
      record['description'] = "A Patient want to cancel its consultation";
      record['createdAt'] = formatDate(new Date(),'short','en');
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
      this.userservice.get_admin().then(e=>{
        e.forEach(item=>{
          this.notif.send_admin(item.id,record);
        })
      })
      record['description'] = "A Patient cancelled its consultation";
      this.notif.send_doctor(this.info.uid,record);
      document.getElementById('closeModal').click();   
      this.info = [];   
      this.ngOnInit();
    });
  }

  get_done()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_consultation(this.userid).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().doctor_id).then(a=>{
          data = item.data();
          data.fullname = a.data().fullname
          tempArray.push(data);
        })
      })
    })
    this.doneList = tempArray;
    console.log(this.doneList);
  }

}

