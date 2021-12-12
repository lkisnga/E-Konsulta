import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-insurance-transaction',
  templateUrl: './health-insurance-transaction.component.html',
  styleUrls: ['./health-insurance-transaction.component.css']
})
export class HealthInsuranceTransactionComponent implements OnInit {

  userid: string= "";
  
  list: any = [];

  tran: boolean = true;
  tranH: boolean = false;

  constructor(
    public afu : AuthService,
    public userservice: UserService,
    public notif: NotificationService
  ) { }

  ngOnInit(): void {
    this.userid = this.afu.get_UID();

    this.get_transactionList();
  }

  button(e)
  {
    if(e=='tr')
    {
      this.tran = false;
      this.tranH = true;
    }
    else
    {
      this.tran = true;
      this.tranH = false;
    }
  }

  get_transactionList()
  {
    var data;
    var tempArray=[];
    this.userservice.get_transaction_insurance(this.userid)
    .then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.list = tempArray;
    console.log(this.list);
  }

}
