import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

export class LabInfo
{
  name : string;
  address : string;
  contact_number : string;
}

@Component({
  selector: 'app-admin-laboratory-partner',
  templateUrl: './admin-laboratory-partner.component.html',
  styleUrls: ['./admin-laboratory-partner.component.css']
})

export class AdminLaboratoryPartnerComponent implements OnInit {

  constructor(
    public userservice : UserService,
    public notif: NotificationService
  ) { }
  model = new LabInfo();
  list : any = [];
  searchName : string = "";
  UID : any = "";
  files: any = [];

  status: string = "";

  ngOnInit(): void {
    this.listOfPartners();
  }

  editInfo(e)
  {
    this.UID = e.uid;
    this.model.name = e.name;
    this.model.address = e.address;
    this.model.contact_number = e.contact_number;
  }
  updateInfo(e)
  {
    let record = {};
    record['name'] = e.name;
    record['address'] = e.address;
    record['contact_number'] = e.contact_number;
    this.userservice.update_lab(this.UID,record).then(()=>{
      let record = {};
      record['title'] = "Account updated!";
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
      record['description'] = "Your Account has been updated by the admin for various reasons";
      record['createdAt'] = formatDate(new Date(),'short','en');
      this.notif.send_lab(this.UID,record);
      this.ngOnInit()
    })
  }
  view_files(e)
  {
    var data;
    var tempArray = [];
    this.userservice.get_lab_files(e).then(a=>{
      a.forEach(item=>{
        data = item.data();
        tempArray.push(data);
      })
    })
    this.files = tempArray;
  }
  disableInfo(e,status)
  {
    this.UID = e;
    this.status = status;
    console.log(this.UID);
  }
  disable()
  {
    let record ={}
    record['disabled'] = this.status;
    record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
    this.userservice.update_lab(this.UID,record).then(()=>{

      if(this.status=='true')
      {
        let record = {};
        record['title'] = "Account disabled!";
        record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        record['description'] = "Your Account has been disabled for various reasons. Contact us now!";
        record['createdAt'] = formatDate(new Date(),'short','en');
        this.notif.send_lab(this.UID,record);
      }
      else
      {
        let record = {};
        record['title'] = "Account enabled!";
        record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        record['description'] = "Your Account has been enabled!";
        record['createdAt'] = formatDate(new Date(),'short','en');
        this.notif.send_lab(this.UID,record);
      }
      this.ngOnInit();
    })
  }

  open(e)
  {
    window.open(e);
  }

  listOfPartners()
  {
    var data;
    var tempArray = [];
    this.userservice.get_labPartner().subscribe(res => {
      res.forEach(e => {
        data = e.data();
        data.uid = e.id;
        tempArray.push(data);
      })
      this.list = tempArray.filter(e => {
        if(e.name)
          return e.name.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
      });
    })
  }

}
