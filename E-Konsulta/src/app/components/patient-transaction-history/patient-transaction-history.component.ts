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

  constructor(
    public userservice : UserService,
    public afu : AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.afu.get_UID();
    this.get_transaction();
    this.get_userInfo();
  }

  get_transaction()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_transaction(this.userId).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
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
