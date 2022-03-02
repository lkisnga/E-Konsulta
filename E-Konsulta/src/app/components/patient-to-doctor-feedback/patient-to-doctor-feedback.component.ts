import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-to-doctor-feedback',
  templateUrl: './patient-to-doctor-feedback.component.html',
  styleUrls: ['./patient-to-doctor-feedback.component.css']
})
export class PatientToDoctorFeedbackComponent implements OnInit {

  constructor(public share : SharedDataService,
    public userservice : UserService, 
    public afu : AuthService,
    public notif: NotificationService
    ) { }
  info : any = [];
  info2: any = [];

  userId : string = "";
  userInfo : any = [];

  flist : any = [];
  replyList : any = [];

  feedback : string = "";
  rating: string = "0";
  doctor_rating: string = "";

  ngOnInit(): void {

    this.userId = this.afu.get_UID();

    this.userservice.get_patientInfo(this.userId).then(e=>{
      this.userInfo = e.data();
   })

    //getting data from list-of-docts
    this.info = this.share.get_list();
    //saving data into LocalStorage
    if(localStorage.getItem('data')==null)
    {
      localStorage.setItem('data',JSON.stringify(this.info));
    }
    //retrieving data from LocalStorage
    this.info2 = JSON.parse(localStorage.getItem('data'));
    //console.log(this.info2);

    this.get_feedback();
    this.get_rating();
  }

  add_feedback()
  {
    //checks if the user already have a feedback
    this.userservice.userReply_existDoc(this.info2.uid,this.userId)
    .then(e=>{
      //if the user dont have a feedback then
      if(e.empty)
      {
        //checks if the textbox is empty if not then
        if(this.feedback != "")
          {
            //add feedback
            let record= {}
            record['feedback'] = this.feedback;
            record['rating'] = this.rating;
            this.userservice.create_Doctor_feedback(this.info2.uid,this.userId,record,this.userInfo.fullname)
            .then(()=>{
              console.log("Added!");

              //add notification to receiver
              let record = {};
              record['createdAt'] = formatDate(new Date(),'short','en');
              record['title'] = "Feedback";
              record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
              record['description'] = this.userInfo.fullname+" sent you a feedback! Go to Reviews and Check it!";
              this.notif.send_doctor(this.info2.uid,record)


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

    this.userservice.get_Doctor_Reviews(this.info2.uid).then(e=>{
      e.forEach(item=>{

        this.userservice.get_avatar(item.data().from).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        })

        this.userservice.get_doctorReply(this.info2.uid,item.id).then(res=>{
          res.forEach(a=>{
            data2 = a.data();
            data2.uid = a.id;
            tempArray2.push(data2);
          })
          this.replyList = tempArray2;
        })
      })
    })
    this.flist = tempArray;
    console.log(this.flist);
    //console.log(this.flist);
  }
  get_rating()
  {
    var one=0,two=0,three=0,four=0,five=0;
    var totalScore = 0;
    var totalReview = 0;
    var rating = 0;
    this.userservice.get_Doctor_Reviews(this.info2.uid)
    .then(a=>{
      a.forEach(item=>{
        console.log(item.data().rating);
        if(item.data().rating == '1')
          one++;
        if(item.data().rating=='2')
          two++;
        if(item.data().rating=='3')
          three++;
        if(item.data().rating=='4')
          four++;
        if(item.data().rating=='5')
          five++;
      })
    }).then(()=>{
      console.log(one+ ' ' +two+' '+three+' '+four+' '+five);
      totalScore = 1*one + 2*two + 3*three + 4*four + 5*five;
      totalReview = one + two + three + four + five;
      rating = totalScore/totalReview;
      this.doctor_rating = rating.toFixed(1);
    })
  }

}
