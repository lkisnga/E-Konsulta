import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


export class PatientInfo
{
  email: string;
  fullname : string;
  dob: string;
  password: string;
  contact_num: string;
}

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {

  model = new PatientInfo();
  error: { name: string, message: string } = { name: '', message: ''};
  constructor(public userservice : UserService, public afu : AuthService, public router: Router) { }

  ngOnInit(): void {

  }

  register_Patient(frm)
  {
    console.log(frm);
      this.afu.registerWithEmail_patient(frm)
        .then(() => {
          this.router.navigate(['/login'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/patient-registration'])
        })
        
  }

}
