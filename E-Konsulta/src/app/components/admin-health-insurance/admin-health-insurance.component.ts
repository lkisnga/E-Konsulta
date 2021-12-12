import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

export class HealthInfo
{
  name: string;
  branchname: string;
  address : string;
  contact_number: string;
}


@Component({
  selector: 'app-admin-health-insurance',
  templateUrl: './admin-health-insurance.component.html',
  styleUrls: ['./admin-health-insurance.component.css']
})
export class AdminHealthInsuranceComponent implements OnInit {

  constructor(
    public userservice : UserService,
    public notif : NotificationService
  ) { }
  model = new HealthInfo();
  model2 = new HealthInfo();
  list : any = [];
  UID : string = "";
  searchName : string = "";
  file : any = [];

  status : string = "";

  ngOnInit(): void {
    this.listOfInsurance();
  }

  listOfInsurance()
  {
    var data;
    var tempArray = [];
    this.userservice.get_HealthInsurance().then(e => {
      e.forEach(res => {
        data = res.data();
        data.uid = res.id;
        tempArray.push(data);
      })
      this.list = tempArray.filter(res => {
        if(res.name != undefined)
          return res.name.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }) 
  }
  
  edit_info(e)
  {
    //console.log(e);
    this.UID = e.uid;
    this.model2.name = e.name;
    this.model2.branchname = e.branchname;
    this.model2.address = e.address;
    this.model2.contact_number = e.contact_number;
  }
  updateInfo(e)
  {
    this.userservice.update_insurance(this.UID,e).then(()=>{
      let record = {};
      record['title'] = "Account updated!";
      record['description'] = "Your Account has been updated by the admin for various reasons";
      record['createdAt'] = formatDate(new Date(),'short','en');
      this.notif.send_insurance(this.UID,record);
      this.ngOnInit();
    });
  }
  disable_insurance()
  {
    let record = {};
    record['disabled'] = this.status;
    record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
    this.userservice.update_insurance(this.UID,record).then(()=>{
      this.ngOnInit();

      if(this.status == 'true')
      {
        //notification patient
        let record = {};
        record['title'] = "Account disabled!";
        record['description'] = "Your Account has been disabled for various reasons. Contact us now!";
        record['createdAt'] = formatDate(new Date(),'short','en');
        record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
        this.notif.send_insurance(this.UID,record);
      }
      else
      {
         //notification patient
         let record = {};
         record['title'] = "Account enabled!";
         record['description'] = "Your Account has been enabled!";
         record['createdAt'] = formatDate(new Date(),'short','en');
         record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
         this.notif.send_insurance(this.UID,record);
      }
    })
  }
  getID(id,status)
  {
    this.UID = id;
    this.status = status;
  }
  view_files(e)
  {
    var data;
    var tempArray = [];
    this.userservice.get_insurance_files(e).then(a=>{
      a.forEach(res=>{
        data = res.data();
        tempArray.push(data);
      })
    })
    this.file = tempArray;
  }
  open(e)
  {
    window.open(e);
  }
  addHealthInsurance(e)
  {
    let record = {};
    record['name'] = e.name;
    record['branchname'] = e.branchname;
    record['address'] = e.address;
    record['contact_number'] = e.contact_number
    this.userservice.create_HealthInsurance(record);
    this.ngOnInit();
  }
}
