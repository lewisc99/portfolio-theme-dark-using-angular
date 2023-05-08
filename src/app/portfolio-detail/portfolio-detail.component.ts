import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PortfolioDetail } from '../interfaces/detail';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.scss']
})
export class PortfolioDetailComponent  implements OnInit{

  constructor(private activatedRoute:ActivatedRoute,private translateService:TranslateService,
     @Inject(DOCUMENT) private _document: Document, private router:Router) {
      if (this.localStorage.getItem("idiom") == "pt" && (this.localStorage.getItem("idiom") != null))
        this.translateService.setDefaultLang("pt");
      else 
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
  private localStorage:Storage = localStorage;
  public lampColor:string = "light";
  @ViewChild('nav', { static: false }) public navBar: ElementRef = new ElementRef({});
  public clickedNavBarActive:string = "home";
  
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
        if (this.detail == null) 
          this.router.navigate(['/..']);
      
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
  
  toggleTheme():void
  {
    let themeStorage = localStorage.getItem("theme"); 
    let rowNav = this._document.getElementsByClassName("row-nav") as HTMLCollectionOf<HTMLElement>;
    
    if (themeStorage == "light")
    {
      this.lampColor = "light";
      this._document.getElementById("container")!.classList.add('dark-theme');
      rowNav.item(0)!.style.boxShadow = "inset 0 0 0 2000px rgb(0 0 0 / 80%) ";
      this.localStorage.setItem("theme", "dark");
    } else
    {
      this.lampColor = "dark";
      this._document.getElementById("container")!.classList.remove('dark-theme');
      rowNav.item(0)!.style.boxShadow = "rgb(255 255 255 / 70%) 0px 0px 0px 1000px inset";
      this.localStorage.setItem("theme", "light");
    }
  }
  toggleNavBarMobile()
  {
    let display = this.navBar.nativeElement.style.display;
    if (display == "" || display == "none") 
    {
      this.navBar.nativeElement.style.display = "flex";
      this.navBar.nativeElement.classList.add("nav-active-animation");
    } else {
      this.navBar.nativeElement.classList.remove("nav-active-animation");
      this.navBar.nativeElement.classList.toggle("nav-unactive-animation");
      this.navBar.nativeElement.addEventListener("animationend",(event:AnimationEvent) =>
      {
        if (event.animationName == "fadeOut")
        {
          this.navBar.nativeElement.classList.remove("nav-unactive-animation");
          this.navBar.nativeElement.style.display = "";
        }
      })
    }
  }
  
  closeNavBarMobile() {
    this.navBar.nativeElement.style.display = "flex";
    this.toggleNavBarMobile();
   }

}
