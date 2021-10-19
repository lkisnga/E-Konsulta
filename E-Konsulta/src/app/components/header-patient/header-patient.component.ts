import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrls: ['./header-patient.component.css']
})
export class HeaderPatientComponent implements OnInit {

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
