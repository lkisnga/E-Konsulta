import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lab-insurance-loa',
  templateUrl: './lab-insurance-loa.component.html',
  styleUrls: ['./lab-insurance-loa.component.css']
})
export class LabInsuranceLoaComponent implements OnInit {

  user_ID : string = "";
  receivedLOA: any = [];

  constructor(
    public userservice: UserService,
    public aut : AuthService
  ) { }

  ngOnInit(): void {
    this.user_ID = this.aut.get_UID();
    


    this.get_received_insuranceLOA();



  }

  get_received_insuranceLOA()
  {
    var tempArray = [];
    var data;
    this.userservice.get_lab_insurance_LOA(this.user_ID)
    .then(e=>{
      e.forEach(item=>{
        this.userservice.get_patientInfo(item.data().patient_id)
        .then(pt=>{
          this.userservice.get_HealthInsurance_Info(item.data().insurance_id)
          .then(ins=>{
            data = item.data();
            data.patient_name = pt.data().fullname;
            data.insurance_name = ins.data().name;
            data.uid = item.id;
            tempArray.push(data);
          })
        })
      })
    })
    this.receivedLOA = tempArray;
  }

  viewFile(file)
  {
    window.open(file);
  }

}
