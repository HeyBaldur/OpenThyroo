import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BusinessProfile } from 'src/app/user-profile/interfaces/business-profile';
import { UserService } from '../services/user.service';

@Injectable()
export class UserResolver implements Resolve<BusinessProfile[]> {

    pageNumber = 1;
    pageSize = 12;

    constructor(
        private userService: UserService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<BusinessProfile[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(() => {
                this.router.navigate(['/error/500']);
                return of(null);
            })
        );
    }
}
