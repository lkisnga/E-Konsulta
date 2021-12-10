import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';


export class PatientInfo
{
  email: string;
  fullname : string;
  dob: string;
  password: string;
  contact_number: string;
  address : string;
  health_insurance: string = "";
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
  confirmPass: string="";
  pass_message:string ="";

  constructor(public userservice : UserService, 
    public afu : AuthService, 
    public router: Router,
    public notif : NotificationService
  ) { }

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
    //console.log(frm);
    if(frm.password == this.confirmPass)
    {
      console.log(frm);
      this.afu.registerWithEmail_patient(frm)
        .then(() => {
          //Notification send to Health Insurance
          let record = {};
          record['createdAt'] = formatDate(new Date(),'short','en');
          record['title'] = "Patient Verification";
          record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
          record['description'] = "Go to Verification and Verify the Patient whether He/She is in your service!";
          this.notif.send_insurance(frm.health_insurance,record);
          //End of notification 
          this.router.navigate(['/login'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/patient-registration'])
        })
    }
    else
    {
      this.pass_message = "Passwords do not match!"
    }

        
  }
}
