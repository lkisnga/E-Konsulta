import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
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
  imgUrl : any;
  file : any;

  insuranceList : any = [];
  insurance_id : string = "";
  request_sent : boolean = false;

  request_status : string = "";

  insurance_af : any = [];

  fee : number = 0;
  feeDisplay : number = 0;
  deduction: number = 0;
  net_pay: number = 0;

  profile_changed : boolean = false;

  pending_message : boolean = false;


  timeLeft: number = 10;
  interval;
  constructor(
    public userservice : UserService, 
    public afu : AuthService,
    public notif: NotificationService
  ) { }

  ngOnInit(): void {
    
    this.get_doctorInfo();

    this.insurance_list();
    this.get_insurance();
  }

  get_doctorInfo()
  {
    this.userId = this.afu.get_UID();
    this.userservice.get_patientInfo(this.userId).then(e=>{
      console.log(e.data());
      this.feeDisplay = e.data().consultation_fee;

      this.deduction = e.data().consultation_fee*(10/100);
      this.net_pay = e.data().consultation_fee-this.deduction;

      this.info = e.data();
      this.check_verification(this.info.isVerified);
    }).then(()=>{
      this.userservice.get_specializationInfo(this.info.specialization).then(e=>{
        if(e.exists)
          this.spInfo = e.data();
      })
    })

    this.userservice.get_avatar(this.userId).then(e=>{
      this.imgUrl = e.data().image;
    })

  }
  check_verification(verify)
  {
    if(verify == "pending")
    {
      console.log('pending!');
      this.pending_message = true;
      setTimeout(() => {
        this.pending_message = false;
      }, 10000);
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.interval);
          this.timeLeft = 10;
        }
      },1000)
    }
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
    record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
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

          //notification sent to insurance
          let record = {};
          record['title'] = "Doctor Affiliation Verification";
          record['description']= "A doctor sent a verification, check your Doctor List now!";
          record['createdAt'] = formatDate(new Date(),'short', 'en');
          record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
          this.notif.send_insurance(this.insurance_id,record);
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

  delete_account()
  {
    this.afu.delete_user().then(()=>{
      console.log('authentication deleted!');
    });
    this.userservice.delete_user(this.userId);
  }
  logout()
  {
    this.afu.signout();
  }

}
