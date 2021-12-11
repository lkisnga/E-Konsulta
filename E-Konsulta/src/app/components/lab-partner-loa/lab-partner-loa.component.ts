import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lab-partner-loa',
  templateUrl: './lab-partner-loa.component.html',
  styleUrls: ['./lab-partner-loa.component.css']
})
export class LabPartnerLoaComponent implements OnInit {

  userid: string = "";
  labList : any = [];
  file: string = "";
  file2 : any;

  filename: string = "";

  insuranceList : any = [];

  empty_field: string = "";
  empty_ins: string = "";
  added_message : string = "";

  labLOA_id: string = "";

  patientInfo: any = [];
  constructor(
    public userservice: UserService,
    public notif : NotificationService,
    public afu: AuthService
  ) { }

  ngOnInit(): void {
    this.userid = this.afu.get_UID();

    this.get_LOA();
  }

  get_LOA()
  {
    var data;
    var tempArray = [];
    this.userservice.get_labLOA(this.userid).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().patient_id)
        .then(a=>{
          this.userservice.get_HealthInsurance_Info(a.data().health_insurance)
          .then(hi=>{
            data = item.data();
            data.fullname = a.data().fullname;
            data.uid = item.id;
            data.ins_id = hi.id;
            data.ins_name = hi.data().name;
            tempArray.push(data);
          })
        })
      })
    })
    this.labList = tempArray;
    console.log(this.labList);
  }
  edit_labLOA(info)
  {
    this.file=info.file;
    this.labLOA_id = info.uid;
    this.patientInfo = info;
  }
  open()
  {
    window.open(this.file);
  }
  choosefile(e)
  {
    this.file2 = e.target.files[0];
  }
  send()
  {
      console.log(this.patientInfo);
      if(this.file2)
      {
        let record = {};
        record['insurance_id'] = this.patientInfo.ins_id;
        record['filename'] = "Updated"+this.patientInfo.fullname+this.file2.name;
        record['file'] = this.file2;
        record['lab_id'] = this.userid;
        this.userservice.send_labInsurance_LOA(record).then(e=>{
          console.log("added!");
          let record2 = {};
          record2['title'] = "A laboratory sent a LOA";
          record2['description'] = "Check your received to view this LOA.";
          record2['createdAt'] = formatDate(new Date(),'short','en');
          record2['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
          this.notif.send_insurance(this.patientInfo.ins_id,record2);

          this.userservice.update_labLOA(this.labLOA_id)
          .then(()=>{
            console.log('Updated!');
            this.ngOnInit();
          })

          this.added_message = "LOA sent!";
          this.file2 = "";
          this.filename = "";
          setTimeout(() => {
            this.added_message = "";
          }, 5000);
        })
      }
      else
      {
        console.log("Empty File");
        this.empty_field = "Empty File!"
        setTimeout(() => {
          this.empty_field = "";
        }, 5000);
      }
  }

}
