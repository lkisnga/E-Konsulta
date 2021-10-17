import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lab-partner-problems',
  templateUrl: './lab-partner-problems.component.html',
  styleUrls: ['./lab-partner-problems.component.css']
})
export class LabPartnerProblemsComponent implements OnInit {

  list : any = [];
  constructor(public userserivce : UserService) { }

  ngOnInit(): void {

    var data;
    var tempArray = [];
    this.userserivce.get_review().then(e => {
      e.forEach(item => {
        if(item.data().type == "problem")
        {
          data = item.data();
          data.uid = item.id;
          tempArray.push(data);
          console.log(item.data());
        }
      })
      this.list = tempArray;
    })
  }

}
