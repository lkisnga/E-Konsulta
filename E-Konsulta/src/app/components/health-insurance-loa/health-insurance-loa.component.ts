import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-insurance-loa',
  templateUrl: './health-insurance-loa.component.html',
  styleUrls: ['./health-insurance-loa.component.css']
})
export class HealthInsuranceLoaComponent implements OnInit {

  userId : string = "";
  loa_list: any = [];
  constructor(public userservice : UserService,public afu :AuthService) { }

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
     this.userId=this.afu.get_UID()
     this.pending_list();
  }

  pending_list()
  {
    var data;
    var tempArray = [];
    this.userservice.get_Insurance_LOA(this.userId).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid= item.id;
        tempArray.push(data);
      })
    })
    this.loa_list = tempArray;
    console.log(this.loa_list);
  }

}
