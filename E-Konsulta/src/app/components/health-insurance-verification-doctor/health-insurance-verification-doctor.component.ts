import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-insurance-verification-doctor',
  templateUrl: './health-insurance-verification-doctor.component.html',
  styleUrls: ['./health-insurance-verification-doctor.component.css']
})
export class HealthInsuranceVerificationDoctorComponent implements OnInit {

  userId : string = "";

  doctorList : any = [];//pending

  doctorList2 : any = []; //verified

  pending1 = true;
  verified1 = false;
  constructor(
    public userservice: UserService,
    public afu : AuthService,
    public notif: NotificationService
  ) { }

  ngOnInit(): void {
    this.userId = this.afu.get_UID();

    this.get_doctors();
    this.get_verified();
  }

  pending(){
    this.pending1 = true;
    this.verified1 = false;
  }

  verified(){
    this.pending1 = false;
    this.verified1 = true;
  }

  get_doctors()
  {
    var data;
    var tempArray = [];
    this.userservice.get_affiliation(this.userId).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().doctor_id)
        .then(res=>{
          if(item.data().status == 'pending')
          {
            data = item.data();
            data.fullname = res.data().fullname;
            data.email = res.data().email;
            data.uid = item.id;
            tempArray.push(data);
          }
        })
      })
    })
    this.doctorList = tempArray;
    console.log(this.doctorList);
  }
  get_verified()
  {
    var data;
    var tempArray = [];
    this.userservice.get_affiliation(this.userId).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().doctor_id)
        .then(res=>{
          if(item.data().status == 'verified')
          {
            data = item.data();
            data.fullname = res.data().fullname;
            data.email = res.data().email;
            data.uid = item.id;
            tempArray.push(data);
          }
        })
      })
    })
    this.doctorList2 = tempArray;
  }
  verify(info,docInfo)
  {
    if(info=='verified')
    {
      this.userservice.verify_affiliation(docInfo.uid).then(()=>{
        console.log('Doctor Verified!')
        let record = {};
          record['title'] = "Doctor Affiliation Verified";
          record['description']= "You have been verified by your insurance!";
          record['createdAt'] = formatDate(new Date(),'short', 'en');
          record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
          this.notif.send_doctor(docInfo.doctor_id,record);
      })
    }
    else{
      this.userservice.decline_affiliation(docInfo.uid).then(()=>{
        console.log('Doctor Declined/Removed!');
      })
    }
    this.ngOnInit();
  }

}
