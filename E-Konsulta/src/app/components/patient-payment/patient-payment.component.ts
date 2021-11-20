import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

declare var paypal;
@Component({
  selector: 'app-patient-payment',
  templateUrl: './patient-payment.component.html',
  styleUrls: ['./patient-payment.component.css']
})


export class PatientPaymentComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef

  product = {
    price: 777.77,
    description: 'Doctor Consultation',
  }
  paidFor: boolean = false;
  unsuc : boolean;
  error_book : string = "";

  docInfo : any = [];
  userId : string = "";

  constructor(
    public userservice : UserService,
    public afu : AuthService,
    public router : Router,
    public chats : ChatService
  ) { }

  ngOnInit(): void {
    this.docInfo = JSON.parse(localStorage.getItem('data'));
    this.userId = this.afu.get_UID();
    console.log(this.docInfo);
    this.paypalButton();

  }



  paypalButton()
  {
    paypal
    .Buttons({
      createOrder: (data, actions)=>{
        return actions.order.create({
          purchase_units: [
            {
              description: this.product.description,
              amount: {
                currency_code: 'USD',
                value: this.product.price
              }
            }
          ]
        });
      },
      onApprove: async (data, actions) =>{
        const order = await actions.order.capture();
        this.paidFor = true;
        console.log(order);
      },
      onError: err => {
        this.unsuc = true;
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
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

    }
  }
  booknow()
  {
    let record = {};
    record['doctor_id'] = this.docInfo.uid;
    record['patient_id'] = this.userId;
    this.userservice.check_upcoming(this.docInfo.uid,this.userId).then(e=>{
      if(!e.empty)
        console.log('not empty!');
      else
      {
        this.userservice.create_doctor_upcoming(record);
        this.create_chat();
      }
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
