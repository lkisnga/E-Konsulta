import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-doctors-list',
  templateUrl: './patient-doctors-list.component.html',
  styleUrls: ['./patient-doctors-list.component.css']
})
export class PatientDoctorsListComponent implements OnInit {

  docList : any = [];
  searchName : string="";

  constructor(public userservice : UserService) { }

  ngOnInit(): void {

    this.get_doctorList();

  }

  get_doctorList()
  {
    var data;
    var tempArray = [];
    this.userservice.get_doctorList().then(e=>{
      e.forEach(item=>{
        this.userservice.get_avatar(item.id).then(res=>{
          this.userservice.get_specializationInfo(item.data().specialization).then(a=>{
            data = item.data();
            data.uid = item.id;
            data.ins = a.data().name;
            data.image = res.data().image;
            tempArray.push(data);
          }).then(()=>{
            this.docList = tempArray.filter(e=>{
              if(e.fullname != undefined)
              return e.fullname.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
            });
          })
        })
      })
    })
  }

}
