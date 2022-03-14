import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JoinPageComponent } from './main-pages/join-page/join-page.component';
import { LogInPageComponent } from './main-pages/log-in-page/log-in-page.component';
import { DiscoverPageComponent } from './main-pages/discover-page/discover-page.component';
import { LandingPageComponent } from './main-pages/landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './sidebar-components/home/home.component';
import { StatsComponent } from './sidebar-components/stats/stats.component';
import { ContactComponent } from './sidebar-components/contact/contact.component';
import { CalculatorComponent } from './sidebar-components/calculator/calculator.component';

const routes: Routes = [
  { path: "", redirectTo: "landing", pathMatch: "full"},
  { path: "landing", component: LandingPageComponent },
  { path: "join", component: JoinPageComponent },
  { path: "login", component: LogInPageComponent },
  { path: "discover", component: DiscoverPageComponent },
  { path: "dashboard", component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const basicRoutingComponents = [
  LandingPageComponent,
  JoinPageComponent,
  LogInPageComponent,
  DiscoverPageComponent,
  DashboardComponent,
  HomeComponent,
  StatsComponent,
  ContactComponent,
  CalculatorComponent,
];
