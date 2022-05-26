import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { Email } from '../interfaces/email';
import { Pagination, PaginatedResult } from '../interfaces/pagination';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { ActivatedRoute } from '@angular/router';
import { EmailToReturnDto } from '../interfaces/emailToReturnDto';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  // Public variables
  emails: EmailToReturnDto[];
  pagination: Pagination;
  messageContainer = 'Inbox';
  loader: boolean;
  filterer: string;

  // Error flag
  serverErrorFlag: boolean;

  constructor(
    private emailService: EmailService,
    private localStorageStrategy: LocalStrategyService,
    private route: ActivatedRoute,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.titleService.setTitle('Messages');
    this.loader = true;
    this.route.data.subscribe((data: { messages: { result: EmailToReturnDto[]; pagination: Pagination; }; }) => {
        console.log(data);
        this.emails = data.messages.result;
        this.pagination = data.messages.pagination;
        this.loader = false;
        this.serverErrorFlag = false;
      });
  }

  public loadMessages(): void {
    this.loader = true;
    const userId = this.localStorageStrategy.getUserId();
    this.emailService.getEmails(userId,
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.messageContainer).subscribe((res: PaginatedResult<EmailToReturnDto[]>) => {
        this.loader = false;
        this.emails = res.result;
        this.pagination = res.pagination;
      }, error => {
        console.log(error);
        this.loader = false;
      });
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
