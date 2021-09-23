import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-analytics',
  templateUrl: './admin-user-analytics.component.html',
  styleUrls: ['./admin-user-analytics.component.css']
})
export class AdminUserAnalyticsComponent implements OnInit {

  constructor() { }
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
  }

}
