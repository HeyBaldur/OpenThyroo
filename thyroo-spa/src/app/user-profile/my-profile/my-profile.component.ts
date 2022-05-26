import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  // Public variables
  currentUser: User;

  constructor(
    private localStategy: LocalStrategyService,
    private titleService: Title) { }

  ngOnInit() {
    this.currentUser = this.localStategy.getCurrentUser();
    this.titleService.setTitle('My profile');
  }
}
