import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

export class InsuranceInfo
{
  name: string;
  email: string;
  branchname: string;
  contact_number: string;
  address: string;
  password : string;
}


@Component({
  selector: 'app-health-insurance-profile',
  templateUrl: './health-insurance-profile.component.html',
  styleUrls: ['./health-insurance-profile.component.css']
})
export class HealthInsuranceProfileComponent implements OnInit {

  userId : string = "a";
  model = new InsuranceInfo();
  info : any = [];
  imgUrl : any;
  file : any;
  constructor(public userservice : UserService, public afu : AuthService) { }
  
  ngOnInit(): void {
    this.userId = this.afu.get_UID();

    this.userservice.get_avatar(this.userId).then(e=>{
      this.imgUrl = e.data().image;
    })

    this.userservice.get_HealthInsurance().then(e=>{
      e.forEach(item => {
        this.info = item.data();
        //console.log(this.info);
      })
    })
  } 
  uploadImage()
  {
    this.userservice.upload_avatar(this.file,this.userId);
  }
  choosefile(e)
  {
    this.file = e.target.files[0];
    console.log(this.file);
  }

  editInfo()
  {
    this.model.name = this.info.name;
    this.model.email = this.info.email;
    this.model.password = this.info.password;
    this.model.branchname = this.info.branchname;
    this.model.contact_number = this.info.contact_number;
    this.model.address = this.info.address;
  }
  updateUser(form)
  {
    //console.log(form);
    this.userservice.update_userInsurance(this.userId,form).then(()=>{
      this.ngOnInit();
    })
  }

  logout()
  {
    this.afu.signout();
  }


}
