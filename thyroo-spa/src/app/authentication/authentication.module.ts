// Core imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Custom imports
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthLoaderComponent } from './auth-loader/auth-loader.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './updatePassword/updatePassword.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    Ng2TelInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
    AuthLoaderComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent
  ]
})
export class AuthenticationModule { }
