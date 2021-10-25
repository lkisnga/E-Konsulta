import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
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

  constructor(public userservice : UserService) { }
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
      this.ngOnInit()
    })
  }
  deleteInfo()
  {
    this.userservice.delete_lab(this.UID);
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
