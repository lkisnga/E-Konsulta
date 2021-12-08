import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-transaction-history',
  templateUrl: './admin-transaction-history.component.html',
  styleUrls: ['./admin-transaction-history.component.css']
})
export class AdminTransactionHistoryComponent implements OnInit {

  tranList : any = [];
  cancelled_list : any = [];

  sent_message : boolean = false;

  status: string = "";

  constructor(
    public userservice : UserService,
    public notif: NotificationService
  ) { }

  ngOnInit(): void {

    this.Transactions();

  }

  Transactions()
  {
    var data;
    var tempArray = [];
    this.userservice.get_transaction_admin().then(e=>{
      e.forEach(item=>{
        if(item.data().status != 'cancelled' && item.data().status != 'sent')
        {
          this.userservice.get_UserInfo(item.data().patient_id)
          .then(as=>{
            this.userservice.get_transactionInfo(as.id,item.data().patient_transaction_id)
            .then(res=>{
              this.userservice.get_UserInfo(res.data().doctor_id).then(docInfo=>{
                data = res.data();
                data.uid = item.id;
                data.patient_name = as.data().fullname;
                data.doctor_name = docInfo.data().fullname;
                data.status = item.data().status;
                tempArray.push(data);
              }).then(()=>{
                if(this.status=="")
                  this.tranList = tempArray;
                else
                {
                  this.tranList = tempArray.filter(e=>{
                    return e.status.toLocaleLowerCase().match(this.status.toLocaleLowerCase());
                  })
                }
                console.log(this.tranList)
              })
            })
          })
        }
      })
    })
  }

  send_notif(info)
  {
    let record = {};
    record['net_income']=  info.Amount-(info.Amount*(info.deduction/100));
    record['status'] = "sent";
    record['updatedAt'] = formatDate(new Date(),'short','en');
    this.userservice.update_transaction_admin(info.uid,record)
    .then(()=>{
      console.log('Sent!');

      //Notification for doctor
      let record = {};
      record['title'] = "Payout"
      record['description'] = "You have received an amount of " + (info.Amount-(info.Amount*(info.deduction/100))) + "(Inclusive of 10% commission)";
      record['createdAt'] = formatDate(new Date(),'short','en');
      this.notif.send_doctor(info.doctor_id,record);

      this.ngOnInit();
      this.sent_message = true;
      setTimeout(() => {
        this.sent_message = false;
      }, 5000);
    })
  }
  send_notif2(info)
  {
    let record = {};
    record['net_income']=  info.Amount-(info.Amount*(20/100));
    record['status'] = "refund";
    record['updatedAt'] = formatDate(new Date(),'short','en');
    this.userservice.update_transaction_admin(info.uid,record)
    .then(()=>{
      console.log('Sent!');

      let record = {};
      record['title'] = "Payout from cancelled consultation"
      record['description'] = "You have received an amount of " + (info.Amount*(info.deduction/100)) + "(Inclusive of 10% commission)";
      record['createdAt'] = formatDate(new Date(),'short','en');
      this.notif.send_doctor(info.doctor_id,record);

      record = {};
      record['title'] = "Refund"
      record['description'] = "You have received an amount of " + (info.Amount-(info.Amount*(20/100))) + "(Inclusive of 20% cancellation fee)";
      record['createdAt'] = formatDate(new Date(),'short','en');
      this.notif.send_patient(info.patient_id,record);

      this.ngOnInit();
      this.sent_message = true;
      setTimeout(() => {
        this.sent_message = false;
      }, 5000);
    })
  }

}
