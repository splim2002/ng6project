import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(
      item => {
        return (item.name.first.toLowerCase().includes(searchText) || item.name.last.toLowerCase().includes(searchText));
      }
    );
  }

}
