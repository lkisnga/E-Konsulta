import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-of-health-insurance',
  templateUrl: './list-of-health-insurance.component.html',
  styleUrls: ['./list-of-health-insurance.component.css']
})
export class ListOfHealthInsuranceComponent implements OnInit {
  list : any = [];
  constructor(public userservice : UserService) { }

  ngOnInit(): void {
    var data;
    var tempArray = [];
    this.userservice.get_labPartner().forEach(e=>{
      e.forEach(item=>{
        this.userservice.get_avatar(item.id).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        })
      })
    })
    this.list =tempArray;
    console.log(this.list);
    
  }

}
