import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-health-insurance-registration',
  templateUrl: './health-insurance-registration.component.html',
  styleUrls: ['./health-insurance-registration.component.css']
})
export class HealthInsuranceRegistrationComponent implements OnInit {

  constructor(public afu : AuthService, public router: Router) { }

  ngOnInit(): void {
  }

}
