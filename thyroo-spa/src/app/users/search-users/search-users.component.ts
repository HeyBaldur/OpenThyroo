import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BusinessParams, BusinessProfiles, Pagination, PaginatedResult } from '../interfaces/business-params';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  // Public variables
  userList: BusinessProfiles[];
  userEmptyFlag: boolean;
  userEmptyMessage: string;

  // Pagination
  pagination: Pagination;
  userParams: any = {};
  knownAs: string;

  // Loader
  loader: boolean;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.loader = true;
    this.route.data.subscribe(data => {
      console.log(data);
      this.userList = data.users.result;
      this.pagination = data.users.pagination;
      this.loader = false;
      this.titleService.setTitle('Search business profiles');
    });
  }

  public searchBusinessPreferences(event: BusinessParams): void {
    this.loader = true;
    this.userService.findUsers(event).subscribe(response => {
      this.userList = response;
      if (response.length === 0) {
        this.loader = false;
        this.userEmptyFlag = true;
        this.userEmptyMessage = `We are sorry we could not find any match 
          according to your criteria, please try again with different criteria
          or try later, if you need more information please visit our help center
          for more information. Thank you!`;
      } else {
        this.loader = false;
        this.userEmptyFlag = false;
      }
    });
  }

  // public getLatestUsers(): void {
  //   this.loader = true;
  //   this.userService.getLatest().subscribe(response => {
  //     this.userList = response;
  //     console.log(this.userList);
  //     this.loader = false;
  //   });
  // }

  public refreshResults(): void {
    this.loader = true;
    this.route.data.subscribe(data => {
      console.log(data);
      this.userList = data.users.result;
      this.pagination = data.users.pagination;
      this.loader = false;
    });
  }

  // Check this method where there are more than 50 users
  public setParamsValues(event: any): void {
    this.userParams.businessTypeId = event.businessTypeId;
    this.userParams.profileSubTypeId = event.profileSubTypeId;
    this.userParams.profileTypeId = event.profileTypeId;
    this.userParams.countryId = event.countryId;
    this.userParams.title = event.title;
    this.userParams.knownAs = '';
    this.loadUsers(event);
  }

  public loadUsers(userParams?: any) {
    this.loader = true;
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, userParams)
      .subscribe((res: PaginatedResult<any[]>) => {
      this.userList = res.result;
      this.pagination = res.pagination;
      this.loader = false;
    }, err => {
      console.log(err);
      this.loader = false;
    });
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
}
