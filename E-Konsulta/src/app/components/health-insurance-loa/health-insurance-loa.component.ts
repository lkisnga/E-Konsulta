import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-insurance-loa',
  templateUrl: './health-insurance-loa.component.html',
  styleUrls: ['./health-insurance-loa.component.css']
})
export class HealthInsuranceLoaComponent implements OnInit {

  @ViewChild('loa_file') loafile : ElementRef;

  userId : string = "";
  loa_list: any = [];
  sent_list: any=[];

  file : any;
  filename: string = "";

  patientInfo : any = [];

  err_message : string = "";
  file_message : string = "";
  file2_message: string = "";
  constructor(public userservice : UserService,public afu :AuthService,
    public notif: NotificationService
    ) { }

  pending = true;
  done = false;

  pendingFunction(){
    this.pending = true;
    this.done = false;
  }

  doneFunction(){
    this.pending = false;
    this.done = true;
  }

  ngOnInit(): void {
     this.userId=this.afu.get_UID()
     this.pending_list();
     this.sentList();
  }

  pending_list()
  {
    var data;
    var tempArray = [];
    this.userservice.get_Insurance_LOA(this.userId).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().patient_id).then(res=>{
          if(res.exists)
          {
            if(item.data().lab_id != undefined)
            this.userservice.get_labInfo(item.data().lab_id).forEach(res2=>{
              data = item.data();
              data.uid= item.id;
              data.lab_name = res2.data().name;
              data.lab_id = res2.id;
              data.fullname = res.data().fullname;
              console.log(data);
              if(data.status=="pending")
                tempArray.push(data);
            })
          }
        })
      })
    })
    this.loa_list = tempArray;
  }

  sentList()
  {
    var data;
    var tempArray = [];
    this.userservice.get_LOA_sent(this.userId).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().patient_id).then(res=>{
          data = item.data();
          data.fullname = res.data().fullname;
          data.id = item.id;
          tempArray.push(data);
        })
      })
    })
    this.sent_list = tempArray;
  }

  open_LOA(e)
  {
    window.open(e);
  }

  choosefile(e)
  {
    this.file = e.target.files[0];
    console.log(this.file)
  }

  send_LOA()
  {
    if(this.filename != "" && this.loafile.nativeElement.value != "")
    {
      let record = {}
      record['filename'] = this.filename;
      record['file'] = this.file;

      //send to Laboratory
      this.userservice.create_insurance_LOA_lab(this.userId,this.patientInfo.patient_id,this.patientInfo.lab_id,record)
      .then(()=>{
          //Notification to patient
          record = {};
          record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
          record['createdAt'] = formatDate(new Date(),'short','en');
          record['title'] = "Insurance LOA";
          record['description'] = "An Insurance sent a copy of a patient LOA.";
          this.notif.send_lab(this.patientInfo.lab_id,record);
          setTimeout(() => {
            this.file2_message = "";
          }, 5000);

        console.log("send to lab successful!");
      })
      //send to patient
      this.userservice.create_Insurance_LOA(this.userId,this.patientInfo.patient_id,record)
      .then(()=>{
        var status = "sent"
        this.userservice.update_LOA_Request(this.userId,this.patientInfo.uid,status)
        .then(()=>{
          this.ngOnInit();
          this.file2_message = "Request has been sent";

          //Notification to patient
          record = {};
          record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
          record['createdAt'] = formatDate(new Date(),'short','en');
          record['title'] = "LOA Request";
          record['description'] = "Your LOA request has been approved by your insurance.";
          this.notif.send_patient(this.patientInfo.uid,record);

          setTimeout(() => {
            this.file2_message = "";
          }, 5000);
          console.log("send to patient successful!");
        });
      });
    }
    else
    {
      this.file_message = "Filename or File is empty!";
      setTimeout(() => {
        this.file_message = "";
      }, 5000);
    }
  }

  clear()
  {
    this.filename = "";
    this.loafile.nativeElement.value = "";
  }

  decline_LOA(request_id)
  {
    var status = "declined"
    this.userservice.update_LOA_Request(this.userId,request_id,status).then(()=>{
      this.ngOnInit();
      //Notification to patient
       //Notification to patient
       let record = {};
       record['id'] = new Date(formatDate(new Date(),'short','en')).getTime();
       record['createdAt'] = formatDate(new Date(),'short','en');
       record['title'] = "LOA Request Declined";
       record['description'] = "Your LOA request has been declined by your insurance.";
       this.notif.send_patient(request_id,record);
      this.err_message = "Request has been declined";
      setTimeout(() => {
        this.err_message = "";
      }, 5000);
    });
  }

}
