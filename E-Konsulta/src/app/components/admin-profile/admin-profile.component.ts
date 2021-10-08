import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { ThrowStmt } from '@angular/compiler';
import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { UserService } from 'src/app/services/user.service';


export class Userinfo
{
  public fullName: string;
  public emailAddress: string;
  public password: string;
  public role : string;
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit{

  model = new Userinfo();

  UID: any;
  isLoggedIn: boolean;
  userID: string = "";
  userData: any = []; // storing the user Data from firestore
  constructor(public authservice : AuthService, private db: AngularFirestore, public router:Router,
    public userService: UserService) {

  }
  //test
  ngOnInit()
  {
    this.userID = this.authservice.get_UID();
    //console.log(this.userID);
    if(this.userID != null)
    {
    this.userService.get_UserInfo(this.userID).then(item => {
      this.userData = item.data();
    })
   }
  }

  editUser()
  {
    this.model.fullName = this.userData.fullName;
    this.model.emailAddress = this.userData.emailAddress;
    this.model.password = this.userData.password;
    this.model.role = this.userData.role;
  }
  onSubmit(user_record)
  {
    let record = {};
    record['fullName'] = user_record.fullName;
    record['emailAddress'] = user_record.emailAddress;
    record['password'] = user_record.password;
    record['role'] = user_record.role;
    
    this.userService.update_user(this.userID,record);

    this.ngOnInit();
  }
}
