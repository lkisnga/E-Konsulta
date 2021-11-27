import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


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

  constructor(private authservice : AuthService, 
    private router: Router,
    public userservice : UserService  
  ) { }

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
          if(res.data().email == this.email) // finding equal email from the firestore
            {
              if(res.data().role == 'doctor') //finding user Role
              {
                if(res.data().disabled != 'true')// checks if the account is disabled or not
                  {
                    this.authservice.loginWithEmail(this.email, this.password,res.data().role).catch(_error => {
                      this.error = _error
                      this.router.navigate(['/login'])
                    })
                  }
                  else //if the account is disabled
                  {
                    this.errorMessage = "Account is disabled!";
                    console.log('Account Disabled!');
                  }
              }
              else if(res.data().role == "patient")
              {
                if(res.data().disabled!='true')// checks if the account is disabled or not
                {
                  this.authservice.loginWithEmail(this.email, this.password,res.data().role).catch(_error => {
                    this.error = _error
                    this.router.navigate(['/login'])
                  })
                }
                else //if the account is disabled
                {
                  this.errorMessage = "Account is disabled!";
                  console.log('Account Disabled!');
                }
              }
              else if(res.data().role == "Health_Insurance")
              {
                this.userservice.get_HealthInsurance_Info(res.id).then(e=>{
                  if(e.data().disabled != 'true')
                  {
                    this.authservice.loginWithEmail(this.email, this.password,res.data().role).catch(_error => {
                      this.error = _error
                      this.router.navigate(['/login'])
                    })
                  }
                  else
                  {
                    this.errorMessage = "Account is disabled!";
                    console.log('Account Disabled!');
                  }
                })
              }
              else if(res.data().role == "laboratory_partner")
              {
                this.userservice.get_labInfo(res.id).forEach(e=>{
                  if(e.data().disabled != 'true')
                  {
                    this.authservice.loginWithEmail(this.email, this.password,res.data().role).catch(_error => {
                      this.error = _error
                      this.router.navigate(['/login'])
                    })
                  }
                  else
                  {
                    this.errorMessage = "Account is disabled!";
                    console.log('Account Disabled!');
                  }
                })
              }
              else //admin
              {
                this.authservice.loginWithEmail(this.email, this.password,res.data().role).catch(_error => {
                  this.error = _error
                  this.router.navigate(['/login'])
                })
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
