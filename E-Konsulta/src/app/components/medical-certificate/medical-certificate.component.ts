import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-medical-certificate',
  templateUrl: './medical-certificate.component.html',
  styleUrls: ['./medical-certificate.component.css']
})
export class MedicalCertificateComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  patientInfo: any = [];
  doctorInfo: any = [];
  user_id: string = "";
  datetoday: string = "";
  monthDay: string = "";
  constructor(
    public afu: AuthService,
    public userservice: UserService
  ) { }

  ngOnInit(): void {
    
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
     
    this.user_id = this.afu.get_UID();
    this.patientInfo = JSON.parse(localStorage.getItem('mc'));
    this.get_doctorInfo();
    this.datetoday = formatDate(new Date(),'long','en');

    const d = new Date();
    let name = month[d.getMonth()];
    this.monthDay = name + ' ' + new Date().getDate();

    if(localStorage.getItem('mc')!=null)
    {
      setTimeout(() => {
        this.downloadPDF();
        localStorage.removeItem('mc');
      }, 1800);
    }
  }

  get_doctorInfo()
  {
    var data;
    this.userservice.get_UserInfo(this.user_id)
    .then(e=>{
      this.userservice.get_specializationInfo(e.data().specialization)
      .then(res=>{
        data = e.data();
        data.spc_name = res.data().name;
        this.doctorInfo = data;
        console.log(this.doctorInfo)
      })
    })
  }
  public downloadPDF()
  {
    html2canvas(document.body).then(canvas=>{
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('l','mm','a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save('medicalCertificate.pdf'); 
    })
  }
}
