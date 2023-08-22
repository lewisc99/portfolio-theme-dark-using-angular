import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PortfolioDetail } from '../interfaces/detail';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: [
    './portfolio-detail.component.scss',
    './portfolio-detail-mobile-responsive.component.scss',
    './portfolio-detail-large-responsive.component.scss',
  ],
})
export class PortfolioDetailComponent implements OnInit, OnDestroy {
  public detail: PortfolioDetail = {
    id: '',
    title: '',
    text: '',
    youtubeSrc: '',
    github: {
      href: '',
      active: false,
    },
    site: {
      href: '',
      active: false,
    },
    technologies: [],
    subId: '',
  };
  public siteActive: boolean = false;
  private localStorage: Storage = localStorage;
  public lampColor: string = 'light';
  @ViewChild('nav', { static: false }) public navBar: ElementRef =
    new ElementRef({});
  public clickedNavBarActive: string = 'home';
  private translateServiceSubscription: Subscription;
  private activatedRouteSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private _document: Document,
    private router: Router
  ) {
    const selectedIdiom = this.localStorage.getItem('idiom');
    const defaultIdiom = selectedIdiom === 'pt' ? 'pt' : 'en';
    this.translateService.setDefaultLang(defaultIdiom);
  }

  ngOnDestroy(): void {
    if (this.translateServiceSubscription) {
      this.translateServiceSubscription.unsubscribe();
    }

    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.initializeSubscriptions();
    this.activatedRouteSubscription = this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');
        if (id) {
          this.targetPortfolioDetail(id);
        }
        this.toggleTheme();
      },
      error: (error) => console.error(error),
    });
  }

  toggleTheme(): void {
    const themeStorage = this.localStorage.getItem('theme');
    const containerElement = this._document.getElementById('container');
    const rowNav = this._document.getElementsByClassName(
      'row-nav'
    ) as HTMLCollectionOf<HTMLElement>;

    if (themeStorage === 'dark') {
      this.lampColor = 'dark';
      containerElement?.classList.remove('dark-theme');
      if (rowNav.length > 0) {
        rowNav[0].style.boxShadow =
          'rgb(255 255 255 / 70%) 0px 0px 0px 1000px inset';
      }
      this.localStorage.setItem('theme', 'light');
    } else {
      this.lampColor = 'light';
      containerElement?.classList.add('dark-theme');
      if (rowNav.length > 0) {
        rowNav[0].style.boxShadow = 'inset 0 0 0 2000px rgb(0 0 0 / 80%)';
      }
      this.localStorage.setItem('theme', 'dark');
    }
  }

  initializeSubscriptions() {
    this.translateServiceSubscription = new Subscription();
    this.activatedRouteSubscription = new Subscription();
  }

  targetPortfolioDetail(id: string) {
    this.translateServiceSubscription = this.translateService
      .get('portfolio-detail.items')
      .subscribe((items: PortfolioDetail[]) => {
        this.detail = items.find((item) => item.id === id)!;

        if (this.detail === null) {
          this.router.navigate(['/..']);
          return;
        }

        const subId = this.detail.subId;
        const rowNav = this._document.getElementsByClassName(
          'row-nav'
        ) as HTMLCollectionOf<HTMLElement>;
        const background = `url('../../assets/images/portfolio/detail/background/${subId}.svg')`;
        rowNav.item(0)!.style.background = background;

        this.siteActive = this.detail.site.active;
      });
  }

  toggleNavBarMobile() {
    let display = this.navBar.nativeElement.style.display;
    if (display == '' || display == 'none') {
      this.navBar.nativeElement.style.display = 'flex';
      this.navBar.nativeElement.classList.add('nav-active-animation');
    } else {
      this.navBar.nativeElement.classList.remove('nav-active-animation');
      this.navBar.nativeElement.classList.toggle('nav-unactive-animation');
      this.navBar.nativeElement.addEventListener(
        'animationend',
        (event: AnimationEvent) => {
          if (event.animationName == 'fadeOut') {
            this.navBar.nativeElement.classList.remove(
              'nav-unactive-animation'
            );
            this.navBar.nativeElement.style.display = '';
          }
        }
      );
    }
  }
  closeNavBarMobile() {
    this.navBar.nativeElement.style.display = 'flex';
    this.toggleNavBarMobile();
  }

  redirectToPortfolio(): void {
    if (this.localStorage.getItem('theme') == 'light') {
      this.localStorage.setItem('theme', 'light');
    } else {
      this.localStorage.setItem('theme', 'dark');
    }
    this.router.navigate(['/portfolio']);
  }
}
