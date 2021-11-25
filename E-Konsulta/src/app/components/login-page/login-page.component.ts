import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  email = "";
  password : string = "";
  message : string = "";
  errorMessage : string = "";
  error: {name : string, message : string} = {name: '',message: ''};


  pending_message : boolean = false;

  timeLeft: number = 10;
  interval;

  constructor(private authservice : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }
  login()
  {
    if(this.validateForm(this.email,this.password))
    {
      this.authservice.get_userData().then(e => {
        e.forEach(res => {
          if(res.data().email == this.email)
            {
              if(res.data().role != 'doctor')
              {
                this.authservice.loginWithEmail(this.email, this.password,res.data().role).catch(_error => {
                  this.error = _error
                  this.router.navigate(['/login'])
                })
              }
              else if (res.data().isVerified == 'verified')//Doctor Verified
              {
                this.authservice.loginWithEmail(this.email, this.password,res.data().role).catch(_error => {
                  this.error = _error
                  this.router.navigate(['/login'])
                })
              }
              else //Doctor Pending
              {
                console.log('pending!');
                this.pending_message = true;
                setTimeout(() => {
                  this.pending_message = false;
                }, 10000);
                this.interval = setInterval(() => {
                  if(this.timeLeft > 0) {
                    this.timeLeft--;
                  } else {
                    clearInterval(this.interval);
                    this.timeLeft = 10;
                  }
                },1000)
              }
            }
        })
      })
    }
  }

  validateForm(email, password)
  {
    if(email.length === 0)
    {
      this.errorMessage = "Please enter email id";
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = "Please enter password";
      return false;
    }

    this.errorMessage = '';
    return true;

  }
}
