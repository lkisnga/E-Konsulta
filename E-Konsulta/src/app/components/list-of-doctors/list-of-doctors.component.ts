import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-of-doctors',
  templateUrl: './list-of-doctors.component.html',
  styleUrls: ['./list-of-doctors.component.css']
})
export class ListOfDoctorsComponent implements OnInit {

  list : any = [];
  spList : any = [];

  searchName : string = "";
  constructor(public userserivce : UserService, public router : Router,public share : SharedDataService) { }

  ngOnInit(): void {

    localStorage.removeItem('data');

    this.doctor_list();
    
    var data;
    var tempArray = [];
    this.userserivce.get_Speciaalization().then(e=>{
      e.forEach(res=>{
        data = res.data();
        data.uid = res.id;
        tempArray.push(data);
      })
    })
    this.spList = tempArray;
    console.log(this.spList);

  }
  ///patient-to-doctor-feedback
  view_review(e)
  {
    this.share.set_list(e);
    this.router.navigate(['/patient-to-doctor-feedback']);
  }

  doctor_list()
  {
    var data;
    var tempArray = [];
    this.userserivce.get_doctorList().then(e=>{
      e.forEach(item=>{
        this.userserivce.get_avatar(item.id).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        }).then(()=>{
          this.list = tempArray.filter(e=>{
            if(e.fullname != undefined)
            return e.fullname.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
          });
        })
      })
      //console.log(this.list)
    })
  }

}
