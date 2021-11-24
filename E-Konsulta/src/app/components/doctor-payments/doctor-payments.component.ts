import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-payments',
  templateUrl: './doctor-payments.component.html',
  styleUrls: ['./doctor-payments.component.css']
})
export class DoctorPaymentsComponent implements OnInit {

  constructor(
    public userservice : UserService,
    public afu : AuthService
  ) { }

  ngOnInit(): void {
  }

}
