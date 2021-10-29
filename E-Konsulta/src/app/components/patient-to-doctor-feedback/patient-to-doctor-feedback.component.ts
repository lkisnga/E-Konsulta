import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-patient-to-doctor-feedback',
  templateUrl: './patient-to-doctor-feedback.component.html',
  styleUrls: ['./patient-to-doctor-feedback.component.css']
})
export class PatientToDoctorFeedbackComponent implements OnInit {

  constructor(public share : SharedDataService) { }
  info : any = [];
  info2: any = [];

  ngOnInit(): void {
    //getting data from list-of-docts
    this.info = this.share.get_list();
    //saving data into LocalStorage
    if(localStorage.getItem('data')==null)
    {
      localStorage.setItem('data',JSON.stringify(this.info));
    }
    //retrieving data from LocalStorage
    this.info2 = JSON.parse(localStorage.getItem('data'));
    console.log(this.info2);

  }

}
