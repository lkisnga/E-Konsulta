import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { ThrowStmt } from '@angular/compiler';
import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit{

  UID: any;
  isLoggedIn: boolean;
  userID: string = "";
  userData: any = [];
  constructor(public authservice : AuthService, private db: AngularFirestore, public router:Router,
    public userService: UserService) {

  }
  //test
  ngOnInit()
  {
    this.userID = this.authservice.get_UID();
    console.log(this.userID);
    if(this.userID != null)
    {
    this.userService.get_UserInfo(this.userID).then(item => {
      this.userData = item.data();
    })
   }
  }
}
