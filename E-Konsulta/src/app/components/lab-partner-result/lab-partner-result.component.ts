import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
  file : any;
  labId : string="";
  constructor(public userservice : UserService, public afu : AuthService) { }

  ngOnInit(): void {
    this.labId = this.afu.get_UID();
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
            this.userservice.lab_request(e);
          }
        })
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
    console.log(e);
    this.userservice.lab_fileUpload(this.file,this.labId,"testingID",e.filename);
  }

}
