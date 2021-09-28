import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-records',
  templateUrl: './patient-records.component.html',
  styleUrls: ['./patient-records.component.css']
})
export class PatientRecordsComponent implements OnInit {

  constructor() { }

  /** set to false so that when loading the user analytics page, content of that function is not displayed */
  medicalrecords = false;
  labresult = false;
  presc =  false;

  medicalRecords(){
    this.medicalrecords = true;
    this.labresult = false;
    this.presc = false;
  }

  labResult(){
    this.medicalrecords = false;
    this.labresult = true;
    this.presc = false;
  }

  prescription(){
    this.medicalrecords = false;
    this.labresult = false;
    this.presc = true;
  }

  ngOnInit(): void {
  }

}
