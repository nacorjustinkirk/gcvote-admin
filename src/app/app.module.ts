import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainComponent } from './main/main.component';
import { AddCandidateComponent } from './dialogs/add-candidate/add-candidate.component';
import { AddPositionComponent } from './dialogs/add-position/add-position.component';
import { EditPositionComponent } from './dialogs/edit-position/edit-position.component';
import { AddVoterComponent } from './dialogs/add-voter/add-voter.component';
import { VoterDetailsComponent } from './dialogs/voter-details/voter-details.component';
import { VotersComponent } from './main/voters/voters.component';
import { ResultsComponent } from './main/results/results.component';
import { AddEnvironmentComponent } from './dialogs/add-environment/add-environment.component';
import { EnvironmentDetailsComponent } from './dialogs/environment-details/environment-details.component';
import { EnvironmentsComponent } from './main/environments/environments.component';
import { CandidatesComponent } from './main/candidates/candidates.component';
import { CandidateDetailsComponent } from './dialogs/candidate-details/candidate-details.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { MaterialModules } from './material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddVoterComponent,
    AddCandidateComponent,
    AddPositionComponent,
    EditPositionComponent,
    VoterDetailsComponent,
    VotersComponent,
    ResultsComponent,
    AddEnvironmentComponent,
    EnvironmentDetailsComponent,
    EnvironmentsComponent,
    CandidatesComponent,
    CandidateDetailsComponent,
    DashboardComponent,
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
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
