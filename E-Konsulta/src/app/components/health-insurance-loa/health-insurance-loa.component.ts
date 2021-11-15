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
  approve_list: any=[];

  file : any;
  filename: string = "";

  patientInfo : any = [];

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
    //console.log(this.loa_list);
  }
  approved_list()
  {
    var data;
    var tempArray = [];
    this.userservice.get_Insurance_LOA(this.userId).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid= item.id;
        if(data.approval_status=="sent" || data.approval_status=="declined")
          tempArray.push(data);
      })
    })
    this.approve_list = tempArray;
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
        });
      });

    }
    else
      console.log('Filname or File is empty!');
  }
  clear()
  {
    this.filename = "";
    this.loafile.nativeElement.value = "";
  }
  decline_LOA(e)
  {
    var status = "declined"
    this.userservice.update_LOA_Request(this.userId,e,status).then(()=>{
      this.ngOnInit();
    });
  }

}
