import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
export class PatientInfo
{
  email : string;
  fullname : string;
  dob : string;
  password : string;
  contact_number : string;
  health_insurance : string
  member_id : string;
  address: string;
}
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  model = new PatientInfo();

  userID : string = ""
  imgUrl : any;
  info : any = [];
  insList : any = [];
  file : any;

  insurance_info: any = [];

  request_error: string="";
  constructor(public userservice : UserService, public afu : AuthService) { }

  ngOnInit(): void {
    this.userID = this.afu.get_UID();

    this.userservice.get_avatar(this.userID).then(e =>{
      if(e.data().image)
        this.imgUrl = e.data().image;
    }).catch(error => {
      console.log(error.message);
    })

    var data;
    this.userservice.get_UserInfo(this.userID).then(e => {
      this.userservice.get_HealthInsurance_Info(e.data().health_insurance).then(item=>{
        data = e.data();
        data.insurance_name=item.data().name;
        this.info = data;
      }).then(()=>{
        this.userservice.get_patient_insuranceInfo(this.userID,this.info.health_insurance)
        .then(res=>{
          res.forEach(a=>{
            this.insurance_info = a.data();
          })
        })
      })
    })
    this.insurance_list();
    
  }
  choosefile(e)
  {
    this.file = e.target.files[0];
    console.log(this.file);
  }
  uploadImage()
  {
    this.userservice.upload_avatar(this.file,this.userID);
  }
  insurance_list()
  {
    var data;
    var tempArray = [];
    this.userservice.get_HealthInsurance().then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.insList = tempArray;
    console.log(this.insList);
  }
  edit()
  {
    this.model.email = this.info.email
    this.model.fullname = this.info.fullname;
    this.model.dob = this.info.dob;
    this.model.contact_number = this.info.contact_number;
    this.model.password = this.info.password;
    this.model.address = this.info.address;
    this.model.health_insurance = this.info.health_insurance;
    this.model.member_id = this.info.member_ID;
  }
  update(e)
  {
    this.userservice.update_user(this.userID,e).then(e=>{
      console.log("patient Updated!");
      this.ngOnInit();
    })
  }

  request_LOA()
  {
    //Check if the user already sent a request within the Day
    this.userservice.check_LOA(this.info.health_insurance,this.userID,formatDate(new Date(),'MM/dd/yyyy','en'))
    .then(e=>{
      if(e.empty)
      {
        this.userservice.request_LOA(this.info.health_insurance,this.userID)
          .then(()=>{
            console.log('Request Sent!');
          })
      }
      else
      {
        this.request_error = "Wait after 24hours to request again";
        setTimeout(() => {
          this.request_error = "";
        }, 3000);
      }
    })
  }

  logout()
  {
    this.afu.signout();
  }
}
