import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-of-doctors',
  templateUrl: './list-of-doctors.component.html',
  styleUrls: ['./list-of-doctors.component.css']
})
export class ListOfDoctorsComponent implements OnInit {

  list : any = [];
  constructor(public userserivce : UserService) { }

  ngOnInit(): void {
    var data;
    var tempArray = [];
    this.userserivce.get_doctorList().then(e=>{
      e.forEach(item=>{
        this.userserivce.get_avatar(item.id).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        })
      })
      this.list = tempArray;
      console.log(this.list)
    })
  }

}
