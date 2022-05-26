import { Pipe, PipeTransform } from '@angular/core';
import { UserMatched } from 'src/app/email/interfaces/user-matched';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(items: any[], filter: UserMatched): any {
    if (!items || !filter) {
      return items;
    }

    // Return value
    return items.filter(item => (item.businessProfile.knowAs).includes(filter));
  }
}
