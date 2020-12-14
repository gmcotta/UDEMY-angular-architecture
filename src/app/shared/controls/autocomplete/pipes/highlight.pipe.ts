import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, search: string): string {
    const regexp = new RegExp(search, 'gi');
    return value.replace(regexp, match => `<b>${match}</b>`);
  }
}
