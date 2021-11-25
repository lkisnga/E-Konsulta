import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

export class EditInfo
{
  email : string;
  name : string;
  contact_number : string;
  address : string;
  password : string;
}


@Component({
  selector: 'app-lab-partner-profile',
  templateUrl: './lab-partner-profile.component.html',
  styleUrls: ['./lab-partner-profile.component.css']
})
export class LabPartnerProfileComponent implements OnInit {

  userID : string = "";
  info : any = [];
  imgUrl : any = "";
  model = new EditInfo();
  file : any;

  profile_changed: boolean = false;

  constructor(public userservice : UserService, public afu : AuthService) { }

  ngOnInit(): void {
    this.userID=this.afu.get_UID();
    this.userservice.get_labInfo(this.userID).forEach(e => {
      this.info = e.data();
      //console.log(e.data());
    })

    this.userservice.get_avatar(this.userID).then(e =>{
      if(e.data().image)
        this.imgUrl = e.data().image;
    }).catch(error => {
      console.log(error.message);
    })
  }
  uploadImage()
  {
    this.userservice.upload_avatar(this.file,this.userID)
    .then(()=>{
      this.ngOnInit();
      this.profile_changed = true;
      setTimeout(() => {
        this.profile_changed = false;
      }, 5000);
    });
  }
  choosefile(e)
  {
    this.file = e.target.files[0];
  }
  logout()
  {
    this.afu.signout();
  }

  editInfo()
  {
    this.model.name = this.info.name;
    this.model.address = this.info.address;
    this.model.email = this.info.email;
    this.model.password = this.info.password;
    this.model.contact_number = this.info.contact_number;
  }
  updateInfo(e)
  {
    this.userservice.update_labInfo(this.userID,e).then(()=>{
      this.ngOnInit();
    })
  }
}
