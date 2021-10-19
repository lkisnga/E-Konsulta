import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-lab',
  templateUrl: './header-lab.component.html',
  styleUrls: ['./header-lab.component.css']
})
export class HeaderLabComponent implements OnInit {

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
