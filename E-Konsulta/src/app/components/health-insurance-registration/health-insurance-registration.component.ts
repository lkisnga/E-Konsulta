import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HealthInsuranceForm } from 'src/app/class/health-insurance-form.model';

@Component({
  selector: 'app-health-insurance-registration',
  templateUrl: './health-insurance-registration.component.html',
  styleUrls: ['./health-insurance-registration.component.css']
})
export class HealthInsuranceRegistrationComponent implements OnInit {
  
  model = new HealthInsuranceForm();
  error: { name: string, message: string } = { name: '', message: ''};
  constructor(public afu : AuthService, public router: Router) { }

  ngOnInit(): void {

  }

  register_user(form)
  {
    this.afu.registerWithEmail_HealthInsurance(form).then(() => {
      this.router.navigate(['/login'])
    }).catch(_error => {
      this.error = _error
      this.router.navigate(['/health-insurance-registration'])
    })
  }

}
