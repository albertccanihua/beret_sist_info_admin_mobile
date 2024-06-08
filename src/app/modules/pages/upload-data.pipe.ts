import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uploadData',
  standalone: true
})
export class UploadDataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
