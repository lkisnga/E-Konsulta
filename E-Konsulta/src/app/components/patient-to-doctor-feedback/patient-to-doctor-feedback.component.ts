import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-patient-to-doctor-feedback',
  templateUrl: './patient-to-doctor-feedback.component.html',
  styleUrls: ['./patient-to-doctor-feedback.component.css']
})
export class PatientToDoctorFeedbackComponent implements OnInit {

  constructor(public share : SharedDataService) { }
  list : any = [];
  ngOnInit(): void {
    this.list = this.share.get_list();
    console.log(this.list);
  }

}
