import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-insurance',
  templateUrl: './header-insurance.component.html',
  styleUrls: ['./header-insurance.component.css']
})
export class HeaderInsuranceComponent implements OnInit {

  constructor() { }

  notification = false;
  notifFunction(){
    this.notification = true;
  }

  doubleClick(e: Event) {
    this.notification = false;
  }

  ngOnInit(): void {
  }

}
