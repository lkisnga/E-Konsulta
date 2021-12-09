import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

declare var paypal;
@Component({
  selector: 'app-patient-payment',
  templateUrl: './patient-payment.component.html',
  styleUrls: ['./patient-payment.component.css']
})


export class PatientPaymentComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef

  paidFor: boolean = false;
  unsuc : boolean;
  error_book : string = "";

  docInfo : any = [];
  schedInfo : any = [];

  userId : string = "";

  sched : string = "";
  schedTime: string = "";
  userInfo:any = JSON.parse(localStorage.getItem('Users'));
  spent:number = 0;

  paymentType : string = "";

  transaction_id : string = "";
  constructor(
    public userservice : UserService,
    public afu : AuthService,
    public router : Router,
    public chats : ChatService,
    public notif : NotificationService
  ) { }

  ngOnInit(): void {
    this.docInfo = JSON.parse(localStorage.getItem('data'));
    this.schedInfo = JSON.parse(localStorage.getItem('schedule'));
    this.userId = this.afu.get_UID();
    console.log(this.docInfo);
    this.paypalButton();
    this.get_schedule();

    console.log(this.userInfo.email)

  }



  paypalButton()
  {
    paypal
    .Buttons({
      createOrder: (data, actions)=>{
        return actions.order.create({
          purchase_units: [
            {
              description: this.userInfo.email + " paid $" + this.docInfo.consultation_fee + " as consultation fee for " + this.docInfo.email,
              amount: {
                currency_code: 'USD',
                value: this.docInfo.consultation_fee
              }
            }
          ]
        });
      },
      onApprove: async (data, actions) =>{
        const order = await actions.order.capture();
        this.paidFor = true;
        this.paymentType = "paypal";

        console.log(order);
        //record to be created in Transaction Collection 
        let record = {};
        record['status'] = "pending";
        record['deduction'] = 10;
        record['patient_id'] = this.userId;
        record['doctor_id'] = this.docInfo.uid;
        record['Specialization'] = this.docInfo.ins;
        
        record['paymentType'] = this.paymentType;
        record['payer_email'] = order.payer.email_address;
        
        record['Schedule'] = this.sched + ' ' + this.schedTime;
        record['consultation_schedule'] = this.schedInfo.consultation_schedule;
        record['Amount'] = order.purchase_units[0].amount.value;
        //use for transaction Sorting
        record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
        record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy, h:mm a','en');
        record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();

        //use for transaction filtering
        var data2 = new Date();
        record['monthUpdated'] = data2.getMonth()+1;  
        
        this.userservice.create_transaction(record).then((e)=>{
          console.log('Added to transaction!');

          //passing transaction ID for UPCOMING
          this.transaction_id = e.id;

        });
      },
      onError: err => {
        this.unsuc = true;
        console.log(err);
        this.error_book = "Unsuccessful transaction!!";
        setTimeout(() => {
          this.error_book = "";
        }, 5000);
        }
    })
    .render(this.paypalElement.nativeElement);
  }

  insurance_pay()
  {
    var balance;
    let record = {};
    this.userservice.get_UserInfo(this.userId)
    .then(res=>{
      if(res.data().isVerified != 'pending')
      {
        this.userservice.get_patient_insurance(this.userId)
        .then(e=>{
          if(!e.empty)
          {
            e.forEach(item=>{
              balance = item.data().limit - item.data().spent;
              if(balance >= this.docInfo.consultation_fee)
              {
                console.log('Can Pay!');
                this.spent = parseFloat(item.data().spent)+ parseFloat(this.docInfo.consultation_fee);
                console.log(this.spent);
                record['spent'] = this.spent;
                record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
                record['id'] = item.id;
                this.userservice.pay_insurance(this.userId,record).then(()=>{
                  console.log('Paid!');
                  this.paidFor = true;
                  this.paymentType = "insurance";
                })
              }
              else
              {
                console.log('Balance insufficient!');
                this.error_book = "Insufficient balance!";
                setTimeout(() => {
                  this.error_book = "";
                }, 5000);
              }
            })
          }
          else
          {
            console.log("Your Insurance Info has not been Updated yet");
            this.error_book = "Your Insurance Info has not been Updated yet!";
            setTimeout(() => {
              this.error_book = "";
            }, 5000);
          }
        })
      }
      else
      {
        console.log('Insurance is not yet Verified!');
        this.error_book = "Insurance is not yet Verified!";
        setTimeout(() => {
          this.error_book = "";
        }, 5000);
      }
    })
  }

  book()
  {
    if(this.paidFor == false)
    {
      this.error_book = "Pay first before booking!";
      setTimeout(() => {
        this.error_book = "";
      }, 5000);
    }
    else
    {
      let record = {};
      record['patient_id'] = this.userId;
      record['schedule_id'] = this.schedInfo.schedule;
      record['time_id'] = this.schedInfo.time;
      record['consultation_schedule'] = this.schedInfo.consultation_schedule;

      this.userservice.patient_book_schedule(record)
      .then(()=>{
        let record = {}
        record['doctor_id'] = this.docInfo.uid;
        record['patient_id'] = this.userId;
        record['transaction_id'] = this.transaction_id;
        record['id'] = new Date(formatDate(new Date(),this.schedInfo.consultation_schedule,'en')).getTime();
        record['schedule'] = this.sched;
        record['time'] = this.schedTime;
        record['paymentType'] = this.paymentType;
        record['consultation_schedule'] = this.schedInfo.consultation_schedule;
        record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
        record['status'] = 'pending'
        this.userservice.create_doctor_upcoming(record).then(()=>{
          console.log('added upcoming!');
          
          //Notification
          let record2 = {};
          record2['createdAt'] = formatDate(new Date(),'short','en');
          record2['title'] = "Patient Booked";
          record2['description'] = "A patient successfully booked! Check your Patients upcoming!";
          this.notif.send_doctor(this.docInfo.uid,record2)

          this.router.navigate(['patient-consultation']);
          this.create_chat();
        })
      })
    }
  }
  get_schedule()
  {
    this.userservice.get_scheduleInfo(this.schedInfo.schedule).then(e=>{
      this.sched= e.data().date;
    })
    this.userservice.get_timeInfo(this.schedInfo.schedule,this.schedInfo.time).then(res=>{
      this.schedTime = res.data().time;
     })
  }
  create_chat()
  {
    this.chats.check_chat(this.docInfo.uid,this.userId).then(e=>{
      if(e.empty)
        this.chats.create_chat(this.docInfo.uid,this.userId);
      else
        console.log("Chat already exist!");
    })  
  }
}
