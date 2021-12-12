import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
declare var paypal;
@Component({
  selector: 'app-health-insurance-transaction',
  templateUrl: './health-insurance-transaction.component.html',
  styleUrls: ['./health-insurance-transaction.component.css']
})
export class HealthInsuranceTransactionComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef

  userid: string= "";
  
  payerInfo: any = [];
  list: any = [];
  history: any = [];

  tran: boolean = true;
  tranH: boolean = false;

  constructor(
    public afu : AuthService,
    public userservice: UserService,
    public notif: NotificationService
  ) { }

  ngOnInit(): void {
    this.userid = this.afu.get_UID();

    this.paypalButton();
    this.get_transactionList();
    this.get_history();
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
        this.userservice.get_UserInfo(item.data().patient_id)
        .then(patient=>{
          this.userservice.get_UserInfo(item.data().doctor_id)
          .then(doctor=>{
            data = item.data();
            data.uid = item.id;
            data.patient_name = patient.data().fullname;
            data.doctor_name = doctor.data().fullname;
            tempArray.push(data);
          })
        })
      })
    })
    this.list = tempArray;
    console.log(this.list);
  }
  get_history()
  {
    var data;
    var tempArray = [];
    this.userservice.get_insurance_transactionHistory(this.userid)
    .then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.history = tempArray;
    console.log(this.history);
  }
  paypalButton() // for patient
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
        this.send_notif(this.payerInfo);
      },
      onError: err => {
        console.log(err);
      }
    }).render(this.paypalElement.nativeElement);
  }

  send_notif(info)
  {
    console.log(info);
    document.getElementById('closeCancel2').click();
    var commision = info.Amount*(info.deduction/100);
    var net_income = info.Amount - commision;
    let record = {};
    //transaction history for insurance
    record['Amount'] = info.Amount;
    record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy, h:mm a','en');
    record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
    record['patient_name'] = info.patient_name;
    record['doctor_name'] = info.doctor_name;
    record['paymentType'] = info.paymentType;
    record['status'] = info.status;

   this.userservice.add_transactionHistory_insurance(this.userid,record).then(e=>{
      console.log('Added in Insurance Transaction History!')
      //transaction for doctor
      record = {};
      record['net_income'] = net_income;
      record['Amount'] = info.Amount;
      record['deduction'] =  commision;
      record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy, h:mm a','en');
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
      record['patient_name'] = info.patient_name;
      record['paymentType'] = info.paymentType;
      record['schedule'] = info.consultation_schedule;
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
      record['paymentType'] = info.paymentType;
      record['schedule'] = info.consultation_schedule;
      record['transaction_id'] = e.id;


      this.userservice.create_transactionHistory_User(info.patient_id,record)
      .then(()=>{
        console.log('Added in Patient Transaction History!')
      })
   })
   .then(()=>{
     this.userservice.delete_transaction_insurance(this.userid,info.uid).then(()=>{
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


  open_modalPay(info)
  {
    console.log(info);
    var deduction = 0,net_income = 0;
    deduction = info.Amount*(info.deduction)/100;
    net_income = info.Amount - deduction
    this.userservice.get_UserInfo(info.doctor_id)
    .then(e=>{
      this.payerInfo = info;
      this.payerInfo.deductions = deduction;
      this.payerInfo.net_income = net_income;
      this.payerInfo.payer_email = e.data().paypal_email;
    })
  }

}
