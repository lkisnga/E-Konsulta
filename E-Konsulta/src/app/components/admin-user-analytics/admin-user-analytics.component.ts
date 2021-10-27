import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-analytics',
  templateUrl: './admin-user-analytics.component.html',
  styleUrls: ['./admin-user-analytics.component.css']
})
export class AdminUserAnalyticsComponent implements OnInit {

  docsize : number = 0;
  patsize : number = 0;
  inssize : number = 0;
  labsize : number = 0;

  constructor(public userservice : UserService) { }
  /** set to false so that when loading the user analytics page, content of that function is not displayed */
  daily = false;
  weekly = false;
  monthly =  false;

  dailyFunction(){
    this.daily = true;
    this.weekly = false;
    this.monthly = false;
  }

  weeklyFunction(){
    this.daily = false;
    this.weekly = true;
    this.monthly = false;
  }

  monthlyFunction(){
    this.daily = false;
    this.weekly = false;
    this.monthly = true;
  }

  ngOnInit(): void {

    /*this.userservice.get_user().then(e=>{
      this.docsize = e.size;
    })*/

    this.userservice.get_doctorList().then(e=>{
      this.docsize = e.size;
    })
    this.userservice.get_patient().then(e=>{
      this.patsize = e.size;
    })

    this.userservice.get_HealthInsurance().then(e=>{
      this.inssize = e.size;
    })

    this.userservice.get_labPartner().forEach(e=>{
      this.labsize = e.size;
    })



  }

}
