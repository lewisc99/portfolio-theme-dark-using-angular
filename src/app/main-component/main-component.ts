import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Portfolio, Qualification, Skills } from '../interfaces/main';
import { ContactSrc } from '../domain/contact-src';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.html',
  styleUrls: ['./main-component.scss','./section-component.scss','./responsive-mobile-component.scss','./responsive-tv-component.scss']
})
export class MainComponent implements OnInit {

  private localStorage:Storage = localStorage;
  public lampColor:string = "light";
  public portfolios:Portfolio[] = [];
  public skills:Skills[] = [];
  public qualificationDetail:any = {};
  public qualifications:Qualification[] = [];
  public contactSrc: any = {
    linkedin: "../assets/images/contact/icon-linkedin-light.svg",
    arroba: "../assets/images/contact/icon-arroba-light.svg",
    github:"../assets/images/contact/icon-github-light.svg",
    whatsapp:"../assets/images/contact/icon-whatsapp-light.svg"
  };
  public downloadCvHref: string;
  @ViewChild('nav', { static: false }) public navBar: ElementRef = new ElementRef({});
  @ViewChild('name', { static: false }) public name: ElementRef = new ElementRef({});
  @ViewChild('text', { static: false }) public text: ElementRef = new ElementRef({});
  public clickedNavBarActive:string = "home";

  constructor(private translateService:TranslateService, @Inject(DOCUMENT) private _document: Document, private router:Router) {}

  ngOnInit(): void {

    this.initializeCurrentIdiom();
    this.initializeCurrentTheme();
    this.initializeContainersIdiom();
    this.initializeQualification();
  }

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

  initializeCurrentTheme():void
  {
    const colorStorage = this.localStorage.getItem("theme");
    let contact:ContactSrc = new ContactSrc();

    if (colorStorage == null)
    {
      this._document.getElementById("container")!.classList.toggle('dark-theme');
      this.localStorage.setItem("theme", "dark");
      this.lampColor = "light";
    } else
    {
      let isDark =colorStorage == "dark" ? true : false;
      if (isDark)
      {
        this._document.getElementById("container")!.classList.toggle('dark-theme');
        this.localStorage.setItem("theme", "dark");
        this.lampColor = "light";
        contact.toggleTheme("dark");
        
      } else {
        this._document.getElementById("container")!.classList.remove('dark-theme');
        this.localStorage.setItem("theme", "light");
        this.lampColor = "dark";
        contact.toggleTheme("light");
      }
      this.contactSrc = contact;
    }
  }

  toggleIdiom():void
  {
    let currentIdiom = this.localStorage.getItem("idiom");
    let isEnglish = currentIdiom == "en" ? true : false; 
   if (isEnglish)
   {
      this.localStorage.setItem("idiom", "pt");
      this._document.getElementById("image-brazil")!.classList.add('flag-image');
      this._document.getElementById("image-usa")!.classList.remove('flag-image');
      this.translateService.use("pt");
   }
   else {
    this.localStorage.setItem("idiom", "en");
    this._document.getElementById("image-usa")!.classList.add('flag-image');
    this._document.getElementById("image-brazil")!.classList.remove('flag-image');
    this.translateService.use("en");
   }
   this.initializeContainersIdiom();
  }
  
  toggleTheme():void
  {
    let themeStorage = localStorage.getItem("theme"); 
    let contact:ContactSrc = new ContactSrc();
    
    if (themeStorage == "light")
    {
      this.lampColor = "light";
      this._document.getElementById("container")!.classList.toggle('dark-theme');
      this.localStorage.setItem("theme", "dark");
      this.qualifications.forEach(qualification =>  qualification.detail.skills.map( skills => skills.src =  skills.src.replaceAll("dark","light")));
      this.skills.map(skill => skill.src = skill.src.replaceAll("dark","light"));
      contact.toggleTheme("dark");
    } else
    {
      this.lampColor = "dark";
      this._document.getElementById("container")!.classList.toggle('dark-theme');
      this.localStorage.setItem("theme", "light");
      this.qualifications.forEach(qualification => qualification.detail.skills.map( skills => skills.src =  skills.src.replaceAll("light","dark")));
      this.skills.map(skill => skill.src = skill.src.replaceAll("light","dark") );
      contact.toggleTheme();
    }
    this.contactSrc = contact;
  }

  
  initializeQualification():void 
  {
    this.translateService.get("qualification.items").subscribe(
      items => {
         let qualifications:Qualification[] = items;

         qualifications.map(item => {
             this.formatDataQualification(item);

            if (this.localStorage.getItem("theme") == "light")
            {
              item.detail.skills.map(skill => skill.src = skill.src.replaceAll("light","dark"));
            }
         });
         this.qualifications = qualifications;
         this.selectQualification(0);
        
      }
    )
  }

