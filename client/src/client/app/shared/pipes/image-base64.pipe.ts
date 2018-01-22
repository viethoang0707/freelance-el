import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'imageBase64',  pure: true })
export class ImageBase64Pipe implements PipeTransform {
	constructor( private sanitizer: DomSanitizer){ }
  transform(value: any, args: any[] = null): any {
    return value?this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64,"+value):""
  }
}

