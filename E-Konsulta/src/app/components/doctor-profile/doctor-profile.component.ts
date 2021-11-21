import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

export class DoctorInfo
{
  fullname : string;
  email : string;
  password : string;
  dob : string;
  contact_number : string;
  address : string ;
  license_number : string;
  specialization: string;
}

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  model = new DoctorInfo();

  userId : string = "";
  info : any = [];
  spInfo : any = [];
  spList : any = [];
  imgUrl : any;
  file : any;

  fee : number = 0;

  constructor(public userservice : UserService, public afu : AuthService) { }

  ngOnInit(): void {
    
    this.userId = this.afu.get_UID();
    this.userservice.get_patientInfo(this.userId).then(e=>{
      console.log(e.data());
     this.fee = e.data().consultation_fee;
      this.info = e.data();
    }).then(()=>{
      this.userservice.get_specializationInfo(this.info.specialization).then(e=>{
        this.spInfo = e.data();
      })
    })

    this.userservice.get_avatar(this.userId).then(e=>{
      this.imgUrl = e.data().image;
    })

    var data;
    var tempArray = [];
    this.userservice.get_Speciaalization().then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.spList = tempArray;

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
  edit()
  {
    this.model.fullname = this.info.fullname;
    this.model.dob = this.info.dob;
    this.model.email = this.info.email;
    this.model.password = this.info.password;
    this.model.contact_number = this.info.contact_number;
    this.model.address = this.info.address;
    this.model.license_number = this.info.license_number;
    this.model.specialization = this.info.specialization;
  }

  update(e)
  {
    this.userservice.update_user(this.userId,e).then(()=>{
      this.ngOnInit();
      alert("Updated successfully!");
    })
  }
  update_fee()
  {
    let record = {}
    record["consultation_fee"] = this.fee;
    this.userservice.update_doctor_fee(this.userId,record).then(()=>{
      console.log('Updated!');
    })
  }

  logout()
  {
    this.afu.signout();
  }

}
