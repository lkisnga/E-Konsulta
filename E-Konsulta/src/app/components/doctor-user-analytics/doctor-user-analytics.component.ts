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

  constructor(
    public userservice : UserService,
    public afu : AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.afu.get_UID();
    this.get_consultations();
    this.get_today();
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

}
