import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-doctor-feedbacks',
  templateUrl: './doctor-feedbacks.component.html',
  styleUrls: ['./doctor-feedbacks.component.css']
})
export class DoctorFeedbacksComponent implements OnInit {

  list : any = [];
  constructor(public db: AngularFirestore) { }

  ngOnInit(): void {
    
  }

}
