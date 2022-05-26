import { Component, OnInit } from '@angular/core';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { User } from 'src/app/core/interfaces/user';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { catchError, retryWhen, delayWhen, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { timer, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { PhotoUrlDto } from '../interfaces/update-account';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.css']
})
export class MySettingsComponent implements OnInit {

  currentUser: User;
  // Forms
  fullNameForm: FormGroup;
  photoUrlForm: FormGroup;
  emailAddressForm: FormGroup;
  passwordForm: FormGroup;

  // Flags
  changesFlag: boolean;
  errorFlag: boolean;
  errorMessage: string;
  passwordErrorFlag: boolean;
  loader: boolean;

  // Profile image
  selectedFile: File = null;
  downloadURL: Observable<string>;
  fb: string;
  photoObj: PhotoUrlDto;

  constructor(
    private localStrategy: LocalStrategyService,
    private profileService: ProfileService,
    private storage: AngularFireStorage,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.setFullNameForm(); // Full name form
    this.setPhotoUrlForm(); // Photo Url
    this.setEmailForm(); // Email address
    this.setPasswordForm(); // Password forms
    this.titleService.setTitle('Settings');
  }

  public getCurrentUser(): void {
    this.currentUser = this.localStrategy.getCurrentUser();
  }

  onFileSelected(event: { target: { files: any[]; }; }) {
    this.loader = true;
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.loader = false;
            if (url) {
              this.fb = url;
              const photo = {
                photoUrl: url
              };
              // Update image in DB
              this.updatePhoto(photo);
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          this.loader = false;
        }
      });
  }

  public setFullNameForm(): void {
    this.fullNameForm = new FormGroup({
      firstName: new FormControl(this.currentUser.firstName, Validators.required),
      lastName: new FormControl(this.currentUser.lastName, Validators.required),
    });
  }

  public updateFullName(): void {
    this.loader = true;
    this.profileService.updateFullName(this.fullNameForm.value)
    .subscribe(response => {
      // Update local storage value
      const currentUser = JSON.parse(localStorage.getItem('user'));

      currentUser.firstName = response.firstName;
      currentUser.lastName = response.lastName;
      currentUser.providerFullName = `${response.firstName} ${response.lastName}`;

      localStorage.setItem('user', JSON.stringify(currentUser));
      this.getCurrentUser();
      if (response !== null) {
        this.changesFlag = true;
      }

      // Logic ends
      this.loader = false;
    }, error => {
      console.error(error);
      this.loader = false;
    });
  }

  // Update Photo url
  public setPhotoUrlForm(): void {
    this.emailAddressForm = new FormGroup({
      emailAddress: new FormControl(this.currentUser.emailAddress, Validators.required),
    });
  }

  public updatePhoto(photo: PhotoUrlDto): void {
    this.loader = true;

    this.profileService.updatePhotoUrl(photo)
    .pipe(
      catchError(err => {
        return throwError(err);
      }),
      retryWhen(
        delayWhen(() => timer(300))
      ),
    )
    .subscribe(response => {
      // Update local storage value
      const currentUser = JSON.parse(localStorage.getItem('user'));
      currentUser.photoUrl = response.photoUrl;
      localStorage.setItem('user', JSON.stringify(currentUser));
      this.getCurrentUser();
      if (response !== null) {
        this.changesFlag = true;
      }

      // Logic ends
      this.loader = false;
    }, error => {
      console.error(error);
      this.loader = false;
    });
  }

  // Update email address
  public setEmailForm(): void {
    this.photoUrlForm = new FormGroup({
      photoUrl: new FormControl(this.currentUser.photoUrl, Validators.required)
    });
  }

  public updateEmailAddress(): void {
    this.loader = true;
    this.profileService.updateEmail(this.emailAddressForm.value).subscribe(response => {
      console.log(response);
      // Update local storage value
      const currentUser = JSON.parse(localStorage.getItem('user'));

      currentUser.emailAddress = response.emailAddress;

      localStorage.setItem('user', JSON.stringify(currentUser));
      this.getCurrentUser();
      if (response !== null) {
        this.changesFlag = true;
        this.errorFlag = false;
      }

      // Logic ends
      this.loader = false;
    }, error => {
      this.errorFlag = true;
      this.errorMessage = error.error.message;
      this.loader = false;
    });
  }

  // Update email address
  public setPasswordForm(): void {
    this.passwordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      passwordConfirmation: new FormControl('', Validators.required)
    }, { validators: this.passwordConfirming });
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('passwordConfirmation').value) {
      return { invalid: true };
    }
  }

  public updatePassword(): void {
    this.loader = true;
    this.profileService.updatePassword(this.passwordForm.value).subscribe(response => {
      if (response) {
        this.changesFlag = true;
        this.passwordErrorFlag = false;
      }

      // logic ends
      this.loader = false;
    }, error => {
      this.passwordErrorFlag = true;
      this.errorMessage = error.error.message;
      this.loader = false;
    });
  }
}