  selectQualification(id:number):void
  {
     let qualification = this.qualifications.filter(qualification => qualification.id == id)[0];
     if (qualification != null) {
     this.qualificationDetail = qualification.detail;
     this.qualifications.map(qualification => { 
          if (qualification.id == id )
          {
            qualification.detail.selected = true;
            this._document.getElementById("item-experience-" + id)!.classList.add('active');
          } else {
            qualification.detail.selected = false;
            this._document.getElementById("item-experience-" + qualification.id)!.classList.remove('active');
          }
     }
     )};
  }

  formatDataQualification(item: Qualification)
  {
    let dateStart = new Date(item.dateStart);
    let dateFinish = new Date(item.dateFinish);
    let currentDate = new Date();
    var diffDays:any;
    var diffTime:any;
    var totalTime:any;

    if (dateFinish.toString() != "Invalid Date")
    {
       diffTime = Math.abs(dateFinish.getTime() - dateStart.getTime());
    } else {
       diffTime = Math.abs(currentDate.getTime() - dateStart.getTime());
    }
     diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
     if (diffDays > 365)
     {
        let totalYears = Math.floor((diffDays / 365));
        let totalMonth = Math.floor(((diffDays % 365) / 30 ));

        if (totalMonth != 0)
        {
          totalTime = totalYears + " yr " + totalMonth + " months";
        } else {
          totalTime = totalYears + " yr";
        }
     } else {
      let totalMonth = (diffDays / 30 ).toFixed(1);
      totalTime = totalMonth + " months";
     }
     item.totalTime = totalTime;
  }

  initializeContainersIdiom():void
  {
    this.translateService.get("qualification.items").subscribe(
      (items:Qualification[]) => {

         let detail = items.find(item => item.detail.id == this.qualificationDetail.id);
         this.qualificationDetail = detail?.detail != null ||  detail?.detail == "undefined" ?  detail?.detail : null;
         if (this.qualificationDetail == null)
         {
          this.selectQualification(0);
         }
         this.qualifications = items;
         
         this.qualifications.forEach(item => {
          this.formatDataQualification(item);
          
          item.detail.skills.map( skill => {
           if (this.localStorage.getItem("theme") == "dark")
              skill.src = skill.src.replaceAll("dark","light");
           else 
             skill.src =  skill.src.replaceAll("light","dark");
          })
         });

         if (this.qualificationDetail != null) {
         if (this.localStorage.getItem("theme") == "dark")
            this.qualificationDetail.skills.map( (item:any) => item.src = item.src.replaceAll("dark","light"));
         else
            this.qualificationDetail.skills.map( (item:any) => item.src = item.src.replaceAll("light","dark"));   
          }
      }
    )
    
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
  
  selectedSkill(skillSelect:any)
  {
    this.translateService.get("skills.items").subscribe(
      items => {
        let skillsItems = items;
        this.skills = skillsItems[skillSelect.value];
        if (this.localStorage.getItem("theme") == "light") {
           this.skills.map(skill => skill.src = skill.src.replaceAll("light","dark") );
        } else {
           this.skills.map(skill => skill.src = skill.src.replaceAll("dark","light") );
        }
      }
    )
  }

  downloadCV()
  {
    this.translateService.get("about-me.downloadCv.href").subscribe(item => this.downloadCvHref = item);
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

  sendMessageWhatsapp()
  {
   let text =  this.text.nativeElement.value;
   let name =  this.name.nativeElement.value;
   
   let link = document.createElement('a');
   link.href = `https://api.whatsapp.com/send?phone=5531991143417&text=*MENSAGEM ENVIADA PELO SITE*%20%20%20%20%20%0A%0A%20%20%20%20%0A%0A*name:*${name}%20%20%20%20%20%0A%0A*text:*${text}`;
   link.target = "_blank";
   link.click();
  }


} 

