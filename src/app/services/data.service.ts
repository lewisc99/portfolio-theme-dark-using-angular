import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { NavBar } from '../entities/navbar';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private localStorage:Storage = localStorage;

  public getNavBar(isEnglish:boolean) : NavBar
  {
      let navBar: NavBar;
      if (isEnglish)
      {
          navBar = new NavBar();
          this.localStorage.setItem("idiom","english")

      } else
      {
          navBar = new NavBar("Início", "Qualificação","Contato",  "Portfólio", "Habilidades", "Luz", "Idioma");
          this.localStorage.setItem("idiom","portuguese")
      }
      return navBar;
  }

  public getTheme(container:ElementRef, ul:ElementRef): void 
  {
    const color = localStorage.getItem("theme");
    const darkTheme = "dark-theme";

    if (color == "light")
    {
      container.nativeElement.classList.add(darkTheme);
      ul.nativeElement.classList.add(darkTheme);
      this.localStorage.setItem("theme","dark");
      
    } else
    {
      container.nativeElement.classList.remove(darkTheme);
      ul.nativeElement.classList.remove(darkTheme);
      this.localStorage.setItem("theme","light");
    }
  }
  
}
