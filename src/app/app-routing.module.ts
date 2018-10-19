import { AuthGuard } from './guard/auth.guard';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';

const routes: Routes = [
  {path: '', redirectTo: '/adminlogin', pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: 'adminlogin', component: LoginAdminComponent },
  {path: 'adminhome', component: HomeAdminComponent ,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
