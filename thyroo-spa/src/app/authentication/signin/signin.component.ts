import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserToSignIn } from '../interfaces/userToSignIn';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // Public variables
  signInForm: FormGroup;
  userToSignIn: UserToSignIn;
  loader: boolean;
  errorFlag: boolean;
  public emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/feed'); // Change this URL
    }

    // Set form
    this.setForm();
  }

  public signInWithGoogle(): void {
    this.authService.googleAuth();
  }

  public setForm(): void {
    this.signInForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  public signInUser(): void {
    this.loader = true;
    this.authService.signInToDatabase(this.signInForm.value).subscribe(response => {
      console.log(response);

      // Set information from gmail
      this.userToSignIn = {
        email: response.user.email,
        uid: response.user.id,
        photoUrl: response.user.photoURL,
        providerFullName: `${response.user.firstName} ${response.user.lastName}`
      };

      if (response !== null) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(this.userToSignIn));
        localStorage.setItem('userEmail', response.user.email);
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigateByUrl('feed');
      }
    }, error => {
      console.error(error);
      this.loader = false;
      this.errorFlag = true;
    });
  }
}

