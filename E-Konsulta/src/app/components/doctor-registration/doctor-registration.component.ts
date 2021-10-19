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
  

  model = new DoctorForm();
  error: { name: string, message: string } = { name: '', message: ''};
  constructor(public afu : AuthService, public userservice : UserService, public router : Router) { }

  ngOnInit(): void {
  }
  registerDoctor(frm)
  {
    console.log(frm);
  }
}
