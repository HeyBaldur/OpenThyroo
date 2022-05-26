import { Component, OnInit } from '@angular/core';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-business-interests-tab',
  templateUrl: './business-interests-tab.component.html',
  styleUrls: ['./business-interests-tab.component.css']
})
export class BusinessInterestsTabComponent implements OnInit {

   // Public variables
   currentUser: User;

   constructor(
     private localStategy: LocalStrategyService) { }

   ngOnInit() {
     this.currentUser = this.localStategy.getCurrentUser();
   }
}
