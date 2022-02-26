import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-loa',
  templateUrl: './loa.component.html',
  styleUrls: ['./loa.component.css']
})
export class LoaComponent implements OnInit {
  user_id: string = "";
  info: any = [];
  datas: any = [];

  constructor(
    public afu: AuthService,
    public userservice: UserService
  ) { }

  ngOnInit(): void {
    this.user_id = this.afu.get_UID();
    this.info = JSON.parse(localStorage.getItem('loa'))
    this.get_data();
    if(localStorage.getItem('loa')!=null)
    {
      setTimeout(() => {
        this.downloadPDF();
        localStorage.removeItem('loa');
      }, 1800);
    }
  }

  get_data()
  {
    var data;
    var tempArray = [];
    this.userservice.get_labInfo(this.info.lab_id)
    .forEach(e=>{
      this.userservice.get_patientInfo(this.info.patient_id)
      .then(res=>{
        this.userservice.get_HealthInsurance_Info(this.user_id)
        .then(item=>{
          data = item.data();
          data.lab = e.data().name;
          data.patient_name = res.data().fullname;
          data.patient_address = res.data().address;
          data.patient_contact_number = res.data().contact_number;
          data.today = formatDate(new Date(),'long','en');
          this.datas = data;
          console.log(this.datas);
        })
      })
    })
  }

  public downloadPDF()
  {
    html2canvas(document.getElementById('content')).then(canvas=>{
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p','mm','a3');
      var width = pdf.internal.pageSize.getWidth();
      var height = 420;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save('loa.pdf'); 
    })
  }

}
