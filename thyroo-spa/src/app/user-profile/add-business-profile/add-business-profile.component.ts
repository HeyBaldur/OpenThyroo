import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { BusinessProfile } from '../interfaces/business-profile';
import { Country } from '../interfaces/country';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { careers } from 'src/app/shared/careers';
import { states } from 'src/app/shared/locations';

@Component({
  selector: 'app-add-business-profile',
  templateUrl: './add-business-profile.component.html',
  styleUrls: ['./add-business-profile.component.css']
})
export class AddBusinessProfileComponent implements OnInit {

  // ViewChild
  @ViewChild('closebutton') closebutton;

  // Public variables
  profileForm: FormGroup;
  countryList: Country[];
  countryListAvailable: Country[];
  profileToUpdate: BusinessProfile;
  validateForm: boolean;
  mainTitle: string;
  public postEditor = ClassicEditor;
  public careers = careers;
  public states = states;
  public careersNoFound: boolean;
  public locationsNoFound: boolean;

  // Inputs
  @Input() updateProfile: number;
  @Input() isUpdate: boolean;

  // Outputs
  @Output() businessProfile: EventEmitter<BusinessProfile> = new EventEmitter<BusinessProfile>();

  constructor(
    private profileService: ProfileService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.displayCountries();
    if (this.isUpdate === true &&
        this.updateProfile !== null) {
        this.profileService.getBusinessProfile().subscribe(response => {
        this.profileToUpdate = response;

        console.log(this.profileToUpdate);

        this.validateForm = true;
        this.setUpdateForm();
        this.mainTitle = 'Update business profile';
      });
    } else {
      this.validateForm = true;
      this.setForm();
      this.mainTitle = 'Add a business profile';
    }
  }

  public setForm(): void {
    const currentUser = this.authenticationService.getCurrentUser();
    this.profileForm = new FormGroup({
      summary: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      emailContact: new FormControl(currentUser.emailAddress, Validators.required),
      phoneContact: new FormControl(''),
      companyName: new FormControl('', Validators.required),
      website: new FormControl(''),
      emailContactHidden: new FormControl(false), // Boolean
      phoneContactVisibleHidden: new FormControl(false), // Boolean
      knowAs: new FormControl(currentUser.providerFullName, Validators.required),
      experienceYears: new FormControl(1),
      skillSet: new FormControl(''),
      accomplishments: new FormControl(''),
      legend: new FormControl(''),
      currentlyActive: new FormControl(true), // Boolean
      countryId: new FormControl(1),
      availableForId: new FormControl(1),
      city: new FormControl('', Validators.required),
      address: new FormControl('')
    });
  }

  public setUpdateForm(): void {
    this.profileForm = new FormGroup({
      summary: new FormControl(this.profileToUpdate.summary, Validators.required),
      occupation: new FormControl(this.profileToUpdate.occupation, Validators.required),
      emailContact: new FormControl(this.profileToUpdate.emailContact),
      phoneContact: new FormControl(this.profileToUpdate.phoneContact),
      companyName: new FormControl(this.profileToUpdate.companyName, Validators.required),
      website: new FormControl(this.profileToUpdate.website),
      emailContactHidden: new FormControl(this.profileToUpdate.emailContactHidden), // Boolean
      phoneContactVisibleHidden: new FormControl(this.profileToUpdate.phoneContactVisibleHidden), // Boolean
      knowAs: new FormControl(this.profileToUpdate.knowAs, Validators.required),
      experienceYears: new FormControl(1),
      skillSet: new FormControl(this.profileToUpdate.skillSet),
      accomplishments: new FormControl(this.profileToUpdate.accomplishments),
      legend: new FormControl(this.profileToUpdate.legend),
      currentlyActive: new FormControl(this.profileToUpdate.currentlyActive), // Boolean
      countryId: new FormControl(1),
      availableForId: new FormControl(this.profileToUpdate.availableForId),
      userId: new FormControl(this.updateProfile),
      city: new FormControl(this.profileToUpdate.city, Validators.required),
      address: new FormControl(this.profileToUpdate.address)
    });
  }

  public displayCountries(): void {
    this.profileService.getCountries().subscribe(response => {
      this.countryListAvailable = this.countryList = response;
    }, error => {
      console.error(error);
    });
  }

  public submitForm(): void {
    this.businessProfile.emit(this.profileForm.value);
    this.closebutton.nativeElement.click();
  }

  public typeaheadNoCareers(event: boolean): void {
    this.careersNoFound = event;
  }

  public typeaheadNoLocations(event: boolean): void {
    this.locationsNoFound = event;
  }
}
