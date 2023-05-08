import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PortfolioDetail } from '../interfaces/detail';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.scss']
})
export class PortfolioDetailComponent  implements OnInit{

  constructor(private activatedRoute:ActivatedRoute,private translateService:TranslateService, @Inject(DOCUMENT) private _document: Document) {
    this.translateService.setDefaultLang("en");
  }
  public detail: PortfolioDetail = {
    id: '',
    title: '',
    text: '',
    youtubeSrc: '',
    github: {
      href: '',
      active: false
    },
    site: {
      href: '',
      active: false
    },
    technologies: [],
    subId: ''
  };
  public siteActive:boolean = false;
  
    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(
        {
          next: param => {
            let id =  param.get("id")!;
            this.targetPortfolioDetail(id);
            if (this.localStorage.getItem("theme") == "light")
            {
              this.localStorage.setItem("theme","dark");
              this.toggleTheme();
            } else {
              this.localStorage.setItem("theme","light");
              this.toggleTheme();
            }
          },
          error: error => alert(error)
        }
      );
    
  }

  targetPortfolioDetail(id:string) {
    this.translateService.get("portfolio-detail.items").subscribe(
      (items:PortfolioDetail[]) => {
        this.detail = items.find(item => item.id == id)!;
        let subId = this.detail.subId;
        let rowNav = this._document.getElementsByClassName("row-nav") as HTMLCollectionOf<HTMLElement>;
        let background = "url('../../assets/images/portfolio/detail/background/" + subId +".svg')"
        rowNav.item(0)!.style.background = background;

        if (this.detail.site.active)
            this.siteActive = !this.siteActive;
        else 
            this.siteActive =!!this.siteActive;
      }
    )
  }

  private localStorage:Storage = localStorage;
  public lampColor:string = "light";


  initializeCurrentIdiom():void 
  {
    let currentIdiom = this.localStorage.getItem("idiom");
    if(currentIdiom != null)
    {
       this.translateService.setDefaultLang(this.localStorage.getItem("idiom")!);
       if (currentIdiom == "pt")
       {
        this._document.getElementById("image-brazil")!.classList.add('flag-image');
        this._document.getElementById("image-usa")!.classList.remove('flag-image');
       } else {
        this._document.getElementById("image-usa")!.classList.add('flag-image');
        this._document.getElementById("image-brazil")!.classList.remove('flag-image');
       }
    } else {
     this.translateService.setDefaultLang("en");
     this.localStorage.setItem("idiom","en");
    }
  }
  toggleTheme():void
  {
    let themeStorage = localStorage.getItem("theme"); 
    let rowNav = this._document.getElementsByClassName("row-nav") as HTMLCollectionOf<HTMLElement>;
    
    if (themeStorage == "light")
    {
      this.lampColor = "light";
      this._document.getElementById("container")!.classList.add('dark-theme');
      rowNav.item(0)!.style.boxShadow = "inset 0 0 0 2000px rgb(0 0 0 / 70%) ";
      this.localStorage.setItem("theme", "dark");
    } else
    {
      this.lampColor = "dark";
      this._document.getElementById("container")!.classList.remove('dark-theme');
      rowNav.item(0)!.style.boxShadow = "rgb(255 255 255 / 70%) 0px 0px 0px 1000px inset";
      this.localStorage.setItem("theme", "light");
    }
  }
  
}
