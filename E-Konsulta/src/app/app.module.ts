import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import { DoctorSetScheduleComponent } from './components/doctor-set-schedule/doctor-set-schedule.component';
import { PatientConsultationComponent } from './components/patient-consultation/patient-consultation.component';
import { PatientTransactionHistoryComponent } from './components/patient-transaction-history/patient-transaction-history.component';
import { PatientRecordsComponent } from './components/patient-records/patient-records.component';
import { PatientSidenavComponent } from './components/patient-sidenav/patient-sidenav.component';
import { DoctorSidenavComponent } from './components/doctor-sidenav/doctor-sidenav.component';
import { LabPartnerSidenavComponent } from './components/lab-partner-sidenav/lab-partner-sidenav.component';
import { LabPartnerResultComponent } from './components/lab-partner-result/lab-partner-result.component';
import { HealthInsuranceSidenavComponent } from './components/health-insurance-sidenav/health-insurance-sidenav.component';
import { HealthInsuranceProfileComponent } from './components/health-insurance-profile/health-insurance-profile.component';
import { HealthInsuranceRequestsComponent } from './components/health-insurance-requests/health-insurance-requests.component';
import { HealthInsuranceLoaComponent } from './components/health-insurance-loa/health-insurance-loa.component';
import { HealthInsuranceVerificationComponent } from './components/health-insurance-verification/health-insurance-verification.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { DoctorPatientsChatComponent } from './components/doctor-patients-chat/doctor-patients-chat.component';
import { DoctorRegistrationComponent } from './components/doctor-registration/doctor-registration.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { HealthInsuranceRegistrationComponent } from './components/health-insurance-registration/health-insurance-registration.component';
import { LabPartnerRegistrationComponent } from './components/lab-partner-registration/lab-partner-registration.component';
import { PatientDoctorChatComponent } from './components/patient-doctor-chat/patient-doctor-chat.component';
import { LabPartnerReviewsComponent } from './components/lab-partner-reviews/lab-partner-reviews.component';
import { HeaderDoctorComponent } from './components/header-doctor/header-doctor.component';
import { HeaderPatientComponent } from './components/header-patient/header-patient.component';
import { HeaderLabComponent } from './components/header-lab/header-lab.component';
import { HeaderInsuranceComponent } from './components/header-insurance/header-insurance.component';
import { UserFeedbacksComponent } from './components/user-feedbacks/user-feedbacks.component';
import { DoctorReviewsComponent } from './components/doctor-reviews/doctor-reviews.component';
import { HealthInsuranceReviewsComponent } from './components/health-insurance-reviews/health-insurance-reviews.component';
import { ChooseUserFeedbackComponent } from './components/choose-user-feedback/choose-user-feedback.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { ListOfLabPartnersComponent } from './components/list-of-lab-partners/list-of-lab-partners.component';
import { ListOfHealthInsuranceComponent } from './components/list-of-health-insurance/list-of-health-insurance.component';
import { DoctorFeedbackComponent } from './components/doctor-feedback/doctor-feedback.component';
import { HealthInsuranceFeedbackComponent } from './components/health-insurance-feedback/health-insurance-feedback.component';
import { LabPartnerFeedbackComponent } from './components/lab-partner-feedback/lab-partner-feedback.component';
import { PatientToDoctorFeedbackComponent } from './components/patient-to-doctor-feedback/patient-to-doctor-feedback.component';
import { PatientToLabPartnerFeedbackComponent } from './components/patient-to-lab-partner-feedback/patient-to-lab-partner-feedback.component';
import { PatientToHealthInsuranceFeedbackComponent } from './components/patient-to-health-insurance-feedback/patient-to-health-insurance-feedback.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserComplaintsComponent } from './components/user-complaints/user-complaints.component';
import { PatientDoctorsListComponent } from './components/patient-doctors-list/patient-doctors-list.component';
import { PatientDoctorsListViewComponent } from './components/patient-doctors-list-view/patient-doctors-list-view.component';
import { VideoCallComponent } from './components/video-call/video-call.component';
import { PatientVideoCallComponent } from './components/patient-video-call/patient-video-call.component';
import { PatientPaymentComponent } from './components/patient-payment/patient-payment.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';


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
    DoctorSetScheduleComponent,
    PatientConsultationComponent,
    PatientTransactionHistoryComponent,
    PatientRecordsComponent,
    PatientSidenavComponent,
    DoctorSidenavComponent,
    LabPartnerSidenavComponent,
    LabPartnerResultComponent,
    HealthInsuranceSidenavComponent,
    HealthInsuranceProfileComponent,
    HealthInsuranceRequestsComponent,
    HealthInsuranceLoaComponent,
    HealthInsuranceVerificationComponent,
    DoctorPatientsChatComponent,
    DoctorRegistrationComponent,
    PatientRegistrationComponent,
    HealthInsuranceRegistrationComponent,
    LabPartnerRegistrationComponent,
    PatientDoctorChatComponent,
    LabPartnerReviewsComponent,
    HeaderDoctorComponent,
    HeaderPatientComponent,
    HeaderLabComponent,
    HeaderInsuranceComponent,
    UserFeedbacksComponent,
    DoctorReviewsComponent,
    HealthInsuranceReviewsComponent,
    ChooseUserFeedbackComponent,
    ListOfDoctorsComponent,
    ListOfLabPartnersComponent,
    ListOfHealthInsuranceComponent,
    DoctorFeedbackComponent,
    HealthInsuranceFeedbackComponent,
    LabPartnerFeedbackComponent,
    PatientToDoctorFeedbackComponent,
    PatientToLabPartnerFeedbackComponent,
    PatientToHealthInsuranceFeedbackComponent,
    ForgotPasswordComponent,
    UserComplaintsComponent,
    PatientDoctorsListComponent,
    PatientDoctorsListViewComponent,
    VideoCallComponent,
    PatientVideoCallComponent,
    PatientPaymentComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserModule,
    AngularFireStorageModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
