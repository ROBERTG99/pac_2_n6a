import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowButton]'
})
export class ShowButtonDirective {
  @Input() appShowButton: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input') onInputChange() {
    const button = document.querySelector(this.appShowButton);
    if (this.el.nativeElement.value.trim().length > 0) {
      this.renderer.setStyle(button, 'display', 'inline-block');
    } else {
      this.renderer.setStyle(button, 'display', 'none');
    }
  }
}
