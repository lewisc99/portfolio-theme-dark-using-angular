import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private localStorage:Storage = localStorage;
  public lampColor:string = "light";
  public portfolios:Portfolio[] = [];

  constructor(private translateService:TranslateService) {}
 
  ngOnInit(): void {
    this.initializeCurrentIdiom();
    this.initializeCurrentTheme();
    this.initializePortfolio();
  }

  initializeCurrentIdiom():void 
  {
    let currentIdiom = this.localStorage.getItem("idiom");
    if(currentIdiom != null)
    {
       this.translateService.setDefaultLang(this.localStorage.getItem("idiom")!);
    } else {
     this.translateService.setDefaultLang("en");
     this.localStorage.setItem("idiom","en");
    }
  }

  initializeCurrentTheme():void
  {
    const colorStorage = this.localStorage.getItem("theme");
    if (colorStorage == null)
    {
      document.getElementById("container")!.classList.toggle('dark-theme');
      this.localStorage.setItem("theme", "dark");
      this.lampColor = "light";
    } else
    {
      let isDark =colorStorage == "dark" ? true : false;
      if (isDark)
      {
        document.getElementById("container")!.classList.toggle('dark-theme');
        this.localStorage.setItem("theme", "dark");
        this.lampColor = "light";
      } else {
        document.getElementById("container")!.classList.remove('dark-theme');
        this.localStorage.setItem("theme", "light");
        this.lampColor = "dark";
      }
    }
  }

  toggleIdiom():void
  {
    let currentIdiom = this.localStorage.getItem("idiom");
    let isEnglish = currentIdiom == "en" ? true : false; 
   if (isEnglish)
   {
      this.localStorage.setItem("idiom", "pt");
      document.getElementById("image-brazil")!.classList.add('flag-image');
      document.getElementById("image-usa")!.classList.remove('flag-image');
      this.translateService.use("pt");
   }
   else {
    this.localStorage.setItem("idiom", "en");
    document.getElementById("image-usa")!.classList.add('flag-image');
    document.getElementById("image-brazil")!.classList.remove('flag-image');
    this.translateService.use("en");
   }
   this.initializePortfolio();
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

  initializePortfolio():void
  {
    this.translateService.get("portfolio.items").subscribe(
      items => {
        this.portfolios = items
      }
    )
  }

  slidePortfolio(direction:string)
  {
     let currentPortfolio = this.portfolios.filter(portfolio => portfolio.show);
     let IndexCurrentPortfolio = this.portfolios.findIndex(portfolioIndex => portfolioIndex.id == currentPortfolio[0].id);
     let firstPortfolioIndex = 0;
     this.portfolios[IndexCurrentPortfolio].show = false;


     if (direction == "right")
     {
      if (IndexCurrentPortfolio == this.portfolios.length -1) {
        this.portfolios[0].show = true;
        return;
      }
       this.portfolios[IndexCurrentPortfolio + 1].show = true;
       return;
     }

      if (IndexCurrentPortfolio == firstPortfolioIndex) 
      {
        this.portfolios[this.portfolios.length - 1].show = true;
        return;
      }
      this.portfolios[IndexCurrentPortfolio - 1].show = true;
  }

  dotSelectedPortfolio(portfolioId:string)
  {
    let currentPortfolio = this.portfolios.filter(portfolio => portfolio.show);
    let IndexCurrentPortfolio = this.portfolios.findIndex(portfolioIndex => portfolioIndex.id == currentPortfolio[0].id);
    let IndexSelectedPortfolio = this.portfolios.findIndex(portfolioIndex => portfolioIndex.id == portfolioId);

    this.portfolios[IndexCurrentPortfolio].show = false;
    this.portfolios[IndexSelectedPortfolio].show = true;
  }
} 

interface Portfolio 
{
  id:string,
  title:string,
  subtitle:string,
  src:string,
  href:string,
  show: boolean
}