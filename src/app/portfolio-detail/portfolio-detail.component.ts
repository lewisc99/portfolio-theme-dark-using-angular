import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.scss']
})
export class PortfolioDetailComponent {

  private localStorage:Storage = localStorage;
  public lampColor:string = "light";

  constructor(private translateService:TranslateService) {
    this.translateService.setDefaultLang("en");
  }

  initializeCurrentIdiom():void 
  {
    let currentIdiom = this.localStorage.getItem("idiom");
    if(currentIdiom != null)
    {
       this.translateService.setDefaultLang(this.localStorage.getItem("idiom")!);
       if (currentIdiom == "pt")
       {
        document.getElementById("image-brazil")!.classList.add('flag-image');
        document.getElementById("image-usa")!.classList.remove('flag-image');
       } else {
        document.getElementById("image-usa")!.classList.add('flag-image');
        document.getElementById("image-brazil")!.classList.remove('flag-image');
       }
    } else {
     this.translateService.setDefaultLang("en");
     this.localStorage.setItem("idiom","en");
    }
  }
  toggleTheme():void
  {
    let themeStorage = localStorage.getItem("theme"); 
    
    if (themeStorage == "light")
    {
      this.lampColor = "light";
      document.getElementById("container")!.classList.toggle('dark-theme');
      this.localStorage.setItem("theme", "dark");
    } else
    {
      this.lampColor = "dark";
      document.getElementById("container")!.classList.toggle('dark-theme');
      this.localStorage.setItem("theme", "light");
    }
  }
  
}
