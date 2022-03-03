import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { url } from 'inspector';
import { formatDate } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-patient-doctor-chat',
  templateUrl: './patient-doctor-chat.component.html',
  styleUrls: ['./patient-doctor-chat.component.css']
})
export class PatientDoctorChatComponent implements OnInit {

  medList: any = [];
  labList: any = [];
  docInfo : any = [];
  presList: any = [];

  userid : string = "";
  chat_id : string = "";

  content : string = "";

  sharedList : any = [];


  shareFile: any = [];
  tempArray = [];

  chat$ : Observable<any>;

  info : any =[];
  imgUrl : any;

  flag : number = 0;

  audio = new Audio('assets/sounds/Call.mp3');

  dataInput: string = ""; 
  file: any;

  /** set to false so that when loading the user analytics page, content of that function is not displayed */
  medicalrecords = true;
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
  insuranceLOA()
  {
    this.medicalrecords = false;
    this.labresult = false;
    this.presc = false;
    this.insurance_loa = true;
  }

  constructor(
    public chats : ChatService,
    public afu : AuthService,
    public userservice: UserService,
    public notif: NotificationService,
    public router: Router,
    public db: AngularFirestore,
    public sds: SharedDataService

  ) { }

  ngOnInit(): void {

    // remove this after editing the design
    //document.getElementById("openModal").click();

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


    this.fileShared();
    this.get_medicalRecord();
    this.get_labRecord();
    this.prescription_record();

    this.finish_consultation();

    this.videoCall_listener();
  }

  videoCall_listener()
  {
    this.db.firestore.collection('calls').where('offer.doctor_id','==',this.docInfo.uid).
    where('offer.patient_id','==',this.userid).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        if(e.type == 'added')
        {
          console.log('exist!');
          this.video_call();
        }
      })
    })
  }

  answerCall()
  {
    console.log("test");
    localStorage.setItem('callInput',this.dataInput);
    this.video_call();
    document.getElementById("closeModal").click();
  }

  finish_consultation()
  {
    this.userservice.removed_upcoming_trigger(this.userid).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        if(e.type == 'removed')
        {
          this.router.navigate(['patient-consultation']);
        }
      })
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
  
    let record = {};
    record['content']= this.content;
    
    let record2 = {};

    if(this.file != undefined)
    {
      record2['file'] = this.file;
      record2['filename'] = this.file.name;
    }
    

    if(this.content != "" || this.file != undefined)
    {
      if(this.file)
      this.userservice.send_chat_image(record2).then(e=>{
        record['imageFile'] = e;
        this.chats.send_message(this.chat_id,record,this.userid).then(()=>{
          this.content="";
          this.file = "";
          console.log("message sent!");
        })
      })
      else
      this.chats.send_message(this.chat_id,record,this.userid).then(()=>{
        this.content="";
        this.file = "";
        console.log("message sent!");
      })
    }
    else
    {
      console.log("Empty!");
    }
  }
  chooseImage(e)
  {
    this.file = e.target.files[0];
    console.log(this.file);
  }
  video_call()
  {
    window.open('/patient-video-call','location=yes,height=570,width=2000,scrollbars=yes,status=yes');
  }
  get_medicalRecord()
  {
    var data;
    var tempArray = [];
    
    
    this.userservice.get_patient_medical(this.userid)
    .then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        data.check = false;
        this.sharedList.forEach(res=>{
          if(item.id == res.file_id)
             data.check = true;
        })
        tempArray.push(data);
      })
    })
    this.medList = tempArray;
    console.log(this.medList);
  }

  fileShared()
  {
    var data;
    var tempArray = [];
    this.userservice.get_shareFiles().then(a=>{
      a.forEach(res=>{
        data = res.data();
        tempArray.push(data);
      })
    });
    this.sharedList=tempArray;
  }

  get_labRecord()
  {
    var data;
    var tempArray = [];
    this.userservice.get_UserInfo(this.userid).then(e=>{
      this.info = e.data();
    }).then(()=>{
      this.userservice.get_Lab_Results_Patient(this.info.email).then(e => {
        e.forEach(item => {
          if(item.data().status != 'pending')
          {
            this.userservice.get_labInfo(item.data().diagnostic_center)
            .forEach(res=>{
              data = item.data();
              data.uid = item.id;
              data.from = res.data().name;
              data.check = false;
              this.sharedList.forEach(res=>{
                if(item.id == res.file_id)
                   data.check = true;
              })
              tempArray.push(data);
            })
          }
        })
      })
    })
    this.labList = tempArray;
    console.log(this.labList);
  }

  prescription_record()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_prescription(this.userid).then(e=>{
      e.forEach(item=>{
        console.log(item.data());
        data = item.data();
        data.uid = item.id;
        data.check = false;
        this.sharedList.forEach(res=>{
          if(item.id == res.file_id)
             data.check = true;
        })
        tempArray.push(data);
      })
    })
    this.presList = tempArray;
  }
  open(e)
  {
    console.log(e);
    window.open(e);
  }

  chooseShare(file,isChecked: boolean)
  {
    if(isChecked)
    {
      this.tempArray.push(file);
      this.flag++;
    }
    else
    {
      var index = this.tempArray.findIndex(x => x.value ===file);
      this.tempArray.splice(index);
    }
    console.log(this.tempArray);
  }
  share()
  {
    this.shareFile = this.tempArray;
    let record = {};
    record['doctor_id'] = this.docInfo.uid;
    record['patient_id'] = this.userid;
    for(var i=0;i<this.flag;i++)
    {
      console.log(this.shareFile[i]);
      record['file_id'] = this.shareFile[i];
      this.userservice.create_sharedFile(record)
      .then(()=>{
        console.log('File['+i+'] Shared!');
      })
    }

    let record2 = {};
    record2['createdAt'] = formatDate(new Date(),'short','en');
    record2['title'] = "File Sharing";
    record2['description'] = "A patient shared his files with you";
    this.notif.send_doctor(this.docInfo.uid,record2)

    this.flag = 0;
  }

}
