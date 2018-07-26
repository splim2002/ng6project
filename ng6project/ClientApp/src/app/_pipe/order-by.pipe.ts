import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: Array<any>, sortField: string, isDesc: boolean): any {
    if (value == null) {
      return null;
    }
    //console.log('srt', sortField, isDesc);

    function compareValues(sortField, isDesc) {
      return function (a, b) {
        if (!a.hasOwnProperty(sortField) ||
          !b.hasOwnProperty(sortField)) {
          return 0;
        }

        const varA = (typeof a[sortField] === 'string') ?
          a[sortField].toUpperCase() : a[sortField];
        const varB = (typeof b[sortField] === 'string') ?
          b[sortField].toUpperCase() : b[sortField];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (isDesc) ?
            (comparison * -1) : comparison
        );
      };
    }

    return [...value].sort(compareValues(sortField, isDesc));
  }

}
