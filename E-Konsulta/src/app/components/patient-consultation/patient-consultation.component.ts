import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-consultation',
  templateUrl: './patient-consultation.component.html',
  styleUrls: ['./patient-consultation.component.css']
})
export class PatientConsultationComponent implements OnInit {

  constructor() { }

  /** set to false so that when loading the patient's page, content of that function is not displayed */
  upcoming = false;
  done = false;

  upcomingFunction(){
    this.upcoming = true;
    this.done = false;
  }
  doneFunction(){
   this.upcoming = false;
   this.done = true;
  }

  ngOnInit(): void {
  }

}
