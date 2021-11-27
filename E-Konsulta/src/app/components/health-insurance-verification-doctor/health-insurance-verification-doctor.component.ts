import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-insurance-verification-doctor',
  templateUrl: './health-insurance-verification-doctor.component.html',
  styleUrls: ['./health-insurance-verification-doctor.component.css']
})
export class HealthInsuranceVerificationDoctorComponent implements OnInit {

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
