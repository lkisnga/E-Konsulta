import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email : string = "";
  email2 : string = "";
  message : string = "";
  password : string = "";
  error: {name : string, message : string} = {name: '',message: ''}; 
  constructor(public afu : AuthService) { }

  ngOnInit(): void {

  }

  reset_email(e)
  {
    this.afu.reset_password(e.email).then(()=>{
      this.message = "Please check your email.";
    }).catch(error=>{
      console.log(error);
    })
  }
  login()
  {
    this.afu.get_userData().then(e => {
      e.forEach(res => {
        if(res.data().email == this.email)
          {
            this.afu.loginWithEmail(this.email, this.password,res.data().role).catch(_error => {
                 this.error = _error
              })
          }
      })
    })
  }

}
