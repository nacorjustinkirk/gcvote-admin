import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ResultsComponent } from './main/results/results.component';
import { EnvironmentsComponent } from './main/environments/environments.component';
import { CandidatesComponent } from './main/candidates/candidates.component';
import { VotesComponent } from './main/votes/votes.component';
import { NewsComponent } from './main/news/news.component';
import { AuthGuard } from './guard/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate:[AuthGuard], children: [
    { path: 'results/:id', component: ResultsComponent, canActivate:[AuthGuard]},
    { path: 'news', component: NewsComponent, canActivate:[AuthGuard]},
    { path: 'environments/:id', component: EnvironmentsComponent, canActivate:[AuthGuard]},
  ] },
  { path: 'candidates/:id', component: CandidatesComponent, canActivate:[AuthGuard]},
  { path: 'votes/:id', component: VotesComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
