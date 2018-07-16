import { Component, ElementRef, Renderer, Input, Output, EventEmitter, forwardRef, HostBinding, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'image-base64',
    templateUrl: 'image-base64.component.html',
})

export class ImageBase64Component  {
    constructor(private element: ElementRef, private renderer: Renderer, private sanitizer: DomSanitizer, ) {
        this.showControl = false;
    }
    @Input() disabled = false;
    @Input() src64: string;
    @Output() src64Change: EventEmitter<string> = new EventEmitter<string>();

    showControl: boolean;

    changeListner(event: any) {
        var reader = new FileReader();

        reader.onload = (e: any)=> {
            var srcEncode = btoa(e.target.result);
            this.src64Change.emit(srcEncode);
        };

        reader.readAsBinaryString(event.files[0]);
    }

   
}
