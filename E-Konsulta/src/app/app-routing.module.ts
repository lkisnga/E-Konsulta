import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminDoctorsComponent } from './components/admin-doctors/admin-doctors.component';
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
import { DoctorUserAnalyticsComponent } from './components/doctor-user-analytics/doctor-user-analytics.component';
import { DoctorTransactionHistoryComponent } from './components/doctor-transaction-history/doctor-transaction-history.component';
import { DoctorSetScheduleComponent } from './components/doctor-set-schedule/doctor-set-schedule.component';
import { PatientConsultationComponent } from './components/patient-consultation/patient-consultation.component';
import { PatientTransactionHistoryComponent } from './components/patient-transaction-history/patient-transaction-history.component';
import { PatientRecordsComponent } from './components/patient-records/patient-records.component';
import { LabPartnerResultComponent } from './components/lab-partner-result/lab-partner-result.component';
import { HealthInsuranceProfileComponent } from './components/health-insurance-profile/health-insurance-profile.component';
import { HealthInsuranceRequestsComponent } from './components/health-insurance-requests/health-insurance-requests.component';
import { HealthInsuranceLoaComponent } from './components/health-insurance-loa/health-insurance-loa.component';
import { DoctorPatientsChatComponent } from './components/doctor-patients-chat/doctor-patients-chat.component';
import { DoctorRegistrationComponent } from './components/doctor-registration/doctor-registration.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { HealthInsuranceRegistrationComponent } from './components/health-insurance-registration/health-insurance-registration.component';
import { LabPartnerRegistrationComponent } from './components/lab-partner-registration/lab-partner-registration.component';
import { PatientDoctorChatComponent } from './components/patient-doctor-chat/patient-doctor-chat.component';
import { LabPartnerReviewsComponent } from './components/lab-partner-reviews/lab-partner-reviews.component';
import { UserFeedbacksComponent } from './components/user-feedbacks/user-feedbacks.component';
import { DoctorReviewsComponent } from './components/doctor-reviews/doctor-reviews.component';
import { HealthInsuranceReviewsComponent } from './components/health-insurance-reviews/health-insurance-reviews.component';
import { ChooseUserFeedbackComponent } from './components/choose-user-feedback/choose-user-feedback.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { ListOfLabPartnersComponent } from './components/list-of-lab-partners/list-of-lab-partners.component';
import { ListOfHealthInsuranceComponent } from './components/list-of-health-insurance/list-of-health-insurance.component';
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
import { HealthInsuranceVerificationDoctorComponent } from './components/health-insurance-verification-doctor/health-insurance-verification-doctor.component';
import { HealthInsuranceVerificationPatientComponent } from './components/health-insurance-verification-patient/health-insurance-verification-patient.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent},
  { path: 'registration', component: RegistrationPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'admin-profile', component: AdminProfileComponent},
  { path: 'admin-doctors', component: AdminDoctorsComponent},
  { path: 'admin-patients', component: AdminPatientsComponent},
  { path: 'admin-health-insurance', component: AdminHealthInsuranceComponent},
  { path: 'admin-laboratory-partner', component: AdminLaboratoryPartnerComponent},
  { path: 'admin-user-analytics', component: AdminUserAnalyticsComponent},
  { path: 'admin-transaction-history', component: AdminTransactionHistoryComponent},
  { path: 'admin-feedbacks', component: AdminFeedbacksComponent},
  { path: 'admin-problems', component: AdminProblemsComponent},
  { path: 'register-as', component: RegisterAsComponent},
  { path: 'patient-profile', component: PatientProfileComponent},
  { path: 'doctor-profile', component: DoctorProfileComponent},
  { path: 'lab-partner-profile', component: LabPartnerProfileComponent},
  { path: 'doctor-patients', component: DoctorPatientsComponent},
  { path: 'doctor-user-analytics', component: DoctorUserAnalyticsComponent},
  { path: 'doctor-transaction-history', component: DoctorTransactionHistoryComponent},
  { path: 'doctor-set-schedule', component: DoctorSetScheduleComponent},
  { path: 'patient-consultation', component: PatientConsultationComponent},
  { path: 'patient-transaction-history', component: PatientTransactionHistoryComponent},
  { path: 'patient-records', component: PatientRecordsComponent},
  { path: 'lab-partner-result', component: LabPartnerResultComponent},
  { path: 'health-insurance-profile', component: HealthInsuranceProfileComponent},
  { path: 'health-insurance-requets', component: HealthInsuranceRequestsComponent},
  { path: 'health-insurance-loa', component: HealthInsuranceLoaComponent},
  { path: 'doctor-patient-chat', component: DoctorPatientsChatComponent},
  { path: 'doctor-registration', component: DoctorRegistrationComponent},
  { path: 'patient-registration', component: PatientRegistrationComponent},
  { path: 'health-insurance-registration', component: HealthInsuranceRegistrationComponent},
  { path: 'lab-partner-registration', component: LabPartnerRegistrationComponent},
  { path: 'patient-doctor-chat', component: PatientDoctorChatComponent},
  { path: 'lab-partner-reviews', component: LabPartnerReviewsComponent},
  { path: 'user-feedbacks', component: UserFeedbacksComponent},
  { path: 'doctor-reviews', component: DoctorReviewsComponent},
  { path: 'health-insurance-reviews', component: HealthInsuranceReviewsComponent},
  { path: 'choose-user-feedback', component: ChooseUserFeedbackComponent},
  { path: 'list-of-doctors', component: ListOfDoctorsComponent},
  { path: 'list-of-lab-partners', component: ListOfLabPartnersComponent},
  { path: 'list-of-health-insurance', component: ListOfHealthInsuranceComponent},
  { path: 'patient-to-doctor-feedback', component: PatientToDoctorFeedbackComponent},
  { path: 'patient-to-lab-partner-feedback', component: PatientToLabPartnerFeedbackComponent},
  { path: 'patient-to-health-insurance-feedback', component: PatientToHealthInsuranceFeedbackComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'user-complaints', component: UserComplaintsComponent},
  { path: 'patient-doctors-lists', component: PatientDoctorsListComponent},
  { path: 'patient-doctors-lists-view', component: PatientDoctorsListViewComponent},
  { path: 'video-call', component: VideoCallComponent},
  { path: 'patient-video-call', component: PatientVideoCallComponent },
  { path: 'patient-payment', component: PatientPaymentComponent},
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  { path: 'health-insurance-verification-doctor', component: HealthInsuranceVerificationDoctorComponent},
  { path: 'health-insurance-verification-patient', component: HealthInsuranceVerificationPatientComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

export const routingComponents = [
  LandingPageComponent,
  RegistrationPageComponent,
  LoginPageComponent,
  AdminProfileComponent,
  AdminDoctorsComponent,
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
  DoctorUserAnalyticsComponent,
  DoctorTransactionHistoryComponent,
  DoctorSetScheduleComponent,
  PatientConsultationComponent,
  PatientTransactionHistoryComponent,
  PatientRecordsComponent,
  LabPartnerResultComponent,
  HealthInsuranceProfileComponent,
  HealthInsuranceRequestsComponent,
  HealthInsuranceLoaComponent,
  DoctorPatientsChatComponent,
  DoctorRegistrationComponent,
  PatientRegistrationComponent,
  HealthInsuranceRegistrationComponent,
  LabPartnerRegistrationComponent,
  PatientDoctorChatComponent,
  LabPartnerReviewsComponent,
  UserFeedbacksComponent,
  DoctorReviewsComponent,
  HealthInsuranceReviewsComponent,
  ChooseUserFeedbackComponent,
  ListOfDoctorsComponent,
  ListOfLabPartnersComponent,
  ListOfHealthInsuranceComponent,
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
  TermsAndConditionsComponent,
  HealthInsuranceVerificationDoctorComponent,
  HealthInsuranceVerificationPatientComponent
];
