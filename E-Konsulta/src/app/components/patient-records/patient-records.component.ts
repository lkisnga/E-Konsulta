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

  loaList : any = [];

  presList : any = [];

  medicalList : any = [];
  constructor(public userservice : UserService, public afu : AuthService) { }

  /** set to false so that when loading the user analytics page, content of that function is not displayed */
  medicalrecords = false;
  labresult = false;
  presc =  false;
  medcertificate1 = false;
  insurance_loa = false;

  medicalRecords(){
    this.medicalrecords = true;
    this.labresult = false;
    this.presc = false;
    this.medcertificate1 = false;
    this.insurance_loa = false;
  }

  labResult(){
    this.medicalrecords = false;
    this.labresult = true;
    this.medcertificate1 = false;
    this.presc = false;
    this.insurance_loa = false;
  }

  prescription(){
    this.medicalrecords = false;
    this.labresult = false;
    this.presc = true;
    this.medcertificate1 = false;
    this.insurance_loa = false;
  }
  medCertificate(){
    this.medicalrecords = false;
    this.labresult = false;
    this.presc = false;
    this.medcertificate1 = true;
    this.insurance_loa = false;
  }
  insuranceLOA()
  {
    this.medicalrecords = false;
    this.labresult = false;
    this.presc = false;
    this.medcertificate1 = false;
    this.insurance_loa = true;
  }

  ngOnInit(): void {
    this.userID = this.afu.get_UID();
    this.lab_Result();
    this.insurance_LOA();
    this.prescription_record();
    this.medical_record();

  }

  lab_Result()
  {
    var data;
    var tempArray = [];
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

  insurance_LOA()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_LOA(this.userID).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.id = item.id;
        tempArray.push(data);
      })
    })
    this.loaList = tempArray;
  }

  prescription_record()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_prescription(this.userID).then(e=>{
      e.forEach(item=>{
        console.log(item.data());
        data = item.data();
        data.id = item.id;
        tempArray.push(data);
      })
    })
    this.presList = tempArray;
  }

  medical_record()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_medical(this.userID).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(this.userID).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.fullname = res.data().fullname;
          tempArray.push(data)
        })
      })
    })
    this.medicalList = tempArray;
  }

  viewFile(e)
  {
    window.open(e);
  }

}
