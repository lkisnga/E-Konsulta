import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lab-partner-feedbacks',
  templateUrl: './lab-partner-feedbacks.component.html',
  styleUrls: ['./lab-partner-feedbacks.component.css']
})
export class LabPartnerFeedbacksComponent implements OnInit {

  list : any = [];
  constructor(public userservice : UserService) { }

  ngOnInit(): void {
  
    var data;
    var tempArray = [];
    this.userservice.get_review().then(e => {
      e.forEach(item => {
        if(item.data().type =="feedback")
        {
          data = item.data();
          data.uid = item.id;
          tempArray.push(data);
        }
      })
      this.list = tempArray;
    })
  }
}
