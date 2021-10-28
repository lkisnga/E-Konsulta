import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-to-lab-partner-feedback',
  templateUrl: './patient-to-lab-partner-feedback.component.html',
  styleUrls: ['./patient-to-lab-partner-feedback.component.css']
})
export class PatientToLabPartnerFeedbackComponent implements OnInit {
  userId : string = "";
  info: any;
  info2: any;

  list : any = []

  replyList : any = [];
  constructor(public userservice : UserService, public afu: AuthService, public share: SharedDataService) { }

  ngOnInit(): void {
    //getting information from list of laboratory 
    this.info = this.share.get_list();
    //Storing info to localStorage
    if(localStorage.getItem('data')==null)
    {
      localStorage.setItem('data',JSON.stringify(this.info));
    }
    //retrieving data from LocalStorage
    this.info2 = JSON.parse(localStorage.getItem('data'));

    this.get_feedback();
  }

  get_feedback()
  {
    var data,data2;
    var tempArray = [],tempArray2=[];
    //getting Laboratory Reviews
    this.userservice.get_Lab_Reviews(this.info2.uid).then(e=>{
      e.forEach(item=>{
        //getting avatar of each reviews
        this.userservice.get_avatar(item.data().from).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        })
        //getting replies for each reviews
        this.userservice.get_labreply(this.info2.uid,item.id).then(res=>{
          res.forEach(es=>{
            data2 = es.data();
            data2.uid = es.id;
            tempArray2.push(data2);
          })
          this.replyList = tempArray2;
        })
      })
    })
    this.list = tempArray;
  }

}
