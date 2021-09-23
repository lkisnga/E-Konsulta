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
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.loginWithEmail(this.email, this.password)
        .then(() => {
         this.router.navigate(['/admin-profile'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/login'])
        })
    }
  }

  validateForm(email, password)
  {
    if(email.lenght === 0)
    {
      this.errorMessage = "please enter email id";
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = "please enter password";
      return false;
    }

    this.errorMessage = '';
    return true;

  }
}
