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

  constructor(
    public userservice : UserService,
    public notif: NotificationService
  ) { }
  pending = true;
  cancelled = false;

  pendingFunction(){
    this.pending = true;
    this.cancelled = false;
  }
  cancelledFunction(){
   this.pending = false;
   this.cancelled = true;
  }

  ngOnInit(): void {

    this.doctorTransac();
    this.cancelledList();

  }

  doctorTransac()
  {
    var data;
    var tempArray = [];
    this.userservice.get_transaction_admin().then(e=>{
      e.forEach(item=>{
        if(item.data().status == 'pending')
        {
          this.userservice.get_UserInfo(item.data().doctor_id).then(es=>{
            this.userservice.get_UserInfo(item.data().patient_id).then(as=>{
              if(as.exists)
              {
                data = item.data();
                data.doctor_name = es.data().fullname;
                console.log(as.data().fullname);
                data.patient_name = as.data().fullname;
                data.uid = item.id;
                tempArray.push(data);
              }
            })
          })
        }
      })
    })
    this.tranList = tempArray;
    //console.log(this.tranList);
  }

  cancelledList()
  {
    var data;
    var tempArray = [];
    this.userservice.get_transaction_admin().then(e=>{
      e.forEach(item=>{
        if(item.data().status == 'cancelled')
        {
          this.userservice.get_UserInfo(item.data().doctor_id).then(es=>{
            this.userservice.get_UserInfo(item.data().patient_id).then(as=>{
              if(as.exists)
              {
                data = item.data();
                data.doctor_name = es.data().fullname;
                console.log(as.data().fullname);
                data.patient_name = as.data().fullname;
                data.uid = item.id;
                tempArray.push(data);
              }
            })
          })
        }
      })
    })
    this.cancelled_list = tempArray;
    //console.log(this.tranList);
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
