import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lab-partner-result',
  templateUrl: './lab-partner-result.component.html',
  styleUrls: ['./lab-partner-result.component.css']
})
export class LabPartnerResultComponent implements OnInit {
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
  //Passing file to the user
  uploadfile()
  {
    this.userservice.lab_fileUpload(this.file,this.labId,"testingID");
  }

}
