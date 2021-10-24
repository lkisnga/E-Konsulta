import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  contact_number: string;
  address : string;
  health_insurance: string = "default";
  member_ID: string;
}

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {

  form : FormGroup;
  insList : any = [];
  model = new PatientInfo();
  error: { name: string, message: string } = { name: '', message: ''};
  constructor(public userservice : UserService, public afu : AuthService, public router: Router) { }

  ngOnInit(): void {
    var data;
    var tempArray = [];
    this.userservice.get_HealthInsurance().then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.insList = tempArray;
    console.log(this.insList);

  }

  register_Patient(frm)
  {
    console.log(frm);
    /*
    console.log(frm);
      this.afu.registerWithEmail_patient(frm)
        .then(() => {
          this.router.navigate(['/login'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/patient-registration'])
        })*/
        
  }

}
