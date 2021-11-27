import { formatDate } from '@angular/common';
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

  insuranceList : any = [];
  insurance_id : string = "";
  request_sent : boolean = false;

  request_status : string = "";

  insurance_af : any = [];

  fee : number = 0;

  profile_changed : boolean = false;

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

    this.get_specialization();
    this.insurance_list();
    this.get_insurance();
  }

  get_specialization()
  {
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
    this.userservice.upload_avatar(this.file,this.userId)
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
    this.insuranceList = tempArray;
    console.log(this.insuranceList);
  }
  insurance_request()
  {
    let record = {};
    record['doctor_id'] = this.userId;
    record['insurance_id'] = this.insurance_id;
    record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
    record['status'] = "pending";
    console.log(this.insurance_id);

    if(this.insurance_id != "")
    this.userservice.check_affiliation(this.userId,this.insurance_id)
    .then(e=>{
      if(e.empty)
      {
        this.userservice.insurance_affiliation(record)
        .then(()=>{
          console.log('request sent!');
          this.request_sent = true;
          setTimeout(() => {
            this.request_sent = false;
          }, 5000);
        })
      }
      else
      {
        console.log('exist!');
        e.forEach(item=>{
          if(item.data().status != 'pending')
          {
            console.log('true');
            this.request_status = "Already Exist!";
            setTimeout(() => {
              this.request_status = "";
            }, 5000);
          }
          else
          {
            console.log('Pending!');
            this.request_status = "Request still pending!";
            setTimeout(() => {
              this.request_status = "";
            }, 5000);
          }
        })
      }
    })
    else
    {
      this.request_status = "Choose Insurance!";
      setTimeout(() => {
        this.request_status = "";
      }, 5000);
    }
  }
  get_insurance()
  {
    var data;
    var tempArray = [];
    this.userservice.get_insurance_affiliation(this.userId)
    .then(e=>{
      e.forEach(item=>{
        if(item.data().status == "verified")
        {
          this.userservice.get_HealthInsurance_Info(item.data().insurance_id).then(res=>{
            data = item.data();
            data.insurance_name = res.data().name;
            data.uid = item.id;
            tempArray.push(data);
          })
        }
      })
    })
    this.insurance_af = tempArray;
    console.log(this.insurance_af);
  }
  logout()
  {
    this.afu.signout();
  }

}
