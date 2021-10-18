import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  userID : string = ""
  imgUrl : any;
  info : any = [];
  constructor(public userservice : UserService, public afu : AuthService) { }

  ngOnInit(): void {
    this.userID = this.afu.get_UID();

    this.userservice.get_avatar(this.userID).then(e =>{
      if(e.data().image)
        this.imgUrl = e.data().image;
    }).catch(error => {
      console.log(error.message);
    })

    this.userservice.get_UserInfo(this.userID).then(e => {
      console.log(e.data());
      this.info = e.data();
    })
  }
  logout()
  {
    this.afu.signout();
  }
}
