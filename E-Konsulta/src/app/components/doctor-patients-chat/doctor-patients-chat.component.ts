import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-patients-chat',
  templateUrl: './doctor-patients-chat.component.html',
  styleUrls: ['./doctor-patients-chat.component.css']
})
export class DoctorPatientsChatComponent implements OnInit {

  patientInfo : any = [];

  constructor() { }

  ngOnInit(): void {
    this.patientInfo = JSON.parse(localStorage.getItem('data'));
    console.log(this.patientInfo);
  }

}
