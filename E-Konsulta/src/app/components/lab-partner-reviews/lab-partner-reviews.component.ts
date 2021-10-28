import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lab-partner-reviews',
  templateUrl: './lab-partner-reviews.component.html',
  styleUrls: ['./lab-partner-reviews.component.css']
})

export class LabPartnerReviewsComponent implements OnInit {

  userID : string = "";
  labname : string = "";

  reviewID : string = "";
  send_to : string = "";

  info : any = [];

  imgUrl : any = "";
  userImgUrl : any = [];

  list : any = [];
  replyList : any = [];

  feedback : string = "";

  constructor(public userservice : UserService, public afu : AuthService) { }

  ngOnInit(): void {
    //get Lab ID
    this.userID = this.afu.get_UID();

    //for Lab image
    this.userservice.get_avatar(this.userID).then(e=>{
      this.imgUrl = e.data().image;
    })
    //for lab info
    this.get_labinfo();
    //getting all feedbacks
    this.get_feedbacks();
  }

  get_labinfo()
  {
    this.userservice.get_labInfo(this.userID).forEach(e=>{
      this.info = e.data();
      this.labname = e.data().name;
      //console.log(e.data());
    }) 
  }
  get_feedbacks()
  {
    var data,data2,data3;
    var tempArray = [],tempArray2=[],tempArray3 = [];
    this.userservice.get_Lab_Reviews(this.userID).then(e => {
      e.forEach(item => {
        data = item.data();
        data.uid = item.id;

        this.userservice.get_avatar(item.data().from).then(rs=>{
          data3 = rs.data();
          data3.uid = rs.id;
          tempArray3.push(data3);
        })
        this.userImgUrl = tempArray3;
        console.log(this.userImgUrl);

        this.userservice.get_labreply(this.userID,item.id).then(a=>{
          a.forEach(res=>{
            data2 = res.data();
            data2.uid = res.id;
            tempArray2.push(data2);
          })
          this.replyList = tempArray2;
        })
        tempArray.push(data);
      })
    })
    this.list = tempArray;
    console.log(this.list);
  }

  reply_edit(list)
  {
    console.log(list);
    this.reviewID = list.uid;
    this.send_to = list.from;
  }

  lab_reply(e)
  {
    this.userservice.lab_reply(this.userID,e.feedback,this.labname,this.reviewID,this.send_to).then(()=>{
      console.log("Replied Successfully!");
      this.ngOnInit();
    });
  }

}
