import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserForm } from 'src/app/class/user-form.model';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})

export class RegistrationPageComponent implements OnInit {
  
  userForm = new UserForm();
  
  error: { name: string, message: string } = { name: '', message: ''};
  errorMessage: string = '';
  message: string = '';

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  /*registerUser(frm)
  {
    alert(frm.fullname);
  }*/
 registerUser(frm)
  {
    this.clearErrorMessage();
    
   if (this.validateForm(frm.emailAddress, frm.password)) {
      this.authservice.registerWithEmail(frm)
        .then(() => {
          this.message = "you are registered"
          this.router.navigate(['/login'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/registration'])
        })
    }
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '', message : ''};
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
