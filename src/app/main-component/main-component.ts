import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Portfolio, Qualification, Skill } from '../interfaces/main';
import { ContactSrc } from '../domain/contact-src';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.html',
  styleUrls: [
    './main-component.scss',
    './section-component.scss',
    './responsive-mobile-component.scss',
    './responsive-tv-component.scss',
  ],
})
export class MainComponent implements OnInit, OnDestroy {
  private localStorage: Storage = localStorage;
  public lampColor: string = 'light';
  public portfolios: Portfolio[] = [];
  public skills: any[] = [];
  public qualificationSkillList: Skill[] = [];
  public qualificationDetail: any = {};
  public qualifications: Qualification[] = [];
  public skillsSelectedList: any = [];
  public contactSrc: any = {
    linkedin: '../assets/images/contact/icon-linkedin-light.svg',
    arroba: '../assets/images/contact/icon-arroba-light.svg',
    github: '../assets/images/contact/icon-github-light.svg',
    whatsapp: '../assets/images/contact/icon-whatsapp-light.svg',
  };
  public downloadCvHref: string;
  @ViewChild('nav', { static: false }) public navBar: ElementRef =
    new ElementRef({});
  @ViewChild('name', { static: false }) public name: ElementRef =
    new ElementRef({});
  @ViewChild('text', { static: false }) public text: ElementRef =
    new ElementRef({});
  public clickedNavBarActive: string = 'home';
  private translateSubscription: Subscription;
  private changeTranslationSubscription: Subscription;

  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit(): void {
    this.initializeSubscriptions();
    this.initializeCurrentIdiom();
    this.initializeCurrentTheme();
    this.initializeTranslation();
    this.changeTranslation();
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
    this.changeTranslationSubscription.unsubscribe();
  }
  initializeTranslation() {
    this.initializeContainersIdiom();
    this.initializeQualification();
  }

  initializeSubscriptions() {
    this.translateSubscription = new Subscription();
    this.changeTranslationSubscription = new Subscription();
  }

  initializeCurrentIdiom(): void {
    const currentIdiom = this.localStorage.getItem('idiom');
    const brazilFlagElement = this._document.getElementById('image-brazil');
    const usaFlagElement = this._document.getElementById('image-usa');

    if (currentIdiom !== null) {
      this.translateService.setDefaultLang(currentIdiom);

      const isBrazilianIdiom = currentIdiom === 'pt';
      if (brazilFlagElement && usaFlagElement) {
        brazilFlagElement.classList.toggle('flag-image', isBrazilianIdiom);
        usaFlagElement.classList.toggle('flag-image', !isBrazilianIdiom);
      }
    } else {
      this.translateService.setDefaultLang('en');
      this.localStorage.setItem('idiom', 'en');
    }
  }

  initializeCurrentTheme(): void {
    const colorStorage = this.localStorage.getItem('theme');
    const containerElement = this._document.getElementById('container');
    const contact = new ContactSrc();

    if (colorStorage === null || colorStorage === 'light') {
      containerElement!.classList.toggle('dark-theme');
      this.localStorage.setItem('theme', 'light');
      this.lampColor = 'light';
      contact.toggleTheme('light');
    } else {
      containerElement!.classList.remove('dark-theme');
      this.localStorage.setItem('theme', 'dark');
      this.lampColor = 'dark';
      contact.toggleTheme('dark');
    }

    this.contactSrc = contact;
  }

  toggleIdiom(): void {
    const currentIdiom = this.localStorage.getItem('idiom');
    const newIdiom = currentIdiom === 'en' ? 'pt' : 'en';

    const setFlagImage = (elementId: string, addClass: boolean) => {
      const flagImageElement = this._document.getElementById(elementId);
      if (flagImageElement) {
        if (addClass) {
          flagImageElement.classList.add('flag-image');
        } else {
          flagImageElement.classList.remove('flag-image');
        }
      }
    };

    if (newIdiom === 'pt') {
      setFlagImage('image-brazil', true);
      setFlagImage('image-usa', false);
    } else {
      setFlagImage('image-usa', true);
      setFlagImage('image-brazil', false);
    }

    this.localStorage.setItem('idiom', newIdiom);
    this.translateService.use(newIdiom);
  }

  toggleTheme(): void {
    const themeStorage = localStorage.getItem('theme');
    const newTheme = themeStorage === 'dark' ? 'light' : 'dark';
    const containerElement = this._document.getElementById('container');

    this.lampColor = newTheme;
    containerElement!.classList.toggle('dark-theme');
    this.localStorage.setItem('theme', newTheme);

    const toggleSrc = (src: string) => src.replace(/(dark|light)/g, newTheme);

    this.qualifications.forEach((qualification) =>
      qualification.detail.skills.forEach(
        (skill) => (skill.src = toggleSrc(skill.src))
      )
    );

    this.themeForSkills();

    const contact = new ContactSrc();
    contact.toggleTheme(newTheme);
    this.contactSrc = contact;
  }
  themeForSkills() {
    this.skills.map((skills: Skill[]) => {
      skills.map((skill: Skill) => {
        if (localStorage.getItem('theme') == 'dark')
          skill.src = skill.src.replaceAll('light', 'dark');
        else skill.src = skill.src.replaceAll('dark', 'light');
      });
    });
  }

