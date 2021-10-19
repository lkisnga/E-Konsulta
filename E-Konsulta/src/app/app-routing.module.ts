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
import { LabPartnerResultComponent } from './components/lab-partner-result/lab-partner-result.component';
import { HealthInsuranceProfileComponent } from './components/health-insurance-profile/health-insurance-profile.component';
import { HealthInsuranceRequestsComponent } from './components/health-insurance-requests/health-insurance-requests.component';
import { HealthInsuranceLoaComponent } from './components/health-insurance-loa/health-insurance-loa.component';
import { HealthInsuranceVerificationComponent } from './components/health-insurance-verification/health-insurance-verification.component';
import { HealthInsuranceFeedbacksComponent } from './components/health-insurance-feedbacks/health-insurance-feedbacks.component';
import { HealthInsuranceProblemsComponent } from './components/health-insurance-problems/health-insurance-problems.component';
import { DoctorPatientsChatComponent } from './components/doctor-patients-chat/doctor-patients-chat.component';
import { DoctorRegistrationComponent } from './components/doctor-registration/doctor-registration.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { HealthInsuranceRegistrationComponent } from './components/health-insurance-registration/health-insurance-registration.component';
import { LabPartnerRegistrationComponent } from './components/lab-partner-registration/lab-partner-registration.component';
import { PatientDoctorChatComponent } from './components/patient-doctor-chat/patient-doctor-chat.component';
import { LabPartnerReviewsComponent } from './components/lab-partner-reviews/lab-partner-reviews.component';


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
  { path: 'doctor-payments', component: DoctorPaymentsComponent},
  { path: 'doctor-user-analytics', component: DoctorUserAnalyticsComponent},
  { path: 'doctor-transaction-history', component: DoctorTransactionHistoryComponent},
  { path: 'doctor-feedbacks', component: DoctorFeedbacksComponent},
  { path: 'doctor-problems', component: DoctorProblemsComponent},
  { path: 'doctor-set-schedule', component: DoctorSetScheduleComponent},
  { path: 'doctor-reservations', component: DoctorReservationsComponent},
  { path: 'patient-consultation', component: PatientConsultationComponent},
  { path: 'patient-transaction-history', component: PatientTransactionHistoryComponent},
  { path: 'patient-records', component: PatientRecordsComponent},
  { path: 'lab-partner-result', component: LabPartnerResultComponent},
  { path: 'health-insurance-profile', component: HealthInsuranceProfileComponent},
  { path: 'health-insurance-requets', component: HealthInsuranceRequestsComponent},
  { path: 'health-insurance-loa', component: HealthInsuranceLoaComponent},
  { path: 'health-insurance-verification', component: HealthInsuranceVerificationComponent},
  { path: 'health-insurance-feedbacks', component: HealthInsuranceFeedbacksComponent},
  { path: 'health-insurance-problems', component: HealthInsuranceProblemsComponent},
  { path: 'doctor-patient-chat', component: DoctorPatientsChatComponent},
  { path: 'doctor-registration', component: DoctorRegistrationComponent},
  { path: 'patient-registration', component: PatientRegistrationComponent},
  { path: 'health-insurance-registration', component: HealthInsuranceRegistrationComponent},
  { path: 'lab-partner-registration', component: LabPartnerRegistrationComponent},
  { path: 'patient-doctor-chat', component: PatientDoctorChatComponent},
  { path: 'lab-partner-reviews', component: LabPartnerReviewsComponent}
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
  LabPartnerResultComponent,
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
  PatientDoctorChatComponent,
  LabPartnerReviewsComponent
];
