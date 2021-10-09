import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

export class DoctorInfo
{
  public id: string;
  public firstname: string;
  public role: string;
}


@Component({
  selector: 'app-admin-doctors',
  templateUrl: './admin-doctors.component.html',
  styleUrls: ['./admin-doctors.component.css']
})
export class AdminDoctorsComponent implements OnInit {

  model = new DoctorInfo();
  userID: string = "";
  list: any = [];

  searchName: string = "";

  constructor(public authservice : AuthService, public userservice : UserService, public db : AngularFirestore
    ,public router : Router) { }

  ngOnInit(): void {
    this.userID = this.authservice.get_UID();

    this.listOfDoctors();

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
        return res.firstname.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    })
  }
  editInfo(record)
  {
    //console.log(record.uid);
    this.model.id = record.uid;
    this.model.firstname = record.firstname;
    this.model.role = record.role;
  }
  onSubmit(a)
  {
    let record = {};
    record['firstname'] = a.firstname;
    this.userservice.update_user(a.id,record);

    this.ngOnInit();
  }

}