  initializeQualification(): void {
    this.translateSubscription = this.translateService
      .get('qualification.items')
      .subscribe((items) => {
        let qualifications: Qualification[] = items;

        qualifications.map((item) => {
          this.formatDataQualification(item);

          if (this.localStorage.getItem('theme') == 'dark') {
            item.detail.skills.map(
              (skill) => (skill.src = skill.src.replaceAll('light', 'dark'))
            );
          }
        });
        this.qualifications = qualifications;
        this.selectQualification(0);
      });
  }
  public changeTranslation() {
    this.changeTranslationSubscription =
      this.translateService.onLangChange.subscribe(() =>
        this.initializeContainersIdiom()
      );
  }
  selectQualification(id: number): void {
    const selectedQualification = this.qualifications.find(
      (qualification) => qualification.id === id
    );

    if (selectedQualification) {
      this.qualificationDetail = selectedQualification.detail;

      this.qualifications.forEach((qualification) => {
        const isCurrentQualification = qualification.id === id;
        qualification.detail.selected = isCurrentQualification;

        const itemExperienceElement = this._document.getElementById(
          'item-experience-' + qualification.id
        );
        if (itemExperienceElement) {
          if (isCurrentQualification) {
            itemExperienceElement.classList.add('active');
          } else {
            itemExperienceElement.classList.remove('active');
          }
        }
      });
    }
  }

  formatDataQualification(item: Qualification) {
    const dateStart = new Date(item.dateStart);
    const dateFinish = item.dateFinish ? new Date(item.dateFinish) : new Date();

    const diffTime = Math.abs(dateFinish.getTime() - dateStart.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 365) {
      const totalYears = Math.floor(diffDays / 365);
      const totalMonths = Math.floor((diffDays % 365) / 30);

      const monthsString = totalMonths !== 0 ? ` ${totalMonths} months` : '';
      item.totalTime = `${totalYears} yr${monthsString}`;
    } else {
      const totalMonths = Math.ceil(Number((diffDays / 30).toFixed(1)));
      item.totalTime = `${totalMonths} months`;
    }
  }

  initializeContainersIdiom(): void {
    const newTheme =
      this.localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';

    this.translateSubscription = this.translateService
      .get('qualification.items')
      .subscribe((items: Qualification[]) => {
        const detail = items.find(
          (item) => item.detail.id === this.qualificationDetail.id
        );

        this.qualificationDetail = detail?.detail ?? null;
        if (this.qualificationDetail === null) {
          this.selectQualification(0);
        }
        this.qualifications = items;

        this.qualifications.forEach((item) => {
          this.formatDataQualification(item);

          item.detail.skills.forEach((skill) => {
            skill.src = skill.src.replaceAll(
              newTheme,
              newTheme === 'dark' ? 'light' : 'dark'
            );
          });
        });

        if (this.qualificationDetail !== null) {
          this.qualificationDetail.skills.forEach((item: any) => {
            item.src = item.src.replaceAll(
              newTheme,
              newTheme === 'dark' ? 'light' : 'dark'
            );
          });
        }
      });

    this.translateSubscription = this.translateService
      .get('portfolio.items')
      .subscribe((items) => {
        this.portfolios = items;
      });

    this.translateSubscription = this.translateService
      .get('about-me.downloadCv.href')
      .subscribe((item) => {
        this.downloadCvHref = item;
      });

    this.translateSubscription = this.translateService
      .get('skills.items')
      .subscribe((items) => {
        this.skills = items;
        this.themeForSkills();
      });
  }

  slidePortfolio(direction: string) {
    const currentPortfolio = this.portfolios.find(
      (portfolio) => portfolio.show
    )!;
    const indexCurrentPortfolio = this.portfolios.indexOf(currentPortfolio);
    currentPortfolio.show = false;

    if (direction === 'right') {
      const nextIndex = (indexCurrentPortfolio + 1) % this.portfolios.length;
      this.portfolios[nextIndex].show = true;
    } else {
      const prevIndex =
        indexCurrentPortfolio === 0
          ? this.portfolios.length - 1
          : indexCurrentPortfolio - 1;
      this.portfolios[prevIndex].show = true;
    }
  }

  dotSelectedPortfolio(portfolioId: string) {
    const currentPortfolio = this.portfolios.find(
      (portfolio) => portfolio.show
    )!;
    const indexSelectedPortfolio = this.portfolios.findIndex(
      (portfolio) => portfolio.id === portfolioId
    );

    currentPortfolio.show = false;
    this.portfolios[indexSelectedPortfolio].show = true;
  }

  selectedSkill(skillSelect: any) {
    this.skillsSelectedList = this.skills[skillSelect.value];
  }

  toggleNavBarMobile() {
    const navBar = this.navBar.nativeElement;
    const isNavBarHidden =
      navBar.style.display === '' || navBar.style.display === 'none';

    if (isNavBarHidden) {
      navBar.style.display = 'flex';
      navBar.classList.add('nav-active-animation');
    } else {
      navBar.classList.remove('nav-active-animation');
      navBar.classList.toggle('nav-unactive-animation');

      navBar.addEventListener('animationend', (event: AnimationEvent) => {
        if (event.animationName === 'fadeOut') {
          navBar.classList.remove('nav-unactive-animation');
          navBar.style.display = '';
        }
      });
    }
  }

  closeNavBarMobile() {
    this.navBar.nativeElement.style.display = 'flex';
    this.toggleNavBarMobile();
  }

  sendMessageWhatsapp() {
    let text = this.text.nativeElement.value;
    let name = this.name.nativeElement.value;

    let link = document.createElement('a');
    link.href = `https://api.whatsapp.com/send?phone=5531991143417&text=*MENSAGEM ENVIADA PELO SITE*%20%20%20%20%20%0A%0A%20%20%20%20%0A%0A*name:*${name}%20%20%20%20%20%0A%0A*text:*${text}`;
    link.target = '_blank';
    link.click();
  }
}
