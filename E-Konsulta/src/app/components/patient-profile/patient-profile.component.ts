import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
export class PatientInfo
{
  email : string;
  fullname : string;
  dob : string;
  password : string;
  contact_number : string;
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

  filename: string = "";

  insurance_info: any = [];

  request_error: string="";
  request_sent: string = "";

  verified_message: string = "";
  verification_sent: string = "";

  health_insurance: string = "";
  member_ID: string = "";

  profile_changed : boolean = false;


  labList : any = [];
  lab_id : string = "";
  empty_field: string = "";
  lab_message: string = "";
  constructor(
    public userservice : UserService, 
    public afu : AuthService,
    public notif: NotificationService
  ) { }

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

      this.health_insurance = e.data().health_insurance;
      this.member_ID = e.data().member_ID;

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

    this.get_lab();
  }

  choosefile(e)
  {
    this.file = e.target.files[0];
    console.log(this.file);
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
  }
  update(e)
  {
    this.userservice.update_user(this.userID,e).then(()=>{
      console.log("patient Updated!");
      this.ngOnInit();
    })
  }
  update_insurance()
  {
    let record = {}
    if(this.info.isVerified == 'verified' && this.info.health_insurance == this.health_insurance)
    {
      console.log('Already Verified!');
      this.verified_message = "Already Verified!";
      setTimeout(() => {
        this.verified_message = "";
      }, 5000);
    }
    else
    {
      record['isVerified'] = 'pending';
      record['health_insurance'] = this.health_insurance;
      record['member_ID'] = this.member_ID;
      this.userservice.update_patient_insurance(this.userID,record).then(()=>{
        this.verification_sent = "Verification Sent!";

        let record2 = {};
        record2['createdAt'] = formatDate(new Date(),'short','en');
        record2['title'] = "Patient Verification";
        record2['description'] = "Go to Verification and verify the Patient whether He/She is in your service";
        this.notif.send_insurance(this.info.health_insurance,record2)

        setTimeout(() => {
          this.verification_sent = "";
        }, 5000);
        this.ngOnInit();
      })
    }
  }
  send_labLOA()
  {
    if(this.file && this.filename && this.lab_id)
    {
      let record = {};
      record['file'] = this.file;
      record['filename'] = this.filename;
      this.userservice.send_labLOA(this.lab_id,this.userID,record)
      .then(()=>{
        console.log('added!');

        let record2 = {};
        record2['createdAt'] = formatDate(new Date(),'short','en');
        record2['title'] = "LOA";
        record2['description'] = "A patient sent an LOA. Check your LOA list";
        this.notif.send_lab(this.info.health_insurance,record2)

        this.lab_message = "File sent!";
        this.file = "";
        setTimeout(() => {
          this.lab_message = "";
        }, 5000);
      })
    } 
    else
    {
      console.log('Empty fields!');
      this.empty_field = "Empty Fields!";
      setTimeout(() => {
        this.empty_field = "";
      }, 3000);
    }
  }
  get_lab()
  {
    var data;
    var tempArray = [];
    this.userservice.get_labPartner().forEach(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.labList = tempArray;
  }
  request_LOA()
  {
    console.log(this.info.isVerified)
    if(this.info.isVerified != 'pending' && this.info.isVerified != 'declined')
    {
      //Check if the user already sent a request within the Day
      this.userservice.check_LOA(this.info.health_insurance,this.userID,formatDate(new Date(),'MM/dd/yyyy','en'))
      .then(e=>{
        if(e.empty)
        {
          this.userservice.request_LOA(this.info.health_insurance,this.userID)
            .then(()=>{
              this.request_sent = "Request Sent!";
              setTimeout(() => {
                this.request_sent = "";
              }, 3000);
              let record = {};
              record['createdAt'] = formatDate(new Date(),'short','en');
              record['title'] = "LOA request";
              record['description'] = "A patient requested for LOA";
              this.notif.send_insurance(this.info.health_insurance,record)

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
    else
    {
      this.request_error = "Your insurance is not yet verified.";
          setTimeout(() => {
            this.request_error = "";
          }, 3000);
    }
  }

  logout()
  {
    this.afu.signout();
  }
}
