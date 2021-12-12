import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-user-analytics',
  templateUrl: './doctor-user-analytics.component.html',
  styleUrls: ['./doctor-user-analytics.component.css']
})
export class DoctorUserAnalyticsComponent implements OnInit {

  userId: string = "";

  total: number = 0;
  today: number = 0;
  currentEarning: number = 0;
  totalEarning: number = 0;

  constructor(
    public userservice : UserService,
    public afu : AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.afu.get_UID();
    this.get_consultations();
    this.get_today();
    this.get_earnings();
  }

  get_consultations()
  {
    this.userservice.get_consultation(this.userId).then(e=>{
      this.total = e.size;
    })
  }
  get_today()
  {
    this.userservice.get_today_consultation(this.userId).then(e=>{
      this.today = e.size;
    })
  }
  get_earnings(){
    this.userservice.get_doctorEarning(this.userId)
    .then(e=>{
      e.forEach(item=>{
        var date = (new Date(item.data().createdAt).getMonth()+1)+'/'+new Date(item.data().createdAt).getDate()+'/'+new Date(item.data().createdAt).getFullYear();
        if(date.match(formatDate(new Date(),'M/d/yyyy','en')))
        {
          console.log('true');
          this.currentEarning+=parseFloat(item.data().net_income);
        }
        this.totalEarning += item.data().net_income;
      })
    })
  }

}
