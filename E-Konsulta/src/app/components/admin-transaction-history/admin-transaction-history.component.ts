import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-transaction-history',
  templateUrl: './admin-transaction-history.component.html',
  styleUrls: ['./admin-transaction-history.component.css']
})
export class AdminTransactionHistoryComponent implements OnInit {

  tranList : any = [];

  constructor(
    public userservice : UserService
  ) { }

  ngOnInit(): void {

    this.doctorTransac();

  }

  doctorTransac()
  {
    var data;
    var tempArray = [];
    this.userservice.get_transaction_admin().then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().doctor_id).then(es=>{
          this.userservice.get_UserInfo(item.data().patient_id).then(as=>{
            data = item.data();
            data.doctor_name = es.data().fullname;
            data.patient_name = as.data().fullname;
            data.uid = item.id;
            //console.log(data)
            tempArray.push(data);
          })
        })
      })
    })
    this.tranList = tempArray;
    //console.log(this.tranList);
  }

  send_notif(info)
  {
    console.log(info);
  }

}
