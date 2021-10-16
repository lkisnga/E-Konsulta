import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LabForm } from 'src/app/class/lab-form.module';
@Component({
  selector: 'app-lab-partner-registration',
  templateUrl: './lab-partner-registration.component.html',
  styleUrls: ['./lab-partner-registration.component.css']
})
export class LabPartnerRegistrationComponent implements OnInit {

  model = new LabForm();
  constructor(public afu : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(frm)
  {
    console.log(frm);
  } 

}
