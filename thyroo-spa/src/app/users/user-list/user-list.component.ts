import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  loader: boolean;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.loader = true;
    this.userService.getAllUsers().subscribe(response => {
      this.users = response;
      this.loader = false;
    }, error => {
      console.log(error);
      this.loader = false;
    });
  }
}
