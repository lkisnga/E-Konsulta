import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-reservations',
  template: '<ejs-schedule></ejs-schedule>',
  templateUrl: './doctor-reservations.component.html',
  styleUrls: ['./doctor-reservations.component.css']
})
export class DoctorReservationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
