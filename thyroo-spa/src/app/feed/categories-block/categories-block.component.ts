import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { ICategory } from '../interfaces/iCategory';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';

@Component({
  selector: 'app-categories-block',
  templateUrl: './categories-block.component.html',
  styleUrls: ['./categories-block.component.css']
})
export class CategoriesBlockComponent implements OnInit {

  // Public variables
  categories: ICategory[];
  public skeleton: boolean;
  constructor(private feedService: FeedService) { }
  ngOnInit() {
    this.getCategories();
  }

  public getCategories(): void {
    this.skeleton = true;
    this.feedService.getCategories()
    .pipe(
      catchError(err => {
        this.skeleton = false;
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    )
    .subscribe(response => {
      this.skeleton = false;
      this.categories = response;
    });
  }
}
