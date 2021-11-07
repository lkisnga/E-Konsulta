import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-patient-doctor-chat',
  templateUrl: './patient-doctor-chat.component.html',
  styleUrls: ['./patient-doctor-chat.component.css']
})
export class PatientDoctorChatComponent implements OnInit {
  docInfo : any = [];

  userid : string = "";
  chat_id : string = "";

  content : string = "";
  chat$ : Observable<any>;

  imgUrl : any;


  constructor(
    public chats : ChatService,
    public afu : AuthService,
    public userservice: UserService

  ) { }

  ngOnInit(): void {
    this.userid = this.afu.get_UID();
    console.log(this.userid);
    this.userservice.get_avatar(this.userid).then(e=>{
      this.imgUrl = e.data().image;
    })
    this.docInfo = JSON.parse(localStorage.getItem('data'));
    this.chats.check_chat(this.docInfo.uid,this.userid).then(e=>{
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
    this.chats.send_message(this.chat_id,this.content,this.userid).then(()=>{
      this.content="";
      console.log("message sent!");
    })
  }

}
