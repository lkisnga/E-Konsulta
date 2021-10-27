import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

export class Feedback
{
  email : string = "";
  content : string;
  feature: string = "others";
}

@Component({
  selector: 'app-user-feedbacks',
  templateUrl: './user-feedbacks.component.html',
  styleUrls: ['./user-feedbacks.component.css']
})
export class UserFeedbacksComponent implements OnInit {

  model = new Feedback();

  constructor(public userservice : UserService) { }

  ngOnInit(): void {
  }

  submit_form(e)
  {
    this.userservice.create_feedback_review(e).then(()=>{
      alert("successfully sent!");
    })
  }

}
