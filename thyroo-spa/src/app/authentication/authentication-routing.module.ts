// Core imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom imports
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './updatePassword/updatePassword.component';

const routes: Routes = [
  { path: 'auth/login', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/forgotPassword', component: ForgotPasswordComponent },
  { path: 'auth/updatePassword/:token', component: UpdatePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class AuthenticationRoutingModule { }
