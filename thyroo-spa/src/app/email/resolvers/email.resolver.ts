import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmailService } from '../services/email.service';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { EmailToReturnDto } from '../interfaces/emailToReturnDto';

@Injectable()
export class EmailResolver implements Resolve<EmailToReturnDto[]> {

    pageNumber = 1;
    pageSize = 15;
    messageContainer = 'Inbox';

    constructor(
        private emailService: EmailService,
        private router: Router,
        private localStorageStrategy: LocalStrategyService) { }

    resolve(): Observable<EmailToReturnDto[]> {
        const userId = this.localStorageStrategy.getUserId();
        return this.emailService.getEmails(
            userId,
            this.pageNumber,
            this.pageSize,
            this.messageContainer).pipe(
                catchError(() => {
                    this.router.navigate(['/error/500']);
                    return of(null);
                })
            );
    }
}
