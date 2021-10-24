import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-insurance-reviews',
  templateUrl: './health-insurance-reviews.component.html',
  styleUrls: ['./health-insurance-reviews.component.css']
})
export class HealthInsuranceReviewsComponent implements OnInit {

  userId : string = "";
  info : any = [];
  imgUrl : any;

  fList : any = [];

  feedback : string  =  "";
  reviewId : string = "";
  feedbackId : string = "";

  replyList : any = [];

  constructor(public userservice : UserService, public afu : AuthService) { }

  ngOnInit(): void {

    this.userId = this.afu.get_UID();

    this.userservice.get_avatar(this.userId).then(e=>{
      this.imgUrl = e.data().image;
    })


    this.userservice.get_HealthInsurance_Info(this.userId).then(e=>{
      //console.log(e.data());
      this.info = e.data();
    })

    var data;
    var tempArray=[];
    var data2;
    var tempArray2=[];
    this.userservice.get_health_Reviews(this.userId).forEach(e=>{
      e.forEach(item=>{
        this.userservice.get_avatar(item.data().from).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        })
        this.userservice.get_insurance_reply(this.userId,item.id).then(res=>{
          res.forEach(a=>{
            data2 = a.data();
            tempArray2.push(data2);
          })
          this.replyList = tempArray2;
          console.log(this.replyList);
        })
      })
    })
    this.fList = tempArray;
    //console.log(this.fList);
  }

  reply_button(e)
  {
    this.reviewId = e.uid;
    this.feedbackId = e.from;
    console.log(e);
  }

  reply_user(e)
  {
    this.userservice.Insurance_reply(this.userId,e.feedback,this.info.name,this.reviewId,this.feedbackId);
  }

}
