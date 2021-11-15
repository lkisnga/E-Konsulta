import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(public userservice : UserService,public afu :AuthService) { }

  pending = false;
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
     this.approved_list();
  }

  pending_list()
  {
    var data;
    var tempArray = [];
    this.userservice.get_Insurance_LOA(this.userId).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().patient_id).then(res=>{
          data = item.data();
          data.uid= item.id;
          data.fullname = res.data().fullname;
          console.log(data);
          if(data.status=="pending")
            tempArray.push(data);
        })
      })
    })
    this.loa_list = tempArray;
  }

  approved_list()
  {
    var data;
    var tempArray = [];
    this.userservice.get_Insurance_LOA(this.userId).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid= item.id;
        if(data.status=="sent")
          tempArray.push(data);
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
      record['filename'] = this.filename+'.pdf';
      record['file'] = this.file;
      this.userservice.create_Insurance_LOA(this.userId,this.patientInfo.patient_id,record)
      .then(()=>{
        var status = "sent"
        this.userservice.update_LOA_Request(this.userId,this.patientInfo.uid,status).then(()=>{
          this.ngOnInit();
          this.file2_message = "Request has been sent";
          setTimeout(() => {
            this.err_message = "";
          }, 5000);
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
      this.err_message = "Request has been delclined";
      setTimeout(() => {
        this.err_message = "";
      }, 5000);
    });
  }

}
