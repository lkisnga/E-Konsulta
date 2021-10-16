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

  ngOnInit(): void {

    var data;
    var tempArray = [];
    this.userserivce.get_review().then(e => {
      e.forEach(res => {
        if(res.data().type == "problem")
        {
          data = res.data();
          data.uid = res.id;
          tempArray.push(data);
        }
      })
      this.list = tempArray;
    })
  }

}
