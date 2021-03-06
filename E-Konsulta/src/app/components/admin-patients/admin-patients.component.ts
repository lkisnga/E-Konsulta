import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

export class PatientInfo
{
  uid : string;
  fullname : string;
  role : string;
  dob : string;
  health_insurance : string;
  address: string;
  member_ID : string;
  contact_number: string;
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
  hins_list : any = [];

  tempName : string ="";

  disable_id : string = "";
  status : string = "";

  constructor(
    public userService : UserService, 
    public auts: AuthService,
    public notif : NotificationService
  ) { }

  ngOnInit(): void {
    this.listOfPatients();
    this.listOfHealth_Insurance();

  }

  editList(e)
  {
    this.list.uid = e.uid;
    this.list.fullname = e.fullname;
    this.list.role = e.role;
    this.list.dob = e.dob;
    this.list.address = e.address;
    this.list.health_insurance = e.health_insurance;
    this.tempName = e.ins;
    this.list.member_ID = e.member_ID;
    this.list.contact_number = e.contact_number;
  }
  updateInfo(e)
  {
    let record = {};
    record['fullname'] = e.fullname;
    record['dob'] = e.dob;
    record['address'] = e.address;
    record['health_insurance'] = e.health_insurance;
    record['member_ID'] = e.member_ID;
    record['contact_number'] = e.contact_number;
    record['updatedAt'] = formatDate(new Date(), 'MM/dd/yyyy', 'en')
    this.userService.update_patientInfo(e.uid,record).then(()=>{
      //notification patient
      let record = {};
      record['title'] = "Account updated!";
      record['description'] = "Your Account has been updated by the admin for various reasons";
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
      record['createdAt'] = formatDate(new Date(),'short','en');
      this.notif.send_patient(e.uid,record);
      this.ngOnInit();

    })
  }
  listOfHealth_Insurance()
  {
    var data;
    var tempArray = [];
    this.userService.get_HealthInsurance().then(e=>{
      e.forEach(res=>{
        data = res.data();
        data.uid = res.id;
        tempArray.push(data);
      })
      this.hins_list = tempArray;
    })
  }
  listOfPatients()
  {
    var data; 
    var tempArray = [];
    this.userService.get_patient().then(e => {
      e.forEach(item =>{
        this.userService.get_HealthInsurance_Info(item.data().health_insurance).then(res=>{//process to get the data's and iinsurance data from specific patient
          data = item.data();
          data.ins=res.data().name; //getting the insurance name passing it to data
          data.uid = item.id;
          tempArray.push(data); // pushing data into array
        }).then(()=>{
          this.patientList = tempArray.filter(e => {
            if(e.fullname != undefined)
             return e.fullname.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
          })
        })
      })
    })
  }

  editDisable(id,status)
  {
    this.disable_id = id;
    this.status = status;
  }
  //Disable account
  disable()
  {
    let record = {};
    record['disabled'] = this.status;
    record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
    this.userService.update_patientInfo(this.disable_id,record).then(()=>{
      this.ngOnInit();

      if(this.status == 'true')
      {
        //notification patient
        let record = {};
        record['title'] = "Account disabled!";
        record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        record['description'] = "Your Account has been disabled for various reasons. Contact us now!";
        record['createdAt'] = formatDate(new Date(),'short','en');
        this.notif.send_patient(this.disable_id,record);
      }
      else
      {
        //notification patient
        let record = {};
        record['title'] = "Account enabled!";
        record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        record['description'] = "Your Account has been enabled!";
        record['createdAt'] = formatDate(new Date(),'short','en');
        this.notif.send_patient(this.disable_id,record);
      }
      this.ngOnInit();
    })
  }

}
