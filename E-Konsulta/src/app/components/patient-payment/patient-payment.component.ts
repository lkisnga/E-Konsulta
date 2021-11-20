import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  paidFor: boolean;

  constructor() { }

  ngOnInit(): void {
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
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
}
