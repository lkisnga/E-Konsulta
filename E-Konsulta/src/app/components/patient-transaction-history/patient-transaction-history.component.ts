import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-transaction-history',
  templateUrl: './patient-transaction-history.component.html',
  styleUrls: ['./patient-transaction-history.component.css']
})
export class PatientTransactionHistoryComponent implements OnInit {
  userInfo : any = [];
  userId : string = "";
  transList : any = [];

  status: string = "";
  doc_name: string = "";

  year: string = "";
  month: string = "";

  constructor(
    public userservice : UserService,
    public afu : AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.afu.get_UID();
    this.get_transaction();
    this.get_userInfo();
    this.getYears();
    this.getMonth();
  }

  getYears()
  {
    var tempArray = [];
    let year = new Date().getFullYear();
    for(let i = 0; i < 101 ; i++)
    {
      tempArray[i]  = year + i;
    }
    return tempArray;
  }

  getMonth()
  {
    var tempArray = [];
    for(let i = 0; i<12;i++)
    {
      tempArray[i] = i+1;
    }
    return tempArray;
    
  }
  get_transaction()
  {
    console.log(this.year);
    var data;
    var tempArray = [];
    this.userservice.get_patient_transaction(this.userId).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().doctor_id)
        .then(res=>{
          this.userservice.get_specializationInfo(res.data().specialization)
          .then(as=>{
            data = item.data();
            data.specialization = as.data().name;
            data.doctor_name = res.data().fullname;
            tempArray.push(data);
          })
        })
      })
    })
    this.transList = tempArray;
    console.log(this.transList);
  }
  get_userInfo()
  {
    this.userservice.get_UserInfo(this.userId).then(e=>{
      this.userInfo = e.data();
      console.log(this.userInfo);
    })  
  }

}
