import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-reviews',
  templateUrl: './doctor-reviews.component.html',
  styleUrls: ['./doctor-reviews.component.css']
})
export class DoctorReviewsComponent implements OnInit {

  userId : string = "";
  info : any = [];  
  imgUrl : any;
  replyList : any = [];
  fList : any = [];

  reply : string = "";

  reviewId : string = "";
  sent_to : string = "";

  constructor(public userservice : UserService, public afu : AuthService) { }

  ngOnInit(): void {

    this.userId = this.afu.get_UID();
    this.userservice.get_patientInfo(this.userId).then(e=>{
      this.info = e.data();
      //console.log(this.info);
    })

    this.userservice.get_avatar(this.userId).then(e=>{
      this.imgUrl = e.data().image;
    })

    this.doctor_reviews();
  }

  reply_button(e)
  {
    this.reviewId = e.uid;
    this.sent_to = e.from;
  }
  reply_user(e)
  {
    this.userservice.doctor_reply(this.userId,e.reply,this.info.fullname,this.reviewId,this.sent_to).then(e=>{
      console.log("successfully Replied!");
      this.ngOnInit();
    })
  }
  doctor_reviews()
  {
    var data,data2;
    var tempArray = [],tempArray2=[];
    this.userservice.get_Doctor_Reviews(this.userId).then(e=>{
      e.forEach(item=>{

        this.userservice.get_avatar(item.data().from).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        })

        this.userservice.get_doctorReply(this.userId,item.id).then(res=>{
          res.forEach(a=>{
            data2 = a.data();
            data2.uid = a.id;
            data2.review_id = item.id;
            tempArray2.push(data2);
          })
        })
        this.replyList = tempArray2;

      })
    })
    this.fList = tempArray;
  } 

  remove_reply(info)
  {
    console.log(info);
    this.userservice.remove_doctorReply(this.userId,info.review_id,info.uid)
    .then(()=>{
      console.log('Deleted!');
      this.ngOnInit();
    })
  }

}
