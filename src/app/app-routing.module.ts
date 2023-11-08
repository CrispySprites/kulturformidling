import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RoleRequestComponent } from './role-request/role-request.component';
import { loginGuard } from './guards/login.guard';
import { AcceptRoleRequestComponent } from './accept-role-request/accept-role-request.component';
import { adminGuard } from './guards/admin.guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "Heim",
    pathMatch: "full"
  },
  {
    path: "Heim",
    component: HomeComponent
  },
  {
    path: "Historik",
    component: HistoryComponent
  },
  {
    path: "Om-oss",
    component: AboutComponent
  },
  {
    path: "Logg-inn",
    component: LoginComponent
  },
  {
    path: "Registrer",
    component: RegisterComponent
  },
  {
    path: "Rolle-søknad",
    canMatch: [loginGuard],
    component: RoleRequestComponent
  },
  {
    path: "Rolle-Søknadar",
    canMatch: [adminGuard],
    component: AcceptRoleRequestComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
