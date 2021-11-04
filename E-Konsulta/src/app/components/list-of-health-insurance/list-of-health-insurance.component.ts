import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-of-health-insurance',
  templateUrl: './list-of-health-insurance.component.html',
  styleUrls: ['./list-of-health-insurance.component.css']
})
export class ListOfHealthInsuranceComponent implements OnInit {
  list : any = [];
  searchName : string = "";
  constructor(public userservice : UserService,public router: Router, public share : SharedDataService) { }

  ngOnInit(): void {

    localStorage.removeItem('data');
    
    this.get_healthList();

  }

  get_healthList()
  {
    var data;
    var tempArray = [];
    this.userservice.get_HealthInsurance().then(e=>{
      e.forEach(item=>{
        this.userservice.get_avatar(item.id).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        }).then(()=>{
          this.list = tempArray.filter(a=>{
            if(a.name != undefined)
             return a.name.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
          })    
        })
      })
    })
  }

  view_review(e)
  {
    this.share.set_list(e);
    this.router.navigate(['/patient-to-health-insurance-feedback']);
  }
}
