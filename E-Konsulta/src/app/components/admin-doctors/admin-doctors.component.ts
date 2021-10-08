import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-doctors',
  templateUrl: './admin-doctors.component.html',
  styleUrls: ['./admin-doctors.component.css']
})
export class AdminDoctorsComponent implements OnInit {

  userID: string = "";
  list: any = [];
  list2: any = [];
  constructor(public authservice : AuthService, public userservice : UserService, public db : AngularFirestore
    ,public router : Router) { }

  ngOnInit(): void {
    this.userID = this.authservice.get_UID();
    var data;
    var tempArray = [];
    this.userservice.get_doctorList().then(res=>{
      res.forEach(function(doc){
        data =  doc.data();
        data.uid = doc.id;
        tempArray.push(data);
      })
      this.list = tempArray;
    })
  }

  editInfo(record)
  {
    console.log(record.uid);
  }

}
