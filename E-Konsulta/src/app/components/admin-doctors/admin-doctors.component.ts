import { splitAtColon } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

export class DoctorInfo
{
  id: string;
  fullname: string;
  address: string;
  license_number: string;
  contact_number: string;
  specialization: string;
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

  constructor(public authservice : AuthService, public userservice : UserService
    ,public router : Router) { }

  ngOnInit(): void {
    this.userID = this.authservice.get_UID();
    this.listOfDoctors();
    this.listOfSpecialization();

  }

  listOfSpecialization()
  {
    var data;
    var tempArray = [];
    this.userservice.get_Speciaalization().subscribe(res => {
      res.forEach(item => {
        data = item.payload.doc.data();
        data.uid = item.payload.doc.id;
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
      res.forEach(function(doc){
        data =  doc.data();
        data.uid = doc.id;
        tempArray.push(data);
      })
      this.list=tempArray.filter(res => {
        return res.fullname.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
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
    this.model.license_number= record.license_number;
    this.model.contact_number = record.contact_number;
    this.model.role = record.role;
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
    this.userservice.update_doctorInfo(a.id,record);
    this.ngOnInit();
  }
  editDelete(id)
  {
    this.spID = id;
  }
  deleteDoctor()
  {
    this.userservice.delete_user(this.spID);
  }
  addSpecialization(a)
  {
    let record= {};
    record['name'] = a.name;
    record['description'] = a.description;

    this.userservice.create_Specialization(record);

    this.listOfSpecialization();
  }

}
