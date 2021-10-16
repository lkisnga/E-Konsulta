import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-feedbacks',
  templateUrl: './admin-feedbacks.component.html',
  styleUrls: ['./admin-feedbacks.component.css']
})
export class AdminFeedbacksComponent implements OnInit {

  list : any = [];
  constructor(public userservice : UserService) { }

  ngOnInit(): void {

    var data;
    var tempArray = [];
    this.userservice.get_review().then(e => {
      e.forEach(res => {
        if(res.data().type == "feedback")
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
