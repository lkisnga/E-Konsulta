import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-insurance-received-loa',
  templateUrl: './health-insurance-received-loa.component.html',
  styleUrls: ['./health-insurance-received-loa.component.css']
})
export class HealthInsuranceReceivedLoaComponent implements OnInit {

  userid: string = '';
  list: any = [];
  constructor(
    public userservice: UserService,
    public afu : AuthService
  ) { }

  ngOnInit(): void {
    this.userid = this.afu.get_UID();
    this.received();
  }


  received()
  {
    var data;
    var tempArray =[];
    this.userservice.get_loa_receieved(this.userid)
    .then(e=>{
      e.forEach(item=>{
        this.userservice.get_labInfo(item.data().lab_id).forEach(res=>{
          data = item.data();
          data.name = res.data().name;
          data.uid = item.id;
          tempArray.push(data);
        })
      })
    })
    this.list = tempArray;
  }
  open(e)
  {
    window.open(e);
  }
}
