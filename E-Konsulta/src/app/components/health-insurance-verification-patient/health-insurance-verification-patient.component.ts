import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-insurance-verification-patient',
  templateUrl: './health-insurance-verification-patient.component.html',
  styleUrls: ['./health-insurance-verification-patient.component.css']
})
export class HealthInsuranceVerificationPatientComponent implements OnInit {
  userId : string="";
  list: any = [];
  list2: any = [];  //for verified

  pending : boolean = true;
  verified : boolean = false;

  userIns : any = [];
  balance : number= 0;

  patient_id : string = "";
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

    this.patientList();
  }

  patientList()
  {
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
  }

  get_patient_insuranceInfo()
  {

  }

  verify(e,stats)
  {
    this.userservice.verify_userInsurance(e.uid,stats).then(()=>{
      console.log("Successfully Verified!");
      this.ngOnInit();
    })
  }
  edit_info(info)
  {
    this.patient_id = info.uid;
    this.userIns = [];
    var data;
    this.userservice.get_patient_insuranceInfo(info.uid,this.userId).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        data.updatedAt = item.data().updatedAt;
        this.userIns = data;
      })
    }).then(()=>{
      this.balance = this.userIns.limit - this.userIns.spent;
    })
  }
  update_info(info)
  {
    let record = {};
    record = info;
    record['health_insurance'] = this.userId;
    record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
    if(this.userIns.uid == undefined)
    {
      this.userservice.create_patient_insuranceInfo(this.patient_id,record)
      .then(()=>{
        console.log("Created!");
      })
    }
    else
    {
      this.userservice.update_patient_insuranceInfo(this.patient_id,this.userIns.uid,record)
      .then(()=>{
        console.log('Updated!');
      })
    }
  }

}
