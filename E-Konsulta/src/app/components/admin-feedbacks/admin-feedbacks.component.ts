import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-feedbacks',
  templateUrl: './admin-feedbacks.component.html',
  styleUrls: ['./admin-feedbacks.component.css']
})
export class AdminFeedbacksComponent implements OnInit {

  list : any = [];
  constructor(public userservice : UserService,public db: AngularFirestore) { }

  ngOnInit(): void {

    var data;
    var tempArray = [];
    this.userservice.get_review_feedback().then(e => {
      e.forEach(item=>{
        data = item.data();
        data.uid=item.id;
        tempArray.push(data)
        })
      this.list = tempArray;
      console.log(this.list);
    })
  }




}
