import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ResultsComponent } from './main/components/results/results.component';
import { VotersComponent } from './main/components/voters/voters.component';
import { EnvironmentsComponent } from './main/environments/environments.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, children: [
    { path: 'results', component: ResultsComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'voters', component: VotersComponent},
    { path: 'environments', component: EnvironmentsComponent},
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
