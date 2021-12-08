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
        data = item.data();
        tempArray.push(data);
      })
    })
    this.tranList = tempArray;
    console.log(this.tranList);
  }

}
