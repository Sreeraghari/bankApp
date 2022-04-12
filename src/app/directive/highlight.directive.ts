import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el:ElementRef) {
    console.log(el);
    el.nativeElement.style.backgroundColor="aqua"
    el.nativeElement.style.borderRadius="9px"
    el.nativeElement.style.color="black"

   }

}
