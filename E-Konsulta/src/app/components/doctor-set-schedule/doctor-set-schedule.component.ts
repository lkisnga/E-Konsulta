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
  
  sched_id: string = "";

  userId : string = "";

  min : string = formatDate(new Date(),'yyyy-MM-dd','en');

  date : string = "";
  start: string = "";
  end : string = "";
  limit : string = "";

  schedule: any = [] ;
  sched_time : any = [];

  clear_message: string= "";

  constructor(
    public userservice: UserService,
    public afu: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.afu.get_UID();
    this.get_schedule();
  }

  setSchedule(info)
  {
    console.log(info);
    this.userservice.check_schedule(this.userId,info.date)
    .then(e=>{
      if(e.empty)
      {
        this.userservice.create_schedule(this.userId,info).then(()=>{
          console.log('added schedule!');
          this.userservice.check_schedule(this.userId,info.date).then(a=>{
            a.forEach(item=>{
              this.userservice.create_schedule_time(item.id,info)
              .then(()=>{
                this.ngOnInit();
                console.log('added time!');
              })
            })
          })
        })
      }
      else
      {
        e.forEach(sched=>{
          this.userservice.check_schedule_time(sched.id,info).then(a=>{
            if(a.empty)
            {
              this.userservice.create_schedule_time(sched.id,info).then(()=>{
                this.ngOnInit();
                console.log('added time!');
              })
            }
            else
            {
              console.log('Time already exist!');
            }
          })
        })
      }
    })
  }

  get_schedule()
  {
    var data,data2;
    var tempArray = [],tempArray2=[];
    this.userservice.get_schedule(this.userId).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
        this.userservice.get_schedule_time(item.id).then(as=>{
          as.forEach(a=>{
            data2 = a.data();
            data2.uid= item.id;
            tempArray2.push(data2);
          })
        })
      })
    })
    this.sched_time = tempArray2;
    this.schedule = tempArray;
  }

  remove_schedule()
  {
    if(this.sched_id)
    {
      this.userservice.remove_schedule(this.sched_id)
      .then(()=>{
         this.ngOnInit();
         this.clear_message = "Successfully removed!"
         this.sched_id = "";
         setTimeout(() => {
          this.clear_message = ""
         }, 5000);
       })
    }
    else
    {
      this.clear_message = "Choose a Schedule!"
         setTimeout(() => {
          this.clear_message = ""
         }, 5000);
    }
    
    
  }

}
