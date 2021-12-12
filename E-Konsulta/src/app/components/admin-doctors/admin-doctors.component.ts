import { splitAtColon } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';

export class DoctorInfo
{
  id: string;
  fullname: string;
  address: string;
  license_number: string;
  contact_number: string;
  specialization: string;
  paypal_email: string;
  email: string;
  sp_name: string;
  role: string;
}
export class SpecializationInfo
{
  name: string;
  description: string;
}

@Component({
  selector: 'app-admin-doctors',
  templateUrl: './admin-doctors.component.html',
  styleUrls: ['./admin-doctors.component.css']
})
export class AdminDoctorsComponent implements OnInit {

  model = new DoctorInfo();
  sp = new SpecializationInfo();

  sp2 = new SpecializationInfo(); //EditInfo
  spID : any = "";

  userID: string = "";
  list: any = [];

  spList: any = [] = "";

  searchName: string = "";

  isVerified : string = "pending";

  doctor_id : string = "";

  status: string = "";

  constructor(public authservice : AuthService, 
    public userservice : UserService, 
    public router : Router,
    public notif : NotificationService
  ) { }

  ngOnInit(): void {
    this.userID = this.authservice.get_UID();
    this.listOfDoctors();
    this.listOfSpecialization();

  }
  isVerified_Doc(e)
  {
    this.isVerified = e;
    this.listOfDoctors();
  }

  listOfSpecialization()
  {
    var data;
    var tempArray = [];
    this.userservice.get_Speciaalization().then(res => {
      res.forEach(item => {
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.spList =tempArray;
  }

  editSP(e)
  {
    console.log(e.uid);
    this.spID = e.uid;
    this.sp2.name = e.name;
    this.sp2.description = e.description;
  }
  update_Specialization()
  {
    let record = {};
    record['name'] = this.sp2.name;
    record['description'] = this.sp2.description;
    record['updated_at'] = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    this.userservice.update_Specialization(this.spID,record);
  }
  deleteSP(id)
  {
    this.spID = id;
  }
  delete_Specialization()
  {
    this.userservice.delete_specialization(this.spID);

    this.listOfSpecialization();
  }

  listOfDoctors()
  {
    var data;
    var tempArray = [];
    this.userservice.get_doctorList().then(res=>{
      res.forEach(doc=>{
        console.log(doc.data());
        this.userservice.get_doctor_verificationFile(doc.id)
        .then(f=>{
          f.forEach(file=>{
            this.userservice.get_specializationInfo(doc.data().specialization).then(e=>{
            if(doc.data().isVerified == this.isVerified)
            {
              data =  doc.data();
              data.uid = doc.id;
              data.file = file.data().file;
              data.sp_name = e.data().name;
              tempArray.push(data);
            }
          }).then(()=>{
            this.list=tempArray.filter(res => {
              return res.fullname.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
            })
          })
          })
        })
        
      })
    })
  }
  //Edit Doctor Info
  editInfo(record)
  {
    console.log(record);
    this.model.id = record.uid;
    this.model.fullname = record.fullname;
    this.model.address= record.address;
    this.model.specialization = record.specialization;
    this.model.email = record.email;
    this.model.paypal_email = record.paypal_email;
    this.model.license_number= record.license_number;
    this.model.contact_number = record.contact_number;
    this.model.role = record.role;
    this.model.sp_name = record.sp_name;
  }
  onSubmit(a)
  {
    //console.log(a);
    let record = {};
    record['fullname'] = a.fullname;
    record['license_number'] = a.license_number;
    record['specialization'] = a.specialization;
    record['contact_number'] = a.contact_number;
    record['address'] = a.address;
    record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
    this.userservice.update_doctorInfo(a.id,record).then(()=>{
      //notification doctor
      let record = {};
      record['title'] = "Account updated!";
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
      record['description'] = "Your Account has been updated by the admin for various reasons";
      record['createdAt'] = formatDate(new Date(),'short','en');
      this.notif.send_doctor(a.id,record);
      this.ngOnInit();
    });
    
    
  }
  editDisable(id,status)
  {
    this.doctor_id = id;
    this.status = status;
    console.log(this.status);
  }
  disableDoctor()
  {
    let record = {};
    record['disabled'] = this.status;
    record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
    this.userservice.update_doctorInfo(this.doctor_id,record)
    .then(()=>{
      //notification doctor
      if(this.status == 'true')
      {
        let record = {};
        record['title'] = "Account disabled!";
        record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        record['description'] = "Your Account has been disabled for various reasons. Contact us now!";
        record['createdAt'] = formatDate(new Date(),'short','en');
        this.notif.send_doctor(this.doctor_id,record);
      }
      else
      {
        let record = {};
        record['title'] = "Account enabled!";
        record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        record['description'] = "Your Account has been enabled!";
        record['createdAt'] = formatDate(new Date(),'short','en');
        this.notif.send_doctor(this.doctor_id,record);
      }
      this.ngOnInit();
    })
  }
  view_file(e)
  {
    window.open(e);
  }
  addSpecialization(a)
  {
    let record= {};
    record['name'] = a.name;
    record['description'] = a.description;

    this.userservice.create_Specialization(record);

    this.listOfSpecialization();
  }

  verify_doctor(id)
  {
    let record = {};
    record['isVerified'] = 'verified';
    record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
    this.userservice.update_doctorInfo(id,record).then(()=>{
      console.log('Verified!');
      this.ngOnInit();


      //notification for doctors
      let record = {};
      record['title'] = "Account Verified!";
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
      record['description'] = "Your Account has been verified. You can now receive patients. Enjoy!";
      record['createdAt'] = formatDate(new Date(),'short','en');
      this.notif.send_doctor(id,record);

    })
  }

}
