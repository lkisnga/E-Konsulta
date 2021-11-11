import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-records',
  templateUrl: './patient-records.component.html',
  styleUrls: ['./patient-records.component.css']
})
export class PatientRecordsComponent implements OnInit {

  userID : any = "";
  info : any = [];
  list : any = [];
  constructor(public userservice : UserService, public afu : AuthService) { }

  /** set to false so that when loading the user analytics page, content of that function is not displayed */
  medicalrecords = false;
  labresult = false;
  presc =  false;

  medicalRecords(){
    this.medicalrecords = true;
    this.labresult = false;
    this.presc = false;
  }

  labResult(){
    this.medicalrecords = false;
    this.labresult = true;
    this.presc = false;
  }

  prescription(){
    this.medicalrecords = false;
    this.labresult = false;
    this.presc = true;
  }

  ngOnInit(): void {
    var data;
    var tempArray = [];
    this.userID = this.afu.get_UID();
    this.userservice.get_UserInfo(this.userID).then(e=>{
      this.info = e.data();
    }).then(()=>{
      this.userservice.get_Lab_Results_Patient(this.info.email).then(e => {
        e.forEach(item => {
          if(item.data().status != 'pending')
          {
            this.userservice.get_labInfo(item.data().diagnostic_center)
            .forEach(res=>{
              data = item.data();
              data.from = res.data().name;
              tempArray.push(data);
            })
          }
        })
      })
    })
    this.list = tempArray;
    console.log(this.list);
  }

  viewFile(e)
  {
    window.open(e);
  }

}
