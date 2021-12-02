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

  date : string = "";
  start: string = "";
  end : string = "";
  limit : string = "";

  schedule: any = [] ;
  sched_time : any = [];

  editSched_time : any = [];

  clear_message: string= "";

  empty_message: string = "Empty List! Choose a date!";
  error_message: string ="";

  added_message: string = "";

  /** set to false so that when loading the user analytics page, content of that function is not displayed */
  monday1 = false;
  tuesday1 = false;
  wednesday1 = false;
  thursday1 = false;
  friday1 = false;
  saturday1 = false;
  sunday1 = false;

  monday(){
    this.monday1 = true;
    this.tuesday1 = false;
    this.wednesday1 = false;
    this.thursday1 = false;
    this.friday1 = false;
    this.saturday1 = false;
    this.sunday1 = false;
    
  }
  tuesday(){
    this.tuesday1 = true;
    this.monday1 = false;
    this.wednesday1 = false;
    this.thursday1 = false;
    this.friday1 = false;
    this.saturday1 = false;
    this.sunday1 = false;

  }
  wednesday(){
    this.wednesday1 = true;
    this.monday1 = false;
    this.tuesday1 = false;
    this.thursday1 = false;
    this.friday1 = false;
    this.saturday1 = false;
    this.sunday1 = false;

  }
  thursday(){
    this.thursday1 = true;
    this.monday1 = false;
    this.tuesday1 = false;
    this.wednesday1 = false;
    this.friday1 = false;
    this.saturday1 = false;
    this.sunday1 = false;

  }
  friday(){
    this.friday1 = true;
    this.tuesday1 = false;
    this.thursday1 = false;
    this.monday1 = false;
    this.saturday1 = false;
    this.sunday1 = false;

  }
  saturday(){
    this.tuesday1 = false;
    this.thursday1 = false;
    this.friday1 = false;
    this.monday1 = false;
    this.sunday1 = false;
    this.saturday1 = true;

  }
  sunday(){
    this.sunday1 = true;
    this.tuesday1 = false;
    this.thursday1 = false;
    this.friday1 = false;
    this.saturday1 = false;
    this.monday1 = false;

  }


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
        let record ={};
        record = info;
        record['priority'] = this.day_num(info.date);
        console.log(record);
        this.userservice.create_schedule(this.userId,info).then(()=>{
          console.log('added schedule!');
          this.userservice.check_schedule(this.userId,info.date).then(a=>{
            a.forEach(item=>{
              this.userservice.create_schedule_time(item.id,info)
              .then(()=>{
                this.ngOnInit();
                console.log('added time!');
                this.added_message = "Added Schedule!";
                setTimeout(() => {
                  this.added_message = "";
                }, 5000);
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
                this.added_message = "Added time to Schedule!";
                setTimeout(() => {
                  this.added_message = "";
                }, 5000);
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
        data.name = this.find_day(item.data().date);
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
  find_day(date)
  {
    if(date == "Mon")
      return "Monday";
    if(date == "Tue")
      return "Tuesday";
    if(date == "Wed")
      return "Wednesday";
    if(date == "Thu")
      return "Thursday"
    if(date == "Fri")
      return "Friday";
    if(date == "Sat")
      return "Saturday";
    if(date == "Sun")
      return "Sunday";
  }
  day_num(date)
  {
    if(date == "Mon")
      return 1;
    if(date == "Tue")
      return 2;
    if(date == "Wed")
      return 3;
    if(date == "Thu")
      return 4
    if(date == "Fri")
      return 5
    if(date == "Sat")
      return 6
    if(date == "Sun")
      return 0
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

  edit_schedule()
  {
    var data;
    var tempArray = [];
    console.log(this.sched_id);

    if(this.sched_id!="")
    {
      this.empty_message = "";
      this.userservice.get_schedule_time(this.sched_id).then(as=>{
        as.forEach(a=>{
          console.log(a.data());
          data = a.data();
          data.id = a.id;
          tempArray.push(data);
        })
      })
    }
    else
    {
      this.empty_message = "Empty List! Choose a date!";
    }
    this.editSched_time = tempArray;
  }

  remove_time(id)
  {
    this.userservice.remove_schedule_time(this.sched_id,id)
    .then(()=>{
      this.edit_schedule();
      this.ngOnInit();
      console.log('Successfully Deleted!');
    })
  }
  edit_add_time()
  {
    if(this.sched_id != "")
    {
      if(this.start != "" && this.end != "" && this.limit != "")
      {
        let record = {};
        record['start'] = this.start;
        record['end'] = this.end;
        record['limit'] = this.limit;
        this.userservice.check_schedule_time(this.sched_id,record)
        .then(e=>{
          if(e.empty)
          this.userservice.create_schedule_time(this.sched_id,record)
          .then(()=>{
            this.edit_schedule();
            this.ngOnInit();
            console.log('added time!');
          })
          else
          {
            console.log('Time Already exist!');
            this.error_message = "Time Already exist!";
            setTimeout(() => {
              this.error_message = "";
            }, 4000);
          }
        })
      }
      else
      {
        this.error_message = "Select a time(start and end) and limit";
        setTimeout(() => {
          this.error_message = "";
        }, 4000);
      }
    }
    else
    {
      this.error_message= "Select a Schedule!";
      setTimeout(() => {
        this.error_message = "";
      }, 3000);
    }
  }
  clear_field()
  {
    this.start = "";
    this.end = "";
    this.date = "";
    this.limit = "";
  }

}
