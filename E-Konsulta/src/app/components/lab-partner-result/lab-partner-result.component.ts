import { Component, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { EventEmitter } from 'stream';

export class RequestForm
{
  email : string;
  filename: string;
  file: string;
}

@Component({
  selector: 'app-lab-partner-result',
  templateUrl: './lab-partner-result.component.html',
  styleUrls: ['./lab-partner-result.component.css']
})
export class LabPartnerResultComponent implements OnInit {

  model = new RequestForm();
  file : any = "";
  list : any = [];
  list2: any = [];

  requestID: string="";
  userId : string="";
  constructor(public userservice : UserService, public afu : AuthService) { }

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
    this.userId = this.afu.get_UID();
    this.get_labResult();
    this.get_labResult2();

  }
  editinfo(e)
  {
    this.requestID = e.uid;
    this.model.email = e.email;
    if(e.filename==undefined)
     this.model.filename = "";
    else
    {
     this.model.filename = e.filename.replace('.pdf','');
    }
  }
  get_labResult()
  {
    var data;
    var tempArray = [];
   this.userservice.get_Lab_Result().then(e=>{
     e.forEach(item =>{
       if(item.data().status == "pending")
       {
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
       }
     })
     this.list = tempArray;
   })
  }
  get_labResult2()
  {
    var data;
    var tempArray = [];
   this.userservice.get_Lab_Result().then(e=>{
     e.forEach(item =>{
      if(item.data().status == "sent")
      {
       data = item.data();
       data.uid = item.id;
       tempArray.push(data);
      }
     })
     this.list2 = tempArray;
   })
  }
  choosefile(e)
  {
    this.file = e.target.files[0];
    console.log(this.file);
  }

  addRequest(e){
    if(e.email!=null)
    {
      this.userservice.check_email(e).then(item => {
        if(item.empty)
          {
            console.log("Email does not exist!!");
          }
        item.forEach(res=>{
          if(res.data())
          {
            this.userservice.lab_request(e,"patient",this.userId);
          }
        })
        this.ngOnInit();
      })
    }
    else
    {
      console.log("empty!");
    }
  }
  //Passing file to the user
  uploadfile(e)
  {
    if(this.file != "" && e.filename != "")
    {
      this.userservice.lab_fileUpload(this.file,this.userId,this.requestID,e.filename);
    }
    else
     console.log('Empty File or Filename!');
  }
}
