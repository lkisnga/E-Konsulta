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
  { path: 'admin-problems', component: AdminProblemsComponent}
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
  AdminProblemsComponent
];
