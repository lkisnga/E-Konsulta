import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-of-lab-partners',
  templateUrl: './list-of-lab-partners.component.html',
  styleUrls: ['./list-of-lab-partners.component.css']
})
export class ListOfLabPartnersComponent implements OnInit {
  list : any = [];
  constructor(public userservice : UserService, public router : Router, public share : SharedDataService) { }

  ngOnInit(): void {

    localStorage.removeItem('data');

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
    this.list = tempArray;
  }

  view_review(e)
  {
    this.share.set_list(e);
    this.router.navigate(['/patient-to-lab-partner-feedback']);
  }


}
