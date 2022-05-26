import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';
import { ValidateBusinessRequirementsDto } from 'src/app/shared/interfaces/validateBusinessRequirementsDto';

@Component({
  selector: 'app-profile-validator',
  templateUrl: './profile-validator.component.html',
  styleUrls: ['./profile-validator.component.css']
})
export class ProfileValidatorComponent implements OnInit {

  displayFeature: ValidateBusinessRequirementsDto;
  displayValidator: boolean;
  name: string;
  constructor(
    private globalService: GlobalService,
    private localStrategy: LocalStrategyService) { }

  ngOnInit() {
    this.checkBusinessFeatures();
    this.name = this.localStrategy.getCurrentUser().firstName;
  }

  public checkBusinessFeatures(): void {
    const userId = this.localStrategy.getUserId();
    this.globalService.validateBusinessFeatures(userId)
    .pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300)
      ))
    ))
    .subscribe((response) => {
      this.displayValidator = true;
      console.log(response);
      this.displayFeature = response;
    }, error => {
      console.error(error);
    });
  }
}
