import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { create } from 'domain';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-patient-doctors-list-view',
  templateUrl: './patient-doctors-list-view.component.html',
  styleUrls: ['./patient-doctors-list-view.component.css']
})
export class PatientDoctorsListViewComponent implements OnInit {
  @ViewChild('date') dates : ElementRef;
  docInfo : any = [];
  userid : any;

  scheduleList : any = [];
  timeList : any = [];

  schedule : string = "";
  time : string = "";

  constructor(
    public userservice : UserService,
    public afu : AuthService,
    public chats : ChatService
  ) { }

  ngOnInit(): void {
    
    this.userid = this.afu.get_UID();
    this.docInfo = JSON.parse(localStorage.getItem('data'));
    console.log(this.docInfo);

    this.get_schedule();
  }

  get_schedule()
  {
    var data;
    var tempArray= [];
    this.userservice.get_schedule(this.docInfo.uid).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.scheduleList = tempArray;
  }
  get_time(sched_id)
  {
    var data;
    var tempArray = [];
    this.userservice.get_schedule_time(sched_id).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.timeList = tempArray;
  }

  submit(info)
  {
    console.log(info);
    //routerLink="/patient-payment"
  }

  booknow()
  {
    let record = {};
    record['doctor_id'] = this.docInfo.uid;
    record['patient_id'] = this.userid;
    this.userservice.check_upcoming(this.docInfo.uid,this.userid).then(e=>{
      if(!e.empty)
        console.log('not empty!');
      else
      {
        this.userservice.create_doctor_upcoming(record);
        this.create_chat();
      }
    })
  }
  create_chat()
  {
    this.chats.check_chat(this.docInfo.uid,this.userid).then(e=>{
      if(e.empty)
        this.chats.create_chat(this.docInfo.uid,this.userid);
      else
        console.log("Chat already exist!");
    })  
  }

}
