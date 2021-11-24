import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-problems',
  templateUrl: './admin-problems.component.html',
  styleUrls: ['./admin-problems.component.css']
})
export class AdminProblemsComponent implements OnInit {

  list : any = [];
  constructor(public userserivce : UserService) { }
  imgUrl: any;
  ngOnInit(): void {

    var data;
    var tempArray = [];
    this.userserivce.get_review_problem().then(e => {
      e.forEach(res => {
        data = res.data();
        data.uid = res.id;
        data.image = res.data().image;
        tempArray.push(data);
      })
      this.list = tempArray;
      console.log(this.list);
    })
  }

}
