import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-insurance-loa',
  templateUrl: './health-insurance-loa.component.html',
  styleUrls: ['./health-insurance-loa.component.css']
})
export class HealthInsuranceLoaComponent implements OnInit {

  constructor() { }

  pending = false;
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
