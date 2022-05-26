import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { UserMatched } from '../interfaces/user-matched';
import { catchError, retryWhen, delayWhen, tap, first } from 'rxjs/operators';
import { throwError, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-email-menu',
  templateUrl: './email-menu.component.html',
  styleUrls: ['./email-menu.component.css']
})
export class EmailMenuComponent implements OnInit, OnDestroy {

  // Public properties
  myMatchesList: UserMatched[];
  filterer: string;
  matches$: Subscription;
  skeleton: boolean;

  constructor(private globalService: GlobalService) { }

  ngOnDestroy(): void {
    // this.matches$.unsubscribe();
  }

  ngOnInit() {
    this.getMyMatches();
  }

  // Get my matches.
  public getMyMatches(): void {
    this.skeleton = true;
    this.matches$ = this.globalService.myMatches()
      .pipe(
        tap(() => console.log('Event emitted')),
        first()
      )
      .subscribe(res => {
        this.myMatchesList = res;
        this.skeleton = false;
      }, err => {
        console.log(err);
        this.skeleton = false;
      });
  }
}
