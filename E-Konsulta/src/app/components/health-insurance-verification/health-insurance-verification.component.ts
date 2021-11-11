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
  list2: any = [];  //for verified

  pending : boolean = true;
  verified : boolean = false;


  constructor(public afu : AuthService, public userservice : UserService) { }

  isVerified_Doc(e)
  {
    if(e=='pending')
      {
        this.verified = false;
        this.pending = true;
      }
    if(e=='verified')
    {
      this.pending = false;
      this.verified = true;
    }
  }

  ngOnInit(): void {
    this.userId=this.afu.get_UID();

    var data;
    var tempArray = [],tempArray2 = [];
    this.userservice.get_insurance_verification(this.userId).then(e=>{
      e.forEach(item=>{
        if(item.data().isVerified == 'pending')
        {
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
        }
        if(item.data().isVerified == 'verified')
        {
          data = item.data();
          data.uid = item.id;
          tempArray2.push(data);
        }
      })
    })
    this.list2 = tempArray2;
    this.list = tempArray;
    console.log(this.list);
  }
  verify(e,stats)
  {/*
    this.userservice.verify_userInsurance(e.uid).then(()=>{
      console.log("Successfully Verified!");
      this.ngOnInit();
    })*/
  }
  update_info(e)
  {
    console.log(e);
  }

}
