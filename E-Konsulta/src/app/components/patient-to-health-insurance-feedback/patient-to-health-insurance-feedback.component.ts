import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-to-health-insurance-feedback',
  templateUrl: './patient-to-health-insurance-feedback.component.html',
  styleUrls: ['./patient-to-health-insurance-feedback.component.css']
})
export class PatientToHealthInsuranceFeedbackComponent implements OnInit {

  info : any = [];
  info2 : any = [];

  constructor(public userservice : UserService, public share : SharedDataService) { }

  ngOnInit(): void {
    //getting user data from the insurance list
   this.info= this.share.get_list();
    //saving data into the localStorage
   if(localStorage.getItem('data') == null)
   {
     localStorage.setItem('data',JSON.stringify(this.info));
   }
   //retrieving data from the localStorage
   this.info2 = JSON.parse(localStorage.getItem('data'));
   //console.log(this.info2);

   this.userservice.get_health_Reviews(this.info2.uid).forEach(e=>{
     e.forEach(item=>{
       console.log(item.data());
     })
   })
  }

}
