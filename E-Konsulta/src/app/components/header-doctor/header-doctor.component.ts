import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-doctor',
  templateUrl: './header-doctor.component.html',
  styleUrls: ['./header-doctor.component.css']
})
export class HeaderDoctorComponent implements OnInit {

  constructor() { }

  notification = false;
  notifFunction(){
    this.notification = true;
  }

  doubleClick(e: Event) {
    this.notification = false;
  }

  ngOnInit(): void {
  }

}
