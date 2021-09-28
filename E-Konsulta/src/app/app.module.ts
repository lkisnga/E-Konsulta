import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore'; 
import { environment } from 'src/environments/environment';


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
    AdminProblemsComponent
  ],
  imports: [
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
