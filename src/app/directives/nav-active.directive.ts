import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[NavActive]'
})
export class NavActiveDirective {

  constructor(private elementRef:ElementRef, private renderer:Renderer2) {
   }

  @Input() navBar: ElementRef;
  
  @HostListener('click') clickNavBar()
  {
    
    let navElements:NodeList = this.navBar.nativeElement.childNodes[0].childNodes[0].childNodes;
 
    navElements.forEach((item:any) => {
       if( item.childNodes[0].classList.contains("nav-item-active")) {
            item.childNodes[0].classList.remove("nav-item-active");
        } 
    })
    this.renderer.setStyle(this.elementRef.nativeElement,'transition','0.5s');
    this.renderer.addClass(this.elementRef.nativeElement, 'nav-item-active');
  }  
}
