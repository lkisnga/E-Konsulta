import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

export class PatientInfo
{
  public uid : string;
  public firstname : string;
  public role : string;
  public member_number : string;
  public account_number : string;
}


@Component({
  selector: 'app-admin-patients',
  templateUrl: './admin-patients.component.html',
  styleUrls: ['./admin-patients.component.css']
})
export class AdminPatientsComponent implements OnInit {
  list = new PatientInfo();
  patientList : any = [];
  searchName : string = "";

  constructor(public userService : UserService, public auts: AuthService) { }

  ngOnInit(): void {
    this.listOfPatients();
  }

  editList(e)
  {
    this.list.uid = e.uid;
    this.list.firstname = e.firstname;
    this.list.role = e.role;
    this.list.member_number = e.member_number;
    this.list.account_number = e.contact_number;
  }
  updateInfo(e)
  {
    let record = {};
    record['firstname'] = e.firstname;
    record['role'] = e.role;
    record['contanct_number'] = e.contanct_number;
    this.userService.update_user(e.uid,e);

  }
  listOfPatients()
  {
    var data; 
    var tempArray = [];
    this.userService.get_patient().then(e => {
      e.forEach(item =>{
        console.log(item.data());
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
      this.patientList = tempArray.filter(e => {
        if(e.firstname != undefined)
         return e.firstname.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    })
  }
}
