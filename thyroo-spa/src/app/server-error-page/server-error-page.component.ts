import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/services/global.service';
import { Router } from '@angular/router';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';

@Component({
  selector: 'app-server-error-page',
  templateUrl: './server-error-page.component.html',
  styleUrls: ['./server-error-page.component.css']
})
export class ServerErrorPageComponent implements OnInit {

  constructor(
    private globalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    // The conector will try to connect to the endpoint
    // every 3 seconds, if the endpoint results comes true
    // it will redirect to the feed page.
    this.conector();
  }

  private conector(): void {
    this.globalService.validateConnection()
    .pipe(
      catchError(err => {
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(3000)
      ))
    ))
    .subscribe(response => {
      if (response) {
        this.router.navigate(['/feed']);
      }
    });
  }

}
