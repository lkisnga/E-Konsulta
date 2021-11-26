import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  userId : string = "";
  notifList : any = [];
  badge : string = sessionStorage.getItem('Notification');
  nof_flag: boolean = false; //notif sound
  flag : boolean = false; 
  constructor(
    public afu : AuthService,
    public notif : NotificationService
  ) {
  }
  notification = false;
  notifFunction(){
    this.notification = true;

    sessionStorage.setItem('Notification','false');
    this.badge = sessionStorage.getItem('Notification');
  }

  doubleClick(e: Event) {
    this.notification = false;
  }
  ngOnInit(): void {

    if(sessionStorage.getItem('Notification')==null)
      sessionStorage.setItem('Notification','false')

    this.userId = this.afu.get_UID();
    this.notif.notif_soundAdmin(this.userId,this.nof_flag);
    this.get_notification()
  }
  get_notification()
  {
    var data;
    var tempArray = [];
    this.notif.get_admin(this.userId).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        data = e.doc.data();
        if(e.type == 'added' && this.flag == false)
        {
          tempArray.push(data);
        }
        if(e.type == 'added' && this.flag == true)
        {
          sessionStorage.setItem('Notification','true');
          this.badge = sessionStorage.getItem('Notification');
          console.log(this.badge);
          tempArray.unshift(data);
        }
      })
      this.flag = true;
    })
    this.notifList = tempArray;
  }

}
