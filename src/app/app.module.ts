import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainComponent } from './main/main.component';
import { AddCandidateComponent } from './dialogs/add-candidate/add-candidate.component';
import { AddPositionComponent } from './dialogs/add-position/add-position.component';
import { ResultsComponent } from './main/results/results.component';
import { AddEnvironmentComponent } from './dialogs/add-environment/add-environment.component';
import { EnvironmentsComponent } from './main/environments/environments.component';
import { CandidatesComponent } from './main/candidates/candidates.component';
import { LoginComponent } from './login/login.component';

import { MaterialModules } from './material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';
import { DeleteEnvironmentComponent } from './dialogs/delete-environment/delete-environment.component';
import { NewsComponent } from './main/news/news.component';
import { VotesComponent } from './main/votes/votes.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddCandidateComponent,
    AddPositionComponent,
    ResultsComponent,
    AddEnvironmentComponent,
    EnvironmentsComponent,
    CandidatesComponent,
    LoginComponent,
    DeleteEnvironmentComponent,
    NewsComponent,
    VotesComponent,
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
  providers: [AuthGuardService, {
    provide: LocationStrategy, useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
