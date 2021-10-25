import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-insurance-verification',
  templateUrl: './health-insurance-verification.component.html',
  styleUrls: ['./health-insurance-verification.component.css']
})
export class HealthInsuranceVerificationComponent implements OnInit {

  userId : string="";
  list: any = [];

  constructor(public afu : AuthService, public userservice : UserService) { }

  ngOnInit(): void {
    this.userId=this.afu.get_UID();

    var data;
    var tempArray = [];
    this.userservice.get_insurance_verification(this.userId).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.list = tempArray;
    console.log(this.list);
  }
  verify(e)
  {
    this.userservice.verify_userInsurance(e.uid).then(()=>{
      console.log("Successfully Verified!");
      this.ngOnInit();
    })
  }

}
