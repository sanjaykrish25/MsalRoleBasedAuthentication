import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersComponent } from './users/users.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
  {path:"home", component:HomeComponent, canActivate:[AuthguardGuard]},
  {path:"users", component:UsersComponent},
  {path:"registration", component:RegistrationComponent},
  {path:"", component:LoginComponent},
  // {path:"", component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
