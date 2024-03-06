import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToPrettyPipe',
  standalone: true
})
export class CamelCaseToPrettyPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    const prettyValue = value.replace(/([A-Z])/g, ' $1').toLowerCase();
    return prettyValue.charAt(0).toUpperCase() + prettyValue.slice(1);
  }
}
