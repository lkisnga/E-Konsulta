import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-insurance-verification-patient',
  templateUrl: './health-insurance-verification-patient.component.html',
  styleUrls: ['./health-insurance-verification-patient.component.css']
})
export class HealthInsuranceVerificationPatientComponent implements OnInit {

  pending1 = true;
  verified1 = false;
  constructor() { }

  ngOnInit(): void {
  }

  pending(){
    this.pending1 = true;
    this.verified1 = false;
  }

  verified(){
    this.pending1 = false;
    this.verified1 = true;
  }

}
