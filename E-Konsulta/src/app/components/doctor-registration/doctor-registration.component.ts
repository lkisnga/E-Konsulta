import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorForm } from 'src/app/class/doctor-form.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})
export class DoctorRegistrationComponent implements OnInit {

  spList : any = [];
  file : any;

  confirmPass: string = "";
  conPass: string = "";

  checkbox: boolean = false;

  model = new DoctorForm();
  error: { name: string, message: string } = { name: '', message: ''};
  constructor(public afu : AuthService, public userservice : UserService, public router : Router) { }


  ngOnInit(): void {

    var data;
    var tempArray = [];
    this.userservice.get_Speciaalization().then(e=>{
      e.forEach(item=>{
        //console.log(item.data());
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.spList = tempArray;
    console.log(this.spList);
  }
  registerDoctor(frm)
  {
    if(this.checkbox != false)
    {
      frm.file = this.file;
      this.clearErrorMessage();
      this.afu.registerWithEmail_Doctor(frm).then(()=>{
        this.router.navigate(['/login']);
      }).catch(_error=>{
        this.error = _error;
        this.router.navigate(['/doctor-registration']);
      })
    }
    else
    {
      console.log('you must agree to the terms and conditions');
      this.error.message = "you must agree to the terms and conditions";
    }
  }

  confirm()
  {
    if(this.confirmPass == this.model.password && this.confirmPass != "" && this.model.password != "")
    {
      this.conPass = "true";
    }
    else
    {
      this.conPass = "false";
    }
    if(this.confirmPass == "")
    {
      this.conPass = "";
    }
  }
  checkBox(e)
  {
    this.checkbox = e;
  }
  choosefile(e)
  {
    this.file = e.target.files[0]
  }

  clearErrorMessage()
  {
    this.error = {name : '', message : ''};
  }

  // registration design
  


}
