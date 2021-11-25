import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireStorage} from '@angular/fire/storage';
import { UserService } from 'src/app/services/user.service';



export class Userinfo
{
  public fullname: string;
  public email: string;
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
  userData: any = []; // storing the user Data from 
  file: any;
  imgUrl: any = "";

  profile_changed : boolean = false;

  delete_modal: boolean = false;

  constructor(public authservice : AuthService, public router:Router,
    public userService: UserService) {
      
  }
  ngOnInit()
  {
    //getting UID from the current User
    this.userID = this.authservice.get_UID();

   //getting image Profile
    //this.userService.get_avatarURL(this.userID)
    this.userService.get_avatar(this.userID).then(e =>{
      if(e.data().image)
        this.imgUrl = e.data().image;
    }).catch(error => {
      console.log(error.message);
    })
   //End
   
   //Getting User Information
    //console.log(this.userID);
    if(this.userID != null)
    {
    this.userService.get_UserInfo(this.userID).then(item => {
      this.userData = item.data();
    })
   }
   //End
  }
  choosefile(e)
  {
    this.file = e.target.files[0];
    console.log(this.file);
  }

  uploadImage()
  {
    this.userService.upload_avatar(this.file,this.userID)
    .then(()=>{
      this.ngOnInit();
      this.profile_changed = true;
      setTimeout(() => {
        this.profile_changed = false;
      }, 5000);
    });
  }

  editUser()
  {
    this.model.fullname = this.userData.fullname;
    this.model.email = this.userData.email;
    this.model.password = this.userData.password;
    this.model.role = this.userData.role;
  }
  onSubmit(user_record)
  {
    let record = {};
    record['fullname'] = user_record.fullname;
    record['email'] = user_record.email;
    record['password'] = user_record.password;
    record['role'] = user_record.role;
    
    this.userService.update_user(this.userID,record).then(()=>{
      this.ngOnInit()
    });
  }
  back_delete()
  {
    this.router.navigate(['admin-profile']);
  }
  delete_account()
  {
    this.router.navigate(['admin-profile']);
    /*
    this.authservice.delete_user().then(()=>{
      console.log('Successfully Deleted!');
    })*/
  }
}
