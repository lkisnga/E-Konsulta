import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  error_schedule = "";
  constructor(
    public userservice : UserService,
    public afu : AuthService,
    public chats : ChatService,
    public router: Router
  ) { }

  ngOnInit(): void {
    
    localStorage.removeItem('schedule');

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
    if(this.time != "" && this.schedule != "")
    {
      if(localStorage.getItem('schedule')==null)
      {
        localStorage.setItem('schedule',JSON.stringify(info));
      }
      this.router.navigate(['patient-payment']);
    }
    else
    {
      this.error_schedule = "Empty Fields!"
      setTimeout(() => {
        this.error_schedule = "";
      }, 5000);
    }
  }

}
