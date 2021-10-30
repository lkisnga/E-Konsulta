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
            tempArray2.push(data2);
          })
        })
        this.replyList = tempArray2;

      })
    })
    this.fList = tempArray;
    console.log(this.replyList);
  }

}
