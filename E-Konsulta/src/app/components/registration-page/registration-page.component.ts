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
  userID: any;
  confirmPass: string = "";
  pass_message: string = "";
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userID = this.authservice.get_UID()
  }
 registerUser(frm)
  {
    if(this.confirmPass == frm.password)
    {
      this.clearErrorMessage();
      this.authservice.registerWithEmail(frm)
        .then(() => {
          this.router.navigate(['/login'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/registration'])
        })
      }
      else
      {
        this.pass_message = "Passwords do not match!";
      }
  }

  clearErrorMessage()
  {
    this.error = {name : '', message : ''};
    this.pass_message = "";
  }
}
