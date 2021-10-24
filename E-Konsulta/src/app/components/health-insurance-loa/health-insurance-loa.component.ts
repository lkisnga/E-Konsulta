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
  approve_list: any=[];
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
     this.approved_list();
  }

  pending_list()
  {
    var data;
    var tempArray = [];
    this.userservice.get_Insurance_LOA(this.userId).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid= item.id;
        if(data.approval_status=="pending")
          tempArray.push(data);
      })
    })
    this.loa_list = tempArray;
    //console.log(this.loa_list);
  }
  approved_list()
  {
    var data;
    var tempArray = [];
    this.userservice.get_Insurance_LOA(this.userId).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid= item.id;
        if(data.approval_status=="approved" || data.approval_status=="declined")
          tempArray.push(data);
      })
    })
    this.approve_list = tempArray;
  }
  open_LOA(e)
  {
    window.open(e);
  }
  approve_LOA(e)
  {
    var status = "approved"
    this.userservice.approve_LOA(this.userId,e,status).then(()=>{
      this.ngOnInit();
    });
  }
  decline_LOA(e)
  {
    var status = "declined"
    this.userservice.approve_LOA(this.userId,e,status).then(()=>{
      this.ngOnInit();
    });
  }

}
