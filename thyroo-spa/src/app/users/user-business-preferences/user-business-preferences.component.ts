import { Component, OnInit, Input } from '@angular/core';
import { BusinessInterest } from 'src/app/user-profile/interfaces/business-interest';

@Component({
  selector: 'app-user-business-preferences',
  templateUrl: './user-business-preferences.component.html',
  styleUrls: ['./user-business-preferences.component.css']
})
export class UserBusinessPreferencesComponent implements OnInit {

  @Input() businessInterest: BusinessInterest[];
  constructor() { }

  ngOnInit() {
  }

}
