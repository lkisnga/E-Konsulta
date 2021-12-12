import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
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
  userInfo : any;
  feedback : string = "";

  replyList : any = [];
  constructor(public userservice : UserService, 
    public afu: AuthService, 
    public share: SharedDataService,
    public notif: NotificationService
  ) { }

  ngOnInit(): void {
    //getting information from list of laboratory 
    this.info = this.share.get_list();
    this.userId = this.afu.get_UID();
    this.userservice.get_UserInfo(this.userId).then(e=>{
      this.userInfo = e.data();
   })
    //Storing info to localStorage
    if(localStorage.getItem('data')==null)
    {
      localStorage.setItem('data',JSON.stringify(this.info));
    }
    //retrieving data from LocalStorage
    this.info2 = JSON.parse(localStorage.getItem('data'));

    this.get_feedback();
  }

  add_feedback()
  {
    //checks if the user already have a feedback
    this.userservice.userReply_existLab(this.info2.uid,this.userId)
    .then(e=>{
      //if the user dont have a feedback then
      if(e.empty)
      {
        //checks if the textbox is empty if not then
        if(this.feedback != "")
          {
            //add feedback
            this.userservice.create_labPartner_feedback(this.info2.uid,this.userId,this.feedback,this.userInfo.fullname)
            .then(()=>{
              console.log("Added!");

              let record = {};
              record['createdAt'] = formatDate(new Date(),'short','en');
              record['title'] = "Feedback";
              record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
              record['description'] = this.userInfo.fullname+" sent you a feedback! Go to Reviews and Check it!";
              this.notif.send_lab(this.info2.uid,record)

              this.ngOnInit();
              this.feedback = "";
            })
          }else
            {
              console.log("Textbox is empty!");
            }
        //if the user already have a feedback
       }else
       {
         console.log("Only one feedback!");
         alert('You can only add one feedback!');
       }
    })
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
