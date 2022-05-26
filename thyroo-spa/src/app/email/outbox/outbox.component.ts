import { Component, OnInit } from '@angular/core';
import { EmailToReturnDto } from '../interfaces/emailToReturnDto';
import { Pagination, PaginatedResult } from '../interfaces/pagination';
import { EmailService } from '../services/email.service';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent implements OnInit {

  // Public variables
  emails: EmailToReturnDto[];
  pagination: Pagination;
  messageContainer = 'Outbox';
  loader: boolean;
  filterer: string;

  constructor(
    private emailService: EmailService,
    private localStorageStrategy: LocalStrategyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loader = true;
    this.route.data.subscribe(data => {
      console.log(data);
      this.emails = data.messages.result;
      console.log(this.emails);
      this.pagination = data.messages.pagination;
      this.loader = false;
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
