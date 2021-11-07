import { Component, OnInit } from '@angular/core';
import { create } from 'domain';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-patient-doctors-list-view',
  templateUrl: './patient-doctors-list-view.component.html',
  styleUrls: ['./patient-doctors-list-view.component.css']
})
export class PatientDoctorsListViewComponent implements OnInit {

  docInfo : any = [];
  userid : any;

  constructor(
    public userservice : UserService,
    public afu : AuthService,
    public chats : ChatService
  ) { }

  ngOnInit(): void {
    
    this.userid = this.afu.get_UID();
    this.docInfo = JSON.parse(localStorage.getItem('data'));
    console.log(this.docInfo);
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

  booknow()
  {
    let record = {};
    record['doctor_id'] = this.docInfo.uid;
    record['patient_id'] = this.userid;
    this.userservice.create_doctor_upcoming(record);
    this.create_chat();
  }
  create_chat()
  {
    this.chats.check_chat(this.docInfo.uid,this.userid).then(e=>{
      if(e.empty)
        this.chats.create_chat(this.docInfo.uid,this.userid);
      else
        console.log("Chat already exist!");
    })  
  }

}
