import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-doctors-list',
  templateUrl: './patient-doctors-list.component.html',
  styleUrls: ['./patient-doctors-list.component.css']
})
export class PatientDoctorsListComponent implements OnInit {

  docList : any = [];
  searchName : string="";

  constructor(
    public userservice : UserService,
    public router : Router
    ) { }

  ngOnInit(): void {

    localStorage.removeItem('data');

    this.get_doctorList();

  }

  book_doctor_view(info)
  {
    if(localStorage.getItem('data') == null)
      localStorage.setItem('data',JSON.stringify(info));

    this.router.navigate(['patient-doctors-lists-view']);
  }

  get_doctorList()
  {
    var data;
    var tempArray = [];
    this.userservice.get_doctorList().then(e=>{
      e.forEach(item=>{
        if(item.data().isVerified == "verified") //only verified will show
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
            console.log(this.docList);
          })
        })
      })
    })
  }

}
