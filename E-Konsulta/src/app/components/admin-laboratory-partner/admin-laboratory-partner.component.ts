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
      record['description'] = "Your Account has been updated by the admin for various reasons";
      record['createdAt'] = formatDate(new Date(),'short','en');
      this.notif.send_lab(this.UID,record);
      this.ngOnInit()
    })
  }
  disableInfo(e)
  {
    this.UID = e;
    console.log(this.UID);
  }
  disable()
  {
    let record ={}
    record['disabled'] = "true";
    record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
    this.userservice.update_lab(this.UID,record).then(()=>{
      let record = {};
      record['title'] = "Account disabled!";
      record['description'] = "Your Account has been disabled for various reasons. Contact us now!";
      record['createdAt'] = formatDate(new Date(),'short','en');
      this.notif.send_lab(this.UID,record);
      this.ngOnInit();
      console.log("successfully disabled!");
    })
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
