import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LabForm } from 'src/app/class/lab-form.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lab-partner-registration',
  templateUrl: './lab-partner-registration.component.html',
  styleUrls: ['./lab-partner-registration.component.css']
})
export class LabPartnerRegistrationComponent implements OnInit {

  model = new LabForm();
  error: { name: string, message: string } = { name: '', message: ''};
  constructor(public afu : AuthService, public router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(frm)
  {
    this.afu.registerWithEmail_Lab(frm).then(() =>{
      this.router.navigate(['/login']);
    }).catch(_error => {
      this.error = _error;
      this.router.navigate(['/lab-partner-registration']);
    })
  } 

}
