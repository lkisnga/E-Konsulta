import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-patients-chat',
  templateUrl: './doctor-patients-chat.component.html',
  styleUrls: ['./doctor-patients-chat.component.css']
})
export class DoctorPatientsChatComponent implements OnInit {

  userid : string = "";
  patientInfo : any = [];
  chat_id : string = "";

  content : string = "";
  chat$ : Observable<any>;

  imgUrl : any;

  constructor(
    public afu : AuthService,
    public chats : ChatService,
    public userservice : UserService
  ) { }

  ngOnInit(): void {
    this.userid = this.afu.get_UID();
    this.userservice.get_avatar(this.userid).then(e=>{
      this.imgUrl = e.data().image;
    })
    this.patientInfo = JSON.parse(localStorage.getItem('data'));
    console.log(this.patientInfo);
    this.chats.check_chat(this.userid,this.patientInfo.uid).then(e=>{
      e.forEach(item=>{
        this.chat_id = item.id;
      })
    }).then(()=>{
      this.chat_source();
    })
  }

  chat_source()
  {
     console.log(this.chat_id);
     this.chat$=this.chats.get(this.chat_id).pipe(
      map(doc => {
        return { 
          id: doc.payload.id,
          ...
          Object.assign({}, doc.payload.data() )
        };
      })
    );
  }
  send_message()
  {
    if(this.content!="")
    {
      this.chats.send_message(this.chat_id,this.content,this.userid).then(()=>{
        this.content="";
        console.log("message sent!");
      })
    }else
    {
      console.log("Empty!");
    }
  }

  video_call()
  {
    window.open('/video-call','_blank','location=yes,height=570,width=1000,scrollbars=yes,status=yes');
  }
}
