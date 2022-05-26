import { Component, OnInit } from '@angular/core';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  // Public variables
  currentUser: User;

  constructor(private localStategy: LocalStrategyService) { }

  ngOnInit() {
    this.currentUser = this.localStategy.getCurrentUser();
  }

}
