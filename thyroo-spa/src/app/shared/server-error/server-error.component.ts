import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
