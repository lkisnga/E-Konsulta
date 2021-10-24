import { Component, OnInit } from '@angular/core';
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

  constructor(public userservice : UserService) { }
  model = new HealthInfo();
  model2 = new HealthInfo();
  list : any = [];
  UID : string = "";
  searchName : string = "";

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
    this.userservice.update_insurance(this.UID,e);
    this.ngOnInit();
  }
  delete_insurance()
  {
    this.userservice.delete_Insurance(this.UID);

    this.ngOnInit();
  }
  getID(id)
  {
    this.UID = id;
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
