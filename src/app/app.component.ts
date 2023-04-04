import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavBar } from './entities/navbar';
import { DataService } from './services/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  private localStorage:Storage = localStorage;
  public navBar: NavBar;
  public lang:string;
  public title = "ola";

  constructor(private dataService:DataService, private translateService:TranslateService) {
  }
 
  ngOnInit(): void {
     let currentIdiom = this.localStorage.getItem("idiom")!;
     if(currentIdiom != null)
     {
        this.translateService.setDefaultLang(this.localStorage.getItem("idiom")!);
     } else {
      this.translateService.setDefaultLang("en");
      this.localStorage.setItem("idiom","en");
     }

  }

  ngAfterViewInit(): void {
    this.initializeCurrentTheme();
  }

  initializeCurrentTheme()
  {
    const colorStorage = localStorage.getItem("theme");
    if (colorStorage == "light")
    {
      document.getElementById("container")!.classList.toggle('dark-theme');
    }
  }

  toggleIdiom()
  {
    let currentIdiom = this.localStorage.getItem("idiom");
    let isEnglish = currentIdiom == "en" ? true : false; 
   if (isEnglish)
   {
      this.localStorage.setItem("idiom", "pt");
      this.translateService.use("pt");
   }
   else {
    this.localStorage.setItem("idiom", "en");
    this.translateService.use("en");
   }
  }
  
  toggleTheme()
  {
    const themeStorage = localStorage.getItem("theme");
    if (themeStorage == "light")
    {
      document.getElementById("container")!.classList.toggle('dark-theme');
      this.localStorage.setItem("theme", "dark");
    } else
    {
      document.getElementById("container")!.classList.toggle('dark-theme');
      this.localStorage.setItem("theme", "light");
    }
  }
 
}
