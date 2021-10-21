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

  info : any = [];

  imgUrl : any = "";

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
    this.userservice.get_labInfo(this.userID).forEach(e=>{
      this.info = e.data();
      this.labname = e.data().name;
      //console.log(e.data());
    }) 

    //getting all feedbacks
    var data,data2;
    var tempArray = [],tempArray2=[];
    this.userservice.get_Lab_Reviews(this.userID).forEach(e => {
      e.forEach(item => {
        data = item.data();
        data.uid = item.id;
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

  lab_reply(e,list)
  {
    //console.log(list);
    this.userservice.lab_reply(this.userID,e.feedback,this.labname,list.uid);
    this.feedback = "";
  }

}
