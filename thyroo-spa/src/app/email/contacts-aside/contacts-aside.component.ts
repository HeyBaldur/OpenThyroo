import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserMatched } from '../interfaces/user-matched';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/shared/services/global.service';
import { tap, first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts-aside',
  templateUrl: './contacts-aside.component.html',
  styleUrls: ['./contacts-aside.component.css']
})
export class ContactsAsideComponent implements OnInit {

  myMatchesList: UserMatched[];
  filterer: string;
  matches$: Subscription;
  skeleton: boolean;
  @Input() recipientId: number;
  @Output() threadValidation: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      console.log('Target to query: ' + routeParams.id);
      this.getMyMatches(routeParams.id);
    });
  }

  // Get my matches.
  public getMyMatches(recipientId: number): void {
    this.skeleton = true;
    this.matches$ = this.globalService.myMatches()
      .pipe(
        tap(() => console.log('Event emitted')),
        first()
      )
      .subscribe(res => {
        this.myMatchesList = res;
        this.skeleton = false;
        console.log(res);
        // const finder = res.find(element => element.targetBusinessProfile.userId === this.recipientId);
        // tslint:disable-next-line: triple-equals
        const result = res.find( ({ businessProfile }) => businessProfile.userId == recipientId );

        if (result === undefined || result == null) {
          this.validate(true);
          console.log('Conversation does not exist');
        }
      }, err => {
        console.log(err);
        this.skeleton = false;
      });
  }

  public validate(result: boolean): void {
    this.threadValidation.emit(result);
  }
}
