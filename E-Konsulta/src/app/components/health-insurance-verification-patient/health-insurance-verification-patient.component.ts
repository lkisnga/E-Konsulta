import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
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
  constructor(public afu : AuthService,
     public userservice : UserService,
     public notif : NotificationService
    ) { }

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
      
      let record = {};
      record['createdAt'] = formatDate(new Date(),'short','en');
      record['title'] = "Insurance Verified!";
      record['description'] = "Your insurance credentials has been verified. Check your Insurance Info now!";
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
      this.notif.send_patient(e.uid,record)
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
        let record2 = {};
        record2['createdAt'] = formatDate(new Date(),'short','en');
        record2['title'] = "Insurance Info Updated!";
        record2['description'] = "Your Insurance Information has been updated. Check your Insurance Information in your profile.";
        record2['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        this.notif.send_patient(this.patient_id,record2)
      })
    }
    else
    {
      this.userservice.update_patient_insuranceInfo(this.patient_id,this.userIns.uid,record)
      .then(()=>{
        console.log('Updated!');
        let record2 = {};
        record2['createdAt'] = formatDate(new Date(),'short','en');
        record2['title'] = "Insurance Info Updated!";
        record2['description'] = "Your Insurance Information has been updated. Check your Insurance Information in your profile.";
        record2['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        this.notif.send_patient(this.patient_id,record2)
      })
    }
  }

}
