import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('file') files : ElementRef;
  @ViewChild('file2') files2 : ElementRef;

  userid : string = ""; // Doctor ID
  patientInfo : any = []; //Patient Information includng its ID
  chat_id : string = "";

  content : string = "";
  chat$ : Observable<any>;

  imgUrl : any;

  file1 : any = "";
  file2: any = "";

  filename : string = "";
  filename2 : string = "";

  error_message = "";

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

  choosefile(e,type)
  {
    if(type=="cs")
    {
      this.file1 = e.target.files[0];
      console.log(e.target.files[0]);
    }
    else if(type=="prs")
    {
      this.file2 = e.target.files[0];
      console.log(e.target.files[0]);
    }
  }

  uploadFile()
  {
    console.log(this.filename);
    if(this.filename != "" && this.filename2 != "")
    {
      this.userservice.send_medicalRecord(this.patientInfo.uid,this.userid,this.filename+".pdf",this.file1)
      .catch(error=>{
        console.log(error)
      }).then(()=>{
        console.log("Stored successfully!");
      })
      this.userservice.send_prescriptionRecord(this.patientInfo.uid,this.userid,this.filename2+".pdf",this.file2)
      .catch(error=>{
        console.log(error)
      }).then(()=>{
        console.log("Stored successfully2!");
      })
    }
    else
    {
      this.error_message = "Make sure the fields are not empty!";
      setTimeout(() => {
        this.error_message = "";
      }, 5000);
    }
  }
  close()
  {
    this.filename = "";
    this.filename2 = "";
    this.files.nativeElement.value = "";
    this.files2.nativeElement.value= "";
  }
  video_call()
  {
    const audio = new Audio('assets/sounds/video-button.mp3');
    audio.play();
    window.open('/video-call','location=yes,height=570,width=2000,scrollbars=yes,status=yes');
  }

  finish_consultation()
  {
    let record = {};
    this.userservice.get_upcoming(this.patientInfo.upcoming_id).then(e=>{
      record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
      record['doctor_id'] = e.data().doctor_id;
      record['patient_id'] = e.data().patient_id;
      record['schedule'] = e.data().schedule;
      record['status'] = "done";
    }).then(()=>{
      this.userservice.remove_upcoming(this.patientInfo.upcoming_id).then(()=>{
        console.log('Upcoming removed!')
      }).then(()=>{
        this.userservice.create_consultation(record).then(()=>{
          console.log('Consultation Record Created!');
        })
      })
    });
  }

    /** set to false so that when loading the user analytics page, content of that function is not displayed */
    medicalrecords = false;
    labresult = false;
    presc =  false;
    insurance_loa = false;

    medicalRecords(){
      this.medicalrecords = true;
      this.labresult = false;
      this.presc = false;
      this.insurance_loa = false;
    }

    labResult(){
      this.medicalrecords = false;
      this.labresult = true;
      this.presc = false;
      this.insurance_loa = false;
    }

    prescription(){
      this.medicalrecords = false;
      this.labresult = false;
      this.presc = true;
      this.insurance_loa = false;
    }

}
