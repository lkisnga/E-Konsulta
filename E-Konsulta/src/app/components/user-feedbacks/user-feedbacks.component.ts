import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
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

  constructor(
    public userservice : UserService,
    public notif : NotificationService
    ) { }

  ngOnInit(): void {
  }

  submit_form(e)
  {
    this.userservice.create_feedback_review(e).then(()=>{
      alert("successfully sent!");
      let record = {};
      record['title'] = "Feedback";
      record['description'] = "A user sent a feedback.";
      record['createdAt'] = formatDate(new Date(),'short','en');
      this.userservice.get_admin().then(e=>{
        e.forEach(item=>{
          this.notif.send_admin(item.id,record).then(()=>{
            console.log('added to admin!');
          })
        })
      })
    })
  }

}
