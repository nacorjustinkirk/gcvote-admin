import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainComponent } from './main/main.component';
import { AddVoterComponent } from './dialogs/add-voter/add-voter.component';
import { VoterDetailsComponent } from './dialogs/voter-details/voter-details.component';
import { VotersComponent } from './main/components/voters/voters.component';
import { ResultsComponent } from './main/components/results/results.component';
import { AddEnvironmentComponent } from './dialogs/add-environment/add-environment.component';
import { EnvironmentDetailsComponent } from './dialogs/environment-details/environment-details.component';
import { EnvironmentsComponent } from './main/environments/environments.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { AccountSettingsComponent } from './dialogs/account-settings/account-settings.component';
import { LoginComponent } from './login/login.component';

import { MaterialModules } from './material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddVoterComponent,
    VoterDetailsComponent,
    VotersComponent,
    ResultsComponent,
    AddEnvironmentComponent,
    EnvironmentDetailsComponent,
    EnvironmentsComponent,
    DashboardComponent,
    AccountSettingsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
