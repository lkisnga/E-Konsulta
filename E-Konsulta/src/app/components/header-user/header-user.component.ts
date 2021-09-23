import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  constructor() {
  }
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
