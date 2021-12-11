import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
declare var paypal;

@Component({
  selector: 'app-admin-transaction-history',
  templateUrl: './admin-transaction-history.component.html',
  styleUrls: ['./admin-transaction-history.component.css']
})
export class AdminTransactionHistoryComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef
  tranList : any = [];
  tranHis: any = [];
  cancelled_list : any = [];

  sent_message : boolean = false;

  status: string = "";

  transac_his: boolean = false;
  transac: boolean = true;

  payerInfo: any = [];

  pay: any = [];

  constructor(
    public userservice : UserService,
    public notif: NotificationService
  ) { }
  ngOnInit(): void {

    this.Transactions();
    this.transactionHistory();
    this.paypalButton();

  }

  tabFunction(info)
  {
    if(info == 'th')
    {
      this.transac = false;
      this.transac_his = true;
    }
    else
    {
      this.transac = true;
      this.transac_his = false;
    }
  }

  Transactions()
  {
    var data;
    var tempArray = [];
    this.userservice.get_transaction_admin().then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().patient_id)
        .then(patientInfo=>{
          this.userservice.get_UserInfo(item.data().doctor_id)
          .then(doctorInfo=>{
            data = item.data();
           // data.deduction = item.data().deduction.toString();
            data.uid = item.id;
            data.patient_name = patientInfo.data().fullname;
            data.doctor_name = doctorInfo.data().fullname;
            tempArray.push(data);
          })
        })
      })
    })
    this.tranList = tempArray;
    console.log(this.tranList);
  }

  paypalButton()
  {
    paypal
    .Buttons({
      style: {
        layout:  'vertical',
        color:   'silver',
        shape:   'pill',
        label:   'paypal'
      },
      createOrder: (data, actions)=>{
        return actions.order.create({
          intent: 'CAPTURE',
          description : "" ,
          purchase_units:[{
            amount: {
              currency_code: 'USD',
              value: this.payerInfo.net_income
            },
            payee: {
              email_address: this.payerInfo.payer_email
            }
          }]
        });
      },
      onApprove: async (data, actions) =>{
        const order = await actions.order.capture();
        console.log(order);
        this.send_notif2(this.payerInfo);
      },
      onError: err => {
        console.log(err);
      }
    }).render(this.paypalElement.nativeElement);
  }

  transactionHistory()
  {
    var data;
    var tempArray = [];
    this.userservice.get_transactionHistory().then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.tranHis = tempArray;
  }

  send_notif(info)
  {


    console.log(info);
    var commision = info.Amount*(info.deduction/100);
    var net_income = info.Amount - commision;
    let record = {};
    //transaction history for admin
    record['Amount'] = commision;
    record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy, h:mm a','en');
    record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
    record['patient_name'] = info.patient_name;
    record['doctor_name'] = info.doctor_name;
    record['status'] = info.status;


   this.userservice.add_transactionHistory(record).then(e=>{
      console.log('Added in Admin Transaction History!')
      //transaction for doctor
      record = {};
      record['net_income'] = net_income;
      record['Amount'] = info.Amount;
      record['deduction'] =  commision;
      record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy, h:mm a','en');
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
      record['patient_name'] = info.patient_name;
      record['status'] = info.status;
      record['transaction_id'] = e.id;


      this.userservice.create_transactionHistory_User(info.doctor_id,record)
      .then(()=>{
        console.log('Added in Doctor Transaction History!')
      })
      //transaction for patient
      record = {};
      record['Amount'] = info.Amount;
      record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy, h:mm a','en');
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
      record['doctor_id'] = info.doctor_id;
      record['status'] = info.status;
      record['transaction_id'] = e.id;


      this.userservice.create_transactionHistory_User(info.patient_id,record)
      .then(()=>{
        console.log('Added in Patient Transaction History!')
      })
   })
   .then(()=>{
     this.userservice.delete_transaction(info.uid).then(()=>{
       console.log('Transaction Deleted and moved to Transaction History!')

      //Notification for doctor
      let record = {};
      record['title'] = "Payout"
      record['description'] = "You have received an amount of " + net_income + "(Inclusive of 10% commission)";
      record['createdAt'] = formatDate(new Date(),'short','en');
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
      this.notif.send_doctor(info.doctor_id,record);

      this.ngOnInit();
     })
   })
  }


  open_modalCancel(info)
  {
    var deduction = 0,net_income = 0;
    deduction = info.Amount*(info.deduction+10)/100;
    net_income = info.Amount - deduction
    this.payerInfo = info;
    this.payerInfo.deductions = deduction;
    this.payerInfo.net_income = net_income;
  }
  //For cancellations
  send_notif2(info)
  {
    document.getElementById('closeCancel').click();
    let record = {};
    record['Amount'] = info.deductions;
    record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy, h:mm a','en');
    record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
    record['patient_name'] = info.patient_name;
    record['doctor_name'] = info.doctor_name;
    record['status'] = info.status;


    this.userservice.add_transactionHistory(record)
    .then((e)=>{


      let record = {};
      record['Amount'] = info.net_income;
      record['doctor_id'] = info.doctor_id;
      record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy, h:mm a','en');
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
      record['status'] = info.status;
      record['transaction_id'] = e.id;

      this.userservice.create_transactionHistory_User(info.patient_id,record)
      .then(()=>{
        console.log('Added Patient transaction history!');
        //Patient Notification
        record = {};
        record['title'] = "Refund"
        record['description'] = "You have received an amount of " + info.net_income + "(Inclusive of 20% cancellation fee)";
        record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        record['createdAt'] = formatDate(new Date(),'short','en');
        this.notif.send_patient(info.patient_id,record);
      })

    })
    .then(()=>{
     this.userservice.delete_transaction(info.uid).then(()=>{
       console.log('Transaction Deleted and moved to Transaction History!');
       this.ngOnInit();
     })
    });
  }

}
