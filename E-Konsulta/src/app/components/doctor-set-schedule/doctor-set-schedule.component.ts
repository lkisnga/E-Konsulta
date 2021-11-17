import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-set-schedule',
  template: '<ejs-schedule></ejs-schedule>',
  templateUrl: './doctor-set-schedule.component.html',
  styleUrls: ['./doctor-set-schedule.component.css']
})
export class DoctorSetScheduleComponent implements OnInit {
  
  userId : string = "";

  min : string = formatDate(new Date(),'yyyy-MM-dd','en');

  date : string = "";
  start: string = "";
  end : string = "";
  limit : string = "";

  constructor(
    public userservice: UserService,
    public afu: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.afu.get_UID();
  }

  setSchedule(info)
  {
    var time = info.start + ' - ' + info.end;
    this.userservice.schedule_checker(this.userId,info.date) // checks if a schedule exist
    .then(e=>{
      if(e.empty) //if the schedule doesnt exist
        {
          this.userservice.create_schedule(this.userId,info).then(()=>{ // create a new Schedule
            console.log("added!");
            this.userservice.schedule_checker(this.userId,info.date).then(res=>{ // getting the schedule ID
              res.forEach(item=>{
                console.log(info);
                this.userservice.create_schedule_time(this.userId,item.id,time,info.limit)// Adding Time in Schedule
                .then(()=>{
                  console.log('Added Time');
                })
              })
            })
          })
        }
      else //if a schedule already exist
        e.forEach(res=>{
          console.log(info);
          this.userservice.schedule_time_checker(this.userId,res.id,time).then(a=>{ // checks if a time already exist
            if(a.empty)
            {
              this.userservice.create_schedule_time(this.userId,res.id,time,info.limit)//Adding Time in Schedule
              .then(()=>{
                console.log('Added Time');
              })
            }
            else // if the Time already exist
            {
              console.log('Time Already Added!');
            }
          })
        })
    })
  }

}
