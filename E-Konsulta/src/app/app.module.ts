import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';


import { AppComponent } from './app.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminDoctorsComponent } from './components/admin-doctors/admin-doctors.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { AdminPatientsComponent } from './components/admin-patients/admin-patients.component';
import { AdminHealthInsuranceComponent } from './components/admin-health-insurance/admin-health-insurance.component';
import { AdminLaboratoryPartnerComponent } from './components/admin-laboratory-partner/admin-laboratory-partner.component';
import { AdminUserAnalyticsComponent } from './components/admin-user-analytics/admin-user-analytics.component';
import { AdminTransactionHistoryComponent } from './components/admin-transaction-history/admin-transaction-history.component';
import { AdminFeedbacksComponent } from './components/admin-feedbacks/admin-feedbacks.component';
import { AdminProblemsComponent } from './components/admin-problems/admin-problems.component';
import { RegisterAsComponent } from './components/register-as/register-as.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { LabPartnerProfileComponent } from './components/lab-partner-profile/lab-partner-profile.component';
import { DoctorPatientsComponent } from './components/doctor-patients/doctor-patients.component';
import { DoctorPaymentsComponent } from './components/doctor-payments/doctor-payments.component';
import { DoctorUserAnalyticsComponent } from './components/doctor-user-analytics/doctor-user-analytics.component';
import { DoctorTransactionHistoryComponent } from './components/doctor-transaction-history/doctor-transaction-history.component';
import { DoctorFeedbacksComponent } from './components/doctor-feedbacks/doctor-feedbacks.component';
import { DoctorProblemsComponent } from './components/doctor-problems/doctor-problems.component';
import { DoctorSetScheduleComponent } from './components/doctor-set-schedule/doctor-set-schedule.component';
import { DoctorReservationsComponent } from './components/doctor-reservations/doctor-reservations.component';
import { PatientConsultationComponent } from './components/patient-consultation/patient-consultation.component';
import { PatientTransactionHistoryComponent } from './components/patient-transaction-history/patient-transaction-history.component';
import { PatientRecordsComponent } from './components/patient-records/patient-records.component';
import { PatientSidenavComponent } from './components/patient-sidenav/patient-sidenav.component';
import { DoctorSidenavComponent } from './components/doctor-sidenav/doctor-sidenav.component';
import { LabPartnerSidenavComponent } from './components/lab-partner-sidenav/lab-partner-sidenav.component';
import { LabPartnerResultComponent } from './components/lab-partner-result/lab-partner-result.component';
import { LabPartnerFeedbacksComponent } from './components/lab-partner-feedbacks/lab-partner-feedbacks.component';
import { LabPartnerProblemsComponent } from './components/lab-partner-problems/lab-partner-problems.component';
import { HealthInsuranceSidenavComponent } from './components/health-insurance-sidenav/health-insurance-sidenav.component';
import { HealthInsuranceProfileComponent } from './components/health-insurance-profile/health-insurance-profile.component';
import { HealthInsuranceRequestsComponent } from './components/health-insurance-requests/health-insurance-requests.component';
import { HealthInsuranceLoaComponent } from './components/health-insurance-loa/health-insurance-loa.component';
import { HealthInsuranceVerificationComponent } from './components/health-insurance-verification/health-insurance-verification.component';
import { HealthInsuranceFeedbacksComponent } from './components/health-insurance-feedbacks/health-insurance-feedbacks.component';
import { HealthInsuranceProblemsComponent } from './components/health-insurance-problems/health-insurance-problems.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { DoctorPatientsChatComponent } from './components/doctor-patients-chat/doctor-patients-chat.component';
import { DoctorRegistrationComponent } from './components/doctor-registration/doctor-registration.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { HealthInsuranceRegistrationComponent } from './components/health-insurance-registration/health-insurance-registration.component';
import { LabPartnerRegistrationComponent } from './components/lab-partner-registration/lab-partner-registration.component';
import { PatientDoctorChatComponent } from './components/patient-doctor-chat/patient-doctor-chat.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminProfileComponent,
    HeaderUserComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    AdminDoctorsComponent,
    AdminSidenavComponent,
    AdminPatientsComponent,
    AdminHealthInsuranceComponent,
    AdminLaboratoryPartnerComponent,
    AdminUserAnalyticsComponent,
    AdminTransactionHistoryComponent,
    AdminFeedbacksComponent,
    AdminProblemsComponent,
    RegisterAsComponent,
    PatientProfileComponent,
    DoctorProfileComponent,
    LabPartnerProfileComponent,
    DoctorPatientsComponent,
    DoctorPaymentsComponent,
    DoctorUserAnalyticsComponent,
    DoctorTransactionHistoryComponent,
    DoctorFeedbacksComponent,
    DoctorProblemsComponent,
    DoctorSetScheduleComponent,
    DoctorReservationsComponent,
    PatientConsultationComponent,
    PatientTransactionHistoryComponent,
    PatientRecordsComponent,
    PatientSidenavComponent,
    DoctorSidenavComponent,
    LabPartnerSidenavComponent,
    LabPartnerResultComponent,
    LabPartnerFeedbacksComponent,
    LabPartnerProblemsComponent,
    HealthInsuranceSidenavComponent,
    HealthInsuranceProfileComponent,
    HealthInsuranceRequestsComponent,
    HealthInsuranceLoaComponent,
    HealthInsuranceVerificationComponent,
    HealthInsuranceFeedbacksComponent,
    HealthInsuranceProblemsComponent,
    DoctorPatientsChatComponent,
    DoctorRegistrationComponent,
    PatientRegistrationComponent,
    HealthInsuranceRegistrationComponent,
    LabPartnerRegistrationComponent,
    PatientDoctorChatComponent
  ],
  imports: [
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserModule,
    AngularFireStorageModule,
    AppRoutingModule
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
