import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-to-health-insurance-feedback',
  templateUrl: './patient-to-health-insurance-feedback.component.html',
  styleUrls: ['./patient-to-health-insurance-feedback.component.css']
})
export class PatientToHealthInsuranceFeedbackComponent implements OnInit {

  userId : string = "";

  info : any = [];
  info2 : any = [];

  flist : any = [];
  replyList : any = [];

  constructor(public userservice : UserService, public share : SharedDataService, public afu : AuthService) { }

  ngOnInit(): void {

   this.userId=this.afu.get_UID();

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

  this.get_feedback();
  }

  get_feedback()
  {
   var data,data2;
   var tempArray = [],tempArray2=[];
   //getting feedbacks
   this.userservice.get_health_review(this.info2.uid).then(e=>{
     e.forEach(item=>{
       //getting image from a specific feedback
      this.userservice.get_avatar(item.data().from).then(res=>{
        data = item.data();
        data.uid = item.id;
        data.image = res.data().image;
        tempArray.push(data);
      })
      //getting replies from the feedbacks
      this.userservice.get_insurance_reply(this.info2.uid,item.id).then(res=>{
        res.forEach(a=>{
          data2 = a.data();
          tempArray2.push(data2);
        })
        this.replyList = tempArray2;
        //console.log(this.replyList);
      })
     })
   })
   this.flist= tempArray;
  }

}
