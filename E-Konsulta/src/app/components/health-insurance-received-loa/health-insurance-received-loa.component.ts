import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-insurance-received-loa',
  templateUrl: './health-insurance-received-loa.component.html',
  styleUrls: ['./health-insurance-received-loa.component.css']
})
export class HealthInsuranceReceivedLoaComponent implements OnInit {

  constructor() { }

  pending = true;
  done = false;

  pendingFunction(){
    this.pending = true;
    this.done = false;
  }

  doneFunction(){
    this.pending = false;
    this.done = true;
  }

  ngOnInit(): void {
  }

}
