import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  
  constructor(public authservice : AuthService, private db: AngularFirestore) { 
    
  }
  
  ngOnInit(): void { 
    //this.db.collection('Users').doc(this.authservice.currentUserId).valueChanges().subscribe(val => console.log(val));
    
  }
  ngAfterContentInit(): void
  { 
    if(this.authservice.currentUser)
    {
      var str = this.authservice.currentUserId;
      console.log("Value:"+str);
    }
  }

}
