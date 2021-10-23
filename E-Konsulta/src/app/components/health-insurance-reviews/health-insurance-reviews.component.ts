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
    this.userservice.get_health_Reviews(this.userId).forEach(e=>{
      e.forEach(item=>{
        this.userservice.get_avatar(item.data().from).then(res=>{
          data = item.data();
          data.image = res.data().image;
          tempArray.push(data);
        })
      })
    })
    this.fList = tempArray;
    //console.log(this.fList);
  }

}
