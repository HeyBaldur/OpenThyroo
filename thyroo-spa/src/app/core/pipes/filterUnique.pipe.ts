import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterUniquePipe implements PipeTransform {

  transform(value: any): any {
    if (value !== undefined && value !== null) {
      return _.uniqBy(value, 'caUserId');
    }
    return value;
  }
}
