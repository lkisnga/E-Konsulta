import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-complaints',
  templateUrl: './user-complaints.component.html',
  styleUrls: ['./user-complaints.component.css']
})
export class UserComplaintsComponent implements OnInit {

content : string = "";
file: any;

error_message : string = "";
success_message: string = "";

  constructor(
    public userservice : UserService,
    public notif : NotificationService
  ) { }

  ngOnInit(): void {
  }

  get_image(e)
  {
    this.file = e.target.files[0]
    console.log(this.file);
  }

  send_problem(e)
  {
    if(this.file != undefined && this.file != "" && this.file != null)
    {
      let record ={};
      record['file'] = this.file;
      record['filename'] = this.file.name;
      record['content'] = e.content;
      this.userservice.create_problem_review(record).then(()=>{
        this.success_message = "Feedback Sent!";
        setTimeout(() => {
          this.success_message = ""
        }, 5000);
        let record = {};
        record['title'] = "Problem";
        record['description'] = "A user sent a problem";
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
    else
    {
      this.error_message = "Add Image!";
      setTimeout(() => {
        this.error_message = "";
      }, 5000);
    }
  
  }

}
