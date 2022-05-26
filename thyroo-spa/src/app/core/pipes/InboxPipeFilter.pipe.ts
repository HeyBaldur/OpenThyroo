import { Pipe, PipeTransform } from '@angular/core';
import { EmailToReturnDto } from 'src/app/email/interfaces/emailToReturnDto';

@Pipe({
  name: 'InboxPipeFilter'
})
export class InboxPipeFilterPipe implements PipeTransform {

  transform(items: any[], filter: EmailToReturnDto): any {
    if (!items || !filter) {
      return items;
    }

    // Return value
    return items.filter(item => (item.subject).includes(filter));
  }
}
