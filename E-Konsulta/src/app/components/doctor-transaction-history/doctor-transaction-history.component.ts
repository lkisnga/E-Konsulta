import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-transaction-history',
  templateUrl: './doctor-transaction-history.component.html',
  styleUrls: ['./doctor-transaction-history.component.css']
})
export class DoctorTransactionHistoryComponent implements OnInit {

  userId: string = "";
  tranList : any = [];

  constructor(
    public userservice : UserService,
    public notif : NotificationService,
    public afu : AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.afu.get_UID();
    this.get_transaction();
  }

  get_transaction()
  {
    var data;
    var tempArray = [];
    this.userservice.get_transaction_doctor(this.userId)
    .then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().patient_id)
        .then(as=>{
          data = item.data();
          data.uid = item.id;
          data.patient_name = as.data().fullname;
          data.total_dec = (item.data().Amount*(item.data().deduction/100)).toFixed(2);
          //console.log(data);
          tempArray.push(data);
        })
      })
    })
    this.tranList = tempArray;
    console.log(this.tranList);
  }

}
