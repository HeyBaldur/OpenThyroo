import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileSubType } from 'src/app/user-profile/interfaces/profile-sub-type';
import { ProfileType } from 'src/app/user-profile/interfaces/profile-type';
import { BusinessOfInterest } from 'src/app/user-profile/interfaces/business-of-interest';
import { ProfileService } from 'src/app/user-profile/services/profile.service';
import { Country } from 'src/app/user-profile/interfaces/country';
import { careers } from 'src/app/shared/careers';
import { states } from 'src/app/shared/locations';

@Component({
  selector: 'app-search-categories-modal',
  templateUrl: './search-categories-modal.component.html',
  styleUrls: ['./search-categories-modal.component.css']
})
export class SearchCategoriesModalComponent implements OnInit {

  // Public variables
  businessTypeId: BusinessOfInterest[];
  profileTypeId: ProfileType[];
  profileSubTypeId: ProfileSubType[];
  countryListAvailable: Country[];

  public careers = careers;
  public states = states;
  public careersNoFound: boolean;
  public locationsNoFound: boolean;

  // Forms
  formPreferences: FormGroup;

  // Outputs
  @Output() outputResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  // ViewChild
  @ViewChild('closebutton') closebutton: any;
  constructor(
    private profileService: ProfileService) { }

  ngOnInit() {
    this.populateDropDowns();
    this.setForm();
  }

  // Refactor this method
  public populateDropDowns(): void {
    const businessTypes$ = this.profileService.getBusinessTypes();
    const profileTypes$ = this.profileService.getProfileTypes();
    const profileSubTypes$ = this.profileService.getProfileSubTypes();
    const countries$ =  this.profileService.getCountries();

    businessTypes$.subscribe(result => {
      this.businessTypeId = result;
    });

    profileTypes$.subscribe(result => {
      this.profileTypeId = result;
    });

    profileSubTypes$.subscribe(result => {
      this.profileSubTypeId = result;
    });

    // countries$.subscribe(result => {
    //   this.countryListAvailable = result;
    // });
  }

  // It starts with 9.
  // Check SQL Server to know more.
  public setForm(): void {
    this.formPreferences = new FormGroup({
      businessTypeId: new FormControl('', Validators.required),
      profileTypeId: new FormControl('', Validators.required),
      profileSubTypeId: new FormControl('', Validators.required),
      countryId: new FormControl(''),
      title: new FormControl(''),
      city: new FormControl('')
    });
  }

  public searchUsers(): void {
    this.outputResult.emit(this.formPreferences.value);
    this.closebutton.nativeElement.click();
  }

  public typeaheadNoLocations(event: boolean): void {
    this.locationsNoFound = event;
  }

  public typeaheadNoCareers(event: boolean): void {
    this.careersNoFound = event;
  }
}
