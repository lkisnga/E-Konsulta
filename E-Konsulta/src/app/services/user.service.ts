import { formatDate } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { firestore } from 'firebase/app';
import 'firebase/auth';
import { timestamp } from 'rxjs/operators';
import { PatientProfileComponent } from '../components/patient-profile/patient-profile.component';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  task : any;
  uploadProgress : any;
  constructor(public db: AngularFirestore, public afau: AngularFireAuth, public router: Router,public store: AngularFireStorage,
    public fireb : FirebaseApp) { }

  create_Specialization(a)
  {
    this.db.collection('specialization').add({
      name: a.name,
      description: a.description,
      created_at: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      updated_at: formatDate(new Date(), 'MM/dd/yyyy', 'en')
    }).then(function(){
      console.log("Added!");
    })
  }

  create_feedback_review(record)
  {
    return this.db.collection('reviews').add({
      from: record.email,
      content: record.content,
      feature: record.feature,
      type: "feedback",
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en')
    })
  }
  create_problem_review(record)
  {
   return this.store.ref('Reviews/' + record.filename).put(record.file)
    .then(()=>{
          this.store.storage.ref('Reviews/' + record.filename).getDownloadURL().then(e=>{
           return this.db.collection('reviews').add({
            content: record.content,
            createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
            role: "admin",
            type: "problem",
            image : e 
          })
        })
    })
  }

  check_email(e)
  {
    return this.db.firestore.collection('Users').where("email","==",e.email).get();
  }
  
  create_HealthInsurance(a)
  {
    this.db.collection('Health_Insurance').add({
      name: a.name,
      branchname: a.branchname,
      address: a.address
    }).then(function(){
      console.log("Added!");
    })
  }

  insurance_affiliation(record)
  {
    return this.db.firestore.collection('Insurance_Affiliation')
    .add(record);
  }
  get_insurance_affiliation(id)
  {
    return this.db.firestore.collection('Insurance_Affiliation').where('doctor_id','==',id).get();
  }
  check_affiliation(id,ins_id)
  {
    return this.db.firestore.collection('Insurance_Affiliation').where('doctor_id','==',id)
    .where('insurance_id','==',ins_id).get();
  }
  create_healthInsurance_feedback(ins_id,user_id,feedback,name)
  {
    return this.db.firestore.collection('Health_Insurance').doc(ins_id)
    .collection('reviews').add({
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      feedback : feedback,
      from: user_id,
      fullname: name
    })
  }
  create_patient_insuranceInfo(patient_id,record)
  {
    return this.db.firestore.collection('Users').doc(patient_id).collection('Insurance_Info')
    .add({
      Package: record.Package,
      health_insurance: record.health_insurance,
      limit: record.limit,
      spent: record.spent,
      updatedAt: record.updatedAt,
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en')
    })
  }
  update_patient_insuranceInfo(user_id,insInfo_id,record)
  {
    return this.db.firestore.collection('Users').doc(user_id).collection('Insurance_Info')
    .doc(insInfo_id).update(record);
  }


  userReply_exist(id,user_id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('reviews')
    .where('from','==',user_id).get();
  }
  create_labPartner_feedback(lab_id,user_id,feedback,name)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(lab_id)
    .collection('reviews').add({
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      feedback : feedback,
      from: user_id,
      fullname: name
    })
  }
  userReply_existLab(id,user_id)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('reviews')
    .where('from','==',user_id).get();
  }
  create_Doctor_feedback(doc_id,user_id,feedback,name)
  {
    return this.db.firestore.collection('Users').doc(doc_id)
    .collection('reviews').add({
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      feedback : feedback,
      from: user_id,
      fullname: name
    })
  }
  userReply_existDoc(id,user_id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('reviews')
    .where('from','==',user_id).get();
  }
  //not yet done
  lab_fileUpload(e,lab_id,pnt_id,filename)
  {
    //storing file into Storage
  
   this.store.ref('Lab-results/' + lab_id + '/patients/'+ pnt_id +'/'+filename).put(e).then(()=>{
    //updating Lab Results
        this.afau.onAuthStateChanged(user => {
          if(user)
          {
            this.store.storage.ref('Lab-results/' + lab_id + '/patients/'+ pnt_id +'/'+filename).getDownloadURL().then(e=>{
                this.db.collection('Laboratory_Results').doc(pnt_id).update({
                filename : filename,
                file : e,
                status : 'sent'
              }).then(()=>{
                console.log('Successfully Stored!');
              })
            })
          }
      })
    })
  }
  
  send_medicalRecord(patient_id,doc_id,filename,file)
  {
   return this.store.ref('Medical-Records/' + patient_id + '/Records/' + filename).put(file)
    .then(()=>{
      this.afau.onAuthStateChanged(user=>{
        if(user)
        {
          this.store.storage.ref('Medical-Records/' + patient_id + '/Records/' + filename).getDownloadURL()
          .then(e=>{
            this.db.collection('Medical_Records').add({
              filename : filename,
              file : e,
              doctor_id: doc_id,
              patient_id: patient_id,
              createdAt : formatDate(new Date(),'MM/dd/yyyy','en')
            })
          })
        }
      })
    })
  }
  //SCHEDULE
  create_schedule(doc_id,info)
  {
    return this.db.firestore.collection('Schedule').add({
      date: info.date,
      doctor_id: doc_id,
      status: "enable",
      priority: info.priority
    })
  }
  check_schedule(doc_id,date)
  {
    return this.db.firestore.collection('Schedule').where('doctor_id','==',doc_id).where('date','==',date)
    .get();
  }
  create_schedule_time(sched_id,info)
  {
    return this.db.firestore.collection('Schedule').doc(sched_id).collection('Time').add({
      time: info.start + '-' + info.end,
      limit: info.limit
    })
  }
  check_schedule_time(sched_id,info)
  {
    return this.db.firestore.collection('Schedule').doc(sched_id).collection('Time').
    where('time','==',info.start + '-' + info.end).get();
  }
  remove_schedule(id)
  {
    return this.db.firestore.collection('Schedule').doc(id).delete();
  }
  remove_schedule_time(sched_id,time_id)
  {
    return this.db.firestore.collection('Schedule').doc(sched_id).collection('Time').doc(time_id)
    .delete();
  }
  get_schedule(doc_id)
  {
    return this.db.firestore.collection('Schedule').where('doctor_id','==',doc_id)
    .orderBy('priority','asc').get();
  }
  get_schedule_time(sched_id)
  {
    return this.db.firestore.collection('Schedule').doc(sched_id).collection('Time').get();
  }
  get_scheduleInfo(sched_id)
  {
    return this.db.firestore.collection('Schedule').doc(sched_id).get();
  }
  get_timeInfo(sched_id,time_id)
  {
    return this.db.firestore.collection('Schedule').doc(sched_id).collection('Time').doc(time_id).get();
  }
  reservationChecker(sched_id,time_id,consultation_schedule)
  {
    return this.db.firestore.collection('Schedule').doc(sched_id).collection('Time').doc(time_id)
    .collection('Reservation').where('consultation_schedule','==',consultation_schedule).get();
  }
  patient_book_schedule(record)
  {
    return this.db.firestore.collection('Schedule').doc(record.schedule_id).collection('Time').doc(record.time_id)
    .collection('Reservation').add({
      patient_id : record.patient_id,
      consultation_schedule: record.consultation_schedule,
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en')
    })
  }
  //END OF SCHEDULE
  get_patient_medical(patient_id)
  {
    return this.db.firestore.collection('Medical_Records').where('patient_id','==',patient_id).get();
  }
  get_affiliation(insurance_id)
  {
    return this.db.firestore.collection('Insurance_Affiliation').where('insurance_id','==',insurance_id)
    .get();
  }
  verify_affiliation(id)
  {
    return this.db.firestore.collection('Insurance_Affiliation').doc(id).update({
      status: "verified",
      updatedAt: formatDate(new Date(),'MM/dd/yyyy','en')
    })
  }
  decline_affiliation(id)
  {
    return this.db.firestore.collection('Insurance_Affiliation').doc(id).delete();
  }
  send_prescriptionRecord(patient_id,doc_id,filename,file)
  {
   return this.store.ref('Prescription-Records/' + patient_id + '/Records/' + filename).put(file)
    .then(()=>{
      this.afau.onAuthStateChanged(user=>{
        if(user)
        {
          this.store.storage.ref('Prescription-Records/' + patient_id + '/Records/' + filename).getDownloadURL()
          .then(e=>{
            this.db.collection('Prescription').add({
              filename : filename,
              file : e,
              doctor_id: doc_id,
              patient_id: patient_id,
              createdAt : formatDate(new Date(),'MM/dd/yyyy','en')
            })
          })
        }
      })
    })
  }

  get_patient_prescription(patient_id)
  {
    return this.db.firestore.collection('Prescription').where('patient_id','==',patient_id).get();
  }

  lab_request(e,role,id)
  {
    console.log(role);
    this.db.collection('Laboratory_Results').add({
      email: e.email,
      filename: '',
      file:'',
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      status: 'pending',
      role: role,
      diagnostic_center: id
    }).then(()=>{
      console.log("Added!");
    })
  }


  lab_reply(id,feedback,name,review_id,sent_to)
  {
    return this.db.collection('Laboratory_Partner').doc(id).collection('reviews').doc(review_id)
    .collection('reply').add({
      createdAt: formatDate(new Date(),"MM/dd/yyyy","en"),
      feedback: feedback,
      from : id,
      name : name,
      sent_to : sent_to,
    })
  }
  
  get_labreply(id,review_id)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('reviews').doc(review_id)
    .collection('reply').get();
  }

  get_Lab_Reviews(id)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('reviews')
    .orderBy('createdAt','desc').get();
  }
  get_doctorReply(id,review_id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('reviews').doc(review_id)
    .collection('reply').get();
  }
  remove_doctorReply(id,review_id,reply_id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('reviews').doc(review_id)
    .collection('reply').doc(reply_id).delete();
  }
  remove_insuranceReply(id,review_id,reply_id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('reviews').doc(review_id)
    .collection('reply').doc(reply_id).delete();
  }
  remove_labReply(id,review_id,reply_id)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('reviews').doc(review_id)
    .collection('reply').doc(reply_id).delete();
  }
  get_Doctor_Reviews(id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('reviews')
    .orderBy('createdAt','desc').get();
  }

  get_Lab_Result()
  {
    return this.db.firestore.collection('Laboratory_Results').get();
  }
  get_Lab_Results_Patient(email)
  {
    return this.db.firestore.collection('Laboratory_Results').where('email','==',email).get();
  }

  get_patient()
  {
    return this.db.firestore.collection('Users').where("role", "==", "patient").get();
  }
  get_patientInfo(id)
  {
    return this.db.firestore.collection('Users').doc(id).get()
  }
  get_Speciaalization()
  {
    return this.db.firestore.collection('specialization').get();
  }
  get_specializationInfo(id)
  {
    return this.db.firestore.collection('specialization').doc(id).get();
  }
  get_labPartner()
  {
    return this.db.collection('Laboratory_Partner').get();
  }
  get_labInfo(id)
  {
    return this.db.collection('Laboratory_Partner').doc(id).get();
  }
  get_UserInfo(user_id: string)
  {
     return this.db.firestore.collection('Users').doc(user_id).get();
  }
  get_user()
  {
    return this.db.firestore.collection('Users').get();
  }
  get_admin()
  {
    return this.db.firestore.collection('Users').where('role','==','admin').get();
  }
  get_doctorList()
  {
    return this.db.firestore.collection('Users').where("role", "==", "doctor").get();
  }
  get_doctor_upcoming(doc_id)
  {
    return this.db.firestore.collection('upcoming').where('doctor_id','==',doc_id);
  }
  get_patient_upcoming(patient_id)
  {
    return this.db.firestore.collection('upcoming').where('patient_id','==',patient_id); 
  }
  update_upcoming(upcoming_id)
  {
    return this.db.firestore.collection('upcoming').doc(upcoming_id).update({
      status: "ongoing"
    })
  }
  cancel_consultation(info)
  {
   
  }

  get_upcoming(upcoming_id)
  {
    return this.db.firestore.collection('upcoming').doc(upcoming_id).get();
  }
  remove_upcoming(upcoming_id)
  {
    return this.db.firestore.collection('upcoming').doc(upcoming_id).delete();
  }
  removed_upcoming_trigger(patient_id)
  {
    return this.db.firestore.collection('upcoming').where('patient_id','==',patient_id);
  }
  create_consultation(record){
    return this.db.firestore.collection('Consultation').add(record);
  }
  get_consultation_admin()
  {
    return this.db.firestore.collection('Consultation').get();
  }
  get_consultation_today_admin()
  {
    return this.db.firestore.collection('Consultation').where('createdAt','==',formatDate(new Date(),'MM/dd/yyyy','en'))
    .get();
  }
  get_consultation(doctor_id)
  {
    return this.db.firestore.collection('Consultation').where('doctor_id','==',doctor_id).get();
  }
  get_transaction_admin()// admin side
  {
    return this.db.firestore.collection('Transaction').orderBy('id','desc').get();
  }
  update_transaction_admin(id,record)
  {
    return this.db.firestore.collection('Transaction').doc(id).update(record)
    .then(()=>{
      console.log(id + " Transaction Updated!");
    })
  }
  add_transactionHistory(record)
  {
    return this.db.firestore.collection('Transaction_History').add(record);
  }
  get_transactionHistory()
  {
    return this.db.firestore.collection('Transaction_History').orderBy('id','desc').get();
  }
  get_transaction_doctor(doctor_id)
  {
    return this.db.firestore.collection('Transaction').where('doctor_id','==',doctor_id)
    .where('status','==','sent').get();
  }
  get_today_consultation(doctor_id)
  {
    return this.db.firestore.collection('Consultation').where('doctor_id','==',doctor_id)
    .where('createdAt','==',formatDate(new Date(),'MM/dd/yyyy','en')).get();
  }
  get_patient_consultation(patient_id)
  {
    return this.db.firestore.collection('Consultation').where('patient_id','==',patient_id).get();
  }
  create_doctor_upcoming(data)
  {
    return this.db.firestore.collection('upcoming')
    .add(data)
  }
  check_upcoming(doc_id,pat_id)
  {
    return this.db.firestore.collection('upcoming').where('doctor_id','==',doc_id).where('patient_id','==',pat_id)
    .get();
  }

  doctor_reply(id,feedback,name,review_id,sent_to)
  {
    return this.db.collection('Users').doc(id).collection('reviews').doc(review_id)
    .collection('reply').add({
      createdAt: formatDate(new Date(),"MM/dd/yyyy","en"),
      feedback: feedback,
      from : id,
      fullname : name,
      sent_to : sent_to,
    })
  }
  get_HealthInsurance()
  {
    return this.db.firestore.collection('Health_Insurance').get();
  }
  get_HealthInsurance_Info(id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).get();
  }
  get_insurance_reply(id,review_id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('reviews').doc(review_id)
    .collection('reply').get();
  }
  get_insurance_verification(id)
  {
    return this.db.firestore.collection('Users').where('health_insurance','==',id).get();
  }

  Insurance_reply(id,feedback,name,review_id,sent_to)
  {
    return this.db.collection('Health_Insurance').doc(id).collection('reviews').doc(review_id)
    .collection('reply').add({
      createdAt: formatDate(new Date(),"MM/dd/yyyy","en"),
      feedback: feedback,
      from : id,
      name : name,
      sent_to : sent_to,
    })
  }
  get_Insurance_LOA(id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('Insurance_LOA_Request').get();
  }
  update_LOA_Request(id,loa_id,status)
  {
    if(status=='sent')
    {
      return this.db.firestore.collection('Health_Insurance').doc(id).collection('Insurance_LOA_Request').doc(loa_id)
      .update({
        status: status,
        createdAt: formatDate(new Date(),"MM/dd/yyyy",'en')
      })
    }
    if(status=='declined')
    {
      return this.db.firestore.collection('Health_Insurance').doc(id).collection('Insurance_LOA_Request').doc(loa_id)
      .delete();
    }
  }
  verify_userInsurance(id,stats)
  {
    return this.db.firestore.collection('Users').doc(id).update({
      isVerified: stats
    })
  }

  get_patient_insuranceInfo(id,ins_id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Insurance_Info')
    .where('health_insurance','==',ins_id).get();
  }

  get_patient_insurance(id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Insurance_Info')
    .get();
  }


  get_LOA_sent(ins_id)
  {
    return this.db.firestore.collection('Insurance_LOA').where('insurance_id','==',ins_id).get();
  }
  get_patient_LOA(patient_id)
  {
    return this.db.firestore.collection('Insurance_LOA').where('patient_id','==',patient_id).get();
  }
  check_LOA(ins_id,pat_id,nowDate)
  {
    return this.db.firestore.collection('Health_Insurance').doc(ins_id).collection('Insurance_LOA_Request')
    .where('patient_id','==',pat_id).where('createdAt','==',nowDate).get();
  }
  request_LOA(ins_id,pat_id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(ins_id).collection('Insurance_LOA_Request')
    .add({
      patient_id: pat_id,
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      status: 'pending'
    })
  }
  create_Insurance_LOA(insurance_id,patient_id,data) //send file and save file
  {
   return this.store.ref('Insurance-LOA/' + insurance_id + '/patients/' + patient_id + '/' + data.filename).put(data.file)
    .then(()=>{
       this.store.storage.ref('Insurance-LOA/' + insurance_id + '/patients/' + patient_id + '/' + data.filename).getDownloadURL().then(e =>{
            this.db.collection('Insurance_LOA').doc(insurance_id).set({
              filename: data.filename,
              file : e,
              patient_id : patient_id,
              insurance_id: insurance_id,
              createdAt: formatDate(new Date(),'MM/dd/yyyy','en')
            })
          })
      }).catch(error => {
        console.log(error.message);
      })
  }
  get_health_review(id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('reviews')
    .orderBy('createdAt','desc').get();
  }
  get_review_feedback()
  {
    return this.db.firestore.collection('reviews').where('type','==',"feedback").get();
  }
  get_review_problem()
  {
    return this.db.firestore.collection('reviews').where('type','==','problem').get()
  }
  //Delete User
  delete_user(id)
  {
   return this.db.collection('Users').doc(id).delete().then(()=>{
      this.router.navigate(['/login']);
      localStorage.removeItem('Users');
      console.log('Firestore deleted')
    })
  }
  delete_lab(id)
  {
    this.db.collection('Users').doc(id).delete().then(()=>{
      console.log('Laboratory from Users Collections: Deleted!');
     this.db.collection("Laboratory_Partner").doc(id).delete().then(()=>{
        console.log('Laboratory from Laboratory_Partner Collections: Deleted!');
        localStorage.removeItem('Users');
        this.router.navigate(['/login']);
      })
    });
  }
  delete_Insurance(id)
  {
    this.db.collection('Users').doc(id).delete().then(()=>{
      console.log('Insurance from Users Collections: Deleted!');
     this.db.collection("Health_Insurance").doc(id).delete().then(()=>{
        console.log('Insurance from Health_Insurance Collections: Deleted!');
        localStorage.removeItem('Users');
        this.router.navigate(['/login']);
      })
    });
  }
  delete_specialization(id)
  {
    this.db.collection('specialization').doc(id).delete().then(function(){
      console.log("Deleted successfully!");
    })
  }
  update_user(user_id,record)
  {
    const user = this.fireb.auth().currentUser;
    const newPassword = record.password;
   return user.updatePassword(newPassword).then(()=>{
      console.log("Password Changed!");
      this.db.collection('Users').doc(user_id).update(record);
    }).catch((error)=>{
      console.log(error);
    })
  }
  update_doctor_fee(user_id,fee)
  {
    return this.db.firestore.collection('Users').doc(user_id).update(fee);
  }
  update_patient_insurance(user_id,record)
  {
    return this.db.collection('Users').doc(user_id).update(record)
    .then(()=>{
      this.db.collection('Users').doc(user_id).collection('Insurance_Info').get()
      .forEach(e=>{
        if(!e.empty)
        {
          e.forEach(item=>{
            this.db.firestore.collection('Users').doc(user_id).collection('Insurance_Info').doc(item.id)
            .delete()
            .then(()=>{
              console.log('Insurance Info Deleted!');
            })
          })
        }
      })
    })
  }
  pay_insurance(id,record)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Insurance_Info').doc(record.id)
    .update(record);
  }
  send_labLOA(lab_id,patient_id,record)
  {
   return this.store.ref('Lab-LOA/' + lab_id + '/' + 'patients/' + patient_id + '/' + record.filename).put(record.file)
    .then(()=>{
    return  this.store.storage.ref('Lab-LOA/' + lab_id + '/' + 'patients/' + patient_id + '/' + record.filename).getDownloadURL()
      .then(e=>{
     return   this.db.firestore.collection('Lab-LOA').add({
          patient_id: patient_id,
          lab_id: lab_id,
          file: e,
          filename: record.filename,
          status: 'pending',
          createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
        })
      })
    })
  }
  get_labLOA(lab_id)
  {
    return this.db.firestore.collection('Lab-LOA').where('lab_id','==',lab_id).where('status','==','pending')
    .get();
  }
  send_labInsurance_LOA(record)
  {
   return this.store.ref('Insurance-LOA/' + record.insurance_id + '/Laboratory' + '/' + record.lab_id + '/' + record.filename)
    .put(record.file)
    .then(()=>{
     return this.store.storage.ref('Insurance-LOA/' + record.insurance_id + '/Laboratory' + '/' + record.lab_id + '/' + record.filename)
      .getDownloadURL().then(e=>{
      return this.db.firestore.collection('LOA_Received').add({
          file: e,
          filename: record.filename,
          lab_id: record.lab_id,
          insurance_id: record.insurance_id,
          createdAt: formatDate(new Date(),'MM/dd/yyyy','en')
        })
      })
    })
  }
  update_labLOA(id)
  {
    return this.db.firestore.collection('Lab-LOA').doc(id).update({
      status: 'sent'
    })
  }
  //Update Current User Health Insurance Info
  update_userInsurance(id,record)
  {
    const user = this.fireb.auth().currentUser;
    const newPassword = record.password;
    return user.updatePassword(newPassword).then(()=>{
      console.log("Password Changed!");
      this.db.collection('Health_Insurance').doc(id).update(record);
    }).catch((error)=>{
      console.log(error);
    })
  }

  update_doctorInfo(user_id,record)
  {
    return this.db.collection('Users').doc(user_id).update(record);
  }
  update_patientInfo(id,record)
  {
    return this.db.collection('Users').doc(id).update(record);
  }
  // Admin Update User Insurance
  update_insurance(id,record)
  {
    return this.db.collection('Health_Insurance').doc(id).update(record);
  }

  update_labInfo(id,record)
  {
    const user = this.fireb.auth().currentUser;
    const newPassword = record.password;
    return user.updatePassword(newPassword).then(()=>{
      console.log("Password Changed!");
      this.db.collection("Laboratory_Partner").doc(id).update(record);
      this.db.collection("Users").doc(id).update(record);
    }).catch((error)=>{
      console.log(error);
    })
  }
  //for admin side admin-lab
  update_lab(id,record)
  {
    return this.db.collection('Laboratory_Partner').doc(id).update(record);
  }
  update_Specialization(id,record)
  {
    this.db.collection('specialization').doc(id).update(record);
    console.log("updated!");
  }

  get_avatar(user_id)
  {
    return this.db.firestore.collection('avatar').doc(user_id).get();
  }

  upload_avatar(a, user_id)
  {
    //Uploading image into fireStorage
   return this.store.ref('Users/' + user_id + '/profile.jpg').put(a).then(res =>{
      console.log('successfully uploaded!');
      //getting image URL and pass it into fireStore avatar
     return this.store.storage.ref('Users/' + user_id + '/profile.jpg').getDownloadURL().then(e =>{
           this.db.collection('avatar').doc(user_id).set({
            image : e
          })
        })
    }).catch(error => {
      console.log(error.message);
    })
  }

  create_transaction(record)
  {
    return this.db.firestore.collection('Transaction').add(record);
  }
  create_transactionHistory_User(id,record)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Transaction_History')
    .add(record);
  }
  delete_transaction(id)
  {
    return this.db.firestore.collection('Transaction').doc(id).delete();
  }
  get_patient_transaction(patient_id)
  {
    return this.db.firestore.collection('Users').doc(patient_id).collection('Transaction_History')
    .get();
  }
  get_transactionInfo(patient_id,transaction_id)
  {
   return this.db.firestore.collection('Users').doc(patient_id).collection('Transaction').doc(transaction_id)
    .get();
  }
  create_sharedFile(record)
  {
    return this.db.firestore.collection('Shared_Files').add(record);
  }
  get_sharedFile(doctor_id,patient_id)
  {
    return this.db.firestore.collection('Shared_Files').where('doctor_id','==',doctor_id)
    .where('patient_id','==',patient_id);
  }
  get_medical_shared(id)
  {
    return this.db.firestore.collection('Medical_Records').doc(id).get();
  }
  get_shareFiles()
  {
    return this.db.firestore.collection('Shared_Files').get();
  }
  get_lab_shared(id)
  {
    return this.db.firestore.collection('Laboratory_Results').doc(id).get();
  }
  get_prescription_shared(id)
  {
    return this.db.firestore.collection('Prescription').doc(id).get();
  }
  remove_share(doctor_id,patient_id)
  {
    return this.db.firestore.collection('Shared_Files').where('doctor_id','==',doctor_id)
    .where('patient_id','==',patient_id).get().then(e=>{
      e.forEach(item=>{
        this.db.collection('Shared_Files').doc(item.id).delete();
      })
    }).then(()=>{
      console.log('Deleted Shared Files!');
    })
  }

  get_loa_receieved(id)
  {
    return this.db.firestore.collection('LOA_Received').where('insurance_id','==',id)
    .get();
  }
}