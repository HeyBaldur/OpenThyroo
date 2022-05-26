import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  phoneNumber: any;
  // Forms
  signUpForm: FormGroup;
  loader: boolean;
  errorFlag: boolean;
  accountCreated: boolean;
  public emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/home'); // Change this URL
    }

    // Set form
    this.setForm();
  }

  public signUpWithGoogle(): void {
    this.authService.googleAuth();
  }

  public setForm(): void {
    this.signUpForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      // username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });
  }

  public signUpUser(): void {
    this.loader = true;
    // Trimmed the email address, FN and LN to avoid blank spaces
    this.signUpForm.get('emailAddress').value.trim();
    this.signUpForm.get('firstName').value.trim();
    this.signUpForm.get('lastName').value.trim();
    this.authService.signUpToDatabase(this.signUpForm.value).subscribe(response => {
      if (response !== null) {
        this.accountCreated = true;
        this.setForm();
      }
      this.loader = false;
    }, error => {
      console.error(error);
      this.loader = false;
      this.errorFlag = true;
    });
  }
}
