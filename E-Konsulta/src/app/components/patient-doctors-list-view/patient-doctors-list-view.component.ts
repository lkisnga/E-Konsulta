import { DoCheck,OnChanges,Component, ElementRef, OnInit, ViewChild, KeyValueDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { create } from 'domain';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

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
  day_schedule: string = "";

  error_schedule = "";

  model: NgbDateStruct;
  date: any = [];
  constructor(
    public userservice : UserService,
    public afu : AuthService,
    public chats : ChatService,
    public router: Router,
    public calendar: NgbCalendar,
  ) {}

  ngDoCheck()
  {
    if(this.model != this.date && this.model)
    {
      console.log(this.model);
      console.log('Changed2!');
      this.date = this.model;

      this.day_schedule = formatDate(new Date(),this.model.month+'/' + this.model.day+'/'+this.model.year,'en');
      
      const Day = new Date(this.model.month+'/' + this.model.day+'/'+this.model.year);
      var priority = Day.getDay();

      this.userservice.get_schedule(this.docInfo.uid).then(e=>{
        e.forEach(item=>{
          if(item.data().priority == priority)
          {
            this.get_time(item.id);
            this.schedule = item.id;
            console.log(priority)
          }
        })
      })
      

    }
  }

  ngOnInit(): void {

    localStorage.removeItem('schedule');

    this.userid = this.afu.get_UID();
    this.docInfo = JSON.parse(localStorage.getItem('data'));
    console.log(this.docInfo);
  }
  get_time(sched_id)
  {
    var data;
    var tempArray = [];
    this.userservice.get_schedule_time(sched_id).then(e=>{
      e.forEach(item=>{
        this.userservice.reservationChecker(sched_id,item.id).then(res=>{
          if(res.size >= item.data().limit)
          {
            data = item.data();
            data.uid = item.id;
            data.status = "full"
            tempArray.push(data);
          }
          else
          {
            data = item.data();
            data.uid = item.id;
            data.status = "notFull"
            tempArray.push(data);
          }
        })
      })
    })
    this.timeList = tempArray;
    console.log(this.timeList);
  }
  submit(info)
  {
    if(this.time != "" && this.schedule != "")
    {
      this.userservice.reservationChecker(this.schedule,info.time).then(e=>{
        this.userservice.get_timeInfo(this.schedule,info.time).then(res=>{
          console.log(e.size + ' ' + res.data().limit);
          if(e.size >= res.data().limit)
          {
            this.error_schedule = "Schedule Full!"
            setTimeout(() => {
              this.error_schedule = "";
            }, 5000);
          }
          else
          {
            console.log('You can add!');
            if(localStorage.getItem('schedule')==null)
            {
              let record={};
              record = info;
              record['consultation_schedule'] = this.day_schedule;
              record['schedule'] = this.schedule;
              localStorage.setItem('schedule',JSON.stringify(record));
            }
            this.router.navigate(['patient-payment']);
          }
        })
      })
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
