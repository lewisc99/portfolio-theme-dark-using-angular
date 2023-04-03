import { AfterViewInit, Component, ElementRef,OnInit,ViewChild } from '@angular/core';
import { NavBar } from './entities/navbar';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  

  private localStorage:Storage = localStorage;
  public navBar: NavBar;

  constructor(private dataService:DataService) {}
 
  ngOnInit(): void {
    this.initializeCurrentIdiom();
  }

  ngAfterViewInit(): void {
    this.initializeCurrentTheme();
  }

  private initializeCurrentIdiom() {
    let currentIdiom = this.localStorage.getItem("idiom");
    this.localStorage.setItem("idiom", "english");
    if (currentIdiom != null) {
      let isEnglish = currentIdiom == "english" ? true : false;
      this.navBar = new NavBar();
      if (!isEnglish) {
        this.toggleIdiom();
      }
    }
    else {
      this.navBar = new NavBar();
    }
  }

  initializeCurrentTheme()
  {
    const colorStorage = localStorage.getItem("theme");
    if (colorStorage == "light")
    {
    }
  }

  toggleIdiom()
  {
    let currentIdiom = this.localStorage.getItem("idiom");
    let isEnglish = !(currentIdiom == "english" ? true : false); 
    this.navBar =  this.dataService.getNavBar(isEnglish);
  }
  
  toggleTheme()
  {
    document.getElementById("container")!.classList.toggle('dark-theme');
  }
 
}
