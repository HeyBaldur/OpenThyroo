import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/articles/interfaces/Article';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css']
})
export class UserActivityComponent implements OnInit {

  @Input() views: number;
  @Input() articles: Article[];
  @Input() authorName: string;
  @Input() userId: number;
  constructor() { }

  ngOnInit() {
  }

}
