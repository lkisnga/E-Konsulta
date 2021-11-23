import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header-insurance',
  templateUrl: './header-insurance.component.html',
  styleUrls: ['./header-insurance.component.css']
})
export class HeaderInsuranceComponent implements OnInit {
  @ViewChild('audio') audio : ElementRef;

  userId : string = "";
  notifList : any = [];
  nof_flag: boolean = false;
  flag : boolean = false;
  constructor(
    public afu: AuthService,
    public notif : NotificationService
  ) { }

  notification = false;
  notifFunction(){
    this.notification = true;
  }

  doubleClick(e: Event) {
    this.notification = false;
  }
  ngOnInit(): void {
    this.userId = this.afu.get_UID();
    this.notif.notif_sound(this.userId,this.nof_flag);
    this.get_notification();
  }

  get_notification()
  {
    var data;
    var tempArray = [];
    this.notif.get_insurance(this.userId).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        data = e.doc.data();
        if(e.type == 'added' && this.flag == false)
        {
          tempArray.push(data);
        }
        if(e.type == 'added' && this.flag == true)
        {
          tempArray.unshift(data);
        }
      })
      this.flag = true;
    })
    this.notifList = tempArray;
  }
}
