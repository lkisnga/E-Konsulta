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
  file2:  string = "";

  filename: string = "";

  insuranceList : any = [];
  insurance_id : string = "";

  empty_field: string = "";
  empty_ins: string = "";
  added_message : string = "";

  labLOA_id: string = "";
  constructor(
    public userservice: UserService,
    public notif : NotificationService,
    public afu: AuthService
  ) { }

  ngOnInit(): void {
    this.userid = this.afu.get_UID();

    this.get_LOA();
    this.get_insurance();
  }

  get_LOA()
  {
    var data;
    var tempArray = [];
    this.userservice.get_labLOA(this.userid).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().patient_id)
        .then(a=>{
          data = item.data();
          data.fullname = a.data().fullname;
          data.uid = item.id;
          tempArray.push(data);
        })
      })
    })
    this.labList = tempArray;
    console.log(this.labList);
  }
  get_insurance()
  {
    var data;
    var tempArray = [];
    this.userservice.get_HealthInsurance()
    .then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.insuranceList = tempArray;
    console.log(this.insuranceList)
  }
  edit_labLOA(info)
  {
    this.file=info.file;
    this.labLOA_id = info.uid;

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
    if(this.insurance_id)
    {
      console.log(this.filename);
      if(this.file2 && this.filename)
      {
        let record = {};
        record['insurance_id'] = this.insurance_id;
        record['filename'] = this.filename;
        record['file'] = this.file2;
        record['lab_id'] = this.userid;
        this.userservice.send_labInsurance_LOA(record).then(e=>{
          console.log("added!");

          this.userservice.update_labLOA(this.labLOA_id)
          .then(()=>{
            console.log('Updated!');
            this.ngOnInit();
          })

          this.added_message = "LOA sent!";
          this.file2 = "";
          this.filename = "";
          this.insurance_id = "";
          setTimeout(() => {
            this.added_message = "";
          }, 5000);
        })
      }
      else
      {
        console.log("Empty File or Filename!");
        this.empty_field = "Empty File or Filename!"
        setTimeout(() => {
          this.empty_field = "";
        }, 5000);
      }
    }
    else
    {
      console.log('Please select an insurance!');
      this.empty_ins = "Please select an insurance!"
      setTimeout(() => {
        this.empty_ins = "";
      }, 5000);
    }
  }

}
